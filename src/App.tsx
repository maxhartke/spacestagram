import React, { useEffect } from "react";
import { useState } from "react";
import {
	AppProvider,
	Button,
	DisplayText,
	Icon,
	Page,
	TextStyle,
} from "@shopify/polaris";
import { HeartMajor } from "@shopify/polaris-icons";

export default function App() {
	const [like, setlike] = useState("");
	function likepost() {
		setlike(like);
	}
	function getImages() {
		var request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://api.nasa.gov/planetary/apod?api_key=fogFKIY61nIHNgmF884ZRh7c9F4rFsrai3Mitnaa"
		);
		request.onload = function () {
			var images = JSON.parse(this.response);
			if (request.status >= 200 && request.status < 400) {
			} else {
				console.log("error");
			}
		};
		request.send();
	}
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
				<DisplayText size="medium">
					<TextStyle variation="strong">Spacestagram</TextStyle>
					<Button onClick={() => getImages()}>Click me</Button>
				</DisplayText>
			</Page>
		</AppProvider>
	);
}
