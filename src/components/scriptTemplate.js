/* eslint-disable*/
function modifyLayers(layerName, modifierMethod, modifierArgs) {
  const doc = app.activeDocument;
  const rootLayers = doc.layers;
  const layers = getLayerByName(rootLayers, layerName);
  function getLayerByName(layers, name, matchLayer) {
    matchLayer = matchLayer || [];

    for (var i = 0; i < layers.length; i++) {
      if (layers[i].typename === 'LayerSet') {
        getLayerByName(layers[i].layers, name, matchLayer);
      } else {
        if (layers[i].name === name) {
          matchLayer.push(layers[i]);
        }
      }
    }
    return matchLayer;
  }

  for (var i = 0; i < layers.length; i++) {
    modifierMethod(layers[i], modifierArgs);
  }
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
