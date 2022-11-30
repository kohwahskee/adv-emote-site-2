import '../../css/Style-EmoteSelection.scss';
import { animated, AnimationProps, useSpring } from '@react-spring/web';

interface Props {
  currentSelection: string | null;
}

export default function EmoteSelectionPanel(props: Props) {
  const { currentSelection } = props;
  const animationConfig: AnimationProps['config'] = {
    mass: 1,
    tension: 385,
    friction: 20,
  };
  const springConfig = {
    to: { top: currentSelection === 'emotes' ? '25%' : '90%' },
    delay: currentSelection === 'emotes' ? 50 : 0,
    config: animationConfig,
  };
  // When emotes is selected, this panel moves up to middle of screen
  const panelStyleWhenSelected = useSpring(springConfig);

  return (
    <animated.div
      style={panelStyleWhenSelected}
      className='emote-selection-panel panel'
    >
      <h1>Emotes</h1>
    </animated.div>
  );
}
