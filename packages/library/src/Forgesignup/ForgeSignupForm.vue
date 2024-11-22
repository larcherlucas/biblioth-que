<template>
  <form 
    :class="[ 
      'forge-signup-form', 
      variant === 'primary' ? 'bootstrap-form' : 'default-form'
    ]" 
    @submit.prevent="handleSubmit"
  >
    <div :class="getFormGroupClass">
      <label :for="variant + '-lastname'" :class="getLabelClass">Nom</label>
      <input 
        :id="variant + '-lastname'"
        v-model="formData.lastname"
        type="text"
        :class="getInputClass(errors.lastname)"
        required
      />
      <span v-if="errors.lastname" :class="getErrorClass">{{ errors.lastname }}</span>
    </div>

    <div :class="getFormGroupClass">
      <label :for="variant + '-firstname'" :class="getLabelClass">Prénom</label>
      <input 
        :id="variant + '-firstname'"
        v-model="formData.firstname"
        type="text"
        :class="getInputClass(errors.firstname)"
        required
      />
      <span v-if="errors.firstname" :class="getErrorClass">{{ errors.firstname }}</span>
    </div>

    <div :class="getFormGroupClass">
      <label :for="variant + '-email'" :class="getLabelClass">Email</label>
      <input 
        :id="variant + '-email'"
        v-model="formData.email"
        type="email"
        :class="getInputClass(errors.email)"
        @blur="touchField('email')"
        required
      />
      <span v-if="errors.email" :class="getErrorClass">{{ errors.email }}</span>
    </div>

    <div :class="getFormGroupClass">
      <label :for="variant + '-password'" :class="getLabelClass">Mot de passe</label>
      <input 
        :id="variant + '-password'"
        v-model="formData.password"
        type="password"
        :class="getInputClass(errors.password)"
        @blur="touchField('password')"
        required
      />
      <span v-if="errors.password" :class="getErrorClass">{{ errors.password }}</span>
    </div>

    <div :class="getFormGroupClass">
      <label :for="variant + '-confirmPassword'" :class="getLabelClass">Confirmer le mot de passe</label>
      <input 
        :id="variant + '-confirmPassword'"
        v-model="formData.confirmPassword"
        type="password"
        :class="getInputClass(errors.confirmPassword)"
        @blur="touchField('confirmPassword')"
        required
      />
      <span v-if="errors.confirmPassword" :class="getErrorClass">{{ errors.confirmPassword }}</span>
    </div>

    <button 
      type="submit" 
      :class="getButtonClass"
      :disabled="!isFormValid"
    >
      S'inscrire
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';


type FormVariant = 'default' | 'primary';

interface Props {
  variant?: FormVariant;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
});

interface FormData {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  lastname?: string;
  firstname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const formData = ref<FormData>({
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = ref<FormErrors>({});
const touchedFields = ref<TouchedFields>({
  email: false,
  password: false,
  confirmPassword: false
});

// Computed classes based on variant
const getFormGroupClass = computed(() => ({
  'form-group': true,
  'mb-3': props.variant === 'primary'
}));

const getLabelClass = computed(() => ({
  'form-label': props.variant === 'primary'
}));

const getErrorClass = computed(() => ({
  'error-message': props.variant === 'default',
  'invalid-feedback d-block': props.variant === 'primary'
}));

const getButtonClass = computed(() => ({
  'submit-button': props.variant === 'default',
  'btn btn-primary w-100': props.variant === 'primary'
}));

const getInputClass = (error?: string) => {
  if (props.variant === 'primary') {
    return {
      'form-control': true,
      'is-invalid': error
    };
  }
  return {
    'default-input': true,
    'error': error
  };
};

// Rest of the existing script logic remains the same
const touchField = (fieldName: keyof TouchedFields) => {
  touchedFields.value[fieldName] = true;
};

watch(() => formData.value.email, (newEmail) => {
  if (!touchedFields.value.email) return;
  
  if (!newEmail) {
    errors.value.email = 'L\'email est requis';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    errors.value.email = 'L\'email n\'est pas valide';
  } else {
    delete errors.value.email;
  }
});

watch([() => formData.value.password, () => formData.value.confirmPassword], 
  ([newPassword, newConfirmPassword]) => {
    if (touchedFields.value.password && newPassword) {
      if (newPassword.length < 8) {
        errors.value.password = 'Le mot de passe doit contenir au moins 8 caractères';
      } else {
        delete errors.value.password;
      }
    }

    if (touchedFields.value.confirmPassword && newConfirmPassword) {
      if (newPassword !== newConfirmPassword) {
        errors.value.confirmPassword = 'Les mots de passe ne correspondent pas';
      } else {
        delete errors.value.confirmPassword;
      }
    }
  }
);

const isFormValid = computed(() => {
  return (
    formData.value.lastname &&
    formData.value.firstname &&
    formData.value.email &&
    formData.value.password &&
    formData.value.confirmPassword &&
    Object.keys(errors.value).length === 0
  );
});

const validateForm = (): boolean => {
  Object.keys(touchedFields.value).forEach(field => {
    touchedFields.value[field as keyof TouchedFields] = true;
  });

  errors.value = {};

  if (!formData.value.lastname) {
    errors.value.lastname = 'Le nom est requis';
  }

  if (!formData.value.firstname) {
    errors.value.firstname = 'Le prénom est requis';
  }

  if (!formData.value.email) {
    errors.value.email = 'L\'email est requis';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'L\'email n\'est pas valide';
  }

  if (!formData.value.password) {
    errors.value.password = 'Le mot de passe est requis';
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'Le mot de passe doit contenir au moins 8 caractères';
  }

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'La confirmation du mot de passe est requise';
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', formData.value);
  }
};

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
}>();
</script>

<style scoped>
/* Default form styles */
.default-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.default-form .form-group {
  margin-bottom: 1rem;
}

.default-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.default-form .default-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.default-form .default-input:focus {
  outline: none;
  border-color: #007bff;
}

.default-form .default-input.error {
  border-color: #dc3545;
}

.default-form .error-message {
  display: block;
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.default-form .submit-button {
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.default-form .submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.default-form .submit-button:hover:not(:disabled) {
  background-color: #0056b3;
}

/* Bootstrap form styles */
/* Style général du formulaire */
.bootstrap-form {
  max-width: 450px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  font-family: 'Arial', sans-serif;
}

/* Style des labels */
.bootstrap-form .form-label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

/* Style des champs de saisie */
.bootstrap-form .form-control {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Effet de focus sur les champs de saisie */
.bootstrap-form .form-control:focus {
  border-color: #007bff;
  background-color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  outline: none;
}

/* Style du bouton principal */
.bootstrap-form .btn-primary {
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Effet de survol du bouton */
.bootstrap-form .btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

/* Style pour le bouton secondaire (ex: annuler ou retour) */
.bootstrap-form .btn-secondary {
  width: 100%;
  padding: 14px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Effet de survol pour le bouton secondaire */
.bootstrap-form .btn-secondary:hover {
  background-color: #e0e0e0;
}

/* Ajout d'un espacement entre les champs */
.bootstrap-form .form-group {
  margin-bottom: 20px;
}

/* Séparateur ou ligne horizontale */
.bootstrap-form .form-separator {
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
}

/* Style des liens */
.bootstrap-form .form-link {
  text-align: center;
  display: block;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
}

.bootstrap-form .form-link:hover {
  text-decoration: underline;
}

</style>