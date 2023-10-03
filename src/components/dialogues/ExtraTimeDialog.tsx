import { Modal, Button, FormControl } from "react-bootstrap";

const ExtraTimeDialog = ({
  show,
  handleClose,
  handleConfirm,
  days,
  setDays,
}: any) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Extra time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Days:</label>
        <FormControl
          placeholder="Enter number of days..."
          className="mb-3"
          type="number"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value, 10))}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" className="save" onClick={handleConfirm}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExtraTimeDialog;
