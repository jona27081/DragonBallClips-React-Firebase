import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import AddClip from "../components/add-clip.component";
import ClipList from "../components/clip-list.component";

export default class Inicio extends Component{
    render() {
        return (
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/clips" className="navbar-brand">
                Dragon Ball Clips
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/clips"} className="nav-link">
                    Clips
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Subir
                  </Link>
                </li>
              </div>
            </nav>
    
            <div className="container mt-3">
              <h2>Dragon Ball Clips</h2>
              <Switch>
                <Route exact path={["/", "/clips"]} component={ClipList} />
                <Route exact path="/add" component={AddClip} />
              </Switch>
            </div>
          </div>
        );
      }
}



