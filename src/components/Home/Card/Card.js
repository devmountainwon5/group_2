import React, { Component } from "react";

// import Card from "@material-ui/core/Card";
import { Grid, Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

// import { createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";

export default class Card extends Component {
	render() {
		const selector = ".mdc-button, .mdc-icon-button, .mdc-card__primary-action";
		const posts = [1, 2, 3, 4, 5, 6];
		return (
			<div style={{ marginTop: 20, padding: 30 }}>
				<Grid container spacing={40} justify="center">
					{posts.map(post => (
						<Grid item key={post.title}>
							<Card>
								<CardActionArea>
									<CardMedia
										component="img"
										alt="Contemplative Reptile"
										height="140"
										image={post.image}
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{post.title}
										</Typography>
										<Typography component="p">{post.excerpt}</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Button size="small" color="primary">
										Share
									</Button>
									<Button size="small" color="primary">
										Learn More
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
}
