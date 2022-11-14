import '../../css/Style-CustomizationPanel.scss';
import FontOption from './CustomizationOptions/FontOption';
import TextOption from './CustomizationOptions/TextOption';
import FontSizeOption from './CustomizationOptions/FontSizeOption';
import ColorOption from './CustomizationOptions/ColorOption';
import React from 'react';

interface Props {
  currentSelection: string | null;
}

export default function CustomizationPanel(props: Props) {
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