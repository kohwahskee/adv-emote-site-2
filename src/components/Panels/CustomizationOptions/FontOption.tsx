import { animated, useSpring, AnimationProps } from '@react-spring/web';
import React, { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import FontIcon from '../../../assets/icon-font.svg';
import { EmoteModifiers, fontMap } from '../../EmoteAssets';

interface FontItem {
	fontName: string;
	fontValue: string;
}

// Convert fontMap to array of FontItem
// ([{ fontName: 'Calibri', fontValue: 'Calibri' }, ...]}])
const fontList: FontItem[] = Object.keys(fontMap).map((fontName, index) => ({
	fontName,
	fontValue: Object.values(fontMap)[index],
}));

const animationConfig: AnimationProps['config'] = {
	mass: 1,
	tension: 385,
	friction: 20,
};

interface Props {
	setEmoteModifiers: React.Dispatch<React.SetStateAction<EmoteModifiers>>;
	defaultFont: FontItem;
}

export default function FontOption({ setEmoteModifiers, defaultFont }: Props) {
	const selectedFontRef = useRef<HTMLDivElement>(null);
	const [isFocus, setIsFocus] = useState(false);
	const [selectedFont, setSelectedFont] = useState<FontItem>(defaultFont);
	const [fontBoxAnimation, fontBoxAnimationController] = useSpring(() => {});

	const fontItemOnClickHandler = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation();
		setIsFocus(false);
		setSelectedFont({
			fontName: e.currentTarget.innerText,
			fontValue: e.currentTarget.getAttribute('font-value') as string,
		});
	};

	const generateFontList = (): ReactNode[] => {
		const fontItems: ReactNode[] = fontList.map((fontItem) => (
			<li
				key={fontItem.fontValue}
				onClick={fontItemOnClickHandler}
				// eslint-disable-next-line react/no-unknown-property
				font-value={fontItem.fontValue}
				className='font-item'>
				{fontItem.fontName}
			</li>
		));
		return fontItems;
	};

	const onClickHandler = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsFocus(true);
		const documentEventID = () => {
			setIsFocus(false);
			document.removeEventListener('click', documentEventID);
		};
		document.addEventListener('click', documentEventID);
	};

	// Animate font box every time focus changes
	useEffect(() => {
		fontBoxAnimationController.start({
			to: { height: isFocus ? '13em' : '3.5em' },
			config: animationConfig,
		});
		// console.log(isFocus);
	}, [isFocus]);

	// Update emote modifiers when selected font changes
	useEffect(() => {
		setEmoteModifiers((state) => ({
			...state,
			font: selectedFont.fontValue,
		}));
	}, [selectedFont]);

	return (
		<div className='option-container'>
			<div className='font-option option'>
				<div className='icon-option'>
					<img
						src={FontIcon}
						alt='Font icon'
					/>
				</div>
				<animated.div
					style={fontBoxAnimation}
					onClick={onClickHandler}
					className='option-box'
					id='font-option'>
					<div
						ref={selectedFontRef}
						// eslint-disable-next-line react/no-unknown-property
						font-value={selectedFont.fontValue}
						id='selected-font'>
						{selectedFont.fontName}
					</div>
					<ul className='font-list'>{generateFontList()}</ul>
				</animated.div>
			</div>
		</div>
	);
}
