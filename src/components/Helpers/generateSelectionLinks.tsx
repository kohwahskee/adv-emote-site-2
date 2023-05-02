import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LurkThumbnail from '../../assets/emote-thumbnails/lurk-thumbnail.png';
import PeepoSignThumbnail from '../../assets/emote-thumbnails/peepoSign-thumbnail.png';
import PepegaSignThumbnail from '../../assets/emote-thumbnails/pepegaSign-thumbnail.png';

export default function generateSelectionLinks() {
	const emoteSelections = [
		{ name: 'lurk', thumbnail: LurkThumbnail, isAnimated: false },
		{ name: 'PeepoSign', thumbnail: PeepoSignThumbnail, isAnimated: false },
		{ name: 'PeepoSignAnimated', thumbnail: PeepoSignThumbnail, isAnimated: true },
		{ name: 'PepegaSign', thumbnail: PepegaSignThumbnail, isAnimated: true },
		{ name: 'lurk', thumbnail: LurkThumbnail, isAnimated: false },
		{ name: 'lurk', thumbnail: LurkThumbnail, isAnimated: false },
		{ name: 'lurk', thumbnail: LurkThumbnail, isAnimated: false },
	];
	// const emoteSelections = ['lurk', 'sign', 'signA', 'PepegaSign', 'PETTHE', 'peepoFlag', 'signB'];
	const numOfRows = 5;
	const minIconInRow = 2;
	const midRow = Math.round(numOfRows / 2);
	const rowList = [];
	let currIndex = 0;

	function getRow(numIcons: number, startIndex: number) {
		const iconList = [];
		for (let i = 0; i < numIcons; i++) {
			// [<link> , thumbnailURL]
			const { name, thumbnail, isAnimated } = emoteSelections[startIndex + i];
			iconList.push(
				<Link
					onMouseDown={(e) => {
						e.preventDefault();
						e.currentTarget.setAttribute('data-mousepos', [e.clientX, e.clientY].toString());
					}}
					onMouseUp={(e) => {
						const mousePos = e.currentTarget
							.getAttribute('data-mousepos')
							?.split(',')
							.map((x) => parseInt(x, 10));
						if (mousePos && mousePos[0] === e.clientX && mousePos[1] === e.clientY) {
							e.currentTarget.setAttribute('data-isdragging', 'false');
						} else {
							e.currentTarget.setAttribute('data-isdragging', 'true');
						}
					}}
					onClick={(e) => {
						// e.preventDefault();
						if (e.currentTarget.getAttribute('data-isdragging') === 'true') {
							e.preventDefault();
						}
					}}
					className={`emote-selection ${isAnimated ? 'animated' : ''}`}
					key={`${uuidv4()}`}
					style={{
						backgroundImage: `url(${thumbnail})`,
					}}
					to={`/emote/${name}`}
				/>
			);
		}

		return (
			<div
				key={`${uuidv4()}`}
				className='icon-row'>
				{iconList.map((icon) => icon)}
			</div>
		);
	}

	for (let i = minIconInRow; i <= midRow; i++) {
		rowList.push(getRow(i, currIndex));
		currIndex += i;
	}
	for (let i = numOfRows; i >= midRow + minIconInRow; i--) {
		rowList.push(getRow(i - midRow - 1, currIndex));
		currIndex += i - midRow - 1;
	}

	return <>{rowList.map((row) => row)}</>;
}
