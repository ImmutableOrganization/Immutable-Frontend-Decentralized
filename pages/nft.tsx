import { NextPage } from 'next';
// import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js"

import React, { useContext, useEffect, useState } from 'react';
import { Frame } from '../components/Frame';
import { nft_collection_name } from '../utils/globals';
import { PopupContext } from './_app';

const immutableCollectionText = () => {
	return (
		<>
			<br></br>
			<div className='collection-name'>{nft_collection_name}</div>
			<br></br>
			10,000 NFTS AVAILABLE TO MINT
			<br></br>
			<br></br>
			Computationally Generated, from the void.
			<br></br>
			<br></br>
		</>
	);
};

const immutableCollectionDetails = () => {
	return (
		<>
			<ul>
				Each NFT will vary based on the category fields below. % represents the percent chance of this property being selected in that category.
				<li>Colors used in image: 80% for 3 colors & 20% for every color. The colors available are red, orange, yellow, green, blue, purple, pink.</li>
				<li>
					Divisibility factors: [1, 2, 3, 5, 7, 11, 13, 17]. 30% chance for first 3 numbers, 30% chance for middle 3 numbers, 30% chance for last 3
					numbers, 10% probability for all numbers.{' '}
				</li>
				<li>Step Amount: 0.01, 0.03, 0.05. Controls step between ray generations.</li>
			</ul>
		</>
	);
};

// const mintUnavailableFrame = () => {
//     return (
//         <>
//             <h1>MINT YOUR NFT WHILE AVAILABLE</h1>
//             <input type='button' className="button mint" value='MINT NOT YET AVAILABLE.' disabled />

//         </>
//     )
// }

interface ShowCaseItemInterface {
	name: string;
	image: string;
	hue: string[];
	stepFactor: number[];
	divisibilityFactor: number[];
}

const ShowCaseItem: React.FC<ShowCaseItemInterface> = ({ image, hue, stepFactor, divisibilityFactor }) => {
	return (
		<div className='showcase-item'>
			<div className='showcase-item-image'>
				<img src={image} />
			</div>
			<ul>
				<u>METADATA</u>
				<li>HUE: {hue.toString()}</li>
				<li>STEP FACTOR: {stepFactor.toString()}</li>
				<li>DIVISIBILITY FACTOR: {divisibilityFactor.toString()}</li>
			</ul>
		</div>
	);
};

const nftShowCase: React.FC = () => {
	const [itemCounter, setItemCounter] = useState<number>(0);
	const [imageSrc, setImageSrc] = useState<string>('/0.png');

	const updateItemCounter = () => {
		if (itemCounter + 1 > 4) {
			setItemCounter(0);
		} else {
			setItemCounter(itemCounter + 1);
			const imgSrc = '/' + itemCounter + '.png';
			setImageSrc(imgSrc);
		}
	};

	return (
		<>
			<ShowCaseItem name='0x5' hue={['red', 'green', 'blue']} stepFactor={[0.01]} divisibilityFactor={[1, 3, 7]} image={imageSrc} />
			<input type='button' className='button' value='VIEW NEXT' onClick={() => updateItemCounter()} />
		</>
	);
};

interface GeneratedImageModalInterface {
	imageSrc: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setCloseGeneratedImage: any;
	metadata: iGenerateConfig;
}
export const GeneratedImageModal: React.FC<GeneratedImageModalInterface> = ({ imageSrc, setCloseGeneratedImage, metadata }) => {
	const generatedImageBody = () => {
		return (
			<>
				<ShowCaseItem
					name='0x5'
					hue={metadata.hue}
					stepFactor={[metadata.stepAmount]}
					divisibilityFactor={metadata.divisibilityFactor}
					image={imageSrc}
				/>
				<input type='button' className='button' value='CLOSE' onClick={() => setCloseGeneratedImage(true)} />
			</>
		);
	};
	return <Frame className='generatedImage' headerText='GENERATED IMAGE' body={generatedImageBody} />;
};

interface iGenerateConfig {
	hue: Array<string>;
	divisibilityFactor: Array<number>;
	stepAmount: number;
}

const NFT: NextPage = () => {
	const [generatedImage, setGeneratedImage] = useState<string>('');
	const [generatedImageMetaData, setGeneratedImageMetaData] = useState<iGenerateConfig>();
	const [closeGeneratedImage, setCloseGeneratedImage] = useState<boolean>(false);

	const { setIsLoading } = useContext(PopupContext);

	const MintFrame: React.FC = () => {
		return (
			<>
				<h2>MINT NFT</h2>
				<h1>0.01 ETH</h1>
				<input type='button' className='button mint' onClick={() => fetchImage()} value='MINT' />
			</>
		);
	};

	const fetchImage = async () => {
		setIsLoading(true);
		const image_res = await fetch('https://immutable-main-server.herokuapp.com/generate-random-image');
		const file_name = image_res.headers.get('Filename');

		if (!file_name) {
			console.log('ERROR FETCHING FILE, MISSING FILENAME HEADER');
			return;
		}

		setIsLoading(false);
		const image_blob = await image_res.blob();
		const image_url = URL.createObjectURL(image_blob);

		setGeneratedImage(image_url);
		const split = file_name.split('-');
		const divisibilityFactor = split[1].split(',').map(Number);
		const hue = split[2].split(',');
		const stepAmount = Number(split[3]);
		const metadataObject: iGenerateConfig = {
			hue: hue,
			divisibilityFactor: divisibilityFactor,
			stepAmount: stepAmount,
		};
		setGeneratedImageMetaData(metadataObject);

		setIsLoading(false);
		setCloseGeneratedImage(false);
	};

	useEffect(() => {
		if (closeGeneratedImage) {
			setGeneratedImage('');
			setGeneratedImageMetaData(undefined);
			setCloseGeneratedImage(false);
		}
	}, [closeGeneratedImage]);

	const nftStorage = async () => {
		// const api_key = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
		// if (!api_key) {
		//     return;
		// }
		// console.log(api_key)
		// const store = new NFTStorage({ token: api_key });
		// const data = new Blob(['Hello nft.storage!']);
		// const { car, cid: expectedCid } = await NFTStorage.encodeBlob(data)
		// console.log({ expectedCid: expectedCid.toString() })
		// // // send the CAR to nft.storage, the returned CID will match the one we created above.
		// const cid = await store.storeCar(car)
		// // // verify the service is storing the CID we expect
		// const cidsMatch = expectedCid.toString() === cid
		// console.log({ data, cid, expectedCid, cidsMatch })
		// // // check that the CID is pinned
		// const status = await store.status(cid)
		// console.log(status)
	};

	return (
		<>
			<input type='button' className='button' value='call' onClick={() => nftStorage()} />
			{generatedImage && generatedImageMetaData && !closeGeneratedImage && (
				<GeneratedImageModal imageSrc={generatedImage} metadata={generatedImageMetaData} setCloseGeneratedImage={setCloseGeneratedImage} />
			)}
			<div className={'nft ' + (closeGeneratedImage === false && generatedImage ? 'blurred' : '')}>
				<Frame headerText={'THE IMMUTABLE COLLECTION'} body={immutableCollectionText} />
				<Frame headerText={'MINT'} body={MintFrame} />
				<Frame className='nft-showcase' headerText={'NFT SHOWCASE'} body={nftShowCase} />
				<Frame headerText={'DETAILS'} body={immutableCollectionDetails} />
			</div>
		</>
	);
};
export default NFT;
