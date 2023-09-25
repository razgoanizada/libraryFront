import { Modal, Button, FormControl } from "react-bootstrap";

const EditTypeDialog = ({
  showEditDialog,
  handleCloseEditDialog,
  selectedTypeDays,
  setSelectedTypeDays,
  selectedTypeAmount,
  setSelectedTypeAmount,
  handleConfirmEdit,
}: any) => {
  return (
    <Modal show={showEditDialog} onHide={handleCloseEditDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Days:</label>
              <FormControl
                placeholder="Enter the amount of days..."
                className="mb-3"
                type="number"
                value={selectedTypeDays}
                onChange={(e) =>
                  setSelectedTypeDays(parseInt(e.target.value, 10))
                }
              />
              <label>Amount:</label>
              <FormControl
                placeholder="Enter the amount of books..."
                type="number"
                value={selectedTypeAmount}
                onChange={(e) =>
                  setSelectedTypeAmount(parseInt(e.target.value, 10))
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditDialog}>
                Cancel
              </Button>
              <Button variant="success" className="save" onClick={handleConfirmEdit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
  );
};

export default EditTypeDialog;
