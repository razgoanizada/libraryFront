import { Modal, Button, FormControl } from "react-bootstrap";

const ChangePasswordDialog = ({
  showChangePasswordDialog,
  handleCloseChangeDialog,
  passwordConfirm,
  setPasswordConfirm,
  handleConfirmChange,
  password,
  setPassword,
}: any) => {
  return (
    <Modal show={showChangePasswordDialog} onHide={handleCloseChangeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Password:</label>
        <FormControl
          placeholder="Enter the new password..."
          className="mb-3"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Repeat password:</label>
        <FormControl
          placeholder="Enter the repeat password..."
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseChangeDialog}>
          Cancel
        </Button>
        <Button
          className="save"
          variant="success"
          onClick={handleConfirmChange}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordDialog;
