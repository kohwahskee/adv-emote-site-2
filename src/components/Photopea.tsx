import { useEffect, useRef } from 'react';
import * as EmoteModifier from './EmoteModifiers';
import * as EmoteAssets from './EmoteAssets';

// 4 messages are sent when Photopea finishes loading psd and fonts
const READY_COUNT_ON_LOAD = 4;
// Delay for debounce function
const UPDATE_DELAY_IN_MS = 2000;

// Initialize Photopea (load psd and fonts)
function photopeaInit(photopeaNode: HTMLIFrameElement, fileURL: string, fontURL?: string) {
	let messageCount = 0;
	const photopea = photopeaNode;
	const photopeaWindow = photopea.contentWindow;
	const loadFont = `app.open("${fontURL}")`;
	const loadImage = `app.open("${fileURL}", false)`;

	window.addEventListener('message', (e) => {
		if (e.origin === 'https://www.photopea.com') {
			messageCount++;
			if (messageCount === READY_COUNT_ON_LOAD) {
				// When finishes loading psd and fonts, change font to BPdots
				EmoteModifier.changeFont(photopeaWindow, 'user', 'BPdots');
			}
			console.log(`Message from Photopea: ${e.data}`);
			console.log(messageCount);
		}
	});

	if (photopeaWindow) {
		photopeaWindow.postMessage(loadFont, '*');
		photopeaWindow.postMessage(loadImage, '*');
	}
}

interface Props {
	emoteModifiers: EmoteAssets.EmoteModifiers;
}

export default function Photopea({ emoteModifiers }: Props) {
	const photopeaRef = useRef<HTMLIFrameElement>(null);
	const oldEmoteModifiers = useRef<EmoteAssets.EmoteModifiers>(emoteModifiers);

	// Debounce updateEmote function to prevent request spamming (2 seconds delay);
	useEffect(() => {
		const debouncer = setTimeout(() => {
			EmoteModifier.updateEmote(
				oldEmoteModifiers.current,
				emoteModifiers,
				photopeaRef.current?.contentWindow as Window
			);
			oldEmoteModifiers.current = emoteModifiers;
		}, UPDATE_DELAY_IN_MS);

		return () => {
			clearTimeout(debouncer);
		};
	}, [emoteModifiers]);

	return (
		<iframe
			onLoad={() => {
				photopeaInit(
					photopeaRef.current as HTMLIFrameElement,
					EmoteAssets.lurkLink,
					EmoteAssets.comiciLink
				);
			}}
			ref={photopeaRef}
			title='Photopea'
			src='https://www.photopea.com#%7B%22environment%22:%7B%22theme%22:1,%22vmode%22:2,%22intro%22:false,%22menus%22:%5B0%5D%7D%7D'
		/>
	);
}
