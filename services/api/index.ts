/**
 * Point d'entrée pour toutes les API
 * 
 * Ce fichier exporte toutes les API, permettant de les importer
 * depuis "@services/api" plutôt que depuis leurs dossiers individuels.
 * 
 * À mesure que de nouvelles API sont ajoutées, elles doivent être exportées ici.
 */
export * from './account';
export * from './address';
export { getArticleCount, getArticleList, getArticleUnique } from './ArticleApi';
export * from './category';
export * from './content';
export * from './diy';
export * from './fruit';
export * from './order';
export * from './product';
export * from './quantity';
export * from './session';
export * from './user';
export * from './verification';

