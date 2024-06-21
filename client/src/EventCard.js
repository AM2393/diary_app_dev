import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import EventDateTimeBadge from "./EventDateTimeBadge";
import EventDetail from "./EventDetail";

import Icon from "@mdi/react";
import { mdiCheckOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function EventCard({ event, setShowEventForm, setShowConfirmDeleteDialog, setShowConfirmDoneDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 rounded" style={componentStyle()}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <EventDetail event={event} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h5 style={{
            color:'crimson',
            fontWeight: 'bolder'
          }}>Splnit do:</h5>
          <EventDateTimeBadge event={event} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => setShowConfirmDoneDialog(event)}
          size={"sm"}
          style={{ flex: "1 0 auto", borderRadius: "24px" }}
          variant="success"
        >
          <Icon path={mdiCheckOutline} size={0.7} style={{marginRight: '4px'}} />
          Splněno
        </Button>
        <Button
          onClick={() => setShowEventForm(event)}
          size={"sm"}
          style={{ flex: "1 0 auto", borderRadius: "24px" }}
        >
          <Icon path={mdiPencil} size={0.7} style={{marginRight: '4px'}}/>
          Upravit
        </Button>
        <Button
          onClick={() => setShowConfirmDeleteDialog(event)}
          size={"sm"}
          variant="danger"
          style={{ flex: "1 0 auto", borderRadius: "24px" }}
        >
          <Icon path={mdiTrashCanOutline} size={0.7} style={{marginRight: '4px'}}/>
          Smazat
        </Button>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "flex",
    gap: "1rem",
    maxWidth: "640px",
  };
}

export default EventCard;
