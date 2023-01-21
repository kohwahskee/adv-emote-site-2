import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CustomizationPanel from './Panels/CustomizationPanel';
import PreviewPanel from './Panels/PreviewPanel';
import EmoteSelectionPanel from './Panels/EmoteSelectionPanel';
import PanelSelection from './PanelSelection';
import Photopea from './Photopea';

export default function App() {
	// Selection state (either "customization" or "emotes")
	const currentPath = useLocation().pathname;
	const [selectionState, setSelectionState] = useState<'emotes' | 'customization'>(
		currentPath === '/' ? 'emotes' : 'customization'
	);
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
		<Routes>
			<Route
				path='/emote/:emotePreset'
				element={
					<>
						<PanelSelection
							selectionOnclickHandler={onSelectionChange}
							currentSelection={selectionState}
						/>
						<CustomizationPanel
							setEmoteModifiers={setEmoteModifiers}
							currentSelection={selectionState}
						/>
						<EmoteSelectionPanel currentSelection={selectionState} />
						<PreviewPanel emotePreviewURL={emotePreviewURL} />
						<Photopea
							setEmotePreviewURL={setEmotePreviewURL}
							emoteModifiers={emoteModifers}
						/>
					</>
				}
			/>
			<Route
				index
				element={
					<>
						<PanelSelection
							selectionOnclickHandler={onSelectionChange}
							currentSelection={selectionState}
						/>
						<EmoteSelectionPanel currentSelection={selectionState} />
					</>
				}
			/>
		</Routes>
	);
}
