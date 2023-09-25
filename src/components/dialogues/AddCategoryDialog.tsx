import { Modal, Button, FormControl } from "react-bootstrap";

const AddCategoryDialog = ({
  showAddDialog,
  handleCloseAddDialog,
  handleConfirmAdd,
  newCategoryName,
  setNewCategoryName,
}: any) => {
  return (
    <Modal show={showAddDialog} onHide={handleCloseAddDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="Enter category name..."
              value={newCategoryName}
              onChange={(e) => 
                setNewCategoryName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddDialog}>
              Cancel
            </Button>
            <Button  variant="success" className="save" onClick={handleConfirmAdd}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
  );
};

export default AddCategoryDialog;
