import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/system';


const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(3),
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.shadows[24],
    },
  }));
  
  const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
    padding: theme.spacing(3),
    borderTopLeftRadius: theme.shape.borderRadius * 2,
    borderTopRightRadius: theme.shape.borderRadius * 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  }));
  
  const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
  }));
  
  const CustomDialogActions = styled(DialogActions)(({ theme }) => ({
    justifyContent: 'center',
    padding: theme.spacing(2),
  }));
  
  const IconWrapper = styled('div')(({ theme, type }) => ({
    fontSize: '3rem',
    color: type === 'success' ? theme.palette.success.main : theme.palette.error.main,
    marginBottom: theme.spacing(2),
  }));

const AuthorizationMessage = ({dialogOpen,handleDialogClose,type}) => {

  return (
    <Box sx={{width:"60%"}}>
      <CustomDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        disableBackdropClick
        disableEscapeKeyDown
      
      >
        <CustomDialogTitle>
        Autorização de propriedade</CustomDialogTitle>
        <CustomDialogContent>
   
          <IconWrapper type={type}>
            {type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
          </IconWrapper>
          <DialogContentText>
            <Typography variant="body1" color="textPrimary" sx={{fontSize:"25px"}}>
            {type === 'success' ? 'Autorização de propriedade concluída com sucesso' : 'Falha na autorização da propriedade'}
            </Typography>
          </DialogContentText>
         
        
        </CustomDialogContent>
        <CustomDialogActions>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            color={type === 'success' ? 'success' : 'error'}
            size="large"
            sx={{ textTransform: 'none' }}
          >
            OK
          </Button>
        </CustomDialogActions>
      </CustomDialog>
      {/* Your page content here */}
    </Box>
  );
};

export default AuthorizationMessage;
