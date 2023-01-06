import { SketchPicker, ColorResult } from 'react-color';
import React, { useEffect, useState, MouseEvent } from 'react';
import { animated, AnimationProps, useSpring } from '@react-spring/web';
import ColorIcon from '../../../assets/icon-color.svg';
import { EmoteModifiers } from '../../Helpers/EmoteAssets';

const animationConfig: AnimationProps['config'] = {
	mass: 1,
	tension: 705,
	friction: 20,
};

interface Props {
	setEmoteModifiers: React.Dispatch<React.SetStateAction<EmoteModifiers>>;
}

export default function ColorOption({ setEmoteModifiers }: Props) {
	const [color, setColor] = useState('#FFDE98');
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [colorPickerAnimation, colorPickerAnimationController] = useSpring(() => ({
		from: { scale: 1.1 },
	}));
	const onChangeHandler = (colorResult: ColorResult) => {
		setColor(colorResult.hex);
	};
	const boxOnClickHandler = (e: MouseEvent) => {
		e.stopPropagation();
		setIsFocused(true);
		const colorPicker: HTMLElement | null = document.querySelector('.sketch-picker');

		const colorPickerListenerId = (pickerEvent: Event) => {
			// stopPropagation() prevents document listener from firing when user is still picking color
			pickerEvent.stopPropagation();
		};
		const documentListenerId = () => {
			setIsFocused(false);
			// Remove listeners when no longer focused
			document.removeEventListener('click', documentListenerId);
			colorPicker?.removeEventListener('click', colorPickerListenerId);
		};

		colorPicker?.addEventListener('click', colorPickerListenerId);
		document.addEventListener('click', documentListenerId);
	};

	useEffect(() => {
		if (isFocused) {
			colorPickerAnimationController.start({
				to: [{ scale: 1 }],
				config: animationConfig,
				reset: true,
			});
		} else {
			setEmoteModifiers((state: EmoteModifiers) => ({ ...state, color }));
		}
	}, [isFocused]);

	return (
		<div className='option-container'>
			<div className='color-option option'>
				<div className='icon-option'>
					<img
						src={ColorIcon}
						alt='Color icon'
					/>
				</div>
				<animated.div
					style={colorPickerAnimation}
					className='color-picker-container'>
					<SketchPicker
						styles={{
							default: { picker: { display: isFocused ? 'unset' : 'none', userSelect: 'none' } },
						}}
						width='10em'
						disableAlpha
						presetColors={[]}
						color={color}
						onChange={onChangeHandler}
					/>
				</animated.div>
				<div
					style={{ backgroundColor: color }}
					onClick={boxOnClickHandler}
					className='option-box'
					id='color-option-box'
				/>
			</div>
		</div>
	);
}
