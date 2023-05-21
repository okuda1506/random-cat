import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
	initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
	const [imageUrl, setImageUrl] = useState(initialImageUrl);
	const [loading, setLoading] = useState(false);
	// マウント時に画像を読み込む宣言
	// useEffect(() => {
	// 	fetchImage().then((newImage) => {
	// 		setImageUrl(newImage.url);
	// 		setLoading(false);
	// 	});
	// }, []);
	// ボタンをクリックした時に画像を読み込む処理
	const handleClick = async () => {
		setLoading(true);
		const newImage = await fetchImage();
		setImageUrl(newImage.url);
		setLoading(false);
	};
	return (
		<div className={styles.page}>
			<button onClick={handleClick}
				style={{
				backgroundColor: "#319795",
				border: "none",
				borderRadius: "4px",
				color: "white",
				padding: "4px 8px",
				}}>
				きょうのにゃんこ🐱
			</button>
			<div className={styles.frame}>
				{loading || <img src={imageUrl} className={styles.img} />}
			</div>
		</div>
	);
};
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const image = await fetchImage();
	return {
		props: {
			initialImageUrl: image.url,
		},
	};
};

type Image = {
	url: string;
};
const fetchImage = async (): Promise<Image> => {
	const res = await fetch("https://api.thecatapi.com/v1/images/search");
	const images = await res.json();
	console.log(images);
	return images[0];
};