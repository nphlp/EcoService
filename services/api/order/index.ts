/**
 * Point d'entrée pour les API de order
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getOrderCount } from './count';
import { GET as getOrderList } from './list';
import { GET as getOrderUnique } from './unique';

export {
    getOrderCount,
    getOrderList,
    getOrderUnique
};
