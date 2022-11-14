import CustomizationPanel from "./Panels/CustomizationPanel";
import PreviewPanel from "./Panels/PreviewPanel";
import EmoteSelectionPanel from "./Panels/EmoteSelectionPanel";
import PanelSelection from "./PanelSelection";

export default function App() {
  return (
    <div>
      <PanelSelection />
      <CustomizationPanel />
      <EmoteSelectionPanel />
      <PreviewPanel />
    </div>
  );
}