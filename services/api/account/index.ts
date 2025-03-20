/**
 * Point d'entrée pour les API de account
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getAccountCount } from './count';
import { GET as getAccountList } from './list';
import { GET as getAccountUnique } from './unique';

export {
    getAccountCount,
    getAccountList,
    getAccountUnique
};
