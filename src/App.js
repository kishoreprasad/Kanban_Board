<<<<<<< HEAD
import './App.css'
import React, { Component,useState } from 'react'
import Board from 'react-trello'
import { Modal, Button } from "react-bootstrap";

const data = require('./data.json')

const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

//popup
//popup

class App extends Component {


  state = { boardData: { lanes: [] },showModal:false }
  


  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }

  async componentWillMount() {
    const response = await this.getBoard()
    this.setState({ boardData: response })
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data)
    })
  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  handleaddlane = (laneId)=>{
    console.log(laneId);
  }
  handleCardClick=(props)=>{
      this.setState({showModal:true})
  }

  handleClose=(props)=>{
    this.setState({showModal:false})
  }

  handleShow=(props)=>{
    this.setState({showModal:true})
  }

  handedelete=(props)=>{

    alert(props)
    //delete data[props];
    //alert(data.lanes.id);
  }
  handleheader=()=>{}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>MX Kanban</h3>
        {/* <popup opens */}
        <>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
          </div>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        {/* Popup Closes */}
        </div>
        <div className="App-intro">
          <Board
            // components={{LaneHeader: this.handleheader}}
            canAddLanes
            collapsibleLanes
            editable
            onCardAdd={this.handleCardAdd}
            data={this.state.boardData}
            draggable
            onCardClick={this.handleCardClick}
            onDataChange={this.shouldReceiveNewData}
            onLaneAdd={this.handleaddlane}
            eventBusHandle={this.setEventBus}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            onCardDelete={this.handedelete}
            editLaneTitle
            style={{
              fontFamily: 'Verdana',
              padding : '30px 20px',
              backgroundColor: 'blanchedalmond'
            }}
          />
        </div>
=======
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import HomePage from "./components/pages/HomePage";
import _Board from "./components/Board/Board";
import { Redirect } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forget-password" component={ForgetPasswordPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/board" component={_Board} />
          <Redirect from="/" to="/" />
        </Switch>
>>>>>>> 2b472772283851b181703d218ae6ceaef8b2c5f7
      </div>
    </Router>
  );
}
