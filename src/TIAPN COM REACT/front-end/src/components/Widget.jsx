export default function Widget({ title, count, icon }) {
  return (
    <div className="widget">
      <h5>{title}</h5>
      <div className="widget-content">
        <span className="count">{count}</span>
        <i className={`fa ${icon}`}></i>
      </div>
    </div>
  );
}
