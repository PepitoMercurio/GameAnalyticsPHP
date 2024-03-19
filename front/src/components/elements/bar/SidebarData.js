import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faComments,
  faGamepad,
  faPaperclip,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../../constants/routesConst';

export const SidebarData = [
  {
    title: 'Home',
    path: ROUTES.HOME.PATH,
    icon: <FontAwesomeIcon icon={faHome} color="white" />,
    cName: 'nav-text',
  },
 
  {
    title: 'Chat',
    path: '/chat_general',
    icon: <FontAwesomeIcon icon={faComments} color="white" />,
    cName: 'nav-text',
  },
  {
    title: 'Stats',
    path: '/',
    icon: <FontAwesomeIcon icon={faGamepad} color="white" />,
    cName: 'nav-text',
  },
  {
    title: 'Articles',
    path: ROUTES.ARTICLE.PATH,
    icon: <FontAwesomeIcon icon={faPaperclip} color="white" />,
    cName: 'nav-text',
  },

];
