import './Tooltip.css';

function Tooltip(props) {
  const { text, children } = props;
  return (
    <div className="tooltip z-999 flex items-center">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
}

export default Tooltip;