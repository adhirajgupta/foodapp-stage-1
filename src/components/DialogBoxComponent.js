import React from 'react';
import { Dialog, DialogContent, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DialogBoxComponent = ({ open, onClose, selectedImage, handlePrevImage, handleNextImage, handleCloseDialog }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Image"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <Button onClick={handlePrevImage}>
            <ArrowBackIcon />
          </Button>
          <Button onClick={handleNextImage}>
            <ArrowForwardIcon />
          </Button>
        </div>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBoxComponent;
