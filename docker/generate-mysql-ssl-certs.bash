#!/bin/sh

set -e

CERTS_DIR="./docker/certs"

# Vérifier si les certificats existent déjà
if [ -d "$CERTS_DIR" ] && [ -f "$CERTS_DIR/ca.pem" ] && [ -f "$CERTS_DIR/server-cert.pem" ] && [ -f "$CERTS_DIR/client-cert.pem" ]; then
    echo "✅ Certs already exist"
    exit 0
fi

echo "🔐 Generating SSL certificates for MySQL..."

mkdir -p "$CERTS_DIR"
cd "$CERTS_DIR"

# Générer la CA
openssl genrsa 2048 > ca-key.pem 2>/dev/null
openssl req -new -x509 -nodes -days 3650 -key ca-key.pem -out ca.pem -subj "/CN=mysql-ca" 2>/dev/null

# Générer la clé et le CSR du serveur
openssl req -newkey rsa:2048 -days 3650 -nodes -keyout server-key.pem -out server-req.pem -subj "/CN=mysql" 2>/dev/null
openssl x509 -req -in server-req.pem -days 3650 -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem 2>/dev/null

# Générer la clé et le CSR du client
openssl req -newkey rsa:2048 -days 3650 -nodes -keyout client-key.pem -out client-req.pem -subj "/CN=client" 2>/dev/null
openssl x509 -req -in client-req.pem -days 3650 -CA ca.pem -CAkey ca-key.pem -set_serial 02 -out client-cert.pem 2>/dev/null

# Nettoyer les fichiers temporaires
rm server-req.pem client-req.pem

echo "✅ Certs successfully generated"
