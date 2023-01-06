import React, { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import { animated, AnimationProps, useSpring } from '@react-spring/web';
import { useParams } from 'react-router-dom';
import FontSizeIcon from '../../../assets/icon-font-size.svg';
import { EmoteModifiers } from '../../Helpers/EmoteAssets';

const inputAnimationConfig: AnimationProps['config'] = {
	mass: 0.3,
	tension: 300,
	friction: 15,
	// clamp: true
};

interface Props {
	setEmoteModifiers: React.Dispatch<React.SetStateAction<EmoteModifiers>>;
	defaultFontSize: number;
}

export default function FontSizeOption({ setEmoteModifiers, defaultFontSize }: Props) {
	const [fontSize, setFontSize] = useState<number>(defaultFontSize || 12);
	const [inputAnimation, inputAnimationController] = useSpring(() => {});
	const { emotePreset } = useParams();
	function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setFontSize(Number(event.target.value.replace('px', '').trim()) || defaultFontSize);
	}

	function buttonOnClickHandler(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (event.currentTarget.getAttribute('data-action') === 'increase') {
			setFontSize(fontSize + 2);
		} else {
			setFontSize((currentFontSize) => {
				if (currentFontSize <= 2) {
					return 2;
				}
				return currentFontSize - 2;
			});
		}
	}

	useEffect(() => {
		inputAnimationController.start({
			from: { scale: 1 },
			to: [{ scale: 1.6 }, { scale: 1 }],
			config: inputAnimationConfig,
		});
		setEmoteModifiers((state: EmoteModifiers) => ({
			...state,
			fontSize,
		}));
	}, [fontSize]);

	// Resets to default when different emote preset is selected
	useEffect(() => {
		setFontSize(defaultFontSize);
	}, [emotePreset]);

	return (
		<div className='option-container'>
			<div className='font-size-option option'>
				<div className='icon-option'>
					<img
						src={FontSizeIcon}
						alt='Font size icon'
					/>
				</div>
				<div
					className='option-box'
					id='font-size-option'>
					<button
						onClick={buttonOnClickHandler}
						data-action='decrease'
						className='decrement-button'>
						-
					</button>
					<animated.input
						style={inputAnimation}
						onChange={onChangeHandler}
						value={`${fontSize?.toString() || defaultFontSize}px`}
					/>
					<button
						onClick={buttonOnClickHandler}
						data-action='increase'>
						+
					</button>
				</div>
			</div>
		</div>
	);
}
