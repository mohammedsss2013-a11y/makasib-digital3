"use client";

import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface ArticleInteractiveBoundaryProps {
  children: ReactNode;
}

interface ArticleInteractiveBoundaryState {
  hasError: boolean;
}

export default class ArticleInteractiveBoundary extends Component<
  ArticleInteractiveBoundaryProps,
  ArticleInteractiveBoundaryState
> {
  state: ArticleInteractiveBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ArticleInteractiveBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("خطأ في المكون التفاعلي داخل المقال:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm leading-7 text-amber-200" role="status">
          تعذر تحميل الأداة التفاعلية حالياً، لكن محتوى المقال متاح للقراءة.
        </div>
      );
    }

    return this.props.children;
  }
}