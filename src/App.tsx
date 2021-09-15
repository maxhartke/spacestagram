import React, { useEffect, useState } from "react";
import {
	AppProvider,
	Button,
	DisplayText,
	Page,
	TextStyle,
} from "@shopify/polaris";
import { post } from "./post";
import PostCard from "./PostCard";
import { HeartFillIcon, HeartIcon } from "@primer/octicons-react";

export default function App(this: any) {
	const [posts, setPosts] = React.useState<post[]>();
	const [like, setlike] = useState(true);
	function getImages() {
		var request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://api.nasa.gov/planetary/apod?api_key=" +
				process.env.REACT_APP_NASA_API_KEY +
				"&count=5",
			true
		);
		request.onload = function () {
			var response = JSON.parse(this.response);
			if (request.status >= 200 && request.status < 400) {
				if (posts != null) {
					setPosts(posts.concat(response));
				} else {
					setPosts(response);
				}
			} else {
				console.log("error");
			}
		};
		request.send();
	}
	useEffect(() => getImages(), []);
	return (
		<AppProvider
			i18n={{}}
			theme={{
				colors: {
					surface: "#111213",
					onSurface: "#111213",
					interactive: "#2e72d2",
					secondary: "#111213",
					primary: "#3b5998",
					critical: "#d82c0d",
					warning: "#ffc453",
					highlight: "#5bcdda",
					success: "#008060",
					decorative: "#ffc96b",
				},
			}}
		>
			<Page>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						padding: 10,
					}}
				>
					<DisplayText size="medium">
						<TextStyle variation="strong">Spacestagram</TextStyle>
					</DisplayText>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* <div onClick={() => setlike(!like)}>
						{like ? (
							<HeartIcon fill={"#24292E"} size={24} />
						) : (
							<HeartFillIcon fill={"#f00"} size={24} />
						)}
					</div> */}
					{posts?.map((post) => (
						<div key={post.date} style={{ marginTop: 25 }}>
							<PostCard post={post}></PostCard>
						</div>
					))}
					<div style={{ marginTop: 25 }}>
						<Button onClick={() => getImages()}>Load More</Button>
					</div>
				</div>
			</Page>
		</AppProvider>
	);
}
