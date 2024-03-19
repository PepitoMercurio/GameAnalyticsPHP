import axios from 'axios';

export const NewArticleInsert = async (API, formValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = axios.post(API, formValue, config);
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
