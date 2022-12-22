import '../../css/Style-Preview.scss';
import { useRive, Fit, Layout, Alignment } from '@rive-app/react-canvas';
import PreviewPlaceholder from '../../assets/preview-placeholder.gif';
// eslint-disable-next-line import/no-unresolved
import RiveDownloadButton from '../../assets/rive_download_button.riv?url';
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
				<a
					href={emotePreviewURL}
					id='download'
					download='emote'>
					<RiveComponent
						style={{
							// width: '90%',
							height: '6em',
							cursor: 'pointer',
						}}
						width={200}
						onLoad={() => {
							rive?.resizeDrawingSurfaceToCanvas();
						}}
					/>
				</a>
			</div>
		</div>
	);
}
