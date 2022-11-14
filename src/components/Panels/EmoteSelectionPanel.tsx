import '../../css/Style-EmoteSelection.scss';

interface Props {
  currentSelection: string | null;
}

export default function EmoteSelectionPanel(props: Props) {
  return (
    <div className={"emote-selection-panel panel" + (props.currentSelection === "")}>
      <h1>Emotes</h1>
    </div>
  );
}