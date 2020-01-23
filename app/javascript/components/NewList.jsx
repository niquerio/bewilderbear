import React from "react";
import { Link } from "react-router-dom";

class NewList extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      name: "", 
      active: true
		};

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
	}

  onChange(event){
    if( event.target.name === 'active'){
      this.setState({ ['active']: event.target.checked });
    }else{
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  onSubmit(event){
    event.preventDefault();
    const url = "/api/v1/lists/create";
    const { name, active } = this.state; 

    if (name.length == 0)
      return;

    const body = {
      name,
      active
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(response => this.props.history.push(`/lists/${response.id}`))
			.catch(error => console.log(error.message))
	
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new list.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="listName">List name</label>
                <input
                  type="text"
                  name="name"
                  id="listName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="listName">Active?</label>
                <input
                  type="checkbox"
                  name="active"
                  id="listActive"
                  className="form-control"
                  defaultChecked
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create List
              </button>
              <Link to="/lists" className="btn btn-link mt-3">
                Back to recipes
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}
export default NewList;
