import axios from 'axios';

export const LoginAuthentification = async (API, formValue) => {
  const { email, password } = formValue;

  const data = new URLSearchParams();
  data.append('email', email);
  data.append('password', password);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(API, data, config);
    const { success: codeValidation, token, id } = response.data; // Utilisation de la déstructuration

    const finalValue = {
      success: codeValidation,
      token: token,
      id: id,
    };

    return finalValue;
  } catch (error) {
    return null; // En cas d'erreur lors de la requête API
  }
};
