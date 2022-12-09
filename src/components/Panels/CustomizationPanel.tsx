import '../../css/Style-CustomizationPanel.scss';
import React, { useEffect, useRef } from 'react';
import { animated, useSpring, AnimationProps } from '@react-spring/web';
import FontOption from './CustomizationOptions/FontOption';
import TextOption from './CustomizationOptions/TextOption';
import FontSizeOption from './CustomizationOptions/FontSizeOption';
import ColorOption from './CustomizationOptions/ColorOption';
import { EmoteModifiers } from '../EmoteAssets';

const animationConfig: AnimationProps['config'] = {
  mass: 1,
  tension: 385,
  friction: 20,
};

interface Props {
  currentSelection: string | null;
  setEmoteModifiers: React.Dispatch<React.SetStateAction<EmoteModifiers>>;
}

export default function CustomizationPanel(props: Props) {
  const { currentSelection, setEmoteModifiers } = props;
  const panelRef = useRef<HTMLDivElement>(null);

  const whenEmoteSelected = {
    to: { top: currentSelection === 'emotes' ? '-35%' : '25%' },
    delay: currentSelection === 'emotes' ? 0 : 50,
    config: animationConfig,
  };
  const [panelAnimation, panelAnimationController] = useSpring(() => {});

  // When emotes is selected, this panel moves up to middle of screen
  useEffect(() => {
    panelAnimationController.start({
      ...whenEmoteSelected,
      config: animationConfig,
    });
  }, [currentSelection]);

  return (
    <animated.div
      style={panelAnimation}
      ref={panelRef}
      className='customization-panel panel'
    >
      <h1>Customization</h1>
      <TextOption setEmoteModifiers={setEmoteModifiers} />
      <FontOption setEmoteModifiers={setEmoteModifiers} />
      <FontSizeOption setEmoteModifiers={setEmoteModifiers} />
      <ColorOption setEmoteModifiers={setEmoteModifiers} />
    </animated.div>
  );
}
