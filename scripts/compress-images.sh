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
    echo "  source   - Dossier source contenant les images à comprimer"
    echo "  target   - Dossier de destination (optionnel)"
    echo "             Par défaut: {source}-compressed"
    echo "  --delete - Supprime les images originales après traitement"
    echo ""
    echo "Exemples:"
    echo "  $0 ./public/images/uploads-resized"
    echo "  $0 ./public/images/uploads-resized ./public/images/articles"
    echo "  $0 ./public/images/uploads-resized --delete"
    echo ""
    echo "Compression WebP (qualité ${QUALITY}%, conversion automatique en .webp)"
    exit 0
fi

# Si pas de dossier cible, générer automatiquement
if [ -z "$TARGET_DIR" ]; then
    TARGET_DIR="${SOURCE_DIR}-compressed"
fi

IMG_EXTENSIONS=("jpg" "jpeg" "png" "webp")
QUALITY=50

# === VARIABLES INTERNES ===
IMG_LIST=".image_list.txt"
IMG_RAW=".image_paths.txt"

# === FONCTIONS ===

# Recherche toutes les images dans le dossier source et sauvegarde la liste
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

# Convertit chaque image trouvée en WebP avec compression et stats intégrées
compress_images() {
    echo "🛠️ Compression en cours..."
    
    processed=0
    errors=0
    skipped=0
    total_before=0
    total_after=0
    
    # Créer l'en-tête du fichier stats
    echo "Original;WebP;SizeBefore(Bytes);SizeAfter(Bytes);Compression(%)" > "$IMG_LIST"
    
    while IFS= read -r f; do
        if [ -f "$f" ]; then
            filename=$(basename "$f")
            out="$TARGET_DIR/${filename%.*}.webp"  # Sauvegarde dans TARGET_DIR avec extension .webp
            
            # Vérifier si le fichier WebP existe déjà
            if [ -f "$out" ]; then
                echo "⚠️  $out existe déjà, ignoré"
                ((skipped++))
                continue
            fi
            
            # Obtenir la taille avant compression
            size_before=$(stat -f%z "$f" 2>/dev/null || echo 0)
            
            # Compression WebP
            magick "$f" -quality $QUALITY "$out" 2>/dev/null
            
            if [ $? -eq 0 ]; then
                # Calculer stats immédiatement et affichage détaillé
                size_after=$(stat -f%z "$out" 2>/dev/null || echo 0)
                if [ "$size_before" -gt 0 ] && [ "$size_after" -gt 0 ]; then
                    ratio=$((100 - (100 * size_after / size_before)))
                    
                    # Formatage des tailles en Ko
                    size_before_kb=$(echo "scale=0; $size_before / 1024" | bc 2>/dev/null || echo "0")
                    size_after_kb=$(echo "scale=0; $size_after / 1024" | bc 2>/dev/null || echo "0")
                    
                    # Affichage simplifié : poids et pourcentage
                    printf "%s: %dKo -> %dKo (-%d%%)\n" \
                        "$filename" "$size_before_kb" "$size_after_kb" "$ratio"
                    
                    printf "%s;%s;%d;%d;-%d%%\n" "$f" "$out" "$size_before" "$size_after" "$ratio" >> "$IMG_LIST"
                    total_before=$((total_before + size_before))
                    total_after=$((total_after + size_after))
                fi
                
                ((processed++))
            else
                echo "❌ Erreur avec $filename"
                ((errors++))
            fi
        fi
    done < "$IMG_RAW"
    
    # Affichage final
    echo "✅ Compression terminée."
    echo "📊 Images traitées: $processed, Ignorées: $skipped, Erreurs: $errors"
    
    # Stats globales
    if [ "$total_before" -gt 0 ]; then
        total_ratio=$((100 - (100 * total_after / total_before)))
        printf "📦 Compression globale : %'.0f → %'.0f bytes (-%d%%)\n" "$total_before" "$total_after" "$total_ratio"
    fi
}

# Supprime les fichiers d'origine après compression
remove_originals() {
    echo "🗑️ Suppression des fichiers originaux..."
    while IFS= read -r f; do
        rm "$f"
    done < "$IMG_RAW"
    echo "🧹 Nettoyage terminé."
}

# Calcule et affiche les statistiques de compression (taille avant/après, pourcentages)
show_stats() {
    echo "📊 Statistiques de compression..."
    echo "Original;WebP;SizeBefore(Bytes);SizeAfter(Bytes);Compression(%)" > "$IMG_LIST"
    
    total_before=0  # Taille totale avant compression
    total_after=0   # Taille totale après compression
    
    while IFS= read -r f; do
        filename=$(basename "$f")
        out="$TARGET_DIR/${filename%.*}.webp"
        size_before=$(stat -f%z "$f" 2>/dev/null || echo 0)    # Taille fichier original
        size_after=$(stat -f%z "$out" 2>/dev/null || echo 0)  # Taille fichier WebP
        
        if [ "$size_before" -gt 0 ] && [ "$size_after" -gt 0 ]; then
            ratio=$((100 - (100 * size_after / size_before)))  # Calcul du pourcentage de compression
            printf "%s;%s;%d;%d;-%d%%\n" "$f" "$out" "$size_before" "$size_after" "$ratio" >> "$IMG_LIST"
            echo "$f → $out : -$ratio%"
            total_before=$((total_before + size_before))
            total_after=$((total_after + size_after))
        fi
    done < "$IMG_RAW"
    
    if [ "$total_before" -gt 0 ]; then
        total_ratio=$((100 - (100 * total_after / total_before)))
        printf "📦 Compression globale : %'.0f → %'.0f bytes (-%d%%)\n" "$total_before" "$total_after" "$total_ratio"
    else
        echo "📦 Aucune donnée mesurable pour la compression globale."
    fi
}

# Pipeline complet : trouve → crée dossier → compresse+stats → supprime (si flag) → nettoie
auto_compress() {
    find_images
    create_target_dir
    compress_images  # Maintenant inclut les stats
    if [ "$DELETE_ORIGINALS" = true ]; then
        remove_originals
    fi
    rm -f "$IMG_RAW" "$IMG_LIST"  # Nettoyage des fichiers temporaires
    echo "🎉 Auto-compression terminée !"
}

# === MAIN ===

# Démarrer le pipeline automatiquement
auto_compress