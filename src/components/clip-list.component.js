import React, { Component } from "react";
import ClipsDataService from "../services/clip.service";

import Clip from "./clip.component";

export default class ClipsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClip = this.setActiveClip.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      clips: [],
      currentClip: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = ClipsDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let clips = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      clips.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
        user: data.user,
      });
    });

    this.setState({
      clips: clips,
    });
  }

  refreshList() {
    this.setState({
      currentClip: null,
      currentIndex: -1,
    });
  }

  setActiveClip(clip, index) {
    this.setState({
      currentClip: clip,
      currentIndex: index,
    });
  }

  render() {
    const { clips, currentClip, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Clips List</h4>

          <ul className="list-group">
            {clips &&
              clips.map((clip, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveClip(clip, index)}
                  key={index}
                >
                  {clip.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentClip ? (
            <Clip
              clip={currentClip}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Clip...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}