import FontSizeIcon from '../../../assets/icon-font-size.svg';
export default function FontSizeOption() {
  return (
    <div className="option-container">
      <div className="font-option option">
        <div className="icon-option">
          <img src={FontSizeIcon} alt="Font size icon" />
        </div>
        <div className="option-box" id="font-option"></div>
      </div>
    </div>
  );
}