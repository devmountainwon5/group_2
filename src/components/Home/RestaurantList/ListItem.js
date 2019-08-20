import React from "react";
import "../Home.css";
// import { Link } from "react-router-dom";
// import SingleView from "./src/components/Home/SingleView/SingleView";

export default function List(props) {
	return (
		<div className="row">
			<div className="card-deck">
				<div className="card">
					{/* <SingleView /> */}
					{/* <Link to={`/posts/${props.id}`}> */}
					<img src={props.picture} className="card-img-top" />
					<div className="card-body">
						<h4>{props.name}</h4>
						<h4>{props.rating}/5 Stars</h4>
						<h5>{props.address}</h5>
						<div>
							<button className="btn btn-primary">Add</button>
							<a
								target="blank"
								href={
									"https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" +
									props.place_id
								}>
								<button className="btn google review">More Info</button>
							</a>
						</div>
					</div>
					{/* </Link> */}
				</div>
			</div>
		</div>
	);
}
