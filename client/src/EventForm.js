import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function EventForm({ setShowEventForm, event }) {
  const { state, handlerMap } = useContext(EventListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowEventForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          try {
            if (event.id) {
              formData.id = event.id;
              formData.date = eventDateToInput(formData.date) + ':00.000+02:00';
              await handlerMap.handleUpdate(formData);
            } else {
              formData.date = eventDateToInput(formData.date) + ":00.000+02:00";
              await handlerMap.handleCreate(formData);
            }

            setShowEventForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`${
            event.id ? "Upravit" : "Vytvořit"
          } úkol`}</Modal.Title>
          <CloseButton onClick={() => setShowEventForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit nebo upravit úkol</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Termín do</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              // required
              defaultValue={
                event.date ? eventDateToInput(event.date) : eventDateToInputMinutes(1).slice(0,16)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Název úkolu</Form.Label>
            <Form.Control
              type="text"
              name="name"
              // required
              defaultValue={event.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Popis úkolu (nepovinný)</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name="description"
              // required
              defaultValue={event.description}
              placeholder="Zadejte popis úkolu..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEventForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {event.id ? "Upravit" : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

function eventDateToInput(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function eventDateToInputMinutes(hrsOffset) {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hoursWithOffset = date.getHours() + 1
  const hours = hoursWithOffset.toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default EventForm;
