import ColorIcon from '../../../assets/icon-color.svg';
export default function ColorOption() {
  return (
    <div className="option-container">
      <div className="font-option option">
        <div className="icon-option">
          <img src={ColorIcon} alt="Color icon" />
        </div>
        <div className="option-box" id="font-option"></div>
      </div>
    </div>
  );
}