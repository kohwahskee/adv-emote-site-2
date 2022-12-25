import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomizationPanel from './Panels/CustomizationPanel';
import PreviewPanel from './Panels/PreviewPanel';
import EmoteSelectionPanel from './Panels/EmoteSelectionPanel';
import PanelSelection from './PanelSelection';
import Photopea from './Photopea';

export default function App() {
	// Selection state (either "customization" or "emotes")
	const [selectionState, setSelectionState] = useState<'emotes' | 'customization'>('customization');
	const [emoteModifers, setEmoteModifiers] = useState({
		text: '',
		color: '#f00',
		font: 'Arial',
		fontSize: 20,
	});
	const [emotePreviewURL, setEmotePreviewURL] = useState<string>('');

	const onSelectionChange = (state: 'emotes' | 'customization'): void => {
		setSelectionState(state);
	};

	return (
		<div>
			<PanelSelection
				selectionOnclickHandler={onSelectionChange}
				currentSelection={selectionState}
			/>
			<Routes>
				<Route
					path='/emote/:emotePreset'
					element={
						<CustomizationPanel
							setEmoteModifiers={setEmoteModifiers}
							currentSelection={selectionState}
						/>
					}
				/>
			</Routes>

			<EmoteSelectionPanel currentSelection={selectionState} />
			<PreviewPanel emotePreviewURL={emotePreviewURL} />
			<Photopea
				setEmotePreviewURL={setEmotePreviewURL}
				emoteModifiers={emoteModifers}
			/>
		</div>
	);
}
