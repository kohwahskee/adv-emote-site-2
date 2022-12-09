import React, { useEffect, useRef } from 'react';
/**
 * Includes functions to modify emote in Photopea
 * @module EmoteModifier
 */
import * as EmoteAction from './EmoteAction';
import * as EmoteAssets from './EmoteAssets';

// Delay for debounce function
const UPDATE_DELAY_IN_MS = 2000;

interface Props {
	emoteModifiers: EmoteAssets.EmoteModifiers;
	setEmotePreviewURL: React.Dispatch<React.SetStateAction<string>>;
}

export default function Photopea({ emoteModifiers, setEmotePreviewURL }: Props) {
	const photopeaRef = useRef<HTMLIFrameElement>(null);
	const oldEmoteModifiers = useRef<EmoteAssets.EmoteModifiers>(emoteModifiers);

	// Debounce updateEmote function to prevent request spamming (2 seconds delay);
	useEffect(() => {
		const debouncer = setTimeout(() => {
			console.log('updated');
			EmoteAction.updateEmote(
				oldEmoteModifiers.current,
				emoteModifiers,
				photopeaRef.current?.contentWindow as Window
			);
			EmoteAction.getEmoteURL(
				photopeaRef.current as HTMLIFrameElement,
				'png',
				'lurk',
				emoteModifiers.text,
				setEmotePreviewURL
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
				EmoteAction.photopeaInit(
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
