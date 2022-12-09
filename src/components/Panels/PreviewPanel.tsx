import '../../css/Style-Preview.scss';
import PreviewPlaceholder from '../../assets/preview-placeholder.gif';

interface Props {
	emotePreviewURL: string;
}

export default function PreviewPanel({ emotePreviewURL }: Props) {
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
				<button className='download-button'>DOWNLOAD</button>
			</div>
		</div>
	);
}
