import '../../css/Style-Preview.scss';
import { useRive, Fit, Layout, Alignment } from '@rive-app/react-canvas';
import PreviewPlaceholder from '../../assets/preview-placeholder.gif';
// eslint-disable-next-line import/no-unresolved
import RiveDownloadButton from '../../assets/download-button(1).riv?url';
// import Rive from '@rive-app/canvas/rive_advanced.mjs';

interface Props {
	emotePreviewURL: string;
}

// TODO: Add download functionality (maybe some animation too?)
export default function PreviewPanel({ emotePreviewURL }: Props) {
	const { rive, RiveComponent } = useRive({
		src: RiveDownloadButton,
		stateMachines: 'State Machine 1',
		layout: new Layout({
			fit: Fit.Contain,
			alignment: Alignment.Center,
		}),
		autoplay: true,
	});

	// rive?.play();
	return (
		<div className='preview-panel panel'>
			<h1>Preview</h1>
			<div className='emote-wrapper'>
				<div className='emote-container'>
					<img
						src={emotePreviewURL || PreviewPlaceholder}
						alt='Generated Emote'
						className='generated-emote'
					/>
				</div>
				<div
					onClick={() => {
						window.open(emotePreviewURL, '_blank');
					}}
					id='download'
				/>
			</div>
			<RiveComponent
				style={{
					// width: '90%',
					position: 'absolute',
					inset: 0,
				}}
				onLoad={() => {
					rive?.resizeDrawingSurfaceToCanvas();
				}}
			/>
		</div>
	);
}
