/* eslint-disable*/
// PepegaSign
const SMART_OBJECT_NAME = 'OBJECT_HERE';

function modifyLayers(layerName, modifierMethod, modifierArgs) {

  if (app.documents.length >= 2) {
    app.activeDocument = app.documents[1];
    const textLayer = app.activeDocument.layers.getByName(layerName);
    modifierMethod(textLayer, modifierArgs);
  }
  else {
    const doc = app.activeDocument;
    const layer = doc.layers.getByName(SMART_OBJECT_NAME);
    doc.activeLayer = layer;
    executeAction(stringIDToTypeID('placedLayerEditContents'));

    const textLayer = app.activeDocument.layers.getByName(layerName);
    modifierMethod(textLayer, modifierArgs);

  }

  app.activeDocument.save();
  app.activeDocument = app.documents[0];
}
function setText(textLayer, text) {
  textLayer.textItem.contents = text;
}
function setFont(textLayer, font) {
  textLayer.textItem.font = font;
}
function setFontColor(textLayer, color) {
  const newColor = new SolidColor();
  newColor.rgb.hexValue = color;
  textLayer.textItem.color = newColor;
}
function setFontSize(textLayer, size) {
  textLayer.textItem.size = new UnitValue(size, px);
}