import { render, fireEvent } from '@testing-library/vue';
import ForgeSignupForm from './ForgeSignupForm.vue';

describe('ForgeSignupForm', () => {
  const validFormData = {
    lastname: 'Doe',
    firstname: 'John',
    email: 'john.doe@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  };

  it('renders all form fields', () => {
    const { getByLabelText } = render(ForgeSignupForm);
    
    expect(getByLabelText('Nom')).toBeDefined();
    expect(getByLabelText('Prénom')).toBeDefined();
    expect(getByLabelText('Email')).toBeDefined();
    expect(getByLabelText('Mot de passe')).toBeDefined();
    expect(getByLabelText('Confirmer le mot de passe')).toBeDefined();
  });

  it('validates required fields', async () => {
    const { getByText, queryByText } = render(ForgeSignupForm);
    const submitButton = getByText('S\'inscrire');

    await fireEvent.click(submitButton);

    expect(queryByText('Le nom est requis')).toBeDefined();
    expect(queryByText('Le prénom est requis')).toBeDefined();
    expect(queryByText('L\'email est requis')).toBeDefined();
    expect(queryByText('Le mot de passe est requis')).toBeDefined();
    expect(queryByText('La confirmation du mot de passe est requise')).toBeDefined();
  });

  it('validates email format', async () => {
    const { getByLabelText, queryByText } = render(ForgeSignupForm);
    const emailInput = getByLabelText('Email');

    await fireEvent.update(emailInput, 'invalid-email');
    await fireEvent.blur(emailInput);

    expect(queryByText('L\'email n\'est pas valide')).toBeDefined();
  });

  it('validates password length', async () => {
    const { getByLabelText, queryByText } = render(ForgeSignupForm);
    const passwordInput = getByLabelText('Mot de passe');

    await fireEvent.update(passwordInput, 'short');
    await fireEvent.blur(passwordInput);

    expect(queryByText('Le mot de passe doit contenir au moins 8 caractères')).toBeDefined();
  });

  it('validates password confirmation match', async () => {
    const { getByLabelText, queryByText } = render(ForgeSignupForm);
    const passwordInput = getByLabelText('Mot de passe');
    const confirmPasswordInput = getByLabelText('Confirmer le mot de passe');

    await fireEvent.update(passwordInput, 'password123');
    await fireEvent.update(confirmPasswordInput, 'different123');
    await fireEvent.blur(confirmPasswordInput);

    expect(queryByText('Les mots de passe ne correspondent pas')).toBeDefined();
  });

  it('emits submit event with form data when valid', async () => {
    const { getByLabelText, getByText, emitted } = render(ForgeSignupForm);

    // Remplir tous les champs avec des données valides
    await fireEvent.update(getByLabelText('Nom'), validFormData.lastname);
    await fireEvent.update(getByLabelText('Prénom'), validFormData.firstname);
    await fireEvent.update(getByLabelText('Email'), validFormData.email);
    await fireEvent.update(getByLabelText('Mot de passe'), validFormData.password);
    await fireEvent.update(getByLabelText('Confirmer le mot de passe'), validFormData.confirmPassword);

    // Soumettre le formulaire
    await fireEvent.click(getByText('S\'inscrire'));

    // Vérifier que l'événement submit a été émis avec les bonnes données
    expect(emitted()).toHaveProperty('submit');
    expect(emitted().submit[0][0]).toEqual(validFormData);
  });

  it('disables submit button when form is invalid', async () => {
    const { getByText } = render(ForgeSignupForm);
    const submitButton = getByText('S\'inscrire');

    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    const { getByText, getByLabelText } = render(ForgeSignupForm);
    const submitButton = getByText('S\'inscrire');

    // Remplir tous les champs avec des données valides
    await fireEvent.update(getByLabelText('Nom'), validFormData.lastname);
    await fireEvent.update(getByLabelText('Prénom'), validFormData.firstname);
    await fireEvent.update(getByLabelText('Email'), validFormData.email);
    await fireEvent.update(getByLabelText('Mot de passe'), validFormData.password);
    await fireEvent.update(getByLabelText('Confirmer le mot de passe'), validFormData.confirmPassword);

    expect(submitButton).not.toBeDisabled();
  });
});