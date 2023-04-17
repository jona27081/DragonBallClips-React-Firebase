import React, { Component } from "react";
import ClipsDataService from "../services/clip.service";

export default class Clip extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateClip = this.updateClip.bind(this);
    this.deleteClip = this.deleteClip.bind(this);

    this.state = {
      currentClip: {
        id: null,
        title: "",
        description: "",
        published: false,
        user: "",
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { clip } = nextProps;
    if (prevState.currentClip.id !== clip.id) {
      return {
        currentClip: clip,
        message: ""
      };
    }

    return prevState.currentClip;
  }

  componentDidMount() {
    this.setState({
      currentClip: this.props.clip,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentClip: {
          ...prevState.currentClip,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentClip: {
        ...prevState.currentClip,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    ClipsDataService.update(this.state.currentClip.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentClip: {
            ...prevState.currentClip,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateClip() {
    const data = {
      title: this.state.currentClip.title,
      description: this.state.currentClip.description,
    };

    ClipsDataService.update(this.state.currentClip.id, data)
      .then(() => {
        this.setState({
          message: "The Clip was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteClip() {
    ClipsDataService.delete(this.state.currentClip.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentClip } = this.state;

    return (
      <div>
        <h4>Clip</h4>
        {currentClip ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentClip.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentClip.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Subido por {currentClip.user}</label>
              </div>
              <div className="form-group">
                <label>
                  <strong>Status: </strong>
                </label>
                {currentClip.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentClip.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteClip}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateClip}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Clip...</p>
          </div>
        )}
      </div>
    );
  }
}