import { render, fireEvent } from '@testing-library/vue';
import ForgeLoginForm from './ForgeLoginForm.vue';

describe('ForgeLoginForm', () => {
  const validFormData = {
    email: 'john.doe@example.com',
    password: 'password123',
  };

  it('renders all form fields', () => {
    const { getByLabelText } = render(ForgeLoginForm);
    
    expect(getByLabelText('Email')).toBeDefined();
    expect(getByLabelText('Mot de passe')).toBeDefined();
  });

  it('validates required fields', async () => {
    const { getByText, queryByText } = render(ForgeLoginForm);
    const submitButton = getByText('Se connecter');

    await fireEvent.click(submitButton);

    expect(queryByText('L\'email est requis')).toBeDefined();
    expect(queryByText('Le mot de passe est requis')).toBeDefined();
  });

  it('validates email format', async () => {
    const { getByLabelText, queryByText } = render(ForgeLoginForm);
    const emailInput = getByLabelText('Email');

    await fireEvent.update(emailInput, 'invalid-email');
    await fireEvent.blur(emailInput);

    expect(queryByText('L\'email n\'est pas valide')).toBeDefined();
  });

  it('validates password length', async () => {
    const { getByLabelText, queryByText } = render(ForgeLoginForm);
    const passwordInput = getByLabelText('Mot de passe');

    await fireEvent.update(passwordInput, 'short');
    await fireEvent.blur(passwordInput);

    expect(queryByText('Le mot de passe doit contenir au moins 8 caractères')).toBeDefined();
  });

  it('emits submit event with form data when valid', async () => {
    const { getByLabelText, getByText, emitted } = render(ForgeLoginForm);

    // Remplir tous les champs avec des données valides
    await fireEvent.update(getByLabelText('Email'), validFormData.email);
    await fireEvent.update(getByLabelText('Mot de passe'), validFormData.password);

    // Soumettre le formulaire
    await fireEvent.click(getByText('Se connecter'));

    // Vérifier que l'événement submit a été émis avec les bonnes données
    expect(emitted()).toHaveProperty('submit');
    expect(emitted().submit[0][0]).toEqual(validFormData);
  });

  it('disables submit button when form is invalid', async () => {
    const { getByText } = render(ForgeLoginForm);
    const submitButton = getByText('Se connecter');

    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    const { getByText, getByLabelText } = render(ForgeLoginForm);
    const submitButton = getByText('Se connecter');

    // Remplir tous les champs avec des données valides
    await fireEvent.update(getByLabelText('Email'), validFormData.email);
    await fireEvent.update(getByLabelText('Mot de passe'), validFormData.password);

    expect(submitButton).not.toBeDisabled();
  });
});
