# Politique RGPD - Conservation des données

Ce document décrit la politique de conservation des données personnelles recommandée pour EcoService, en conformité avec le RGPD et les obligations légales françaises.

## Principes généraux

Le RGPD impose que les données soient conservées **uniquement le temps nécessaire** à la finalité pour laquelle elles ont été collectées. Certaines obligations légales (fiscales, comptables) imposent des durées minimales de conservation.

## Durées de conservation par type de données

### Données personnelles utilisateurs

| Type de données            | Durée de conservation             | Base légale                     |
| -------------------------- | --------------------------------- | ------------------------------- |
| Compte utilisateur actif   | Durée de la relation              | RGPD Art. 5                     |
| Compte utilisateur inactif | **2 ans** après dernière activité | Recommandation CNIL (max 3 ans) |
| Prospects (sans compte)    | **2 ans** après dernier contact   | Recommandation CNIL             |

### Données de facturation

| Type de données   | Durée de conservation | Base légale                     |
| ----------------- | --------------------- | ------------------------------- |
| Factures          | **10 ans**            | Code de commerce (Art. L123-22) |
| Pièces comptables | **10 ans**            | Code de commerce                |
| Documents fiscaux | **6 ans**             | Livre des procédures fiscales   |

### Données techniques

| Type de données    | Durée de conservation | Base légale                  |
| ------------------ | --------------------- | ---------------------------- |
| Cookies de session | Durée de la session   | RGPD                         |
| Cookies analytics  | **13 mois** max       | Recommandation CNIL          |
| Logs de connexion  | **1 an**              | Obligation légale hébergeurs |
| Logs de sécurité   | **6 mois à 1 an**     | Intérêt légitime             |

### Consentements

| Type de données                    | Durée de conservation | Base légale             |
| ---------------------------------- | --------------------- | ----------------------- |
| Preuves de consentement RGPD       | **5 ans**             | Prescription civile     |
| Historique des préférences cookies | **5 ans**             | Preuve en cas de litige |

## Définition de l'inactivité

Un utilisateur est considéré comme **inactif** en l'absence de :

- Connexion au compte
- Achat ou commande
- Interaction avec les emails (clic, ouverture)
- Visite authentifiée sur le site

## Processus de suppression des comptes inactifs

### Chronologie recommandée

```
Inactivité 18 mois → Email de rappel "Votre compte sera supprimé dans 6 mois"
Inactivité 21 mois → Email de relance finale "Dernière chance"
Inactivité 24 mois → Anonymisation/suppression du compte
```

### Données à anonymiser (dans notre BDD)

- Email → `null` ou hash anonyme
- Nom/Prénom → "Utilisateur supprimé"
- Adresse → `null`
- Téléphone → `null`
- Toute donnée permettant l'identification

### Données à conserver (référence Stripe)

- `stripe_customer_id` → Conservé pour accès aux factures
- IDs des commandes → Conservés pour traçabilité comptable

## Délégation à Stripe

Les données de facturation sont conservées par **Stripe** (sous-traitant RGPD) :

- Stripe conserve les factures et preuves de paiement pendant **10 ans**
- Stripe est certifié conforme RGPD
- Les factures restent accessibles via l'API Stripe en cas de contrôle fiscal

### Architecture de conservation

```
┌─────────────────────────────────────────┐
│           Notre base de données         │
├─────────────────────────────────────────┤
│  Après 2 ans d'inactivité :             │
│  - Données personnelles → SUPPRIMÉES    │
│  - stripe_customer_id → CONSERVÉ        │
│  - Historique commandes → ANONYMISÉ     │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│              Stripe                     │
├─────────────────────────────────────────┤
│  Conservation 10 ans :                  │
│  - Factures complètes                   │
│  - Preuves de paiement                  │
│  - Données fiscales                     │
└─────────────────────────────────────────┘
```

## Suppression de compte à la demande

Lorsqu'un utilisateur demande la suppression de son compte :

| Action                                   | Délai          | Données concernées        |
| ---------------------------------------- | -------------- | ------------------------- |
| Suppression des données personnelles     | **1 mois max** | Email, nom, adresse, etc. |
| Conservation des factures                | **10 ans**     | Via Stripe uniquement     |
| Conservation des preuves de consentement | **5 ans**      | Anonymisées               |

## Mentions obligatoires (politique de confidentialité)

La politique de confidentialité doit mentionner :

1. **Durées de conservation** pour chaque type de données
2. **Sous-traitants** (Stripe pour les paiements)
3. **Droits des utilisateurs** (accès, rectification, suppression, portabilité)
4. **Contact DPO** ou responsable RGPD

### Exemple de mention pour Stripe

> Les données de facturation sont conservées par notre prestataire de paiement Stripe Inc. pendant une durée de 10 ans, conformément aux obligations légales comptables et fiscales françaises.

## Implémentation technique recommandée

### Champs à ajouter au modèle User

```prisma
model User {
  // ... champs existants
  lastActivityAt    DateTime  @default(now())  // Dernière activité
  deletionNoticedAt DateTime?                  // Date d'envoi du 1er email
  anonymizedAt      DateTime?                  // Date d'anonymisation
}
```

### Tâche CRON recommandée

- **Quotidienne** : Mettre à jour `lastActivityAt` sur connexion/achat
- **Hebdomadaire** : Identifier les comptes à 18 mois d'inactivité → envoyer email
- **Hebdomadaire** : Identifier les comptes à 24 mois → anonymiser

## Références légales

- **RGPD** : Règlement (UE) 2016/679, Article 5 (limitation de conservation)
- **Code de commerce** : Article L123-22 (conservation 10 ans des pièces comptables)
- **Livre des procédures fiscales** : Article L102 B (conservation 6 ans pour contrôle fiscal)
- **CNIL** : Recommandations sur les durées de conservation (3 ans max pour prospects/clients inactifs)

---

_Document créé le 25/01/2025 - À mettre à jour selon l'évolution de la réglementation._
