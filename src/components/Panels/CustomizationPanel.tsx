import '../../css/Style-CustomizationPanel.scss';
import FontOption from './CustomizationOptions/FontOption';
import TextOption from './CustomizationOptions/TextOption';
import FontSizeOption from './CustomizationOptions/FontSizeOption';
import ColorOption from './CustomizationOptions/ColorOption';

export default function CustomizationPanel() {
  return (
    <div className="customization-panel panel">
      <h1>Customization</h1>
      <TextOption />
      <FontOption />
      <FontSizeOption />
      <ColorOption />
    </div>
  );
}