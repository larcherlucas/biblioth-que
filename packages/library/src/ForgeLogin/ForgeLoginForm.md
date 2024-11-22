# ForgeSignupForm

Le composant ForgeLoginForm est un formulaire de connexion simple avec validation intégrée. Il permet de collecter les informations essentielles pour l'authentification d'un utilisateur tout en assurant la validité des données saisies.

## Propriétés

Le composant n'accepte pas de propriétés d'entrée.

## Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `submit`  | `FormData` | Émis lors de la soumission réussie du formulaire avec les données validées. |

## Interface FormData

```typescript
interface FormData {
  email: string;        // Adresse email
  password: string;     // Mot de passe
}
```

## Validation

Le formulaire effectue les validations suivantes :

- **Champs requis** : Tous les champs sont obligatoires
- **Email** : Doit être une adresse email valide
- **Mot de passe** : 
  - Minimum 8 caractères
- **Messages d'erreur** : Affichés sous chaque champ en cas d'erreur
- **Bouton de soumission** : Désactivé tant que le formulaire n'est pas valide

## Exemple d'utilisation

```vue
<template>
<ForgeLoginForm @submit="handleSubmit" />
</template>

<script setup lang="ts">
import ForgeLoginForm from './ForgeLoginForm.vue';

function handleSubmit(formData: FormData) {
  // Traiter les données du formulaire
  console.log('Données soumises :', formData);
}
</script>
```

## Style

Le formulaire est stylisé pour :
- S'adapter aux écrans mobiles et desktop (max-width: 400px)
- Afficher clairement les états d'erreur
- Fournir un retour visuel sur les interactions (focus, hover)
- Maintenir une hiérarchie visuelle claire avec les labels et messages d'erreur