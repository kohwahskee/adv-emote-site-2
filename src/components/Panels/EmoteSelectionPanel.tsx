/* eslint-disable no-loop-func */
import '../../css/Style-EmoteSelection.scss';
import { animated, AnimationProps, SpringRef, useSpring } from '@react-spring/web';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Lookup } from '@react-spring/types';
import { v4 as uuidv4 } from 'uuid';
import scaleToFit from '../ScaleToFit';
import LurkThumbnail from '../../assets/emote-thumbnails/lurk-thumbnail.png';
import PeepoSignThumbnail from '../../assets/emote-thumbnails/peepoSign-thumbnail.png';
import PepegaSignThumbnail from '../../assets/emote-thumbnails/pepegaSign-thumbnail.png';

interface Props {
	currentSelection: string | null;
}

export default function EmoteSelectionPanel(props: Props) {
	iconsContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [containerPos, setContainerPos] = useState({ top: 0, left: 0 });
	const generatedSelections = useMemo(() => generateSelectionLinks(), []);
	const { currentSelection } = props;

	const panelAnimationConfig: AnimationProps['config'] = {
		mass: 1,
		tension: 385,
		friction: 20,
	};
	const panelSpringConfig = {
		to: { top: currentSelection === 'emotes' ? '25%' : '90%' },
		delay: currentSelection === 'emotes' ? 50 : 0,
		config: panelAnimationConfig,
	};
	const panelStyleWhenSelected = useSpring(panelSpringConfig);
	const [dragNThrowAnimation, dragNThrowController] = useSpring(() => {});

	function dragging(e: MouseEvent) {
		// e.stopPropagation();
		// Move icon according to mouse movement
		setContainerPos((prevPos) => ({
			top: prevPos.top + e.movementY,
			left: prevPos.left + e.movementX,
		}));
		setIsDragging(true);
	}
	function dragEnd() {
		setIsDragging(false);
		document.removeEventListener('mousemove', dragging);
	}
	function dragStart() {
		document.addEventListener('mousemove', dragging);
		document.addEventListener('mouseup', dragEnd, { once: true });
	}

	useEffect(() => {
		scaleToFit(iconsContainerRef.current as HTMLElement, iconList as HTMLElement[]);
		iconList = Array.from(document.getElementsByClassName('emote-selection'));
	}, []);

	useScaleIconOnDrag(containerPos, dragNThrowController);

	return (
		<animated.div
			style={panelStyleWhenSelected}
			className='emote-selection-panel panel'>
			<h1>Emotes</h1>
			<div
				data-isdragging={isDragging}
				ref={iconsContainerRef}
				onMouseDown={dragStart}
				className='emote-selections-container'>
				<animated.div
					className='icons-wrapper'
					style={dragNThrowAnimation}>
					{generatedSelections}
				</animated.div>
			</div>
			<h5>Click and drag to browse</h5>
		</animated.div>
	);
}

function generateSelectionLinks() {
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
	let currIndex = 0;
	const rowList = [];

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

let iconsContainerRef: React.RefObject<HTMLDivElement>;
let iconList: Element[] = [];

function useScaleIconOnDrag(
	containerPos: { top: number; left: number },
	controller: SpringRef<Lookup<unknown>>
) {
	useEffect(() => {
		controller.start({
			to: containerPos,
			config: {
				mass: 1,
				tension: 700,
				friction: 20,
			},
			onChange: () => {
				scaleToFit(iconsContainerRef.current as HTMLElement, iconList as HTMLElement[]);
			},
		});
	}, [containerPos]);
}
