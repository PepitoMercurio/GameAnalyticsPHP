import axios from 'axios';

export const FetchArticle = async (API) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.get(API, config);
    const dataArray = response.data; // Récupérer l'array de données dans une variable
    console.log(dataArray); // Afficher l'array de données dans la console

    // Retourner les articles
    return dataArray;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
    }
    return []; // Retourner un tableau vide en cas d'erreur
  }
};
