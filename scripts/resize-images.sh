#!/bin/bash

# === CONFIGURATION ===
SOURCE_DIR="./public/illustration-raw"
TARGET_DIR="./public/illustration-resized"
IMG_EXTENSIONS=("jpg" "jpeg" "png" "webp")
MAX_WIDTH=1200
MAX_HEIGHT=800

# === VARIABLES INTERNES ===
IMG_LIST=".resize_list.txt"
IMG_RAW=".resize_paths.txt"

# === FONCTIONS ===

# Recherche toutes les images dans le dossier source
find_images() {
    echo "🔍 Recherche des images dans $SOURCE_DIR..."
    
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "❌ Erreur: Le dossier $SOURCE_DIR n'existe pas"
        exit 1
    fi
    
    # Construire dynamiquement la commande find pour toutes les extensions supportées
    find_cmd="find $SOURCE_DIR"
    for ext in "${IMG_EXTENSIONS[@]}"; do
        find_cmd="$find_cmd -iname '*.$ext' -o"
    done
    find_cmd="${find_cmd% -o} -type f"
    
    eval "$find_cmd" > "$IMG_RAW"
    echo "🧾 $(wc -l < "$IMG_RAW") image(s) trouvée(s)."
}

# Crée le dossier de destination
create_target_dir() {
    if [ ! -d "$TARGET_DIR" ]; then
        echo "📁 Création du dossier de destination..."
        mkdir -p "$TARGET_DIR"
        echo "✅ Dossier $TARGET_DIR créé"
    fi
}

# Redimensionne les images selon la logique intelligente
resize_images() {
    echo "🛠️ Redimensionnement en cours..."
    
    # Vérifier les dépendances
    if ! command -v magick &> /dev/null; then
        echo "❌ Erreur: ImageMagick requis"
        echo "Installation: brew install imagemagick"
        exit 1
    fi
    
    processed=0
    errors=0
    skipped=0
    
    while IFS= read -r image_file; do
        if [ -f "$image_file" ]; then
            filename=$(basename "$image_file")
            resized_file="$TARGET_DIR/$filename"
            
            # Vérifier si le fichier redimensionné existe déjà
            if [ -f "$resized_file" ]; then
                echo "⚠️  $resized_file existe déjà, ignoré"
                ((skipped++))
                continue
            fi
            
            # Obtenir les dimensions actuelles
            width=$(magick identify -format "%w" "$image_file" 2>/dev/null)
            height=$(magick identify -format "%h" "$image_file" 2>/dev/null)
            
            if [ -z "$width" ] || [ -z "$height" ]; then
                echo "❌ Impossible de lire les dimensions de $filename"
                ((errors++))
                continue
            fi
            
            # Calculer les ratios de dépassement
            width_ratio=$(echo "scale=6; $width / $MAX_WIDTH" | bc 2>/dev/null || echo "1")
            height_ratio=$(echo "scale=6; $height / $MAX_HEIGHT" | bc 2>/dev/null || echo "1")
            
            # Prendre le plus grand ratio (côté qui dépasse le plus)
            max_ratio=$(echo "if ($width_ratio > $height_ratio) $width_ratio else $height_ratio" | bc 2>/dev/null || echo "1")
            
            # Si pas de dépassement, copier simplement
            if (( $(echo "$max_ratio <= 1" | bc -l) )); then
                cp "$image_file" "$resized_file"
                echo "$image_file → $resized_file (pas de redimensionnement nécessaire)"
                ((processed++))
            else
                # Calculer les nouvelles dimensions
                new_width=$(echo "scale=0; $width / $max_ratio" | bc)
                new_height=$(echo "scale=0; $height / $max_ratio" | bc)
                
                # Redimensionner l'image
                magick "$image_file" -resize "${new_width}x${new_height}" "$resized_file" 2>/dev/null
                
                if [ $? -eq 0 ]; then
                    echo "$image_file → $resized_file (${width}x${height} → ${new_width}x${new_height})"
                    ((processed++))
                else
                    echo "❌ Erreur lors du redimensionnement de $filename"
                    ((errors++))
                fi
            fi
        fi
    done < "$IMG_RAW"
    
    echo "✅ Redimensionnement terminé."
    echo "📊 Images traitées: $processed, Ignorées: $skipped, Erreurs: $errors"
}

# Supprime les fichiers originaux après redimensionnement
remove_originals() {
    echo "🗑️ Suppression des fichiers originaux..."
    while IFS= read -r f; do
        if [ -f "$f" ]; then
            rm "$f"
        fi
    done < "$IMG_RAW"
    echo "🧹 Nettoyage terminé."
}

# Affiche les statistiques de redimensionnement
show_stats() {
    echo "📊 Statistiques de redimensionnement..."
    
    if [ ! -d "$TARGET_DIR" ]; then
        echo "❌ Dossier de destination introuvable"
        return
    fi
    
    echo "Original;Resized;WidthBefore;HeightBefore;WidthAfter;HeightAfter;SizeBefore(Bytes);SizeAfter(Bytes)" > "$IMG_LIST"
    
    total_before=0
    total_after=0
    
    while IFS= read -r f; do
        filename=$(basename "$f")
        resized_file="$TARGET_DIR/$filename"
        
        if [ -f "$f" ] && [ -f "$resized_file" ]; then
            # Dimensions originales
            width_before=$(magick identify -format "%w" "$f" 2>/dev/null || echo "0")
            height_before=$(magick identify -format "%h" "$f" 2>/dev/null || echo "0")
            
            # Dimensions redimensionnées
            width_after=$(magick identify -format "%w" "$resized_file" 2>/dev/null || echo "0")
            height_after=$(magick identify -format "%h" "$resized_file" 2>/dev/null || echo "0")
            
            # Tailles en bytes
            size_before=$(stat -f%z "$f" 2>/dev/null || echo 0)
            size_after=$(stat -f%z "$resized_file" 2>/dev/null || echo 0)
            
            if [ "$size_before" -gt 0 ] && [ "$size_after" -gt 0 ]; then
                printf "%s;%s;%s;%s;%s;%s;%d;%d\n" "$f" "$resized_file" "$width_before" "$height_before" "$width_after" "$height_after" "$size_before" "$size_after" >> "$IMG_LIST"
                echo "$f → $resized_file (${width_before}x${height_before} → ${width_after}x${height_after})"
                total_before=$((total_before + size_before))
                total_after=$((total_after + size_after))
            fi
        fi
    done < "$IMG_RAW"
    
    if [ "$total_before" -gt 0 ]; then
        size_ratio=$((100 - (100 * total_after / total_before)))
        printf "📦 Optimisation globale : %'.0f → %'.0f bytes (-%d%%)\n" "$total_before" "$total_after" "$size_ratio"
    else
        echo "📦 Aucune donnée mesurable pour l'optimisation globale."
    fi
}

# Pipeline complet : trouve → crée dossier → redimensionne → statistiques → supprime → nettoie
auto_resize() {
    find_images
    create_target_dir
    resize_images
    show_stats
    remove_originals
    rm -f "$IMG_RAW" "$IMG_LIST"  # Nettoyage des fichiers temporaires
    echo "🎉 Auto-redimensionnement terminé !"
}

# === MAIN ===

case "$1" in
    find)
        find_images
        ;;
    create)
        create_target_dir
        ;;
    resize)
        resize_images
        ;;
    remove)
        remove_originals
        ;;
    stats)
        show_stats
        ;;
    auto)
        auto_resize
        ;;
    *)
        echo "Usage: $0 {find|create|resize|remove|stats|auto}"
        echo ""
        echo "  find     - Recherche des images dans $SOURCE_DIR"
        echo "  create   - Crée le dossier de destination"
        echo "  resize   - Redimensionne les images (max ${MAX_WIDTH}x${MAX_HEIGHT})"
        echo "  remove   - Supprime les fichiers originaux"
        echo "  stats    - Affiche les statistiques de redimensionnement"
        echo "  auto     - Pipeline complet (find → create → resize → stats → remove)"
        exit 1
        ;;
esac