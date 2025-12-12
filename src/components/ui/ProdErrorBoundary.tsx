"use client";

import type { ErrorInfo, ReactNode } from "react";
import React from "react";

type Props = {
  name: string;
  context?: unknown;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ProdErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") return;

    try {
      console.error(`[ProdErrorBoundary:${this.props.name}]`, {
        error,
        info,
        context: this.props.context,
      });
    } catch {
      // ignore logging errors
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
