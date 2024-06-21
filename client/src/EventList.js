import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import EventCard from "./EventCard";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import ConfirmDoneDialog from "./ConfirmDoneDialog.js";

function EventList() {
  const { eventList } = useContext(EventListContext);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [showConfirmDoneDialog, setShowConfirmDoneDialog] = useState(false);

  const filteredEventList = eventList.filter(
    (event) => new Date(event.date) > new Date()
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button onClick={() => setShowEventForm({})} style={{color: 'yellow', backgroundColor: '#ce0160', fontWeight: 'bold', border: '2px solid yellow'}}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"yellow"} /> Nový
          úkol
        </Button>
        {/* <Button variant="info" disabled style={{color: 'royalblue'}}> 
          <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"royalblue"} />{" "}
          Nové události
        </Button> */}
      </div>
      {!!showEventForm ? (
        <EventForm event={showEventForm} setShowEventForm={setShowEventForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          event={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {!!showConfirmDoneDialog ? (
        <ConfirmDoneDialog
          event={showConfirmDoneDialog}
          setShowConfirmDoneDialog={setShowConfirmDoneDialog}
        />
      ) : null}
      {!filteredEventList.length ? (<h1 style={{marginTop: "2rem", color: "#ffd900"}}>Zatím nemáte žádný úkol</h1>) : null}
      {filteredEventList.map((event) => {
        return (
          <EventCard
            key={event.id}
            event={event}
            setShowEventForm={setShowEventForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
            setShowConfirmDoneDialog={setShowConfirmDoneDialog}
          />
        );
      })}
    </Container>
  );
}

export default EventList;
