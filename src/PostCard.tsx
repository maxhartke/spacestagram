/* eslint-disable jsx-a11y/alt-text */
import { Key, MediaCard } from "@shopify/polaris";
import React, { useState } from "react";
import { post } from "./post";

const PostCard = (props: { post: post }) => {
	const [like, setlike] = useState(true);
	return (
		<div style={{ width: 600 }}>
			<MediaCard
				title={props.post.title + " - " + props.post.date}
				primaryAction={{
					content: like ? "Like" : "Liked",
					onAction: () => {
						setlike(!like);
					},
				}}
				description={props.post.explanation ?? "null"}
				popoverActions={[
					{
						content: "Share",
						onAction: () => {
							alert(props.post.hdurl);
						},
					},
				]}
				size="small"
				portrait={true}
			>
				<img
					alt={props.post.title}
					width="600"
					height="400"
					style={{
						objectFit: "cover",
						objectPosition: "center",
					}}
					src={
						props.post.hdurl ??
						"https://cdn.dribbble.com/users/683081/screenshots/2728654/media/7bb2b47d0574d39b20354620e4fa50c8.png?compress=1&resize=600x400"
					}
				/>
			</MediaCard>
		</div>
	);
};

export default PostCard;
