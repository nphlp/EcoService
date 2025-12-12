#!/bin/sh

# SSL Certificate Management Script
# Generates self-signed SSL certificates for PostgreSQL and client connections
#
# Commands:
# - generate_safe : Generate certificates only if they don't exist
# - generate      : Force generate certificates (overwrites existing)
# - clear         : Remove all SSL certificates
#
# Arguments:
# - host          : Required hostname for certificate generation
#
# Examples:
# ./scripts/ssl-certs.sh generate_safe postgres
# ./scripts/ssl-certs.sh generate postgres
# ./scripts/ssl-certs.sh clear

set -e

# Global variables
CERTS_DIR="/certs"

# Valide que l'argument host est fourni
validate_host() {
    local host=$1

    if [ -z "$host" ]; then
        echo "❌ Host argument is required"
        show_help
        exit 1
    fi
}

# Génère les certificats SSL de manière sécurisée (ne fait rien s'ils existent déjà)
generate_safe() {
    local host=$1
    validate_host "$host"

    local required_files="ca.pem server-cert.pem server-key.pem client-cert.pem client-key.pem ca-key.pem"
    local missing_files=""

    # Vérifier si les certificats existent déjà
    if [ -d "$CERTS_DIR" ]; then
        for file in $required_files; do
            if [ ! -f "$CERTS_DIR/$file" ]; then
                missing_files="$missing_files $file"
            fi
        done
    else
        missing_files="$required_files"
    fi

    if [ -z "$missing_files" ]; then
        echo "✅ SSL certificates already exist for host: $host, skipping generation"
        return 0
    else
        echo "🔍 Missing SSL certificate files, generating..."
        generate "$host"
    fi
}

# Génère tous les certificats SSL
generate() {
    local host=$1
    validate_host "$host"

    echo "🔐 Generating SSL certificates for host: $host"

    mkdir -p "$CERTS_DIR"
    cd "$CERTS_DIR"

    # Générer la CA (Certificate Authority)
    echo "📋 Generating CA certificate..."
    openssl genrsa 2048 > ca-key.pem 2>/dev/null
    openssl req -new -x509 -nodes -days 3650 -key ca-key.pem -out ca.pem -subj "/CN=ssl-ca" 2>/dev/null

    # Générer la clé et le certificat du serveur
    echo "🖥️ Generating server certificate for $host..."
    openssl req -newkey rsa:2048 -days 3650 -nodes -keyout server-key.pem -out server-req.pem -subj "/CN=$host" 2>/dev/null
    openssl x509 -req -in server-req.pem -days 3650 -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem 2>/dev/null

    # Générer la clé et le certificat du client
    echo "👤 Generating client certificate..."
    openssl req -newkey rsa:2048 -days 3650 -nodes -keyout client-key.pem -out client-req.pem -subj "/CN=client" 2>/dev/null
    openssl x509 -req -in client-req.pem -days 3650 -CA ca.pem -CAkey ca-key.pem -set_serial 02 -out client-cert.pem 2>/dev/null

    # Nettoyer les fichiers temporaires
    rm server-req.pem client-req.pem

    # Vérifier les permissions
    chmod 600 *.pem

    echo "✅ SSL certificates successfully generated for host: $host"
}

# Supprime tous les certificats existants
clear() {
    echo "🧹 Clearing SSL certificates..."

    if [ -d "$CERTS_DIR" ]; then
        rm -rf "$CERTS_DIR"/*
        echo "🫧 SSL certificates cleared"
    else
        echo "ℹ️ Certificates directory does not exist, nothing to clear"
    fi
}

# Affiche l'aide
show_help() {
    echo "SSL Certificate Management Script"
    echo
    echo "Usage: $0 <command> <host>"
    echo
    echo "Commands:"
    echo "  generate_safe <host>  - Generate SSL certificates only if they don't exist"
    echo "  generate <host>       - Force generate SSL certificates (overwrites existing)"
    echo "  clear                 - Remove all SSL certificates"
    echo
    echo "Arguments:"
    echo "  host                  - Required hostname for certificate generation"
    echo
    echo "Examples:"
    echo "  $0 generate_safe postgres-front"
    echo "  $0 generate postgres-front"
    echo "  $0 clear"
}

# === MAIN ===

COMMAND="$1"
HOST="$2"

case "$COMMAND" in
    generate_safe)
        generate_safe "$HOST"
        ;;
    generate)
        generate "$HOST"
        ;;
    clear)
        clear
        ;;
    --help|-h|help)
        show_help
        exit 0
        ;;
    *)
        echo "❌ Unknown command: $COMMAND"
        echo
        show_help
        exit 1
        ;;
esac