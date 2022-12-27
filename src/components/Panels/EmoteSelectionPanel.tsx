/* eslint-disable no-loop-func */
import '../../css/Style-EmoteSelection.scss';
import { animated, AnimationProps, useSpring } from '@react-spring/web';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import scaleToFit from '../ScaleToFit';

interface Props {
	currentSelection: string | null;
}

function generateSelectionLinks() {
	const emoteSelections = ['lurk', 'sign', 'signA', 'PepegaSign', 'PETTHE', 'peepoFlag', 'signB'];
	const numOfRows = 5;
	const minIconInRow = 2;
	const midRow = Math.round(numOfRows / 2);
	let currIndex = 0;
	const rowList = [];

	function getRow(numIcons: number, startIndex: number) {
		const iconList = [];
		for (let i = 0; i < numIcons; i++) {
			iconList.push(
				<Link
					onMouseDown={(e) => e.preventDefault()}
					className='emote-selection'
					to={`/emote/${emoteSelections[startIndex + i]}`}
				/>
			);
		}

		return <div className='icon-row'>{iconList.map((icon) => icon)}</div>;
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

function useScaleIconOnDrag(containerPos: { top: number; left: number }) {
	useEffect(() => {
		scaleToFit(iconsContainerRef.current as HTMLElement, iconList as HTMLElement[]);
	}, [containerPos]);
}

export default function EmoteSelectionPanel(props: Props) {
	iconsContainerRef = useRef<HTMLDivElement>(null);
	const [containerPos, setContainerPos] = useState({ top: 0, left: 0 });
	const { currentSelection } = props;

	const animationConfig: AnimationProps['config'] = {
		mass: 1,
		tension: 385,
		friction: 20,
	};
	const springConfig = {
		to: { top: currentSelection === 'emotes' ? '25%' : '90%' },
		delay: currentSelection === 'emotes' ? 50 : 0,
		config: animationConfig,
	};
	const panelStyleWhenSelected = useSpring(springConfig);

	function dragging(e: MouseEvent) {
		e.preventDefault();
		// Move icon according to mouse movement
		setContainerPos((prevPos) => ({
			top: prevPos.top + e.movementY / 1.5,
			left: prevPos.left + e.movementX / 1.5,
		}));
	}
	function dragEnd() {
		document.removeEventListener('mousemove', dragging);
	}
	function dragStart() {
		document.addEventListener('mousemove', dragging);
		document.addEventListener('mouseup', dragEnd, { once: true });
	}

	useEffect(() => {
		iconList = Array.from(document.getElementsByClassName('emote-selection'));
	}, []);

	useScaleIconOnDrag(containerPos);

	return (
		<animated.div
			style={panelStyleWhenSelected}
			className='emote-selection-panel panel'>
			<h1>Emotes</h1>
			<div
				ref={iconsContainerRef}
				onMouseDown={dragStart}
				className='emote-selections-container'>
				<animated.div
					className='icons-wrapper'
					style={{ top: `${containerPos.top}px`, left: `${containerPos.left}px` }}>
					{generateSelectionLinks()}
				</animated.div>
			</div>
		</animated.div>
	);
}
