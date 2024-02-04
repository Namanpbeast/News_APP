import NewsList from "./component/NewsList";
import Navbar from "./component/Navbar";
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


export default class App extends Component {
  state= {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <Router>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
     
      />
        <Navbar/>
     <Routes>
          <Route exact path="/" element={ <NewsList setProgress={this.setProgress}  key="general" category="general"/> }/>
          <Route exact path="/business" element={ <NewsList setProgress={this.setProgress} key="business" category="business"/> }/>
          <Route exact path="/entertainment" element={ <NewsList setProgress={this.setProgress}  key="entertainment" category="entertainment"/> }/>
          <Route exact path="/health" element={ <NewsList setProgress={this.setProgress}  key="health" category="health"/> }/>
          <Route exact path="/science" element={<NewsList setProgress={this.setProgress}  key="science" category="science"/> }/>
          <Route exact path="/sports" element={ <NewsList setProgress={this.setProgress}  key="sports" category="sports"/> }/>
          <Route exact path="/technology" element={ <NewsList setProgress={this.setProgress}  key="technology" category="technology"/> }/>
        </Routes>
    </Router>
    )
  }
}


