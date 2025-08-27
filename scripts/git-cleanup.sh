#!/bin/bash

# =============================================================================
# Git Repository Cleanup Script
# =============================================================================
# Ce script permet de nettoyer l'historique Git des gros fichiers supprimés
# pour réduire la taille du repository.
# 
# Commandes disponibles:
# - checks: Vérifie la taille actuelle du repo
# - clean: Nettoie l'historique des fichiers spécifiés
# - push: Force push les changements (DANGER!)
# - auto: Fait checks + clean + affiche les instructions de push
# =============================================================================

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'aide
show_help() {
    echo -e "${BLUE}Git Repository Cleanup Script${NC}"
    echo ""
    echo "Commandes disponibles:"
    echo "  checks  - Vérifie la taille actuelle du repository"
    echo "  clean   - Nettoie l'historique des gros fichiers"
    echo "  push    - Force push les changements (DANGER!)"
    echo "  auto    - Fait checks + clean + affiche instructions"
    echo ""
    echo "Exemples:"
    echo "  ./scripts/git-cleanup.sh checks"
    echo "  ./scripts/git-cleanup.sh auto"
}

# Vérifier la taille du repository
check_repo_size() {
    echo -e "${BLUE}📊 Taille actuelle du repository:${NC}"
    git count-objects -vH
    echo ""
}

# Nettoyer l'historique Git
clean_git_history() {
    echo -e "${YELLOW}⚠️  ATTENTION: Cette opération va réécrire l'historique Git!${NC}"
    echo -e "${YELLOW}⚠️  Assurez-vous d'avoir sauvegardé votre travail.${NC}"
    echo ""
    
    read -p "Continuer? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ Opération annulée${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}🧹 Nettoyage de l'historique Git...${NC}"
    
    # Supprimer les anciens fichiers JPG de l'historique
    echo "🗑️  Suppression des fichiers .jpg de l'historique..."
    FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
        'git rm --cached --ignore-unmatch public/illustration/*.jpg' \
        --prune-empty --tag-name-filter cat -- --all
    
    # Supprimer les anciennes images avec noms longs de l'historique
    echo "🗑️  Suppression des anciens noms d'images de l'historique..."
    FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
        'git rm --cached --ignore-unmatch "public/illustration/*-unsplash.jpg"' \
        --prune-empty --tag-name-filter cat -- --all
    
    # Nettoyer les références et forcer la garbage collection
    echo "🧽 Nettoyage des références..."
    rm -rf .git/refs/original/
    
    echo "🗑️  Expiration des reflogs..."
    git reflog expire --expire=now --all
    
    echo "♻️  Garbage collection aggressive..."
    git gc --prune=now --aggressive
    
    echo -e "${GREEN}✅ Nettoyage terminé!${NC}"
    echo ""
}

# Force push (DANGEREUX!)
force_push() {
    echo -e "${RED}⚠️  DANGER: Force push va réécrire l'historique distant!${NC}"
    echo -e "${RED}⚠️  Cette action est IRRÉVERSIBLE!${NC}"
    echo ""
    
    # Obtenir la branche actuelle
    current_branch=$(git branch --show-current)
    
    if [[ -z "$current_branch" ]]; then
        echo -e "${RED}❌ Erreur: Impossible de déterminer la branche actuelle${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📌 Branche actuelle: ${YELLOW}$current_branch${NC}"
    echo -e "${YELLOW}⚠️  Seule cette branche sera force pushée${NC}"
    echo ""
    
    # Vérifier si la branche a une remote
    if ! git rev-parse --verify "origin/$current_branch" >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  La branche $current_branch n'existe pas sur origin${NC}"
        echo -e "${BLUE}ℹ️  Un push normal sera effectué${NC}"
        
        read -p "Continuer avec un push normal? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${RED}❌ Push annulé${NC}"
            exit 1
        fi
        
        git push -u origin "$current_branch"
    else
        echo -e "${RED}⚠️  La branche $current_branch va être réécrite sur origin!${NC}"
        
        read -p "Êtes-vous ABSOLUMENT sûr? Tapez 'FORCE_PUSH' pour continuer: " confirm
        if [[ $confirm != "FORCE_PUSH" ]]; then
            echo -e "${RED}❌ Force push annulé${NC}"
            exit 1
        fi
        
        echo -e "${YELLOW}🚀 Force push de la branche $current_branch...${NC}"
        git push origin "$current_branch" --force
    fi
    
    echo -e "${GREEN}✅ Push terminé!${NC}"
    echo -e "${BLUE}ℹ️  Seule la branche $current_branch a été modifiée${NC}"
}

# Processus automatique
auto_cleanup() {
    echo -e "${BLUE}🔄 Processus automatique de nettoyage Git${NC}"
    echo ""
    
    # Vérifier la taille avant
    echo "📊 Taille AVANT nettoyage:"
    check_repo_size
    
    # Nettoyer
    clean_git_history
    
    # Vérifier la taille après
    echo "📊 Taille APRÈS nettoyage:"
    check_repo_size
    
    # Instructions pour le push
    echo -e "${YELLOW}📋 Prochaines étapes:${NC}"
    echo "1. Vérifiez que tout fonctionne correctement"
    echo "2. Si tout va bien, faites le force push:"
    echo "   ./scripts/git-cleanup.sh push"
    echo ""
    echo -e "${RED}⚠️  IMPORTANT: Le force push effacera l'historique distant!${NC}"
    echo -e "${RED}⚠️  Tous les collaborateurs devront re-cloner le repository!${NC}"
}

# Main script
case "${1:-}" in
    "checks")
        check_repo_size
        ;;
    "clean")
        clean_git_history
        ;;
    "push")
        force_push
        ;;
    "auto")
        auto_cleanup
        ;;
    *)
        show_help
        exit 1
        ;;
esac