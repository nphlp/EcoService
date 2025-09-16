#!/bin/bash

# === CONFIGURATION ===
# Paramètres de ligne de commande et flags
DELETE_ORIGINALS=false

# Analyse des paramètres
while [[ $# -gt 0 ]]; do
    case $1 in
        --delete)
            DELETE_ORIGINALS=true
            shift
            ;;
        -*)
            echo "Flag inconnu: $1"
            exit 1
            ;;
        *)
            if [ -z "$SOURCE_DIR" ]; then
                SOURCE_DIR="$1"
            elif [ -z "$TARGET_DIR" ]; then
                TARGET_DIR="$1"
            fi
            shift
            ;;
    esac
done

# Vérification des paramètres
if [ -z "$SOURCE_DIR" ]; then
    echo ""
    echo "Usage: $0 {source} [target] [--delete]"
    echo ""
    echo "  source   - Dossier source contenant les images WebP à flouter"
    echo "  target   - Dossier de destination (optionnel)"
    echo "             Par défaut: {source}-blur"
    echo "  --delete - Supprime les images originales après traitement"
    echo ""
    echo "Exemples:"
    echo "  $0 ./public/images/articles"
    echo "  $0 ./public/images/articles ./public/images/articles-blur"
    echo "  $0 ./public/images/articles --delete"
    echo ""
    echo "Génération placeholders blur (${SCALE}% taille, qualité ${QUALITY}%)"
    exit 0
fi

# Si pas de dossier cible, générer automatiquement
if [ -z "$TARGET_DIR" ]; then
    TARGET_DIR="${SOURCE_DIR}-blur"
fi

PLACEHOLDER_DIR="$TARGET_DIR"
QUALITY=5   # Compression très basse pour des placeholders
SCALE=5    # Réduire à 5% de la taille originale

# === VARIABLES INTERNES ===
IMG_LIST=".blur_list.txt"

# === FONCTIONS ===

# Recherche toutes les images WebP dans le dossier source
find_images() {
    echo "🔍 Recherche des images dans $SOURCE_DIR..."
    
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "❌ Erreur: Le dossier $SOURCE_DIR n'existe pas"
        exit 1
    fi
    
    find "$SOURCE_DIR" -name "*.webp" -type f > "$IMG_LIST"
    echo "🧾 $(wc -l < "$IMG_LIST") image(s) trouvée(s)."
}

# Créer le dossier de destination
create_directory() {
    echo "📁 Création du dossier de destination..."
    mkdir -p "$PLACEHOLDER_DIR"
    echo "✅ Dossier $PLACEHOLDER_DIR créé"
}

# Générer les images floues
generate_blur() {
    echo "🛠️ Génération des images floues en cours..."
    
    # Vérifier les dépendances
    if ! command -v cwebp &> /dev/null && ! command -v magick &> /dev/null; then
        echo "❌ Erreur: cwebp ou ImageMagick requis"
        echo "Installation: brew install webp imagemagick"
        exit 1
    fi
    
    processed=0
    errors=0
    
    while IFS= read -r image_file; do
        if [ -f "$image_file" ]; then
            filename=$(basename "$image_file")
            placeholder_file="$PLACEHOLDER_DIR/$filename"
            
            # Utiliser cwebp si disponible, sinon ImageMagick
            if command -v cwebp &> /dev/null; then
                # Pour cwebp, on calcule les dimensions à 50%
                width=$(magick identify -format "%w" "$image_file")
                height=$(magick identify -format "%h" "$image_file")
                new_width=$((width * SCALE / 100))
                new_height=$((height * SCALE / 100))
                cwebp -q $QUALITY -resize $new_width $new_height "$image_file" -o "$placeholder_file" 2>/dev/null
            else
                magick "$image_file" -resize ${SCALE}% -quality $QUALITY "$placeholder_file" 2>/dev/null
            fi
            
            if [ $? -eq 0 ]; then
                echo "$image_file → $placeholder_file"
                ((processed++))
            else
                echo "❌ Erreur avec $filename"
                ((errors++))
            fi
        fi
    done < "$IMG_LIST"
    
    echo "✅ Génération terminée."
    echo "📊 Images traitées: $processed, Erreurs: $errors"
}

# Affiche les statistiques de taille
show_stats() {
    echo "📊 Statistiques de compression..."
    
    if [ ! -d "$PLACEHOLDER_DIR" ]; then
        echo "❌ Dossier placeholder introuvable"
        return
    fi
    
    original_size=$(du -sh "$SOURCE_DIR" 2>/dev/null | cut -f1)
    placeholder_size=$(du -sh "$PLACEHOLDER_DIR" 2>/dev/null | cut -f1)
    
    echo "   • Dossier original: $original_size"
    echo "   • Dossier placeholder: $placeholder_size"
    echo "   • Qualité: $QUALITY%"
    echo "   • Redimensionnement: $SCALE%"
}

# Pipeline complet : trouve → crée dossier → génère → statistiques → supprime (si flag) → nettoie
auto_blur() {
    find_images
    create_directory
    generate_blur
    show_stats
    if [ "$DELETE_ORIGINALS" = true ]; then
        echo "🗑️ Suppression des fichiers originaux..."
        while IFS= read -r f; do
            if [ -f "$f" ]; then
                rm "$f"
            fi
        done < "$IMG_LIST"
        echo "🧹 Nettoyage terminé."
    fi
    rm -f "$IMG_LIST"  # Nettoyage des fichiers temporaires
    echo "🎉 Auto-génération terminée !"
}

# === MAIN ===

# Démarrer le pipeline automatiquement
auto_blur