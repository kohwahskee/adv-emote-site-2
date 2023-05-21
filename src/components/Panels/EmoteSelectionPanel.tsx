/* eslint-disable no-loop-func */
import '../../css/Style-EmoteSelection.scss';
import { animated, SpringRef, useSpring } from '@react-spring/web';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Lookup } from '@react-spring/types';
import scaleToFit from '../Helpers/ScaleToFit';
import generateSelectionLinks from '../Helpers/generateSelectionLinks';
// import fitBoundInCanvas from '../Helpers/fitCanvasInBound';

import fitBoundInCanvas from '../Helpers/fitCanvasInBound';

interface Props {
	currentSelection: string | null;
}

export default function EmoteSelectionPanel(props: Props) {
	const parentContainerRef = useRef<HTMLDivElement>(null);
	const iconsContainerRef = useRef<HTMLDivElement>(null);
	const iconListRef = useRef<Element[]>([]);

	const [containerPos, setContainerPos] = useState({ top: 0, left: 0 });
	const generatedSelections = useMemo(() => generateSelectionLinks(), []);
	const { currentSelection } = props;
	const panelSpringConfig = {
		to: { top: currentSelection === 'emotes' ? '25%' : '90%' },
		delay: currentSelection === 'emotes' ? 50 : 0,
		config: {
			mass: 1,
			tension: 385,
			friction: 20,
		},
		round: 1,
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
	}
	function dragEnd() {
		fitBoundInCanvas(
			iconsContainerRef.current as HTMLElement,
			parentContainerRef.current as HTMLElement,
			setContainerPos
		);
		document.removeEventListener('mousemove', dragging);
	}
	function dragStart() {
		document.addEventListener('mousemove', dragging);
		document.addEventListener('mouseup', dragEnd, { once: true });
	}

	useEffect(() => {
		iconListRef.current = Array.from(
			document.getElementsByClassName('emote-selection')
		);
		scaleToFit(
			parentContainerRef.current as HTMLElement,
			iconListRef.current as HTMLElement[]
		);
	}, []);

	useScaleIconOnDrag(
		containerPos,
		dragNThrowController,
		parentContainerRef,
		iconListRef.current
	);

	return (
		<animated.div
			style={panelStyleWhenSelected}
			className='emote-selection-panel panel'>
			<h1>Emotes</h1>
			<div
				ref={parentContainerRef}
				onMouseDown={dragStart}
				className='emote-selections-container'>
				<animated.div
					ref={iconsContainerRef}
					className='icons-wrapper'
					style={dragNThrowAnimation}>
					{generatedSelections}
				</animated.div>
			</div>
			<h5>Click and drag to browse</h5>
		</animated.div>
	);
}

function useScaleIconOnDrag(
	containerPos: { top: number; left: number },
	controller: SpringRef<Lookup<unknown>>,
	iconsContainerRef: React.RefObject<HTMLDivElement>,
	iconList: Element[]
) {
	useEffect(() => {
		controller.start({
			to: containerPos,
			config: {
				mass: 0.5,
				tension: 500,
				friction: 40,
			},
			onChange: () => {
				scaleToFit(
					iconsContainerRef.current as HTMLElement,
					iconList as HTMLElement[]
				);
			},
		});
	}, [containerPos]);
}
