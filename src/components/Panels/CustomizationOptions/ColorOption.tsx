import ColorIcon from '../../../assets/icon-color.svg';
import { SketchPicker, Color } from 'react-color';
import { useEffect, useState } from 'react';
import { MouseEvent } from 'react';
import { animated, AnimationProps, useSpring } from '@react-spring/web';

const animationConfig: AnimationProps["config"] = {
  mass: 1,
  tension: 705,
  friction: 20,
}

export default function ColorOption() {
  const [color, setColor] = useState('#FFDE98');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [colorPickerAnimation, colorPickerAnimationController] = useSpring(() => {
    return {
      from: { scale: 1 }
    }
  });
  const onChangeHandler = (color: any) => {
    setColor(color.hex);
  }
  const boxOnClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFocused(true);
    const colorPicker: HTMLElement | null = document.querySelector('.sketch-picker');

    const colorPickerListenerId = (e: globalThis.MouseEvent) => {
      // stopPropagation() prevents document listener from firing when user is still picking color
      e.stopPropagation();
    }
    const documentListenerId = (e: globalThis.MouseEvent) => {
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
        to: [{ scale: 1.2 }, { scale: 1 }],
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
            disableAlpha={true}
            presetColors={[]}
            color={color}
            onChange={onChangeHandler}
          />
        </animated.div>
        <div
          style={{ backgroundColor: color }}
          onClick={boxOnClickHandler}
          className="option-box" id="color-option-box">
        </div>
      </div>
    </div>
  );
}