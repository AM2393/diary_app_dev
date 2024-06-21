import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function ConfirmDoneDialog({ setShowConfirmDoneDialog, event }) {
  const { state, handlerMap } = useContext(EventListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowConfirmDoneDialog(false)}>
      <Modal.Header>
        <Modal.Title>Dokončit úkol</Modal.Title>
        <CloseButton onClick={() => setShowConfirmDoneDialog(false)} />
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <Alert
          show={!!showAlert}
          variant="danger"
          dismissible
          onClose={() => setShowAlert(null)}
        >
          <Alert.Heading>Nepodařilo se dokončit úkol</Alert.Heading>
          <pre>{showAlert}</pre>
        </Alert>
        {isPending ? (
          <div style={pendingStyle()}>
            <Icon path={mdiLoading} size={2} spin />
          </div>
        ) : null}
        Opravdu chcete dokončit úkol <b>"{event.name}"</b>?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowConfirmDoneDialog(false)}
          disabled={isPending}
        >
          Zavřít
        </Button>
        <Button
          variant="success"
          disabled={isPending}
          onClick={async (e) => {
            try {
              await handlerMap.handleDelete({ id: event.id });
              setShowConfirmDoneDialog(false);
            } catch (e) {
              console.error(e);
              setShowAlert(e.message);
            }
          }}
        >
          Dokončit
        </Button>
      </Modal.Footer>
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

export default ConfirmDoneDialog;
