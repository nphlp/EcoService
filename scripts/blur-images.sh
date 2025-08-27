#!/bin/bash

# === CONFIGURATION ===
SOURCE_DIR="./public/illustration"
PLACEHOLDER_DIR="./public/illustration-blur"
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

# Pipeline complet : trouve → crée dossier → génère → statistiques → nettoie
auto_blur() {
    find_images
    create_directory
    generate_blur
    show_stats
    rm -f "$IMG_LIST"  # Nettoyage des fichiers temporaires
    echo "🎉 Auto-génération terminée !"
}

# === MAIN ===

case "$1" in
    find)
        find_images
        ;;
    create)
        create_directory
        ;;
    generate)
        generate_blur
        ;;
    stats)
        show_stats
        ;;
    auto)
        auto_blur
        ;;
    *)
        echo "Usage: $0 {find|create|generate|stats|auto}"
        echo ""
        echo "  find     - Recherche des images dans $SOURCE_DIR"
        echo "  create   - Crée le dossier de destination"
        echo "  generate - Génère les images floues"
        echo "  stats    - Affiche les statistiques"
        echo "  auto     - Pipeline complet (find → create → generate → stats)"
        exit 1
        ;;
esac