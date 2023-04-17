import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FacebookLogin from 'react-facebook-login';

import AddClip from "./components/add-clip.component";
import ClipList from "./components/clip-list.component";

class App extends Component {

  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
  };

  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
  };

  render() {
    const { isLoggedIn, name } = this.state;

    return (
      <div>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="#" className="navbar-brand">
              Dragon Ball Clips
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/clips"} className="nav-link">
                  Clips
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Subir
                  </Link>
                </li>)}
            </div>
            <h2 className="navbar-brand">{isLoggedIn ? name : (
              <FacebookLogin
                appId="1373563823219650"
                autoLoad={false}
                fields="name,email,picture"
                onClick={() => console.log("Iniciando sesión con Facebook...")}
                callback={this.responseFacebook} />
            )}
            </h2>
          </nav>
          <div className="container mt-3">
            <h2>Dragon Ball Clips</h2>
            <Switch>
              <Route exact path={["/", "/clips"]} component={ClipList} />
              <Route exact path="/add" component={AddClip} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
