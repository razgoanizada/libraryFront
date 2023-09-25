import { Modal, Button, FormControl } from "react-bootstrap";

const EditCategoryDialog = ({
  showEditDialog,
  handleCloseEditDialog,
  handleConfirmEdit,
  selectedCategoryName,
  setSelectedCategoryName,
}: any) => {
  return (
    <Modal show={showEditDialog} onHide={handleCloseEditDialog}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormControl
        placeholder="Enter category name..."
        value={selectedCategoryName}
        onChange={(e) => setSelectedCategoryName(e.target.value)}
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

export default EditCategoryDialog;
