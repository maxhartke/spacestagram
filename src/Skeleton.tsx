import { MediaCard, SkeletonBodyText, SkeletonPage } from "@shopify/polaris";

const Skeleton = () => {
	return (
		<SkeletonPage title=" ">
			<div style={{ width: 600 }}>
				<MediaCard
					title={<SkeletonBodyText lines={4} />}
					description={""}
					portrait={true}
				>
					<div
						style={{
							width: 600,
							height: 400,
							backgroundColor: "#EBECED",
						}}
					></div>
				</MediaCard>
			</div>
		</SkeletonPage>
	);
};

export default Skeleton;
