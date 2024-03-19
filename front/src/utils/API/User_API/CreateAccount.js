import axios from 'axios';

export const CreateAccount = async (API, formValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(API, formValue, config);
    console.log(response.data.message);
    return true;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
    }
    return false;
  }
};
