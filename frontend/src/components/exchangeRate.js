import React, { useEffect, useState } from 'react';
import {
  Alert, Box, Button,  Modal, TextField, Typography,
  } from '@mui/material';
import axios from 'axios';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'beige',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };  

  const ExchangeRate = () => {
    const [original, setOriginal] = useState('SGD');
    const [desired, setDesired] = useState('USD');
    const [result, setResult] = useState("");
    const [amount, setAmount] = useState(1)
    const [showForm, setShowForm] = useState(false);

    const handleOpen = () => {
        setShowForm(true);
    }
    const handleClose = () => setShowForm(false);


    const getConverted = async () =>{
        if (original === '' || desired === '' || amount === '') {
            alert("Missing inputs!");
        } else {
            console.log(original, desired, amount);
            const res = await axios
            .get("https://jz92imgei8.execute-api.ap-southeast-1.amazonaws.com/Deploy/?original=" + original + "&desired=" + desired + "&amount=" + amount) 
            .catch((err) => {
                if (err.response.status === 502) {
                    alert("Invalid inputs given!");
                }
                console.log(err)
            })
            if (res && res.status === 200) {
                await setResult(res.data.result);
                console.log(res);
            }
        }
      }

    
    return (
      <div>
        <Button size="small" onClick={handleOpen}>
          Get Exchange Rate
        </Button>
        <Modal
          open={showForm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Exchange Rate
            </Typography>
            <Box flex-direction="column">
            <TextField
          label="Base Currency"
          variant="standard"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          sx={{ marginBottom: '1rem' }}
          autoFocus
        />
        <br/>
        <TextField
          label="Target Currency"
          variant="standard"
          value={desired}
          onChange={(e) => setDesired(e.target.value)}
          sx={{ marginBottom: '1rem' }}
          autoFocus
        />
        <br/>
        <TextField
          label="Amount"
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ marginBottom: '1rem' }}
          autoFocus
        />
        <br/>
        <TextField
          label="Result"
          variant="standard"
          value={result}
          sx={{ marginBottom: '1rem' }}
          autoFocus
        />
        </Box>
         <Box>
            <Button variant="contained" size="small" onClick={getConverted}>
            Exchange
            </Button>
        </Box>
           
        </Box>
        </Modal>
      </div>
    );
  };
  export default ExchangeRate;