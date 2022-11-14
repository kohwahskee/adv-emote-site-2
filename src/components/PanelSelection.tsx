import { useState, MouseEvent, useEffect } from "react";
import '../css/Style-SelectionPanel.scss';

interface Props {
  currentSelection: string | null;
  selectionOnclickHandler: (state: string | null) => void;
}

export default function PanelSelection(props: Props) {

  const { currentSelection, selectionOnclickHandler } = props;


  const selectionHandler = (event: MouseEvent) => {
    selectionOnclickHandler(event.currentTarget.getAttribute("selection-value"));
  }

  return (
    <div className={"panel-selection " + (currentSelection === "customization" ? "customization-selected" : "emote-selected")}>
      <h1
        className={currentSelection === "customization" ? "selection-active" : ""}
        selection-value="customization"
        onClick={selectionHandler}
      >
        CUSTOMIZATION</h1>
      <h1
        className={currentSelection === "emotes" ? "selection-active" : ""}
        selection-value="emotes"
        onClick={selectionHandler}
      >
        EMOTES</h1>
    </div>
  );
}