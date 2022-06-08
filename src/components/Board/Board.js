import "./Board.css";
import { FaPhotoVideo, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import React, { Component, useState } from "react";
import Board from "react-trello";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import db from "../../fbconfig";

// const data = require("../../data.json");
// console.log(data);

const handleDragStart = (cardId, laneId) => {
  // console.log("drag started");
  // console.log(`cardId: ${cardId}`);
  // console.log(`laneId: ${laneId}`);
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
const dbdata = db
  .collection("users")
  .doc("cHgVYHQM4IZkwS5t5oR6ckctpeF3")
  .collection("test")
  .doc("TJm1E9NoD90SkF7nwZRf");

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  // console.log("drag ended");
  // console.log(`cardId: ${cardId}`);
  // console.log(`sourceLaneId: ${sourceLaneId}`);
  // console.log(`targetLaneId: ${targetLaneId}`);
};

class _Board extends Component {
  state = {
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
    // console.log("New card has been added");
    //console.log(nextData);
    console.log(nextData);
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
    //console.log(laneId);
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
  handleCardClick = (props) => {};
  handedelete = (card, laneId) => {
    //console.log(card, laneId);
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
            <div onClick={this.setModalIsOpen} className="overlay"></div>
            <DialogTitle>Card Name</DialogTitle>
            <p>
              Content of card hai Kowshi<br></br>
            </p>
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
            onCardClick={this.setModalIsOpen}
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
