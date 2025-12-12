#!/bin/bash

# PostgreSQL Database Management Script
# Simple database operations for development and production
#
# Commands:
# - setup    : Creates database if it doesn't exist
# - reset    : Drops database if it exists
# - reload   : reset + setup (complete reload)
# - execute  : Execute custom SQL commands
#
# Options:
# - --ssl    : Use SSL connection to PostgreSQL
#
# Environment Variables:
# - POSTGRES_HOST     : PostgreSQL host (default: localhost)
# - POSTGRES_PORT     : PostgreSQL port (default: 5432)
# - POSTGRES_PASSWORD : PostgreSQL password (required)
# - POSTGRES_DB       : Database name (required)
#
# Notes:
# - Use shell loaded environment variables (case of compose.*.yml ou Dockerfile)
#   of automatically loads .env file system (case of local development)
# - In Docker containers, uses environment variables from env_file
# - SSL mode requires certificates in ./certs/ directory
#
# Examples:
# ./scripts/db.sh setup
# ./scripts/db.sh reload --ssl
# ./scripts/db.sh execute "SELECT * FROM users;"

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Global variables
SSL_MODE=false
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_success() {
    print_message "$GREEN" "✅ $1"
}

print_error() {
    print_message "$RED" "❌ $1"
}

print_info() {
    print_message "$BLUE" "ℹ️ $1"
}

print_warning() {
    print_message "$YELLOW" "⚠️ $1"
}

# Function to check required environment variables
check_postgres_env() {
    local missing_vars=""

    if [ -z "$POSTGRES_HOST" ]; then
        missing_vars="$missing_vars POSTGRES_HOST"
    fi

    if [ -z "$POSTGRES_PASSWORD" ]; then
        missing_vars="$missing_vars POSTGRES_PASSWORD"
    fi

    if [ -z "$POSTGRES_DB" ]; then
        missing_vars="$missing_vars POSTGRES_DB"
    fi

    if [ -n "$missing_vars" ]; then
        print_error "Missing required environment variables:"
        for var in $missing_vars; do
            print_error "  - $var"
        done
        return 1
    fi

    return 0
}


# Function to build psql command arguments
build_psql_args() {
    local password=$1
    local database=$2

    # Build arguments as space-separated string
    local args="-h ${POSTGRES_HOST:-localhost} -p ${POSTGRES_PORT:-5432} -U postgres -d $database"

    # SSL configuration
    if [ "$SSL_MODE" = true ]; then
        # Check if certificate files exist (if not, throw error)
        local cert_files="$PROJECT_DIR/certs/ca.pem $PROJECT_DIR/certs/client-cert.pem $PROJECT_DIR/certs/client-key.pem"

        for cert_file in $cert_files; do
            if [ ! -f "$cert_file" ]; then
                print_error "SSL certificate file not found: $cert_file"
                print_info "Run './scripts/ssl-certs.sh generate <host>' to create certificates"
                return 1
            fi
        done

        # If certs exist, add SSL params
        args="$args --set=sslmode=require"
        args="$args --set=sslrootcert=$PROJECT_DIR/certs/ca.pem"
        args="$args --set=sslcert=$PROJECT_DIR/certs/client-cert.pem"
        args="$args --set=sslkey=$PROJECT_DIR/certs/client-key.pem"
    fi

    echo "$args"
}

# Function to check if database exists
database_exists() {
    local password=$1
    local db_name=$2

    local args=$(build_psql_args "$password" "$POSTGRES_DB")

    export PGPASSWORD="$password"

    local result
    result=$(psql $args -t -c "SELECT 1 FROM pg_database WHERE datname='$db_name';" 2>/dev/null | xargs)

    unset PGPASSWORD

    if [ "$result" = "1" ]; then
        return 0  # Database exists
    else
        return 1  # Database does not exist
    fi
}

# Function to execute SQL commands
execute_sql_commands() {
    local sql_commands=$1
    local password=$2
    local database=$3

    local args=$(build_psql_args "$password" "$database")

    export PGPASSWORD="$password"

    if echo "$sql_commands" | psql $args 2>&1; then
        unset PGPASSWORD
        return 0
    else
        local exit_code=$?
        unset PGPASSWORD
        return $exit_code
    fi
}

# Function to setup database
setup_db() {
    local password=$1

    # Check required environment variables
    if ! check_postgres_env; then
        return 1
    fi

    # print_info "Setting up database: $POSTGRES_DB"

    # Check if database already exists
    if database_exists "$password" "$POSTGRES_DB"; then
        # print_info "Database $POSTGRES_DB already exists"
        return 0
    fi

    # Create database (PostgreSQL doesn't have IF NOT EXISTS for databases)
    local setup_sql="CREATE DATABASE \"$POSTGRES_DB\";"

    # print_info "Creating database..."
    if execute_sql_commands "$setup_sql" "$password" "postgres"; then
        print_success "Database setup completed"
        return 0
    else
        print_error "Database setup failed"
        return 1
    fi
}

# Function to reset database
reset_db() {
    local password=$1

    # Check required environment variables
    if ! check_postgres_env; then
        return 1
    fi

    # print_info "Resetting database: $POSTGRES_DB"

    # Check if database exists
    if ! database_exists "$password" "$POSTGRES_DB"; then
        # print_info "Database $POSTGRES_DB does not exist, nothing to reset"
        return 0
    fi

    # Drop database if it exists
    local reset_sql="DROP DATABASE IF EXISTS \"$POSTGRES_DB\";"

    # print_info "Dropping database..."
    if execute_sql_commands "$reset_sql" "$password" "postgres"; then
        print_success "Database reset completed"
        return 0
    else
        print_error "Database reset failed"
        return 1
    fi
}

# Function to reload database (reset + setup)
reload_db() {
    local password=$1

    if [ -z "$POSTGRES_DB" ]; then
        print_error "POSTGRES_DB environment variable is not defined"
        return 1
    fi

    print_info "Reloading database: $POSTGRES_DB"

    # Check if database exists and reset if it does
    if database_exists "$password" "$POSTGRES_DB"; then
        # print_info "Database exists, resetting..."
        if ! reset_db "$password"; then
            print_error "Failed to reset database"
            return 1
        fi
    # else
    #     print_info "Database does not exist, creating directly"
    fi

    # Setup database
    if setup_db "$password"; then
        print_success "Database reloaded successfully"
        return 0
    else
        print_error "Database reload failed"
        return 1
    fi
}

# Function to execute custom SQL commands
execute_custom_sql() {
    local sql_commands=$1
    local password=$2

    # Check required environment variables
    if ! check_postgres_env; then
        return 1
    fi

    if [ -z "$sql_commands" ]; then
        print_error "Please provide SQL commands to execute"
        print_info "Example: ./scripts/db.sh execute \"SELECT * FROM users;\""
        return 1
    fi

    # Check if database exists
    if ! database_exists "$password" "$POSTGRES_DB"; then
        print_error "Database $POSTGRES_DB does not exist"
        return 1
    fi

    # Execute the SQL commands
    # print_info "Executing custom SQL commands..."
    if execute_sql_commands "$sql_commands" "$password" "$POSTGRES_DB"; then
        print_success "Custom SQL executed successfully"
        return 0
    else
        print_error "Failed to execute custom SQL"
        return 1
    fi
}

# Function to show help
show_help() {
    echo "PostgreSQL Database Management Script"
    echo
    echo "Usage: $0 [command] [options]"
    echo
    echo "Commands:"
    echo "  setup              Create database if it doesn't exist"
    echo "  reset              Drop database if it exists"
    echo "  reload             Reset + setup (complete reload)"
    echo "  execute <sql>      Execute custom SQL commands"
    echo
    echo "Options:"
    echo "  --ssl              Use SSL connection"
    echo "  --help             Show this help message"
    echo
    echo "Examples:"
    echo "  $0 setup"
    echo "  $0 reload --ssl"
    echo "  $0 execute \"SELECT * FROM users;\""
    echo
    echo "Environment variables:"
    echo "  POSTGRES_HOST      PostgreSQL host (default: localhost)"
    echo "  POSTGRES_PORT      PostgreSQL port (default: 5432)"
    echo "  POSTGRES_PASSWORD  PostgreSQL password"
    echo "  POSTGRES_DB        Database name"
}

# Parse command line arguments
COMMAND=""
SQL_COMMANDS=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --ssl)
            SSL_MODE=true
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        setup|reset|reload)
            COMMAND=$1
            shift
            ;;
        execute)
            COMMAND=$1
            if [[ $# -gt 1 && $2 != --* ]]; then
                SQL_COMMANDS=$2
                shift
            fi
            shift
            ;;
        *)
            if [ -z "$COMMAND" ]; then
                # If no command specified, treat as custom SQL commands
                COMMAND="execute"
                SQL_COMMANDS=$1
            fi
            shift
            ;;
    esac
done

# Load .env file if environment variables are not already set (for local development)
if [ -z "$POSTGRES_DB" ] || [ -z "$POSTGRES_PASSWORD" ] || [ -z "$POSTGRES_HOST" ]; then
    ENV_FILE="$PROJECT_DIR/.env"
    if [ -f "$ENV_FILE" ]; then
        export $(grep -v '^#' "$ENV_FILE" | xargs)
        # print_info "Loaded environment from .env file"
    else
        print_error "Environment file .env not found and required variables not set"
        exit 1
    fi
fi

# Validate command
if [ -z "$COMMAND" ]; then
    print_error "Please specify a command"
    echo
    show_help
    exit 1
fi

# Use PostgreSQL password from environment (already verified in check_postgres_env)
PASSWORD="$POSTGRES_PASSWORD"

# Execute command
case $COMMAND in
    setup)
        setup_db "$PASSWORD"
        ;;
    reset)
        reset_db "$PASSWORD"
        ;;
    reload)
        reload_db "$PASSWORD"
        ;;
    execute)
        execute_custom_sql "$SQL_COMMANDS" "$PASSWORD"
        ;;
    *)
        print_error "Unknown command: $COMMAND"
        show_help
        exit 1
        ;;
esac