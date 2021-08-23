import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GameProfile from "./pages/GameProfile";
import Search from "./components/Search";
import Homepage from "./pages/Homepage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <Navbar />
            <Search />
          </div>
          <Switch>
            <Route path="/game/" component={GameProfile} />
            <Route exact path="/" component={Homepage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
