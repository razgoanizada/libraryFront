import { Button } from "react-bootstrap";

const PaginationButtons = ({
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: any) => {
  return (
    <div>
      {hasNext && (
        <Button variant="info" onClick={onNext} className="me-3">
          Next Page
        </Button>
      )}
      {hasPrevious && (
        <Button variant="info" onClick={onPrevious}>
          Previous Page
        </Button>
      )}
    </div>
  );
};

export default PaginationButtons;
