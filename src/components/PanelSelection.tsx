import { useState, MouseEvent, useEffect } from "react";
import '../css/Style-SelectionPanel.scss';
import { animated, AnimationProps, useSpring } from "@react-spring/web";

type PanelType = "emotes" | "customization";

interface Props {
  currentSelection: "emotes" | "customization",
  selectionOnclickHandler: (state: "emotes" | "customization") => void,

}

const animationConfig: AnimationProps["config"] = {
  mass: .4,
  tension: 100,
  friction: 10,
  clamp: true
}
export default function PanelSelection(props: Props) {
  const { currentSelection, selectionOnclickHandler } = props;
  const [emoteOnClickAnimation, emoteAnimationController] = useSpring(() => { });
  const [customizationOnClickAnimation, customizationAnimationController] = useSpring(() => { });

  const selectionHandler = (event: MouseEvent) => {
    selectionOnclickHandler(event.currentTarget.getAttribute("selection-value") as PanelType);
    animateSelectionOnClick();
    function animateSelectionOnClick() {
      if (event.currentTarget.getAttribute("selection-value") === "emotes") {
        emoteAnimationController.start({
          from: { translateY: "0%" },
          to: [
            { translateY: "-5%" },
            { translateY: "0%" },
          ],
          config: animationConfig
        });
      }
      else if (event.currentTarget.getAttribute("selection-value") === "customization") {
        customizationAnimationController.start({
          from: { translateY: "0%" },
          to: [
            { translateY: "5%" },
            { translateY: "0%" },
          ],
          config: animationConfig
        })
      }
    }
  }

  return (
    <div className={"panel-selection " + (currentSelection === "customization" ? "customization-selected" : "emote-selected")}>
      <animated.h1
        style={customizationOnClickAnimation}
        className={currentSelection === "customization" ? "selection-active" : ""}
        selection-value="customization"
        onClick={selectionHandler}
      >
        CUSTOMIZATION</animated.h1>
      <animated.h1
        style={emoteOnClickAnimation}
        className={currentSelection === "emotes" ? "selection-active" : ""}
        selection-value="emotes"
        onClick={selectionHandler}
      >
        EMOTES</animated.h1>
    </div>
  );
}