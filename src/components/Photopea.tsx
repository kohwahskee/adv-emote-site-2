import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getEmoteFromParams } from './Helpers/EmoteAssets';
/**
 * Includes functions to modify emote in Photopea
 * @module EmoteModifier
 */
import * as EmoteAction from './Helpers/EmoteAction';
import * as EmoteAssets from './Helpers/EmoteAssets';

// Delay for debounce function
const UPDATE_DELAY_IN_MS = 300;

interface Props {
	emoteModifiers: EmoteAssets.EmoteModifiers;
	setEmotePreviewURL: React.Dispatch<React.SetStateAction<string>>;
}

export default function Photopea({ emoteModifiers, setEmotePreviewURL }: Props) {
	const photopeaRef = useRef<HTMLIFrameElement>(null);
	const oldEmoteModifiers = useRef<EmoteAssets.EmoteModifiers>(emoteModifiers);
	const { emotePreset = 'lurk' } = useParams();
	const currentPreset = getEmoteFromParams(emotePreset);
	const { exportFormat } = EmoteAssets.EMOTE_DEFAULTS[currentPreset];

	function initOnComplete() {
		EmoteAction.getEmoteURL(
			photopeaRef.current as HTMLIFrameElement,
			'png',
			currentPreset,
			emoteModifiers.text
		).then((url) => {
			setEmotePreviewURL(url);
		});
	}

	useEffect(() => {
		EmoteAction.closeCurrentDocument(photopeaRef.current?.contentWindow as Window);
		EmoteAction.photopeaInit(
			photopeaRef.current as HTMLIFrameElement,
			currentPreset,
			initOnComplete,
			false
		);
	}, [emotePreset]);

	// Debounce updateEmote function to prevent request spamming;
	useEffect(() => {
		const debouncer = setTimeout(() => {
			EmoteAction.updateEmote(
				oldEmoteModifiers.current,
				emoteModifiers,
				photopeaRef.current?.contentWindow as Window
			);

			//  TODO: Change format and name to be dynamic
			EmoteAction.getEmoteURL(
				photopeaRef.current as HTMLIFrameElement,
				exportFormat,
				emotePreset,
				emoteModifiers.text
			).then((url) => {
				setEmotePreviewURL(url);
			});

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
					currentPreset,
					initOnComplete
				);
			}}
			ref={photopeaRef}
			title='Photopea'
			src='https://www.photopea.com'
			// src='https://www.photopea.com#%7B%22environment%22:%7B%22theme%22:1,%22vmode%22:2,%22intro%22:false,%22menus%22:%5B0%5D%7D%7D'
		/>
	);
}
