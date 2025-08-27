#!/bin/bash

# === CONFIGURATION ===
TARGET_DIR="./public/illustration"
IMG_EXTENSIONS=("jpg" "jpeg" "png")
QUALITY=50

# === VARIABLES INTERNES ===
IMG_LIST=".image_list.txt"
IMG_RAW=".image_paths.txt"

# === FONCTIONS ===

# Recherche toutes les images dans le dossier cible et sauvegarde la liste
find_images() {
    echo "🔍 Recherche des images dans $TARGET_DIR..."
    
    # Construire dynamiquement la commande find pour toutes les extensions supportées
    find_cmd="find $TARGET_DIR"
    for ext in "${IMG_EXTENSIONS[@]}"; do
        find_cmd="$find_cmd -iname '*.$ext' -o"
    done
    find_cmd="${find_cmd% -o} -type f"
    
    eval "$find_cmd" > "$IMG_RAW"
    echo "🧾 $(wc -l < "$IMG_RAW") image(s) trouvée(s)."
}

# Convertit chaque image trouvée en WebP avec compression (garde la résolution originale)
compress_images() {
    echo "🛠️ Compression en cours..."
    while IFS= read -r f; do
        out="${f%.*}.webp"  # Remplace l'extension par .webp
        magick "$f" -quality $QUALITY "$out"  # Conversion WebP avec compression
    done < "$IMG_RAW"
    echo "✅ Compression terminée."
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
        out="${f%.*}.webp"
        size_before=$(stat -f%z "$f" 2>/dev/null || echo 0)    # Taille fichier original
        size_after=$(stat -f%z "$out" 2>/dev/null || echo 0)  # Taille fichier WebP
        
        if [ "$size_before" -gt 0 ]; then
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

# Pipeline complet : trouve → compresse → statistiques → supprime → nettoie
auto_compress() {
    find_images
    compress_images
    show_stats
    remove_originals
    rm -f "$IMG_RAW" "$IMG_LIST"  # Nettoyage des fichiers temporaires
    echo "🎉 Auto-compression terminée !"
}

# === MAIN ===

case "$1" in
    find)
        find_images
        ;;
    compress)
        compress_images
        ;;
    remove)
        remove_originals
        ;;
    stats)
        show_stats
        ;;
    auto)
        auto_compress
        ;;
    *)
        echo "Usage: $0 {find|compress|remove|stats|auto}"
        echo ""
        echo "  find     - Recherche des images dans $TARGET_DIR"
        echo "  compress - Compresse les images trouvées en WebP"
        echo "  remove   - Supprime les fichiers originaux"
        echo "  stats    - Affiche les statistiques de compression"
        echo "  auto     - Pipeline complet (find → compress → stats → remove)"
        exit 1
        ;;
esac