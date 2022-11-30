import { animated, useSpring } from '@react-spring/web';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import TextIcon from '../../../assets/icon-text.svg';

export default function TextOption() {
  const [inputText, setInputText] = useState('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [textBoxAnimationWhenFocused, textBoxAnimationController] = useSpring(() => { });
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  }

  const animationConfig = {
    config: {
      mass: 1,
      tension: 500,
      friction: 20
    }
  }

  useEffect(() => {
    textBoxAnimationController.start({
      from: { scale: isFocus ? 1 : 2 },
      to: { scale: isFocus ? 2 : 1 },
      ...animationConfig
    });
  }, [isFocus]);


  return (
    <div className="option-container">
      <div className="text-option option">
        <div className="icon-option">
          <img src={TextIcon} alt="Text icon" />
        </div>
        <animated.input
          value={inputText}
          style={textBoxAnimationWhenFocused}
          onChange={onChangeHandler}
          onFocus={() => { setIsFocus(true) }}
          onBlur={() => { setIsFocus(false) }}
          placeholder="Text..."
          className="option-box"
          id="text-option" />
      </div>
    </div>
  );
}