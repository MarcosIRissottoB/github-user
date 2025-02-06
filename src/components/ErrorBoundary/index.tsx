import React, { Component, ReactNode } from 'react';
import CustomError from '@/components/Error';

interface Props {
  children: ReactNode;
  fallback?: (props: { error: Error | null; onRetry: () => void }) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      if (this.props.fallback) {
        return this.props.fallback({ error, onRetry: this.handleRetry });
      }

      return (
        <CustomError
          title="Oops, algo salió mal"
          message={
            error?.message ||
            'Parece que ocurrió un problema. Intenta nuevamente.'
          }
          onRetry={this.handleRetry}
          retryLabel="Intentar de nuevo"
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
