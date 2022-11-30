import { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import { animated, AnimationProps, useSpring } from '@react-spring/web';
import FontSizeIcon from '../../../assets/icon-font-size.svg';

const inputAnimationConfig: AnimationProps['config'] = {
  mass: 1,
  tension: 500,
  friction: 20,
  // clamp: true
};

export default function FontSizeOption() {
  const defaultFontSize = 12;
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFontSize(
      Number(event.target.value.replace('px', '').trim()) || defaultFontSize
    );
  };
  const [inputAnimation, inputAnimationController] = useSpring(() => {});
  const buttonOnClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
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
  };

  useEffect(() => {
    inputAnimationController.start({
      from: { scale: 1 },
      to: [{ scale: 1.6 }, { scale: 1 }],
      config: inputAnimationConfig,
    });
  }, [fontSize]);

  return (
    <div className='option-container'>
      <div className='font-size-option option'>
        <div className='icon-option'>
          <img src={FontSizeIcon} alt='Font size icon' />
        </div>
        <div className='option-box' id='font-size-option'>
          <button
            onClick={buttonOnClickHandler}
            data-action='decrease'
            className='decrement-button'
          >
            -
          </button>
          <animated.input
            style={inputAnimation}
            onChange={onChangeHandler}
            value={`${fontSize?.toString() || defaultFontSize}px`}
          />
          <button onClick={buttonOnClickHandler} data-action='increase'>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
