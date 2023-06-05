import { useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import CustomizationPanel from './Panels/CustomizationPanel';
import PreviewPanel from './Panels/PreviewPanel';
import EmoteSelectionPanel from './Panels/EmoteSelectionPanel';
import PanelSelection from './PanelSelection';
import Photopea from './Photopea';

ReactGA.initialize('G-BGBPG65YN5');

export default function App() {
	// Selection state (either "customization" or "emotes")
	const currentPath = useLocation().pathname;
	const [selectionState, setSelectionState] = useState<
		'emotes' | 'customization'
	>(currentPath === '/' ? 'emotes' : 'customization');
	const [emoteModifiers, setEmoteModifiers] = useState({
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
				path='/'
				element={
					<>
						<Outlet />
						<PanelSelection
							selectionOnclickHandler={onSelectionChange}
							currentSelection={selectionState}
						/>
						<EmoteSelectionPanel currentSelection={selectionState} />
						<Photopea
							emoteModifiers={emoteModifiers}
							setEmotePreviewURL={setEmotePreviewURL}
						/>
					</>
				}>
				<Route
					path='emote/:emotePreset'
					element={
						<>
							<CustomizationPanel
								setEmoteModifiers={setEmoteModifiers}
								currentSelection={selectionState}
							/>
							<PreviewPanel emotePreviewURL={emotePreviewURL} />
						</>
					}
				/>
			</Route>
		</Routes>
	);
}
