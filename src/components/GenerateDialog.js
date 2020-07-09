import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Web3 from 'web3';
const web3 = new Web3()

export function GenerateDialog(props) {
  const [newKey,setNewKey] =React.useState(null)
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleGenerateButton = () =>{
    let account = web3.eth.accounts.create(web3.utils.randomHex(32));
    const { address,privateKey } = account;
    const key = { address, privateKey}
    setNewKey(key)
  }
  const handleSave = ()=>{
      props.saveKey({...newKey,name})
      setOpen(false);
  }
  const handleNameChange = (e) =>{
    setName(e.target.value);
  }
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        GENERATE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Generate</DialogTitle>
        <DialogContent>
          <DialogContentText align="center">
            Address: {(newKey)?(newKey.address):"click to generate"}
          </DialogContentText>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleGenerateButton}
          >
            <span class="material-icons">refresh</span>
          </Button>
          <TextField
            margin="dense"
            id="name"
            color="secondary"
            label="Account Name"
            type="text"
            variant="outlined"
            onChange={handleNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" color="secondary">
        IMPORT
      </Button>
    </div>
  );
}
