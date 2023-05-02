/* eslint-disable no-console */
import * as EmoteAssets from './EmoteAssets';
// eslint-disable-next-line import/no-unresolved
let scriptTemplate: string;
type PhotopeaWindow = HTMLIFrameElement['contentWindow'];
let oldEmote: string;

function setFont(photopeaWindow: PhotopeaWindow, textLayer: string, fontName: string) {
	if (!photopeaWindow) return;

	const script = `modifyLayers('${textLayer}', setFont, '${fontName}');`;
	const concatScript = `${scriptTemplate} ${script}`;
	photopeaWindow.postMessage(concatScript, '*');
	console.log(`Changed font to ${fontName} on layer ${textLayer}`);
}

function setFontSize(photopeaWindow: PhotopeaWindow, textLayer: string, fontSizeInPixel: number) {
	if (!photopeaWindow) return;

	const script = `modifyLayers('${textLayer}', setFontSize, '${fontSizeInPixel}');`;
	const concatScript = `${scriptTemplate} ${script}`;
	photopeaWindow.postMessage(concatScript, '*');
	console.log(`Changed font size to ${fontSizeInPixel} on layer ${textLayer}`);
}

function setFontColor(photopeaWindow: PhotopeaWindow, textLayer: string, fontColor: string) {
	if (!photopeaWindow) return;

	const script = `modifyLayers('${textLayer}', setFontColor, '${fontColor}');`;
	const concatScript = `${scriptTemplate} ${script}`;
	photopeaWindow.postMessage(concatScript, '*');
	console.log(`Changed font color to ${fontColor} on layer ${textLayer}`);
}

function setEmoteText(photopeaWindow: PhotopeaWindow, textLayer: string, newText: string) {
	if (!photopeaWindow) return;

	const script = `modifyLayers('${textLayer}', setText, '${newText}');`;
	const concatScript = `${scriptTemplate} ${script}`;
	photopeaWindow.postMessage(concatScript, '*');
	console.log(`Changed text to ${newText} on layer ${textLayer}`);
}

/**
 * Update emote with new modifiers
 * @remarks Compares old and new modifiers, update emote with EmoteModifier methods if there are changes
 */
function updateEmote(
	oldModifiers: EmoteAssets.EmoteModifiers,
	newModifiers: EmoteAssets.EmoteModifiers,
	photopeaWindow: Window,
	textLayer = 'TEXT_HERE'
) {
	// if (!photopeaRef.current?.contentWindow) return;
	// Compare old and new modifiers, update emote with EmoteModifier methods if there are changes
	if (oldModifiers.text !== newModifiers.text) {
		setEmoteText(photopeaWindow, textLayer, newModifiers.text);
	}
	if (oldModifiers.font !== newModifiers.font) {
		setFont(photopeaWindow, textLayer, newModifiers.font);
	}
	if (oldModifiers.color !== newModifiers.color) {
		setFontColor(photopeaWindow, textLayer, newModifiers.color);
	}
	if (oldModifiers.fontSize !== newModifiers.fontSize) {
		setFontSize(photopeaWindow, textLayer, newModifiers.fontSize);
	}
}

/**
 * Close current document
 * @remarks This usually happens when user changes emote, basically resets Photopea to a clean state
 */
function closeAllDocuments(photopeaWindow: PhotopeaWindow) {
	if (photopeaWindow) {
		photopeaWindow.postMessage(
			`function closeDocument() { if (app.documents.length == 0) return; app.activeDocument.close(); closeDocument(); } closeDocument();`,
			'*'
		);
	}
}

/**
 * Initialize Photopea (load psd and fonts)
 */
async function photopeaInit(
	photopeaNode: HTMLIFrameElement,
	currentEmote: EmoteAssets.EmotePresets,
	callBackWhenFinish?: () => void,
	loadFont = true
) {
	const photopeaWindow = photopeaNode.contentWindow;
	const fontBufferList: ArrayBuffer[] = [];
	if (loadFont) {
		fontBufferList.push(
			await EmoteAssets.retroFontBuffer,
			await EmoteAssets.handWrittingFontBuffer,
			await EmoteAssets.chalkFontBuffer,
			await EmoteAssets.handwritting2FontBuffer,
			await EmoteAssets.scifiFontBuffer,
			await EmoteAssets.comicFontBuffer,
			await EmoteAssets.comicBoldFontBuffer,
			await EmoteAssets.comicItalicFontBuffer
		);
		fontBufferList.forEach((buffer) => {
			photopeaWindow?.postMessage(buffer, '*');
		});
	}
	if (oldEmote === currentEmote) return;
	oldEmote = currentEmote;
	const psdBuffer = await EmoteAssets.EMOTE_DEFAULTS[currentEmote].psd;
	scriptTemplate = await (
		await fetch(EmoteAssets.EMOTE_DEFAULTS[currentEmote].scriptTemplate)
	).text();
	const READY_COUNT_ON_LOAD = 1 + fontBufferList.length;
	let messageCount = 0;

	window.addEventListener('message', (e) => {
		if (e.origin !== 'https://www.photopea.com') return;
		messageCount++;
		if (messageCount === READY_COUNT_ON_LOAD) {
			// When finishes loading psd and fonts, call callback function
			callBackWhenFinish?.();
		}
	});

	// load images increase count by 3
	photopeaWindow?.postMessage(psdBuffer, '*');
}

/**
 * Get emote URL from Photopea
 * @remarks Photopea saves emote file as an ArrayBuffer, convert it to a Blob and return a URL string to be used as src
 * @param photopeaNode Photopea iframe node
 * @param fileFormat File format to save emote as (png or jpeg)
 * @param emote name of current emote (lurk, sign, etc.)
 * @param emoteText user's text on emote (if any).If empty, use emote name as text.
 */
function getEmoteURL(
	photopeaNode: HTMLIFrameElement,
	fileFormat: string,
	emote: string,
	emoteText: string
): Promise<string> {
	return new Promise<string>((resolve) => {
		const photopeaWindow = photopeaNode.contentWindow as Window;
		const save = `app.activeDocument.saveToOE("${fileFormat}")`;
		photopeaWindow.postMessage(save, '*');
		let imgFile: File = new File([''], '', { type: 'image/png' });
		let imageURL: string;

		function windowListenerId(event: MessageEvent) {
			if (!(event.data instanceof ArrayBuffer)) return;
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
			imageURL = URL.createObjectURL(imgFile);
			window.removeEventListener('message', windowListenerId);
			resolve(imageURL);
		}
		window.addEventListener('message', windowListenerId);
	});
}

export {
	setFont as changeFont,
	setEmoteText as changeEmoteText,
	setFontColor as changeFontColor,
	setFontSize as changeFontSize,
	updateEmote,
	photopeaInit,
	getEmoteURL,
	closeAllDocuments as closeCurrentDocument,
};
