import CustomizationPanel from "./Panels/CustomizationPanel";
import PreviewPanel from "./Panels/PreviewPanel";
import EmoteSelectionPanel from "./Panels/EmoteSelectionPanel";
import PanelSelection from "./PanelSelection";
import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const customPanelRef = useRef(null);
  const emotePanelRef = useRef(null);
  // Selection state (either "customization" or "emotes")
  const [selectionState, setSelectionState] = useState<"emotes" | "customization">("customization");

  const onSelectionChange = (state: "emotes" | "customization"): void => {
    setSelectionState(state);
  }


  return (
    <div>
      <PanelSelection
        selectionOnclickHandler={onSelectionChange}
        currentSelection={selectionState} />
      <CustomizationPanel
        currentSelection={selectionState} />
      <EmoteSelectionPanel currentSelection={selectionState} />
      <PreviewPanel />
    </div>
  );
}