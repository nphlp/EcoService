# Images traitement process

This folder is the default location for uploaded images before treatments:

## Resizing and Compression

1. Des images sont en attente de traiement dans `/public/images/uploads`
2. Resizing avec `/scripts/resize-images.sh`, output temporaire `/public/images/tmp`
3. Compression `/scripts/compress-images.sh`, output final vers `/public/images/processed`
4. Nettoyage des fichiers `uploads` et `tmp`
5. Les images sont à ranger par la suite dans les dossiers appropriés.

## Blur declination

1.  Des images `resized` and `compressed` sont rangées dans un dossier (ex: `/public/images/articles`)
2.  On génère les images réduites pour le "blur effect" `/scripts/blur-images.sh /public/images/articles`
3.  Un dossier `/public/images/articles/blur` est créé
