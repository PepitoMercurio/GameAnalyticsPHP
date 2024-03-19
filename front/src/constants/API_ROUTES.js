export const API_PATH = {
  AUTHENTIFICATION: {
    CREATE_ACCOUNT: {
      PATH: 'http://localhost:8000/PGSQL/Register/new_account.php',
    },
    LOGIN: {
      PATH: 'http://localhost:8000/PGSQL/Login/login.php',
    },
    EMAIL_EXIST: {
      PATH: 'http://localhost:8000/PGSQL/Register/chekIfemailexist.php',
    },
    NEW_PASSWORD: {
      PATH: 'http://localhost:8000/PGSQL/Register/new_password.php',
    },
    EMAIL_CODE_VALIDATION : {
      PATH: 'http://localhost:8000/PGSQL/Register/email_code_validation.php',
    },

  },
  CHAT: {
    CHAT_GENERAL: {
      PATH: 'http://localhost:5000',
    },
  },

  ACCOUNT: {
    FETCH_DATA: {
      PATH: 'http://localhost:8000/PGSQL/Account/fetch_data.php',
    },
    DELETE_USER: {
      PATH: 'http://localhost:8000/PGSQL/Account/delete_user.php',
    },
    FETCH_BEST_SCORE: {
      PATH: 'http://localhost:8000/PGSQL/Account/fetch_score.php',
    },
    FETCH_LAST_SCORE: {
      PATH: 'http://localhost:8000/PGSQL/Account/fetch_last_score.php',
    },
    FETCH_RANK: {
      PATH: 'http://localhost:8000/PGSQL/Account/fetch_rank.php',
    },
    FETCH_FRIENDS: {
      PATH: 'http://localhost:8000/PGSQL/Account/fetch_friends.php',
    },
    FETCH_NON_FRIEND:{
      PATH:'http://localhost:8000/PGSQL/Account/fetch_non_friend.php',
    },
    FETCH_ALMOST_FRIEND:{
      PATH:'http://localhost:8000/PGSQL/Account/fetch_almost_friend.php',
    },
    ADD_FRIEND:{
      PATH:'http://localhost:8000/PGSQL/Account/add_friend.php',
    },
    ACCEPT_FRIEND:{
      PATH:'http://localhost:8000/PGSQL/Account/accept_friend.php',
    },
    FETCH_USER: {
      PATH: 'http://localhost:8000/PGSQL/Account/fetch_users.php',
    },
    SEARCH_FRIEND: {
      PATH: 'http://localhost:8000/PGSQL/Account/search_friends.php',
    },
    SEARCH_ALMOST_FRIEND: {
      PATH: 'http://localhost:8000/PGSQL/Account/search_almost_friend.php',
    },
    SEARCH_VALID_FRIEND: {
      PATH: 'http://localhost:8000/PGSQL/Account/search_valid_friend.php',
    },
    GAME_HISTORY: {
      PATH: 'http://localhost:8000/PGSQL/Account/game_history.php'
    }
  },

  ARTICLE: {
    INSERT_ARTICLE: {
      PATH: 'http://localhost:8000/PGSQL/Article/insert_article_data.php',
    },
    FETCH_ARTICLE: {
      PATH: 'http://localhost:8000/PGSQL/Article/fetch_article.php',
    },
    ALTER_ARTICLE: {
      PATH: 'http://localhost:8000/PGSQL/Article/alter_article.php',
    },
    DELETE_ARTICLE: {
      PATH: 'http://localhost:8000/PGSQL/Article/delete_article.php',
    },
  },
};
