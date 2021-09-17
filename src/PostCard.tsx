/* eslint-disable jsx-a11y/alt-text */
import { HeartFillIcon, HeartIcon, ShareIcon } from "@primer/octicons-react";
import { MediaCard, Spinner } from "@shopify/polaris";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { post } from "./post";
import { useWindowDimensions } from "./Skeleton";
const PostCard = (props: { post: post }) => {
	const [like, setlike] = useState(true);
	const [isLoading, setisLoading] = useState(false);
	const { height, width } = useWindowDimensions();
	useEffect(() => {
		const imageToLoad = new Image();
		imageToLoad.src = props.post.hdurl;
		imageToLoad.onload = () => {
			setisLoading(true);
		};
	}, []);

	return (
		<div style={{ width: width > 600 ? 600 : 350 }}>
			<MediaCard
				title={props.post.title + " - " + props.post.date}
				description={props.post.explanation ?? "null"}
				size="small"
				portrait={true}
			>
				{isLoading ? (
					<img
						alt={props.post.title}
						onLoad={() => setisLoading(true)}
						width="600"
						height="400"
						style={{
							objectFit: "cover",
							objectPosition: "center",
						}}
						src={
							props.post.hdurl ??
							"https://semantic-ui.com/images/wireframe/image.png"
						}
					/>
				) : (
					<div
						style={{
							width: width > 600 ? 600 : 350,
							height: width > 600 ? 400 : 200,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Spinner accessibilityLabel="Spinner example" size="large" />
					</div>
				)}

				<div
					style={{
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
