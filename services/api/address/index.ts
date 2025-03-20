/**
 * Point d'entrée pour les API de address
 * 
 * Ce fichier importe les gestionnaires GET de chaque API avec des alias
 * pour éviter les conflits de noms, puis les réexporte.
 * 
 * Cette approche résout le problème d'ambiguïté qui se produirait si nous
 * utilisions "export *" car chaque fichier exporte une fonction nommée GET.
 */
import { GET as getAddressCount } from './count';
import { GET as getAddressList } from './list';
import { GET as getAddressUnique } from './unique';

export {
    getAddressCount,
    getAddressList,
    getAddressUnique
};
