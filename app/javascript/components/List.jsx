import React from "react";
import { Link } from "react-router-dom";

class List extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      list: {name: "", active: true }
		};
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteList = this.deleteList.bind(this);
	}

	componentDidMount(){
    const {
      match: {
        params: {id}
      }
    } = this.props;

    const url = `/api/v1/lists/show/${id}`;

    fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(response => this.setState({ list: response }))
			.catch(() => this.props.history.push("/lists"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteList() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/lists/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/lists"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { list } = this.state;


    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <h1 className="display-4 position-relative">
            {list.name}
          </h1>
        </div>
        <div className="col-sm-12 col-lg-2">
          <button type="button" className="btn btn-danger" onClick={this.deleteList} data-target="#confirm-delete">
            Delete List
          </button>
        </div>
        <div className="container py-5">
          <Link to="/lists" className="btn btn-link">
            Back to lists
          </Link>
        </div>
      </div>
    );
  }

}
export default List;
