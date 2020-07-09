import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RadioGroup, RadioButton } from 'react-radio-buttons'

export function TransferDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }
  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }
  const handleSend = () => {
    props.transfer(amount,address)
    setOpen(false);
  }
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen} disableElevation>
        send
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" align="center">Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            *exact fees is determined at execution of transaction
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Address"
            type="text"
            color="secondary"
            variant="outlined"
            onChange={handleAddressChange}
            fullWidth
          />
          <TextField
            margin="normal"
            id="name"
            label="amount"
            type="text"
            color="secondary"
            variant="outlined"
            onChange={handleAmountChange}
            fullWidth
          />
          <DialogContentText>
            Fees
          </DialogContentText>
          <RadioGroup horizontal>
            <RadioButton pointColor="#db3d44" value="low">
              Low
            </RadioButton>
            <RadioButton pointColor="#db3d44" value="mid">
              Mid
            </RadioButton>
            <RadioButton pointColor="#db3d44" value="high">
              High
            </RadioButton>
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" align="left">
            Cancel
          </Button>
          <Button onClick={handleSend} color="secondary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
