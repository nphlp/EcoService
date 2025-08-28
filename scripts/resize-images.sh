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
    echo "  source   - Dossier source contenant les images à redimensionner"
    echo "  target   - Dossier de destination (optionnel)"
    echo "             Par défaut: {source}-resized"
    echo "  --delete - Supprime les images originales après traitement"
    echo ""
    echo "Exemples:"
    echo "  $0 ./public/images/uploads"
    echo "  $0 ./public/images/uploads ./public/images/articles"
    echo "  $0 ./public/images/uploads --delete"
    echo ""
    echo "Redimensionnement intelligent (max ${MAX_WIDTH}x${MAX_HEIGHT}px, ratios préservés)"
    exit 0
fi

# Si pas de dossier cible, générer automatiquement
if [ -z "$TARGET_DIR" ]; then
    TARGET_DIR="${SOURCE_DIR}-resized"
fi

IMG_EXTENSIONS=("jpg" "jpeg" "png" "webp")
MAX_WIDTH=2100
MAX_HEIGHT=1400

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

# Redimensionne les images selon la logique intelligente avec stats intégrées
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
    total_before=0
    total_after=0
    
    # Créer l'en-tête du fichier stats
    echo "Original;Resized;WidthBefore;HeightBefore;WidthAfter;HeightAfter;SizeBefore(Bytes);SizeAfter(Bytes)" > "$IMG_LIST"
    
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
            
            # Obtenir les dimensions et taille actuelles
            width=$(magick identify -format "%w" "$image_file" 2>/dev/null)
            height=$(magick identify -format "%h" "$image_file" 2>/dev/null)
            size_before=$(stat -f%z "$image_file" 2>/dev/null || echo 0)
            
            if [ -z "$width" ] || [ -z "$height" ]; then
                echo "❌ Impossible de lire les dimensions de $filename"
                ((errors++))
                continue
            fi
            
            # Calculer les ratios de dépassement
            width_ratio=$(echo "scale=6; $width / $MAX_WIDTH" | bc 2>/dev/null || echo "1")
            height_ratio=$(echo "scale=6; $height / $MAX_HEIGHT" | bc 2>/dev/null || echo "1")
            max_ratio=$(echo "if ($width_ratio > $height_ratio) $width_ratio else $height_ratio" | bc 2>/dev/null || echo "1")
            
            # Traitement selon dépassement
            if (( $(echo "$max_ratio <= 1" | bc -l) )); then
                cp "$image_file" "$resized_file"
                new_width=$width
                new_height=$height
            else
                new_width=$(echo "scale=0; $width / $max_ratio" | bc)
                new_height=$(echo "scale=0; $height / $max_ratio" | bc)
                magick "$image_file" -resize "${new_width}x${new_height}" "$resized_file" 2>/dev/null
                
                if [ $? -ne 0 ]; then
                    echo "❌ Erreur lors du redimensionnement de $filename"
                    ((errors++))
                    continue
                fi
            fi
            
            # Calculer stats immédiatement et affichage détaillé
            size_after=$(stat -f%z "$resized_file" 2>/dev/null || echo 0)
            if [ "$size_before" -gt 0 ] && [ "$size_after" -gt 0 ]; then
                # Calculs des ratios et affichage
                size_ratio=$((100 - (100 * size_after / size_before)))
                printf "%s: %dx%d -> %dx%d (-%d%%)\n" \
                    "$filename" "$width" "$height" "$new_width" "$new_height" "$size_ratio"
                
                printf "%s;%s;%s;%s;%s;%s;%d;%d\n" "$image_file" "$resized_file" "$width" "$height" "$new_width" "$new_height" "$size_before" "$size_after" >> "$IMG_LIST"
                total_before=$((total_before + size_before))
                total_after=$((total_after + size_after))
            fi
            
            ((processed++))
        fi
    done < "$IMG_RAW"
    
    # Affichage final
    echo "✅ Redimensionnement terminé."
    echo "📊 Images traitées: $processed, Ignorées: $skipped, Erreurs: $errors"
    
    # Stats globales
    if [ "$total_before" -gt 0 ]; then
        size_ratio=$((100 - (100 * total_after / total_before)))
        printf "📦 Optimisation globale : %'.0f → %'.0f bytes (-%d%%)\n" "$total_before" "$total_after" "$size_ratio"
    fi
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

# Pipeline complet : trouve → crée dossier → redimensionne+stats → supprime (si flag) → nettoie
auto_resize() {
    find_images
    create_target_dir
    resize_images  # Maintenant inclut les stats
    if [ "$DELETE_ORIGINALS" = true ]; then
        remove_originals
    fi
    rm -f "$IMG_RAW" "$IMG_LIST"  # Nettoyage des fichiers temporaires
    echo "🎉 Auto-redimensionnement terminé !"
}

# === MAIN ===

# Démarrer le pipeline automatiquement
auto_resize