"use client";

import { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function QueryErrorBoundary({ children }: ErrorBoundaryProps) {
  // For now, we'll use the error handling in the component itself
  // In a production app, you might want to use react-error-boundary
  return <>{children}</>;
}
