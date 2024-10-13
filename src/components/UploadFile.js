import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { buttonStyles } from '../utils';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UploadFile(props) {
    const {setDataFile} = props;
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
    };
    
    const handleDragLeave = (e) => {
        e.preventDefault();
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
    
        const files = e.dataTransfer.files;
        handleFileChange({ target: { files: files } });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setDataFile(file);
    }

  return (
    <React.Fragment>
        <Button 
            component="label"
            variant="contained"
            sx={{...buttonStyles, width: "auto"}}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            startIcon={<CloudUploadIcon />}
            >
                Selecione arquivo
            <VisuallyHiddenInput 
                type="file"
                onChange={handleFileChange}
            />
        </Button>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Impossivel ler esse arquivo!
            </Alert>
          </Snackbar>
      </Stack>
    </React.Fragment>
  );
}