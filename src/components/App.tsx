import CustomizationPanel from "./Panels/CustomizationPanel";
import PreviewPanel from "./Panels/PreviewPanel";
import EmoteSelectionPanel from "./Panels/EmoteSelectionPanel";
import PanelSelection from "./PanelSelection";
import React, { useState } from "react";
export default function App() {

  const [selectionState, setSelectionState] = useState<string | null>("customization");

  const onSelectionChange = (state: string | null): void => {
    setSelectionState(state);
  }

  return (
    <div>
      <PanelSelection
        selectionOnclickHandler={onSelectionChange}
        currentSelection={selectionState} />
      <CustomizationPanel currentSelection={selectionState} />
      <EmoteSelectionPanel currentSelection={selectionState} />
      <PreviewPanel />
    </div>
  );
}