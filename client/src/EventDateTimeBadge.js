function EventDateTimeBadge({ event }) {
  const dateToShow = new Date(event.date);

  return (
    <div className={"rounded"} style={componentStyle()}>
      <div className={"rounded"} style={dateStyle()}>
        <div>{dateToShow.getDate().toString().padStart(2, "0")}</div>
        <div>{dateToShow.toLocaleString("cs-CZ", { month: "short" })}</div>
      </div>
      <div className={"rounded-bottom"} style={timeStyle()}>
        {dateToShow.toLocaleString("cs-CZ", { timeStyle: "short" })}
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    width: "88px",
    backgroundColor: "royalblue",
    display: "grid",
    height: "max-content",
  };
}

function dateStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    padding: "8px",
    fontSize: "22px",
    fontWeight: 'bold',
    color: "white",
    lineHeight: 1,
  };
}

function timeStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 'bold',
    lineHeight: 1,
    padding: "4px 4px 8px 4px",
    background: "orange",
    color: "white",
  };
}

export default EventDateTimeBadge;
