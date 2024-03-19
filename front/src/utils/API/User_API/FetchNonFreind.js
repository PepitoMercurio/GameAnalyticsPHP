import axios from 'axios';

export const FetchNonFriends = async (API) => {
  const formData = new FormData();
  const id = localStorage.getItem('id');
  formData.append('id_user', id);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(API, formData, config);
    const dataArray = response.data; // Récupérer l'array de données dans une variable
    console.log('NOOOON :' + dataArray);
    // Retourner les ranks
    return dataArray;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
    }
    return []; // Retourner un tableau vide en cas d'erreur
  }
};

  