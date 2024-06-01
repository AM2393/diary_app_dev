import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import EventCard from "./EventCard";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function EventList() {
  const { eventList } = useContext(EventListContext);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const filteredEventList = eventList.filter(
    (event) => new Date(event.date) > new Date()
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="info" onClick={() => setShowEventForm({})} style={{color: 'royalblue'}}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"royalblue"} /> Nová
          událost
        </Button>
        <Button variant="info" disabled style={{color: 'royalblue'}}> 
          <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"royalblue"} />{" "}
          Nové události
        </Button>
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
      {filteredEventList.map((event) => {
        return (
          <EventCard
            key={event.id}
            event={event}
            setShowEventForm={setShowEventForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default EventList;
