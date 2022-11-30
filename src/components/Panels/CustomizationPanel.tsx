import '../../css/Style-CustomizationPanel.scss';
import FontOption from './CustomizationOptions/FontOption';
import TextOption from './CustomizationOptions/TextOption';
import FontSizeOption from './CustomizationOptions/FontSizeOption';
import ColorOption from './CustomizationOptions/ColorOption';
import React, { useEffect, useRef } from 'react';
import { animated, useSpring, AnimationProps } from "@react-spring/web";

const animationConfig: AnimationProps["config"] = {
  mass: 1,
  tension: 385,
  friction: 20
}
interface Props {
  currentSelection: string | null,
}
export default function CustomizationPanel(props: Props) {
  const { currentSelection } = props;
  const panelRef = useRef<HTMLDivElement>(null);
  const whenEmoteSelected = {
    to: { top: currentSelection === "emotes" ? "-35%" : "25%" },
    delay: currentSelection === "emotes" ? 0 : 50,
    config: animationConfig
  }
  const [panelAnimation, panelAnimationController] = useSpring(() => { });

  // When emotes is selected, this panel moves up to middle of screen
  useEffect(() => {
    panelAnimationController.start({
      ...whenEmoteSelected,
      config: animationConfig
    });
  }, [currentSelection])

  return (
    <animated.div
      style={panelAnimation}
      ref={panelRef}
      className="customization-panel panel">
      <h1>Customization</h1>
      <TextOption />
      <FontOption
        panelNode={panelRef} />
      <FontSizeOption />
      <ColorOption />
    </animated.div>
  );
}