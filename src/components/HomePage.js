import * as React from "react";
import { Component } from 'react';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaPhotoVideo, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const firebase = useFirebase();
  const history = useHistory();
  const dispatch = useDispatch();
  const [board_name, setBoardName] = React.useState("");
  function signout() {
    firebase.logout().then(() => {
      dispatch({
        type: "SIGNOUT_SUCCESS",
      });
      history.push("/");
    });
  }
  function passname(name) {
    dispatch({
      type: "SET_BOARD_NAME",
      board_name: name,
    });
    history.push("/home");
  }
  
  return (
    
    <div>
      <div className="App-header">
        <h3>
          MX Kanban
          <div style={{ float: "right" }}>
            <button onClick={() => signout()}>
              <span>
                <FaSignOutAlt />
                {""}
              </span>
            </button>
          </div>
        </h3>
      </div>
      <h1 className="main-title home-page-title">Welcome</h1>
      <br></br><br></br><br></br><br></br>
      <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Go to Board</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box><br>
    </br>
    <Button onClick={handleOpen} id="demo-simple-select-label" variant="outlined">Create Board</Button>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create new Board
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Name of the Board
              <input
                type="text"
                style={{ border: "1px solid black" }}
                onChange={(e) => {
                  setBoardName(e.target.value);
                }}
                required
              />
            </Typography>
            <Link to="/board">
              <button
                className="primary-button"
                onClick={(e) => {
                  //e.preventDefault();
                  passname(board_name);
                }}
              >
                create Board
              </button>
            </Link>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
