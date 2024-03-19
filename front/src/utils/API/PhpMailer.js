import axios from 'axios';
import { API_PATH } from '../../constants/API_ROUTES';

export const PhpMailer = async (API, email) => {
  const formData = new FormData();
  formData.append('email', email);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(API, formData, config);
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
    }
    return false;
  }
};
