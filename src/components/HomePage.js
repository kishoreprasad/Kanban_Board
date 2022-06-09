import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaPhotoVideo, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const firebase = useFirebase();
  const history = useHistory();
  const dispatch = useDispatch();
  function signout() {
    firebase.logout().then(() => {
      dispatch({
        type: "SIGNOUT_SUCCESS",
      });
      history.push("/");
    });
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
                {"Logout"}
              </span>
            </button>
          </div>
        </h3>
      </div>
      <h1 className="main-title home-page-title">Welcome</h1>
      <Link to="/board">
        <button className="primary-button">Go to Board</button>
      </Link>
        <button onClick={handleOpen} className="primary-button">Create Board</button>
      
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
              <input type="text" style={{border:"1px solid black"}} />
            </Typography>
            <Link to="/board">
            <button className="primary-button">create Board</button>
            </Link>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}