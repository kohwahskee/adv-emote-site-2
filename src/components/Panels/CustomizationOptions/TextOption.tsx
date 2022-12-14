import { animated, useSpring } from '@react-spring/web';
import React, { ChangeEvent, useEffect, useState } from 'react';
import TextIcon from '../../../assets/icon-text.svg';
// import { EmoteModifiers } from '../../EmoteAssets';

type EmoteModifiers = {
	text: string;
	color: string;
	font: string;
	fontSize: number;
};
interface Props {
	setEmoteModifiers: React.Dispatch<React.SetStateAction<EmoteModifiers>>;
}

// TODO: Support Enter key to submit text
export default function TextOption({ setEmoteModifiers }: Props) {
	const [inputText, setInputText] = useState('');
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [textBoxAnimationWhenFocused, textBoxAnimationController] = useSpring(() => {});
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};
	const animationConfig = {
		config: {
			mass: 1,
			tension: 500,
			friction: 20,
		},
	};

	useEffect(() => {
		textBoxAnimationController.start({
			from: { scale: isFocus ? 1 : 2 },
			to: { scale: isFocus ? 2 : 1 },
			...animationConfig,
		});
		if (!isFocus) {
			setEmoteModifiers((state: EmoteModifiers) => ({
				...state,
				text: inputText,
			}));
		}
	}, [isFocus]);

	return (
		<div className='option-container'>
			<div className='text-option option'>
				<div className='icon-option'>
					<img
						src={TextIcon}
						alt='Text icon'
					/>
				</div>
				<animated.input
					value={inputText}
					style={textBoxAnimationWhenFocused}
					onChange={onChangeHandler}
					onFocus={() => {
						setIsFocus(true);
					}}
					onBlur={() => {
						setIsFocus(false);
					}}
					placeholder='Text...'
					className='option-box'
					id='text-option'
				/>
			</div>
		</div>
	);
}
