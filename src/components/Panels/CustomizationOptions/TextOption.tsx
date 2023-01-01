import { animated, useSpring } from '@react-spring/web';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

function useInputAnimation(
	setEmoteModifiers: React.Dispatch<React.SetStateAction<EmoteModifiers>>,
	inputRef: React.RefObject<HTMLInputElement>
) {
	const [inputText, setInputText] = useState('');
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [textBoxAnimationWhenFocused, textBoxAnimationController] = useSpring(() => {});

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
			inputRef.current?.blur();
		}
	}, [isFocus]);

	return { setIsFocus, textBoxAnimationWhenFocused, inputText, setInputText };
}

export default function TextOption({ setEmoteModifiers }: Props) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const { emotePreset } = useParams();
	const { setIsFocus, textBoxAnimationWhenFocused, inputText, setInputText } = useInputAnimation(
		setEmoteModifiers,
		inputRef
	);

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};

	useEffect(() => {
		setInputText('');
	}, [emotePreset]);

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
					ref={inputRef}
					value={inputText}
					style={textBoxAnimationWhenFocused}
					onChange={onChangeHandler}
					onFocus={() => {
						setIsFocus(true);
					}}
					onBlur={() => {
						setIsFocus(false);
					}}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							setIsFocus(false);
						}
					}}
					placeholder='Text...'
					className='option-box'
					id='text-option'
				/>
			</div>
		</div>
	);
}
