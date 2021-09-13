import React, { useEffect } from "react";
import { AppProvider, DisplayText, Page, TextStyle } from "@shopify/polaris";
import { post } from "./post";
import PostCard from "./PostCard";

export default function App() {
	const [posts, setPosts] = React.useState<post[]>();

	function getImages() {
		var request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://api.nasa.gov/planetary/apod?api_key=fogFKIY61nIHNgmF884ZRh7c9F4rFsrai3Mitnaa&count=5"
		);
		request.onload = function () {
			var response = JSON.parse(this.response);
			if (request.status >= 200 && request.status < 400) {
				setPosts(response);
			} else {
				console.log("error");
			}
		};
		request.send();
	}
	useEffect(() => getImages(), []);

	function loadmore() {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.scrollingElement?.scrollHeight
		) {
			console.log("end of page");
		}
	}
	loadmore();
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
					{posts?.map((post, index) => (
						<div style={{ marginTop: 25 }}>
							<PostCard post={post}></PostCard>
						</div>
					))}
				</div>
			</Page>
		</AppProvider>
	);
}
