import { SketchPicker } from 'react-color';
import React, { MouseEvent, useEffect, useState, } from 'react';
import { animated, AnimationProps, useSpring } from '@react-spring/web';
import ColorIcon from '../../../assets/icon-color.svg';

const animationConfig: AnimationProps["config"] = {
  mass: .5,
  tension: 305,
  friction: 10,
  // easing: easings.easeOutCubic,
  // duration: 250,

}

export default function ColorOption() {
  const [color, setColor] = useState<string>('#FFDE98');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [colorPickerAnimation, colorPickerAnimationController] = useSpring(() => ({
    from: { scale: 1.1 }
  }));
  const onChangeHandler = (newColor: any) => {
    setColor(newColor.hex);
  }
  const boxOnClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFocused(true);
    const colorPicker: HTMLElement | null = document.querySelector('.sketch-picker');

    const colorPickerListenerId = (pickerEvent: Event) => {
      // stopPropagation() prevents document listener from firing when user is still picking color
      pickerEvent.stopPropagation();
    }
    const documentListenerId = () => {
      setIsFocused(false);

      // Remove listeners when no longer focused
      document.removeEventListener('click', documentListenerId);
      colorPicker?.removeEventListener('click', colorPickerListenerId);
    }

    colorPicker?.addEventListener('click', colorPickerListenerId);
    document.addEventListener('click', documentListenerId);
  }

  useEffect(() => {
    if (isFocused) {
      console.log('focused'); // This works
      colorPickerAnimationController.start({ // This is reached
        to: [{ scale: 1.1 }, { scale: 1 }],
        config: animationConfig,
        reset: true
      });
    }
  }, [isFocused]);

  return (
    <div className="option-container">
      <div className="color-option option">
        <div className="icon-option">
          <img src={ColorIcon} alt="Color icon" />
        </div>
        <animated.div
          style={colorPickerAnimation}
          className="color-picker-container">
          <SketchPicker
            styles={{ default: { picker: { display: isFocused ? 'unset' : 'none' } } }}
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
          className="option-box" id="color-option-box" />
      </div>
    </div>
  );
}