#!/usr/bin/env bash

set -euo pipefail

# Compatible with Bash 3.2+ (macOS default)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
BASE_FILE=""
OVERRIDE_FILES=()
OUTPUT_FILE=""

# Help function
show_help() {
    cat << EOF
Usage: $0 --base <base_file> --override <override_file> [--override <file2>...] --output <output_file>

Merge environment files, where override files take precedence over base file.

Arguments:
    --base <file>       Base .env file (required)
    --override <file>   Override .env file (can be specified multiple times)
    --output <file>     Output merged .env file (required)
    --help             Show this help message

Examples:
    $0 --base .env --override .env.override --output .env.merged
    $0 --base .env --override .env.dev --override .env.local --output .env.merged

EOF
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --base)
            BASE_FILE="$2"
            shift 2
            ;;
        --override)
            OVERRIDE_FILES+=("$2")
            shift 2
            ;;
        --output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}Error: Unknown argument '$1'${NC}" >&2
            show_help
            exit 1
            ;;
    esac
done

# Validate required arguments
if [[ -z "$BASE_FILE" ]]; then
    echo -e "${RED}Error: --base is required${NC}" >&2
    show_help
    exit 1
fi

if [[ -z "$OUTPUT_FILE" ]]; then
    echo -e "${RED}Error: --output is required${NC}" >&2
    show_help
    exit 1
fi

if [[ ${#OVERRIDE_FILES[@]} -eq 0 ]]; then
    echo -e "${RED}Error: At least one --override file is required${NC}" >&2
    show_help
    exit 1
fi

# Check if base file exists
if [[ ! -f "$BASE_FILE" ]]; then
    echo -e "${RED}Error: Base file '$BASE_FILE' does not exist${NC}" >&2
    exit 1
fi

# Check if override files exist
for file in "${OVERRIDE_FILES[@]}"; do
    if [[ ! -f "$file" ]]; then
        echo -e "${YELLOW}Warning: Override file '$file' does not exist, skipping...${NC}" >&2
    fi
done

# Function to clean env line (remove comments, trim whitespace)
clean_env_line() {
    local line="$1"
    # Remove inline comments (but preserve # in values)
    if [[ "$line" =~ ^[[:space:]]*[A-Za-z_][A-Za-z0-9_]*= ]]; then
        echo "$line"
    elif [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
        # Skip comments and empty lines
        echo ""
    else
        echo "$line"
    fi
}

# Function to extract variable name from env line
get_var_name() {
    local line="$1"
    if [[ "$line" =~ ^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*)= ]]; then
        echo "${BASH_REMATCH[1]}"
    fi
}

# Start merging
echo -e "${GREEN}Merging environment files...${NC}"
echo "Base file: $BASE_FILE"
for file in "${OVERRIDE_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Override file: $file"
    fi
done
echo "Output file: $OUTPUT_FILE"

# Create temporary file
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

# Create list of variables that will be overridden
OVERRIDE_VARS=""
for override_file in "${OVERRIDE_FILES[@]}"; do
    if [[ -f "$override_file" ]]; then
        while IFS= read -r line || [[ -n "$line" ]]; do
            cleaned_line=$(clean_env_line "$line")
            if [[ -n "$cleaned_line" ]]; then
                var_name=$(get_var_name "$cleaned_line")
                if [[ -n "$var_name" ]]; then
                    OVERRIDE_VARS="$OVERRIDE_VARS $var_name"
                fi
            fi
        done < "$override_file"
    fi
done

# Start with header
echo "# Generated file" > "$TEMP_FILE"
echo "# Script: ./scripts/merge-env.sh" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Process base file
echo "# From base file $BASE_FILE" >> "$TEMP_FILE"
while IFS= read -r line || [[ -n "$line" ]]; do
    cleaned_line=$(clean_env_line "$line")
    if [[ -n "$cleaned_line" ]]; then
        var_name=$(get_var_name "$cleaned_line")
        # Only include if this variable will NOT be overridden
        if [[ -z "$var_name" ]] || [[ "$OVERRIDE_VARS" != *" $var_name"* ]]; then
            echo "$cleaned_line" >> "$TEMP_FILE"
        fi
    fi
done < "$BASE_FILE"

# Process override files
for override_file in "${OVERRIDE_FILES[@]}"; do
    if [[ ! -f "$override_file" ]]; then
        continue
    fi

    echo "" >> "$TEMP_FILE"
    echo "# From override file: $override_file" >> "$TEMP_FILE"

    while IFS= read -r line || [[ -n "$line" ]]; do
        cleaned_line=$(clean_env_line "$line")
        if [[ -n "$cleaned_line" ]]; then
            echo "$cleaned_line" >> "$TEMP_FILE"
        fi
    done < "$override_file"
done

# Move temp file to output
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo -e "${GREEN}✓ Successfully merged environment files to $OUTPUT_FILE${NC}"
echo