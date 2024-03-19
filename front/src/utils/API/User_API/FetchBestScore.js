import axios from 'axios';

export const FetchBestScore = async (API) => {
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
      const { best_score } = response.data;

      return {
        success: true,
        bestScore: best_score,
      };
    } else {
      console.log('Request failed:', response);
      return {
        success: false,
        bestScore: null,
      };
    }
  } catch (error) {
    console.log('Error:', error);
    return {
      success: false,
      bestScore: null,
    };
  }
};
