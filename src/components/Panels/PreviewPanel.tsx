import '../../css/Style-Preview.scss';
import PreviewPlaceholder from '../../assets/preview-placeholder.gif';

export default function PreviewPanel() {
  return (
    <div className='preview-panel panel'>
      <h1>Preview</h1>
      <div className='emote-wrapper'>
        <div className='emote-container'>
          <img
            src={PreviewPlaceholder}
            alt='Generated Emote'
            className='generated-emote'
          />
        </div>
        <button className='download-button'>DOWNLOAD</button>
      </div>
    </div>
  );
}
