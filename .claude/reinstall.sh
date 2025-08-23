#!/bin/bash

# Script de réinstallation de Claude Code
# Résout les problèmes de mise à jour automatique

set -e  # Arrête le script en cas d'erreur

echo "🔧 Réinstallation de Claude Code en cours..."
echo

echo "1️⃣ Nettoyage du cache npm..."
npm cache clean --force
echo "✅ Cache npm nettoyé"
echo

echo "2️⃣ Suppression de l'ancienne installation..."
sudo rm -rf /opt/homebrew/lib/node_modules/@anthropic-ai/claude-code
echo "✅ Ancienne installation supprimée"
echo

echo "3️⃣ Réinstallation de Claude Code..."
npm i -g @anthropic-ai/claude-code
echo "✅ Claude Code réinstallé"
echo

echo "🎉 Réinstallation terminée !"
echo
echo "Version installée :"
claude --version
