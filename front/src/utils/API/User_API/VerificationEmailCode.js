import axios from 'axios';

export const VerificationEmailCode = async (API, code) => {
  const formData = new FormData();
  formData.append('code', code);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(API, formData, config);
    if (Array.isArray(response.data) && response.data.length > 0) {
      const CodeValidation = response.data[0];
      console.log(CodeValidation);
      return CodeValidation;
    } else {
      return null; // Si la réponse ne contient pas de tableau ou si le tableau est vide
    }
  } catch (error) {
    return null; // En cas d'erreur lors de la requête API
  }
};
