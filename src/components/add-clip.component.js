import React, { Component} from "react";
import ClipsDataService from "../services/clip.service";
import { AuthContext } from "../ContextApi/AuthContext";

export default class AddClip extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveClip = this.saveClip.bind(this);
    this.newClip = this.newClip.bind(this);

    this.state = {
      title: "",
      description: "",
      user: "",
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  componentDidMount() {
    const { name } = this.context;
    this.setState({ user: name });
  }

  saveClip() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      user: this.state.user,
      published: false
    };

    ClipsDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newClip() {
    this.setState({
      title: "",
      description: "",
      user: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    const { name } = this.context;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newClip}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <p>Logged in as {name}</p>
            <button onClick={this.saveClip} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}