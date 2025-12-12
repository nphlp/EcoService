#!/bin/bash

# Script de réinstallation de Claude Code

npm cache clean --force --silent

rm -rf /opt/homebrew/lib/node_modules/@anthropic-ai/claude-code
# npm rm -g @anthropic-ai/claude-code --force

npm i -g @anthropic-ai/claude-code@latest --silent

claude --version
