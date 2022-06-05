import "./Board.css";
import { FaPhotoVideo, FaInfoCircle } from 'react-icons/fa';
import React, { Component, useState } from "react";
import Board from "react-trello";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const data = require("../../data.json");

const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log("drag ended");
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

class _Board extends Component {
  state = {
    boardData: { lanes: [] },
    modalIsOpen: false
  };
  setEventBus = (eventBus) => {
    this.setState({ eventBus });
  };

  setModalIsOpen = () => {
    var status = !this.modalIsOpen;
    this.setState({
      modalIsOpen: status
    });

  };

  async componentWillMount() {
    const response = await this.getBoard();
    this.setState({ boardData: response });
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  shouldReceiveNewData = (nextData) => {
    console.log("New card has been added");
    console.log(nextData);
  };

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
  };

  handleaddlane = (laneId) => {
    console.log(laneId);
  };
  handleCardClick = (props) => { };
  handedelete = (props) => {
    alert(props);
    //delete data[props];
    //alert(data.lanes.id);
  };
  handleheader = () => { };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>MX Kanban<div id="icon"><pre>< FaPhotoVideo />  <FaInfoCircle /> </pre></div></h3>
        </div>
        <div className="App-intro">
        
          <Dialog open={this.state.modalIsOpen} >
        <DialogTitle>Card Name</DialogTitle>
          <p>
            Content of card hai Kowshi<br></br>
          </p>
          <Button onClick={this.setModalIsOpen} 
                  color="primary" autoFocus>
            Close Popup
          </Button>
      </Dialog>
          <Board
            // components={{LaneHeader: this.handleheader}}
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
            }} />
        </div>
      </div>
    );
  }
}

export default _Board;
