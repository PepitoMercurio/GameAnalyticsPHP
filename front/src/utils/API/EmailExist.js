import axios from 'axios';
import { API_PATH } from '../../constants/API_ROUTES';

export const EmailExist = async (email) => {
  const formData = new FormData();
  formData.append('email', email);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(
      API_PATH.AUTHENTIFICATION.EMAIL_EXIST.PATH,
      formData,
      config
    );
    if (Array.isArray(response.data) && response.data.length > 0) {
      const emailExists = response.data[0];
      console.log(emailExists);
      return emailExists;
    } else {
      return null; // Si la réponse ne contient pas de tableau ou si le tableau est vide
    }
  } catch (error) {
    return null; // En cas d'erreur lors de la requête API
  }
};
