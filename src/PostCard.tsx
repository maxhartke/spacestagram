/* eslint-disable jsx-a11y/alt-text */
import { HeartFillIcon, HeartIcon, ShareIcon } from "@primer/octicons-react";
import { Key, MediaCard } from "@shopify/polaris";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { post } from "./post";
const PostCard = (props: { post: post }) => {
	const [like, setlike] = useState(true);
	return (
		<div style={{ width: 600 }}>
			<MediaCard
				title={props.post.title + " - " + props.post.date}
				/* primaryAction={{
					content: like ? "Like" : "Liked",
					onAction: () => {
						setlike(!like);
					},
				}} */
				description={props.post.explanation ?? "null"}
				/* popoverActions={[
					{
						content: "Share",
						onAction: () => {
							alert(props.post.hdurl);
						},
					},
				]} */
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
				<div
					style={{
						width: 600,
						display: "flex",
						justifyContent: "space-between",
						flexDirection: "row",
						height: 40,
						marginTop: 15,
						marginBottom: -18,
					}}
				>
					<motion.div
						transition={{ duration: 0.45, ease: "easeInOut" }}
						whileTap={{ scale: 2.5 }}
						style={{
							width: 40,
							marginLeft: 15,
						}}
						onClick={() => setlike(!like)}
					>
						{like ? (
							<HeartIcon fill={"#24292E"} size={24} />
						) : (
							<HeartFillIcon fill={"#f00"} size={24} />
						)}
					</motion.div>
					<motion.div
						transition={{ duration: 0.45, ease: "easeInOut" }}
						whileTap={{ scale: 2.5 }}
						style={{ marginRight: 15 }}
						onClick={() => {
							if (navigator.share) {
								navigator.share({
									title: props.post.title,
									url: props.post.hdurl,
								});
							} else {
								alert(props.post.hdurl);
							}
						}}
					>
						<ShareIcon fill={"#24292E"} size={24} />
					</motion.div>
				</div>
			</MediaCard>
		</div>
	);
};

export default PostCard;
