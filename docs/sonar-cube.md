# Sonar Cube

## Installer

Lancer le sonar cube en local :

```bash
docker compose -f compose.sonar.yml up -d
```

## Configurer

Aller sur l'interface web de sonar cube : [http://localhost:9001](http://localhost:9001)

1. Se connecter avec user/password : `admin/admin`
2. Créer un projet (manually)
3. Selectionner un projet (locally)
4. Générer le token et continuer
5. Run analysis: sélectionner "other" et "linux"
6. Copier la commande fournie par Sonar Cube

## Analyser

Trouver le nom du conteneur Sonar Scanner :

```bash
docker ps | grep sonar_scanner
```

Entrer dans le conteneur Sonar Scanner et accéder au dossier qui contient la code base :

```sh
docker exec -it **NOM DU CONTENEUR SONAR SCANNER** bash //
cd /usr/src/
```

Executez la commande en modifiant la ligne précisée :

```sh
sonar-scanner \
  -Dsonar.projectKey=eco-service \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://sonarqube:9000 \ # Modifier cette ligne
  -Dsonar.login= **TOKEN FOURNI PAR SONAR CUBE** \
  -Dsonar.inclusions=**/*.ts,**/*.tsx,**/*.js,**/*.jsx \ # Ajouter cette ligne
  -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/*.min.js # Ajouter cette ligne
```

Exemple de commande :

```sh
sonar-scanner \
  -Dsonar.projectKey=eco-service \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://sonarqube:9000 \
  -Dsonar.login=sqp_11e1f48f624997083210c13aaff009a77a56fb58 \
  -Dsonar.inclusions=**/*.ts,**/*.tsx,**/*.js,**/*.jsx \
  -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/*.min.js
```
