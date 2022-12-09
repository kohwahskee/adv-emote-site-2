import * as EmoteAssets from './EmoteAssets';

type PhotopeaWindow = HTMLIFrameElement['contentWindow'];

function changeFont(photopeaWindow: PhotopeaWindow, textLayer: string, fontName: string) {
	if (!photopeaWindow) return;

	photopeaWindow.postMessage(
		`
  var layerList = app.activeDocument.layers; var textLayer = '${textLayer}'; function emoteAction(layer) { layer.textItem.font = '${fontName}'; } for (var x = 0; x <= layerList.length - 1; x++) { if (layerList[x].name === textLayer) { emoteAction(layerList[x]); } if (layerList[x].layers) { for (var y = 0; y <= layerList[x].layers.length - 1; y++) { if (layerList[x].layers[y].name === textLayer) { emoteAction(layerList[x].layers[y]); } } } }
  `,
		'*'
	);
	console.log(`Changed font to ${fontName} on layer ${textLayer}`);
}

function changeFontSize(
	photopeaWindow: PhotopeaWindow,
	textLayer: string,
	fontSizeInPixel: number
) {
	if (!photopeaWindow) return;

	photopeaWindow.postMessage(
		`
  var layerList = app.activeDocument.layers; var textLayer = '${textLayer}'; function emoteAction(layer) { layer.textItem.size = new UnitValue(${fontSizeInPixel}, px); } for (var x = 0; x <= layerList.length - 1; x++) { if (layerList[x].name === textLayer) { emoteAction(layerList[x]); } if (layerList[x].layers) { for (var y = 0; y <= layerList[x].layers.length - 1; y++) { if (layerList[x].layers[y].name === textLayer) { emoteAction(layerList[x].layers[y]); } } } }
  `,
		'*'
	);

	console.log(`Changed font size to ${fontSizeInPixel} on layer ${textLayer}`);
}

function changeFontColor(photopeaWindow: PhotopeaWindow, textLayer: string, fontColor: string) {
	if (!photopeaWindow) return;

	photopeaWindow.postMessage(
		`
  var layerList = app.activeDocument.layers; var textLayer = '${textLayer}'; function emoteAction(layer) { var newColor = new SolidColor(); newColor.rgb.hexValue = '${fontColor}'; layer.textItem.color = newColor; } for (var x = 0; x <= layerList.length - 1; x++) { if (layerList[x].name === textLayer) { emoteAction(layerList[x]); } if (layerList[x].layers) { for (var y = 0; y <= layerList[x].layers.length - 1; y++) { if (layerList[x].layers[y].name === textLayer) { emoteAction(layerList[x].layers[y]); } } } }
  `,
		'*'
	);

	console.log(`Changed font color to ${fontColor} on layer ${textLayer}`);
}

function changeEmoteText(photopeaWindow: PhotopeaWindow, textLayer: string, newText: string) {
	if (!photopeaWindow) return;

	photopeaWindow.postMessage(
		`
    var layerList = app.activeDocument.layers; var textLayer = '${textLayer}'; function emoteAction(layer) { layer.textItem.contents = '${newText}'; } for (var x = 0; x <= layerList.length - 1; x++) { if (layerList[x].name === textLayer) { emoteAction(layerList[x]); } if (layerList[x].layers) { for (var y = 0; y <= layerList[x].layers.length - 1; y++) { if (layerList[x].layers[y].name === textLayer) { emoteAction(layerList[x].layers[y]); } } } }
  `,
		'*'
	);

	console.log(`Changed text to ${newText} on layer ${textLayer}`);
}

function updateEmote(
	oldModifiers: EmoteAssets.EmoteModifiers,
	newModifiers: EmoteAssets.EmoteModifiers,
	photopeaWindow: Window
) {
	// if (!photopeaRef.current?.contentWindow) return;
	// Compare old and new modifiers, update emote with EmoteModifier methods if there are changes
	if (oldModifiers.text !== newModifiers.text) {
		changeEmoteText(photopeaWindow, 'user', newModifiers.text);
	}
	if (oldModifiers.font !== newModifiers.font) {
		changeFont(photopeaWindow, 'user', newModifiers.font);
	}
	if (oldModifiers.color !== newModifiers.color) {
		changeFontColor(photopeaWindow, 'user', newModifiers.color);
	}
	if (oldModifiers.fontSize !== newModifiers.fontSize) {
		changeFontSize(photopeaWindow, 'user', newModifiers.fontSize);
	}
}

export { changeFont, changeEmoteText, changeFontColor, changeFontSize, updateEmote };
