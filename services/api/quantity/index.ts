/**
 * Point d'entrée pour les API de quantity
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getQuantityCount } from './count';
import { GET as getQuantityList } from './list';
import { GET as getQuantityUnique } from './unique';

export {
    getQuantityCount,
    getQuantityList,
    getQuantityUnique
};
