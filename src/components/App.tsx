import { useState } from 'react';
import CustomizationPanel from './Panels/CustomizationPanel';
import PreviewPanel from './Panels/PreviewPanel';
import EmoteSelectionPanel from './Panels/EmoteSelectionPanel';
import PanelSelection from './PanelSelection';

export default function App() {
  // Selection state (either "customization" or "emotes")
  const [selectionState, setSelectionState] = useState<
    'emotes' | 'customization'
  >('customization');

  const onSelectionChange = (state: 'emotes' | 'customization'): void => {
    setSelectionState(state);
  };

  return (
    <div>
      <PanelSelection
        selectionOnclickHandler={onSelectionChange}
        currentSelection={selectionState}
      />
      <CustomizationPanel currentSelection={selectionState} />
      <EmoteSelectionPanel currentSelection={selectionState} />
      <PreviewPanel />
    </div>
  );
}
