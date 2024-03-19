import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Input from '../input/Input'
import { useState } from 'react';
import { FetchUser } from '../../../utils/API/User_API/FetchUser';
import { SearchFriend } from '../../../utils/API/User_API/SearchFriend';
import { SearchAlmostFriend } from '../../../utils/API/User_API/SearchAlmostFriend';
import SearchResult from './SearchResult';
import { API_PATH } from '../../../constants/API_ROUTES';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100px',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '55ch',
      '&:focus': {
        width: '55ch',
      },
    },
  },
}));


export default function SearchBar({ setNonFriend, setFriend, setAlmostFriend, setValidFriend}) {
  const [formValue, setFormValue] = useState({
    search: '',
    id_user: localStorage.getItem('id'),
  });

  let NonFriendData = [];
  let FriendData = [];
  let AlmostFriendData = [];
  let ValidFriendData = [];

  const fetchData = async (value) => {
    try {
      const API = API_PATH.ACCOUNT.FETCH_USER.PATH;
      NonFriendData = await FetchUser(API, formValue);
      FriendData = await SearchFriend(API_PATH.ACCOUNT.SEARCH_FRIEND.PATH, formValue);
      AlmostFriendData = await SearchAlmostFriend(API_PATH.ACCOUNT.SEARCH_ALMOST_FRIEND.PATH, formValue);
      ValidFriendData = await SearchAlmostFriend(API_PATH.ACCOUNT.SEARCH_VALID_FRIEND.PATH, formValue);
    } catch (error) {
      console.error(error);
    }

    setNonFriend(NonFriendData);
    setFriend(FriendData);
    setAlmostFriend(AlmostFriendData);
    setValidFriend(ValidFriendData);
  } 

  const handleChange = (value) => {
    setFormValue({ ...formValue, search: value });
    fetchData(value)
  }

  return (
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={formValue.search}
              onChange={(e) => handleChange(e.target.value)}
            />
          </Search>
        </Toolbar>
      </Box>
  );
}
