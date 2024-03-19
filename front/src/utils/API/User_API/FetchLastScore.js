import axios from 'axios';

export const FetchLastScore = async (API) => {
  const formData = new FormData();
  const id = localStorage.getItem('id');
  formData.append('id_user', id);

  try {
    const response = await axios.post(API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      const { last_score } = response.data;

      return {
        success: true,
        lastScore: last_score,
      };
    } else {
      console.log('Request failed:', response);
      return {
        success: false,
        lastScore: null,
      };
    }
  } catch (error) {
    console.log('Error:', error);
    return {
      success: false,
      lastScore: null,
    };
  }
};
