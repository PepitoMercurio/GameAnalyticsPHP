import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FetchUserData } from '../../../utils/API/User_API/FetchUserData';
import { API_PATH } from '../../../constants/API_ROUTES';
import { FetchArticle } from '../../../utils/API/Article/FetchArticle';
import { Item } from './Item';
import { NewArticle } from './NewArticle';
import { AlterArticle } from './AlterArticle';
import { DeleteArticles } from './DeleteArticle';

const ArticleCard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('token');
      const personData = await FetchUserData(
        API_PATH.ACCOUNT.FETCH_DATA.PATH,
        token
      );
      const articleData = await FetchArticle(
        API_PATH.ARTICLE.FETCH_ARTICLE.PATH
      );
      const formDataResponse = personData.formData;
      const email = formDataResponse.get('email');
      const nom = formDataResponse.get('nom');
      const prenom = formDataResponse.get('prenom');
      const gamertag = formDataResponse.get('gamertag');
      const is_admin = formDataResponse.get('is_admin');
      const id = localStorage.getItem('id');
      console.log(is_admin)
      

      const user = {
        name: nom,
        prenom: prenom,
        gamertag: gamertag,
        photo: `http://localhost:8000/PGSQL/Account/Account_Image/${id}/logo_${id}.jpg`,
        ban: `http://localhost:8000/PGSQL/Account/Account_Image/${id}/banner_${id}.jpg`,
        email: email,
      };


      const cardComponent = (
        <div>
          <Grid className="title_article">
            <h1>Article</h1>
          </Grid>

          <Grid
            container
            height={'100%'}
            spacing={2}
            className="page__card_container"
          >
            <Grid item xs={10} className="page__article-post">
              <Box className="page__article-post-card">
                <img className="user-avatar-article" src={user.photo} alt="" />
                <div style={{ marginLeft: '10px' }}>{user.gamertag}</div>
              </Box>

              <NewArticle gamertag={user.gamertag} />
            </Grid>

            <Grid item xs={8} className="page__article-content">
              <div style={{ width: '100%' }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateRows: `repeat(${articleData.length}, 1fr)`,
                  }}
                >
                  {articleData
                    .sort((a, b) => a.id - b.id)
                    .map((article) => (
                      <Item key={article.id}>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography
                              variant="h4"
                              component="h1"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {/* {article.id} */}
                            </Typography>
                          </Grid>
                          <Grid item xs>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  sx={{ width: '250px', textAlign: 'center' }}
                                >
                                  {article.title}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle1" align="center">
                                  {article.text}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            {article.gamertag === user.gamertag && (
                              <>
                                <AlterArticle
                                  gamertag={article.gamertag}
                                  id_article={article.id}
                                  title={article.title}
                                  text={article.text}
                                />
                              </>
                            )}
                            {article.gamertag === user.gamertag && (
                              <>
                                <DeleteArticles
                                  gamertag={article.gamertag}
                                  id_article={article.id}
                                  title={article.title}
                                  text={article.text}
                                />
                              </>
                            )}
                            {article.gamertag === user.gamertag || is_admin == 't' && (
                              <>
                                <DeleteArticles
                                  gamertag={article.gamertag}
                                  id_article={article.id}
                                  title={article.title}
                                  text={article.text}
                                />
                              </>
                            )}
                            <Typography variant="subtitle1" align="center">
                              Créé par {article.gamertag}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Item>
                    ))}
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      );

      resolve(cardComponent);
    } catch (error) {
      reject(error);
    }
  });
};

export default ArticleCard;
