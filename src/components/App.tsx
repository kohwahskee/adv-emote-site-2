import { useState } from 'react';
import CustomizationPanel from './Panels/CustomizationPanel';
import PreviewPanel from './Panels/PreviewPanel';
import EmoteSelectionPanel from './Panels/EmoteSelectionPanel';
import PanelSelection from './PanelSelection';
import Photopea from './Photopea';

export default function App() {
  // Selection state (either "customization" or "emotes")
  const [selectionState, setSelectionState] = useState<
    'emotes' | 'customization'
  >('customization');
  const [emoteModifers, setEmoteModifiers] = useState({
    text: '',
    color: '#f00',
    font: 'Arial',
    fontSize: 20,
  });

  const onSelectionChange = (state: 'emotes' | 'customization'): void => {
    setSelectionState(state);
  };

  return (
    <div>
      <PanelSelection
        selectionOnclickHandler={onSelectionChange}
        currentSelection={selectionState}
      />
      <CustomizationPanel
        setEmoteModifiers={setEmoteModifiers}
        currentSelection={selectionState}
      />
      <EmoteSelectionPanel currentSelection={selectionState} />
      <PreviewPanel />
      <Photopea emoteModifiers={emoteModifers} />
    </div>
  );
}
