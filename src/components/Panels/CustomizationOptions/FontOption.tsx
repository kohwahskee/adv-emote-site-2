import FontIcon from '../../../assets/icon-font.svg';
export default function FontOption() {
  return (
    <div className="option-container">
      <div className="font-option option">
        <div className="icon-option">
          <img src={FontIcon} alt="Font icon" />
        </div>
        <div className="option-box" id="font-option"></div>
      </div>
    </div>
  );
}