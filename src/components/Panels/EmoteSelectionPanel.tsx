/* eslint-disable no-loop-func */
import '../../css/Style-EmoteSelection.scss';
import { animated, AnimationProps, useSpring } from '@react-spring/web';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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

	for (let i = minIconInRow; i <= midRow; i++) {
		rowList.push(
			<div className='icon-row'>
				{(() => {
					const iconList = [];
					for (let x = 1; x <= i; x++) {
						iconList.push(
							<Link
								onMouseDown={(e) => e.preventDefault()}
								className='emote-selection'
								to={`/emote/${emoteSelections[currIndex]}`}>
								{/* {emoteSelections[currIndex]} */}
							</Link>
						);
						currIndex++;
					}
					return <>{iconList.map((icon) => icon)}</>;
				})()}
			</div>
		);
	}

	for (let i = numOfRows; i >= midRow + minIconInRow; i--) {
		rowList.push(
			<div className='icon-row'>
				{(() => {
					const iconList = [];
					for (let x = i - midRow - 1; x >= 0; x--) {
						iconList.push(
							<Link
								onMouseDown={(e) => e.preventDefault()}
								className='emote-selection'
								to={`/emote/${emoteSelections[currIndex]}`}>
								{/* {emoteSelections[currIndex]} */}
							</Link>
						);
						currIndex++;
					}
					return <>{iconList.map((icon) => icon)}</>;
				})()}
			</div>
		);
	}

	return <>{rowList.map((row) => row)}</>;
}

export default function EmoteSelectionPanel(props: Props) {
	const iconsContainerRef = useRef<HTMLDivElement>(null);
	const iconsWrapperRef = useRef<HTMLDivElement>(null);
	let iconList: Element[] = [];
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

	function draggingHandler(e: MouseEvent) {
		e.preventDefault();

		const iconsContainer = iconsContainerRef.current;
		const iconsWrapper = iconsWrapperRef.current;
		if (iconsWrapper === null) return;

		// Move icon according to mouse movement
		iconsWrapper.style.top = `${
			Number(iconsWrapper.style.top.substring(0, iconsWrapper.style.top.length - 2)) +
			e.movementY / 2
		}px`;

		iconsWrapper.style.left = `${
			Number(iconsWrapper.style.left.substring(0, iconsWrapper.style.left.length - 2)) +
			e.movementX / 2
		}px`;

		scaleToFit(iconsContainer as HTMLElement, iconList as HTMLElement[]);
	}

	useEffect(() => {
		if (iconsContainerRef.current === null) return;

		scaleToFit(iconsContainerRef.current as HTMLElement, iconList as HTMLElement[]);

		iconList = Array.from(document.getElementsByClassName('emote-selection'));

		iconsContainerRef.current.addEventListener('mousedown', () => {
			document.addEventListener('mousemove', draggingHandler);
		});

		document.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', draggingHandler);
		});
	}, []);

	return (
		<animated.div
			style={panelStyleWhenSelected}
			className='emote-selection-panel panel'>
			<h1>Emotes</h1>
			<div
				ref={iconsContainerRef}
				className='emote-selections-container'>
				<div
					ref={iconsWrapperRef}
					className='icons-wrapper'>
					{generateSelectionLinks()}
				</div>
			</div>
		</animated.div>
	);
}
