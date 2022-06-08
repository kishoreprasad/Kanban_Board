import "./Board.css";
import { FaPhotoVideo, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import React, { Component, useState } from "react";
import Board from "react-trello";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import db from "../../fbconfig";
<<<<<<< Updated upstream
=======
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Redirect from "react-router-dom/Redirect";
>>>>>>> Stashed changes
// const data = require("../../data.json");
// console.log(data);
//get userid from firebase
//console.log("state = unknown (until the callback is invoked)");
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     this.state.uid = user.uid;
//   } else {
//     // alert("Please login to use this feature");
//     // <Redirect from="/board" to="/" />;
//     // uid = null;
//   }
// });
const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};
// const dbdata = db
//   .collection("users")
//   .doc("cHgVYHQM4IZkwS5t5oR6ckctpeF3")
//   .collection("test")
//   .doc("TJm1E9NoD90SkF7nwZRf");
// dbdata.get().then((doc) => {
//   console.log(doc.data());
//   const data = doc.data();
// });
// dbdata.update({
//   title: "test",
//   description: "test",
//   dueDate: "2020-01-01",
//   assignee: "test",
//   status: "test",
//   priority: "test",
//   type: "test",
// });
//console.log(dbdata);

//!IMPORTANT
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     return user.uid;
//   }
// });

const dbdata = db
  .collection("users")
  .doc("cHgVYHQM4IZkwS5t5oR6ckctpeF3")
  .collection("test")
  .doc("TJm1E9NoD90SkF7nwZRf");

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log("drag ended");
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

class _Board extends Component {
  state = {
    uid: null,
    data: {},
    boardData: { lanes: [] },
    modalIsOpen: false,
  };
  setEventBus = (eventBus) => {
    this.setState({ eventBus });
  };

  setModalIsOpen = () => {
    var status = !this.modalIsOpen;
    this.setState({
      modalIsOpen: status,
    });
  };
  setModalIsClose = () => {
    var status = this.modalIsOpen;
    this.setState({
      modalIsOpen: status,
    });
  };

  async componentWillMount() {
    dbdata
      .get()
      .then((doc) => {
        this.setState({
          data: doc.data(),
        });
      })
      .then(async () => {
        const response = await this.getBoard();
        this.setState({ boardData: response });
      });
  }
  getBoard() {
    return new Promise((resolve) => {
      resolve(this.state.data);
      console.log(this.state.data);
    });
  }

  shouldReceiveNewData = (nextData) => {
    this.setState({
      data: nextData,
    });
    dbdata.set(nextData);
  };

  handleCardAdd = (card, laneId) => {
    this.state.data.lanes.forEach((lane) => {
      if (lane.id === laneId) {
        lane.cards.push(card);
      }
    });
    this.setState({
      data: this.state.data,
    });
    dbdata.set(this.state.data);
  };

  handleaddlane = (laneId) => {
    this.state.data.lanes.push({
      id: laneId.id,
      title: laneId.title,
      cards: [],
    });
    this.setState({
      data: this.state.data,
    });
    dbdata.set(this.state.data);
  };
  handleCardClick = (props) => {
    console.log(props);
  };
  handedelete = (card, laneId) => {
    this.state.data.lanes.forEach((lane) => {
      if (lane.id === laneId) {
        lane.cards.forEach((card, index) => {
          if (card.id === card.id) {
            lane.cards.splice(index, 1);
          }
        });
      }
    });
    this.setState({
      data: this.state.data,
    });
    dbdata.set(this.state.data);
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>
            MX Kanban
            <div id="icon">
              <span>
                <FaPhotoVideo /> <FaInfoCircle />
                <FaSignOutAlt />{" "}
              </span>
            </div>
          </h3>
        </div>
        <div className="App-intro">
          <Dialog open={this.state.modalIsOpen}>
            <div onClick={this.setModalIsClose} className="overlay"></div>
            <DialogTitle>Card Name</DialogTitle>
            <div>
              Description
            </div>
            <label>
            Tags<br></br><pre>
            High   <input type="checkbox" /><br></br>
            Medium <input type="checkbox" /><br></br>
            Low    <input type="checkbox" /><br></br></pre>
            </label>
            <Button
              onClick={this.setModalIsClose}
              className="close-modal"
              color="primary"
              autoFocus
            >
              Close Popup
            </Button>
          </Dialog>
          <Board
            canAddLanes
            collapsibleLanes
            editable
            onCardAdd={this.handleCardAdd}
            data={this.state.boardData}
            draggable
            onCardClick={
              //this.setModalIsOpen}
              this.handleCardClick
            }
            onDataChange={this.shouldReceiveNewData}
            onLaneAdd={this.handleaddlane}
            eventBusHandle={this.setEventBus}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            onCardDelete={this.handedelete}
            editLaneTitle
            style={{
              fontFamily: "Verdana",
              padding: "30px 20px",
              backgroundColor: "blanchedalmond",
            }}
            tagStyle={{
              fontSize: "80%",
            }}
          />
        </div>
      </div>
    );
  }
}

export default _Board;
