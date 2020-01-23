import React from "react";
import { Link } from "react-router-dom";

class Lists extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			lists: []
		};
	}

	componentDidMount(){
		const url = "/api/v1/lists/index";
		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(response => this.setState({ lists: response }))
			.catch(() => this.props.history.push("/"));
	}
  render(){
		const {lists} = this.state;
		const allLists = lists.map((list, index) => (
			<div key={index} className="col-md-6 col-lg-4">
				<div className="card mb-4">
				  <div className="card-body">
				  	<h5 className="card-title">{list.name}</h5>
						<Link to={`/lists/${list.id}`} className="btn custom-button">
							View List
						</Link>
				  </div>
				</div>
     </div>
		));
		
		const noList = (
			<div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
		  	<h4>
		  	No Lists yet. Why not <Link to="/lists/new">create one</Link>
		  	</h4>
			</div>
		);
	
		return (
			<>
			<section className="jumbotron jumbotron-fluid text-center">
  			<div className="container py-5">
    			<h1 className="display-4">Nique's Lists</h1>
    			<p className="lead text-muted">
					Some lists
  			  </p>
  			</div>
  	  </section>
  	  <div className="py-5">
  			<main className="container">
  		  	<div className="text-right mb-3">
  	    		<Link to="/lists/new" className="btn custom-button">
  	      		Create New List
  		    	</Link>
  		  	</div>
  		  	<div className="row">
  		    	{lists.length > 0 ? allLists : noList}
  		  	</div>
  		  	<Link to="/" className="btn btn-link">
  		    	Home
  		  	</Link>
  			</main>
  		</div>
			</>
		);
	}
}
export default Lists;
