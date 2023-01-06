/* eslint-disable no-loop-func */
import '../../css/Style-EmoteSelection.scss';
import { animated, AnimationProps, SpringRef, useSpring } from '@react-spring/web';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Lookup } from '@react-spring/types';
import scaleToFit from '../ScaleToFit';

interface Props {
	currentSelection: string | null;
}

export default function EmoteSelectionPanel(props: Props) {
	iconsContainerRef = useRef<HTMLDivElement>(null);
	const [containerPos, setContainerPos] = useState({ top: 0, left: 0 });
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
		e.preventDefault();
		// Move icon according to mouse movement
		setContainerPos((prevPos) => ({
			top: prevPos.top + e.movementY,
			left: prevPos.left + e.movementX,
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
				ref={iconsContainerRef}
				onMouseDown={dragStart}
				className='emote-selections-container'>
				<animated.div
					className='icons-wrapper'
					style={dragNThrowAnimation}>
					{generateSelectionLinks()}
				</animated.div>
			</div>
			<h5>Click and drag to browse</h5>
		</animated.div>
	);
}

function generateSelectionLinks() {
	const emoteSelections = [
		'lurk',
		'PeepoSign',
		'PeepoSignAnimated',
		'lurk',
		'lurk',
		'lurk',
		'lurk',
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
