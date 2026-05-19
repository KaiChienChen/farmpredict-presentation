/**
 * Print-all mode: renders every chapter × step as a 1920×1080 block
 * so Chrome's Ctrl+P → Save as PDF produces one page per slide.
 *
 * Access via: http://localhost:5174/farmpredict-presentation/?print=1
 * (works in dev server or preview server)
 *
 * Slides animate in; wait ~4 s for all effects to settle before printing.
 */

import { useEffect, useState } from "react";
import { CHAPTERS } from "./registry/chapters";

type Slide = { chapterId: string; step: number; Component: React.ComponentType<{ step: number }> };

const SLIDES: Slide[] = CHAPTERS.flatMap((ch) =>
  ch.narrations.map((_, step) => ({
    chapterId: ch.id,
    step,
    Component: ch.Component,
  }))
);

export function PrintAll() {
  const [ready, setReady] = useState(false);

  // Let all slide animations complete before the user prints
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Print controls — hidden when printing */}
      <div className="print-controls" style={{ padding: "16px 24px", background: "#f5f5f5", display: "flex", gap: 16, alignItems: "center" }}>
        {ready ? (
          <>
            <span style={{ fontFamily: "monospace", fontSize: 14 }}>
              ✓ {SLIDES.length} slides ready — press Ctrl+P → Save as PDF
            </span>
            <button
              onClick={() => window.print()}
              style={{ padding: "8px 20px", fontFamily: "monospace", fontSize: 14, cursor: "pointer" }}
            >
              Print / Save as PDF
            </button>
          </>
        ) : (
          <span style={{ fontFamily: "monospace", fontSize: 14 }}>
            ⏳ Waiting for slide animations to settle…
          </span>
        )}
      </div>

      {/* All slides */}
      <div className="print-stage">
        {SLIDES.map((s) => (
          <div key={`${s.chapterId}-${s.step}`} className="print-slide">
            <s.Component step={s.step} />
          </div>
        ))}
      </div>

      <style>{`
        @media screen {
          body { margin: 0; background: #666; }
          .print-stage {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            padding: 8px;
          }
          .print-slide {
            position: relative;
            width: 1920px;
            height: 1080px;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 2px 12px rgba(0,0,0,0.5);
          }
        }
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-controls { display: none !important; }
          body { margin: 0; padding: 0; background: none; }
          .print-stage { display: block; padding: 0; background: none; }
          .print-slide {
            position: relative;
            width: 1920px;
            height: 1080px;
            overflow: hidden;
            page-break-after: always;
            break-after: page;
          }
          .print-slide * {
            animation-duration: 0ms !important;
            transition-duration: 0ms !important;
          }
        }
        @page { size: 1920px 1080px; margin: 0; }
      `}</style>
    </>
  );
}
