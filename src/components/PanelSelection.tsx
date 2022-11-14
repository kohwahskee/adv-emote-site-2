import { useState, MouseEvent, useEffect } from "react";
import '../css/Style-SelectionPanel.scss';
export default function PanelSelection() {

  const [selectionState, setSelectionState] = useState<String | null>("customization");

  useEffect(() => {
    console.log(selectionState);
  }, [selectionState]);

  const selectionOnClickHandler = (event: MouseEvent) => {
    setSelectionState(event.currentTarget.getAttribute("selection-value"));
  }

  return (
    <div className={"panel-selection " + (selectionState === "customization" ? "customization-selected" : "emote-selected")}>
      <h1
        className={selectionState === "customization" ? "selection-active" : ""}
        selection-value="customization"
        onClick={selectionOnClickHandler}
      >
        CUSTOMIZATION</h1>
      <h1
        className={selectionState === "emotes" ? "selection-active" : ""}
        selection-value="emotes"
        onClick={selectionOnClickHandler}
      >
        EMOTES</h1>
    </div>
  );
}