/**
 * Point d'entrée pour les API de product
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getProductCount } from './count';
import { GET as getProductList } from './list';
import { GET as getProductUnique } from './unique';

export {
    getProductCount,
    getProductList,
    getProductUnique
};
