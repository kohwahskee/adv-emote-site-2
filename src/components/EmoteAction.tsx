/**
 * Includes functions to modify emote in Photopea
 */
/* eslint-disable no-console */
import React from 'react';
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
/**
 * Update emote with new modifiers
 * @remarks Compares old and new modifiers, update emote with EmoteModifier methods if there are changes
 */
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

/**
 * Initialize Photopea (load psd and fonts)
 */
function photopeaInit(photopeaNode: HTMLIFrameElement, fileURL: string, fontURL?: string) {
	// 4 messages are sent when Photopea finishes loading psd and fonts
	const READY_COUNT_ON_LOAD = 4;
	let messageCount = 0;
	const photopeaWindow = photopeaNode.contentWindow;
	const loadFont = `app.open("${fontURL}")`;
	const loadImage = `app.open("${fileURL}", false)`;

	window.addEventListener('message', (e) => {
		if (e.origin === 'https://www.photopea.com') {
			messageCount++;
			if (messageCount === READY_COUNT_ON_LOAD) {
				// When finishes loading psd and fonts, change font to BPdots
				changeFont(photopeaWindow, 'user', 'BPdots');
			}
		}
	});

	if (photopeaWindow) {
		photopeaWindow.postMessage(loadFont, '*');
		photopeaWindow.postMessage(loadImage, '*');
	}
}

/**
 * Get emote file from Photopea
 * @remarks Photopea saves emote file as ArrayBuffer, convert it to Blob and return a URL string
 * @param photopeaNode Photopea iframe node
 * @param fileFormat File format to save emote as (png or jpeg)
 * @param emote name of current emote (lurk, sign, etc.)
 * @param emoteText user's text on emote (if any).If empty, use emote name as text.
 */
function getEmoteURL(
	photopeaNode: HTMLIFrameElement,
	fileFormat: string,
	emote: string,
	emoteText: string,
	callbackFunction: React.Dispatch<React.SetStateAction<string>>
) {
	const photopeaWindow = photopeaNode.contentWindow as Window;
	const save = `app.activeDocument.saveToOE("${fileFormat}")`;
	photopeaWindow.postMessage(save, '*');
	let imgFile: File = new File([''], '', { type: 'image/png' });
	const windowListenerId = (event: MessageEvent) => {
		console.log('Received message from Photopea');
		if (event.data instanceof ArrayBuffer) {
			console.log('Received ArrayBuffer');
			const rawData = event.data;
			// ArrayBuffer -> Blob
			const imgBlob = new Blob([rawData], {
				type: `image/${fileFormat}`,
			});
			// Blob -> Image File
			imgFile = new File([imgBlob], `emote.${fileFormat}`, {
				type: `image/${fileFormat}`,
			});

			let downloadName = emote;
			if (emoteText) {
				downloadName += emoteText.charAt(0).toUpperCase() + emoteText.slice(1);
			}

			if (downloadName.length >= 12) {
				downloadName = `${downloadName.substring(0, 11)}...`;
			}

			// function convertByte(bytes) {
			// 	if (bytes < 1000) return Math.round(bytes * 10) / 10 + ' B';
			// 	else if (bytes >= 1000 && bytes < 1000000)
			// 		return Math.round((bytes / 1000) * 10) / 10 + ' KB';
			// 	else if (bytes >= 1000000) return Math.round((bytes / 1000000) * 10) / 10 + ' MB';
			// }
			const imageURL = URL.createObjectURL(imgFile);
			window.removeEventListener('message', windowListenerId);
			callbackFunction(imageURL);
		}
	};
	window.addEventListener('message', windowListenerId);
}

export {
	changeFont,
	changeEmoteText,
	changeFontColor,
	changeFontSize,
	updateEmote,
	photopeaInit,
	getEmoteURL,
};
