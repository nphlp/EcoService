#!/bin/bash

# === CONFIGURATION ===
SOURCE_DIR="./public/illustration"
BLUR_DIR="./public/illustration-blur"
BLUR_QUALITY=5  # Qualité très basse pour des placeholders
BLUR_SCALE=50   # Réduire à 50% de la taille originale

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
    mkdir -p "$BLUR_DIR"
    echo "✅ Dossier $BLUR_DIR créé"
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
            blur_file="$BLUR_DIR/$filename"
            
            # Utiliser cwebp si disponible, sinon ImageMagick
            if command -v cwebp &> /dev/null; then
                cwebp -q $BLUR_QUALITY -resize 0 $BLUR_SCALE "$image_file" -o "$blur_file" 2>/dev/null
            else
                magick "$image_file" -resize ${BLUR_SCALE}% -blur 0x8 -quality $BLUR_QUALITY "$blur_file" 2>/dev/null
            fi
            
            if [ $? -eq 0 ]; then
                echo "$image_file → $blur_file"
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
    
    if [ ! -d "$BLUR_DIR" ]; then
        echo "❌ Dossier blur introuvable"
        return
    fi
    
    original_size=$(du -sh "$SOURCE_DIR" 2>/dev/null | cut -f1)
    blur_size=$(du -sh "$BLUR_DIR" 2>/dev/null | cut -f1)
    
    echo "   • Dossier original: $original_size"
    echo "   • Dossier blur: $blur_size"
    echo "   • Qualité: $BLUR_QUALITY%"
    echo "   • Redimensionnement: $BLUR_SCALE%"
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