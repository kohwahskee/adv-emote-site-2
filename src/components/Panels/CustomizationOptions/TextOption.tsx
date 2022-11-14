import TextIcon from '../../../assets/icon-text.svg';
export default function TextOption() {
  return (
    <div className="option-container">
      <div className="text-option option">
        <div className="icon-option">
          <img src={TextIcon} alt="Tet icon" />
        </div>
        <div className="option-box" id="font-option"></div>
      </div>
    </div>
  );
}