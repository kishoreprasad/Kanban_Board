import "./Board.css";
import { FaPhotoVideo, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import React, { Component, useState } from "react";
import Board from "react-trello";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import db from "../../fbconfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Redirect from "react-router-dom/Redirect";
import { connect } from "react-redux";

const handleDragStart = (cardId, laneId) => {
  // console.log("drag started");
  // console.log(`cardId: ${cardId}`);
  // console.log(`laneId: ${laneId}`);
};

//!IMPORTANT
//console.log(this.props.auth.uid);
const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  // console.log("drag ended");
  // console.log(`cardId: ${cardId}`);
  // console.log(`sourceLaneId: ${sourceLaneId}`);
  // console.log(`targetLaneId: ${targetLaneId}`);
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
    //console.log(this.props.auth.uid);
    //console.log(this.props.misc.boardname);
    this.setState({ uid: this.props.auth.uid }, () => {
      console.log(this.state.uid);
    });
    //console.log(this.state.uid);
    // db.listCollections("users")
    //   .then((snapshot) => {
    //     snapshot.forEach((snaps) => {
    //       console.log(snaps["_queryOptions"].collectionId); // LIST OF ALL COLLECTIONS
    //     });
    //   })
    //   .catch((error) => console.error(error));
    await db
      .collection("users")
      .doc(this.props.auth.uid)
      .collection(this.props.misc.boardname)
      .doc("board_data")
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
    });
  }

  shouldReceiveNewData = (nextData) => {
    this.setState({
      data: nextData,
    });
    db.collection("users")
      .doc(this.props.auth.uid)
      .collection(this.props.misc.boardname)
      .doc("board_data")
      .set(nextData);
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
    db.collection("users")
      .doc(this.props.auth.uid)
      .collection(this.props.misc.boardname)
      .doc("board_data")
      .set(this.state.data);
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
    db.collection("users")
      .doc(this.props.auth.uid)
      .collection(this.props.misc.boardname)
      .doc("board_data")
      .set(this.state.data);
  };
  handleCardClick = (props) => {
    console.log(props);
  };
  handedelete = (cards, laneId) => {
    this.state.data.lanes.forEach((lane) => {
      if (lane.id === laneId) {
        lane.cards.forEach((card, index) => {
          if (cards === card.id) {
            lane.cards.splice(index, 1);
          }
        });
      }
    });
    this.setState({
      data: this.state.data,
    });
    db.collection("users")
      .doc(this.props.auth.uid)
      .collection(this.props.misc.boardname)
      .doc("board_data")
      .set(this.state.data);
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
            <div>Description</div>
            <label>
              Tags<br></br>
              <pre>
                High <input type="checkbox" />
                <br></br>
                Medium <input type="checkbox" />
                <br></br>
                Low <input type="checkbox" />
                <br></br>
              </pre>
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
              this.setModalIsOpen
              //this.handleCardClick
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
const mapStateToProps = (state) => ({
  auth: state.auth,
  misc: state.misc,
});

export default connect(mapStateToProps)(_Board);
