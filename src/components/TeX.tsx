import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

interface TeXProps {
  children: string;
  display?: boolean; // true = display mode (centered, larger), false = inline
  className?: string;
}

export function TeX({ children, display = false, className }: TeXProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        errorColor: "#cc0000",
        strict: "warn",
      });
    } catch {
      return `<span style="color:#cc0000">LaTeX error</span>`;
    }
  }, [children, display]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      style={display ? { display: "block", overflowX: "auto" } : undefined}
    />
  );
}
