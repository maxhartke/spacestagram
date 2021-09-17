import React, { useEffect, useState } from "react";
import {
	AppProvider,
	Button,
	DisplayText,
	Page,
	Spinner,
	TextStyle,
} from "@shopify/polaris";
import { post } from "./post";
import PostCard from "./PostCard";
import Skeleton from "./Skeleton";

export default function App(this: any) {
	const [posts, setPosts] = React.useState<post[]>();
	const [isLoading, setisLoading] = useState(false);
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
					setisLoading(false);
				} else {
					setPosts(response);
				}
			} else {
				console.log("error");
			}
		};
		request.send();
	}
	function loadMore() {
		setisLoading(true);
		getImages();
	}
	//useEffect(() => getImages(), []);
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
						marginTop: 25,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<DisplayText size="medium">
						<TextStyle variation="strong">Spacestagram</TextStyle>
					</DisplayText>
					{posts == null ? <Skeleton></Skeleton> : null}
					{posts?.map((post) => (
						<div key={post.date} style={{ marginTop: 25 }}>
							<PostCard post={post}></PostCard>
						</div>
					))}
					<div style={{ marginTop: 25 }}>
						{isLoading ? (
							<Spinner accessibilityLabel="Spinner" size="large" />
						) : (
							<div style={{ display: posts != null ? "flex" : "none" }}>
								<Button onClick={() => loadMore()}>Load More</Button>
							</div>
						)}
					</div>
				</div>
			</Page>
		</AppProvider>
	);
}
