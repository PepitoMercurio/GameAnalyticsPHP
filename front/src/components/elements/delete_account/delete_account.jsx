import React, {useState} from 'react';
import { ROUTES } from '../../../constants/routesConst';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DeleteUser } from '../../../utils/API/User_API/DeleteUser';
import { API_PATH } from '../../../constants/API_ROUTES';


const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    window.location.href = ROUTES.AUTHENTIFICATION.SIGN_IN.PATH;
    setOpen(false);
  };

  const handleAgree = async () => {
    try {
      setLoading(true);

      const formValue = {
        id: localStorage.getItem('id'), // Utilisez la valeur de l'ID passée en prop
      };
      const deleted = await DeleteUser(
        API_PATH.ACCOUNT.DELETE_USER.PATH, 
        formValue
      );

      setLoading(false);
      
      if (deleted) {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        handleClose();
      } else {
        // Gérer le cas où la suppression échoue
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  

  const handleDisagree = () => {
    Return();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Return = () => {
    setOpen(false);
  };


  return (
    <div style={{marginLeft : '900px'}}>
      <a
        variant="outlined"
        onClick={handleClickOpen}
      >
        <div className='delete-account'>
            <p>Supprimer le compte</p>
        </div>
      </a>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Voulez-vous vraiment supprimer votre compte
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Une fois le compte supprimé, il vous sera impossible de le récupérer
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Annuler</Button>
        <Button onClick={handleAgree} autoFocus>
          {loading ? 'Chargement...' : 'Supprimer'}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

export default DeleteAccount;