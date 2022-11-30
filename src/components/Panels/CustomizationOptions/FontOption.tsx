import { animated, useSpring, AnimationProps } from '@react-spring/web';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import FontIcon from '../../../assets/icon-font.svg';

interface FontItem {
  fontName: string;
  fontValue: string;
}

const fontList: FontItem[] = [
  {
    fontName: 'Cos',
    fontValue: 'Ari',
  },
  {
    fontName: 'Comic Sans',
    fontValue: 'ComSans',
  },
];

const defaultFont: FontItem = {
  fontName: 'Calibri',
  fontValue: 'Calibri',
};

const animationConfig: AnimationProps['config'] = {
  mass: 1,
  tension: 385,
  friction: 20,
};

export default function FontOption() {
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
        key={fontItem.fontName}
        onClick={fontItemOnClickHandler}
        font-value={fontItem.fontValue}
        className='font-item'
      >
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

  return (
    <div className='option-container'>
      <div className='font-option option'>
        <div className='icon-option'>
          <img src={FontIcon} alt='Font icon' />
        </div>
        <animated.div
          style={fontBoxAnimation}
          onClick={onClickHandler}
          className='option-box'
          id='font-option'
        >
          <div
            ref={selectedFontRef}
            font-value={selectedFont.fontValue}
            id='selected-font'
          >
            {selectedFont.fontName}
          </div>
          <ul className='font-list'>{generateFontList()}</ul>
        </animated.div>
      </div>
    </div>
  );
}
