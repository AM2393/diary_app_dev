function EventDescription({ description }) {
  let color;
  if (description) color = "#ce0160";
  else color = "#989749";

  return (
    <div className={"rounded"} style={componentStyle(color)}>
      {description || "Žádný podrobnější popis úkolu..."}
    </div>
  );
}

function componentStyle(color) {
  return {
    color: color,
    padding: "8px 0",
    width: "max-content",
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
    fontSize: "18px",
    lineHeight: 1,
  };
}

export default EventDescription;
