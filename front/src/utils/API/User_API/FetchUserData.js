import axios from 'axios';

export const FetchUserData = async (API, token) => {
  const formData = new FormData();
  const id = localStorage.getItem('id');
  formData.append('token', token);
  formData.append('id', id);

  try {
    const response = await axios.post(API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log(response.data.user);
    // Vérifier si la requête a réussi
    if (response.status === 200) {
      const { email, nom, prenom, gamertag, is_admin , creation_date} = response.data.user;

      // Créer un nouvel objet FormData et y ajouter les valeurs
      const formDataResponse = new FormData();
      formDataResponse.append('email', email);
      formDataResponse.append('nom', nom);
      formDataResponse.append('prenom', prenom);
      formDataResponse.append('gamertag', gamertag);
      formDataResponse.append('is_admin', is_admin);
      formDataResponse.append('creation_date', creation_date);
      return {
        success: true,
        formData: formDataResponse,
      };
    } else {
      // La requête a échoué
      console.log('Request failed:', response);
      return {
        success: false,
        formData: null,
      };
    }
  } catch (error) {
    console.log('Error:', error);
    return {
      success: false,
      formData: null,
    };
  }
};
