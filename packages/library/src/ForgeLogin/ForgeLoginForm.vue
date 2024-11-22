<template>
  <form 
    :class="[ 
      'forge-login-form', 
      variant === 'primary' ? 'bootstrap-form' : 'default-form'
    ]" 
    @submit.prevent="handleSubmit"
  >
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

    <button 
      type="submit" 
      :class="getButtonClass"
      :disabled="!isFormValid"
    >
      Se connecter
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
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface TouchedFields {
  email: boolean;
  password: boolean;
}

const formData = ref<FormData>({
  email: '',
  password: ''
});

const errors = ref<FormErrors>({});
const touchedFields = ref<TouchedFields>({
  email: false,
  password: false
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

// Form validation
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

watch(() => formData.value.password, (newPassword) => {
  if (!touchedFields.value.password) return;
  
  if (!newPassword) {
    errors.value.password = 'Le mot de passe est requis';
  } else {
    delete errors.value.password;
  }
});

const isFormValid = computed(() => {
  return formData.value.email && formData.value.password && Object.keys(errors.value).length === 0;
});

const handleSubmit = () => {
  if (isFormValid.value) {
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

</style>
