import { Button } from "react-bootstrap";

const PaginationButtons = ({ onNext, onPrevious, hasNext, hasPrevious } : any) => {
  return (
    <div>
      {hasNext && (
        <Button onClick={onNext} className="me-3">
          Next Page
        </Button>
      )}
      {hasPrevious && (
        <Button onClick={onPrevious}>Previous Page</Button>
      )}
    </div>
  );
};

export default PaginationButtons;
