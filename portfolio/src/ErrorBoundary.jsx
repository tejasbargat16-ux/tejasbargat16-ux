import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>⚠️ Something broke</h1>
          <p>
            The portfolio hit a runtime error and couldn't render.
            Check the browser console for details.
          </p>
          {this.state.error && (
            <pre className="error-fallback-code">
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            className="btn primary"
          >
            RELOAD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}