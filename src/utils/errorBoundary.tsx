import React from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    toast.error('Something went wrong');
    console.error('Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2>Something went wrong.</h2>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 bg-black text-white px-4 py-2 rounded-lg"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 