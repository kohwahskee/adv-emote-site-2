import '../../css/Style-EmoteSelection.scss';
import { useRef } from 'react';
import { animated, AnimationProps, useSpring } from "@react-spring/web";

interface Props {
  currentSelection: string | null;
}

export default function EmoteSelectionPanel(props: Props) {
  const panelRef = useRef(null);
  const animationConfig: AnimationProps["config"] = {
    mass: 1,
    tension: 385,
    friction: 20
  }
  const springConfig = {
    to: { top: props.currentSelection === "emotes" ? "25%" : "90%" },
    delay: props.currentSelection === "emotes" ? 50 : 0,
    config: animationConfig
  }
  // When emotes is selected, this panel moves up to middle of screen
  const panelStyleWhenSelected = useSpring(springConfig);

  return (
    <animated.div
      style={panelStyleWhenSelected}
      ref={panelRef}
      className="emote-selection-panel panel">
      <h1>Emotes</h1>
    </animated.div>
  );
}