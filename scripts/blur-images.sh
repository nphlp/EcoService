#!/bin/bash

# =============================================================================
# Blur Images Generator Script
# =============================================================================
# Ce script génère des versions floues (blur) de toutes les images
# du dossier public/illustration/ pour les utiliser comme placeholders
# dans Next.js avec la propriété placeholder="blur"
# =============================================================================

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SOURCE_DIR="./public/illustration"
BLUR_DIR="./public/illustration-blur"
BLUR_QUALITY=5  # Qualité très basse pour des placeholders
BLUR_SCALE=50   # Réduire à 50% de la taille originale

# Vérifier que ImageMagick ou cwebp est disponible
check_dependencies() {
    echo -e "${BLUE}🔍 Vérification des dépendances...${NC}"
    
    if ! command -v cwebp &> /dev/null && ! command -v convert &> /dev/null; then
        echo -e "${RED}❌ Erreur: cwebp (libwebp) ou ImageMagick requis${NC}"
        echo ""
        echo "Installation:"
        echo "  macOS: brew install webp imagemagick"
        echo "  Ubuntu: sudo apt-get install webp imagemagick"
        echo "  Alpine: apk add libwebp-tools imagemagick"
        exit 1
    fi
    
    if command -v cwebp &> /dev/null; then
        echo -e "${GREEN}✅ cwebp trouvé${NC}"
        TOOL="cwebp"
    elif command -v convert &> /dev/null; then
        echo -e "${GREEN}✅ ImageMagick trouvé${NC}"
        TOOL="imagemagick"
    fi
    echo ""
}

# Créer le dossier de destination
create_blur_directory() {
    echo -e "${BLUE}📁 Création du dossier de destination...${NC}"
    
    if [ -d "$BLUR_DIR" ]; then
        echo -e "${YELLOW}⚠️  Le dossier $BLUR_DIR existe déjà${NC}"
        read -p "Voulez-vous le supprimer et le recréer? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -rf "$BLUR_DIR"
            echo -e "${GREEN}🗑️  Dossier supprimé${NC}"
        else
            echo -e "${YELLOW}📂 Conservation du dossier existant${NC}"
        fi
    fi
    
    mkdir -p "$BLUR_DIR"
    echo -e "${GREEN}✅ Dossier $BLUR_DIR créé${NC}"
    echo ""
}

# Générer une image floue avec cwebp
generate_blur_cwebp() {
    local input_file="$1"
    local output_file="$2"
    local filename=$(basename "$input_file" .webp)
    
    # Utiliser cwebp pour créer une version floue et compressée
    cwebp -q $BLUR_QUALITY -resize 0 $BLUR_SCALE "$input_file" -o "$output_file" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅${NC} $filename → ${filename}-blur.webp"
        return 0
    else
        echo -e "${RED}❌${NC} Erreur avec $filename"
        return 1
    fi
}

# Générer une image floue avec ImageMagick
generate_blur_imagemagick() {
    local input_file="$1"
    local output_file="$2"
    local filename=$(basename "$input_file" .webp)
    
    # Utiliser ImageMagick pour créer une version floue et compressée
    convert "$input_file" \
        -resize ${BLUR_SCALE}% \
        -blur 0x8 \
        -quality $BLUR_QUALITY \
        "$output_file" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅${NC} $filename → ${filename}-blur.webp"
        return 0
    else
        echo -e "${RED}❌${NC} Erreur avec $filename"
        return 1
    fi
}

# Traiter toutes les images
process_images() {
    echo -e "${BLUE}🖼️  Génération des images floues...${NC}"
    
    if [ ! -d "$SOURCE_DIR" ]; then
        echo -e "${RED}❌ Erreur: Le dossier $SOURCE_DIR n'existe pas${NC}"
        exit 1
    fi
    
    # Compter les images
    total_images=$(find "$SOURCE_DIR" -name "*.webp" | wc -l)
    if [ $total_images -eq 0 ]; then
        echo -e "${YELLOW}⚠️  Aucune image .webp trouvée dans $SOURCE_DIR${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📊 $total_images image(s) à traiter${NC}"
    echo ""
    
    # Traiter chaque image
    processed=0
    errors=0
    
    for image_file in "$SOURCE_DIR"/*.webp; do
        if [ -f "$image_file" ]; then
            # Extraire le nom de fichier sans extension
            filename=$(basename "$image_file" .webp)
            
            # Créer le nom de fichier de sortie
            blur_file="$BLUR_DIR/${filename}-blur.webp"
            
            # Générer l'image floue selon l'outil disponible
            if [ "$TOOL" == "cwebp" ]; then
                if generate_blur_cwebp "$image_file" "$blur_file"; then
                    ((processed++))
                else
                    ((errors++))
                fi
            else
                if generate_blur_imagemagick "$image_file" "$blur_file"; then
                    ((processed++))
                else
                    ((errors++))
                fi
            fi
        fi
    done
    
    echo ""
    echo -e "${GREEN}🎉 Génération terminée!${NC}"
    echo -e "${BLUE}📊 Statistiques:${NC}"
    echo "   • Images traitées: $processed"
    echo "   • Erreurs: $errors"
    echo "   • Qualité: $BLUR_QUALITY%"
    echo "   • Redimensionnement: $BLUR_SCALE%"
}

# Calculer les statistiques de taille
show_stats() {
    if [ ! -d "$BLUR_DIR" ]; then
        return
    fi
    
    echo ""
    echo -e "${BLUE}📊 Statistiques de compression:${NC}"
    
    original_size=$(du -sh "$SOURCE_DIR" 2>/dev/null | cut -f1)
    blur_size=$(du -sh "$BLUR_DIR" 2>/dev/null | cut -f1)
    
    echo "   • Dossier original: $original_size"
    echo "   • Dossier blur: $blur_size"
}

# Générer un exemple d'utilisation React
generate_usage_example() {
    echo ""
    echo -e "${BLUE}💡 Exemple d'utilisation avec Next.js:${NC}"
    cat << 'EOF'

// Créer un helper pour obtenir l'URL de blur
const getBlurDataURL = (imagePath: string) => {
  const imageName = imagePath.split('/').pop()?.replace('.webp', '');
  return `/illustration-blur/${imageName}-blur.webp`;
};

// Utiliser dans votre composant
import Image from 'next/image';

<Image
  src="/illustration/3W-CTJ7Yz7w.webp"
  alt="Description"
  width={500}
  height={300}
  placeholder="blur"
  blurDataURL={getBlurDataURL("/illustration/3W-CTJ7Yz7w.webp")}
/>

EOF
}

# Main script
main() {
    echo -e "${BLUE}🎨 Générateur d'images floues pour Next.js${NC}"
    echo ""
    
    check_dependencies
    create_blur_directory
    process_images
    show_stats
    generate_usage_example
    
    echo -e "${GREEN}✨ Script terminé avec succès!${NC}"
}

# Vérifier si le script est exécuté directement
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi