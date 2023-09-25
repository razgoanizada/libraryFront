import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <h1 className="d-flex justify-content-center align-items-center mt-4 fs-1">
            Sorry, something went wrong. Try again later.
          </h1>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
