import axios from 'axios';

export const DeleteArticle = async (API, formValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    console.log(formValue);
    const response = await axios.post(API, formValue, config);
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
