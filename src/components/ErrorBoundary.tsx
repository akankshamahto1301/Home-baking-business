import { Component, type ErrorInfo, type ReactNode } from 'react';
import { copy } from '@/data/copy';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App render failed:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-cream-100 px-6 text-center text-cocoa-600">
          <div>
            <p className="font-serif text-2xl font-semibold">{copy.error.heading}</p>
            <p className="mt-3 text-sm text-cocoa-400">{copy.error.body}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
