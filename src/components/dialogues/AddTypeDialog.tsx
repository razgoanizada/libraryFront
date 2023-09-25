import { Modal, Button, FormControl } from "react-bootstrap";

const AddTypeDialog = ({
  showAddDialog,
  handleCloseAddDialog,
  handleConfirmAdd,
  newTypeName,
  setNewTypeName,
  newTypeDays,
  setNewTypeDays,
  newTypeAmount,
  setNewTypeAmount,
}: any) => {
  return (
    <Modal show={showAddDialog} onHide={handleCloseAddDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Add Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl
                placeholder="Enter type name..."
                className="mb-3"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
              />
              <FormControl
                placeholder="Enter the amount of days..."
                className="mb-3"
                type="number"
                value={newTypeDays}
                onChange={(e) => setNewTypeDays(parseInt(e.target.value, 10))}
              />
              <FormControl
                placeholder="Enter the amount of books..."
                type="number"
                value={newTypeAmount}
                onChange={(e) => setNewTypeAmount(parseInt(e.target.value, 10))}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddDialog}>
                Cancel
              </Button>
              <Button variant="success" className="save" onClick={handleConfirmAdd}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
  );
};

export default AddTypeDialog;
