/**
 * Point d'entrée pour les API de content
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getContentCount } from './count';
import { GET as getContentList } from './list';
import { GET as getContentUnique } from './unique';

export {
    getContentCount,
    getContentList,
    getContentUnique
};
