import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./EventStudy.css";

/* ── SVG chart helper ─────────────────────────────────────────────────── */
const DAYS = Array.from({ length: 28 }, (_, i) => i - 13); // -13 to +14

// Positive news: rises from day -7, peaks at +83 on day +1
const POS_BPS = [-2,-1,2,4,7,11,18,26,36,48,59,68,76,81,83,71,46,22,10,5,3,2,1,0,0,0,0,0];
// Negative news: flat, then -26 on day +1
const NEG_BPS = [0,1,0,-1,0,1,-1,0,0,0,1,0,-1,-2,-26,-19,-12,-6,-3,-1,0,0,1,0,0,0,0,0];

const W = 700, H = 200;
const X_PAD = 40, Y_PAD = 20;
const CHART_W = W - X_PAD * 2;
const CHART_H = H - Y_PAD * 2;

function dayToX(p: number) {
  return X_PAD + ((p + 13) / 27) * CHART_W;
}
function bpsToY(bps: number, range: [number, number]) {
  const [lo, hi] = range;
  return Y_PAD + CHART_H - ((bps - lo) / (hi - lo)) * CHART_H;
}

function makePath(bpsArr: number[], range: [number, number]) {
  return bpsArr
    .map((b, i) => `${i === 0 ? "M" : "L"} ${dayToX(DAYS[i]!).toFixed(1)} ${bpsToY(b, range).toFixed(1)}`)
    .join(" ");
}

/* ── Step 0 · Event study design ─────────────────────────────────────── */
function SceneDesign() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--design">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 事件研究：不對稱的代價</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={700}>
        <h2 className="es-design-title">事件研究設計</h2>
      </MaskReveal>
      <div className="es-design-layout">
        <div className="es-timeline">
          <div className="es-tl-bar">
            <div className="es-tl-seg es-tl-seg--pre" />
            <div className="es-tl-event">
              <div className="es-tl-event-dot" />
              <div className="label-mono es-tl-event-label">事件日</div>
            </div>
            <div className="es-tl-seg es-tl-seg--post" />
          </div>
          <div className="es-tl-labels">
            <span className="label-mono">p = −14</span>
            <span className="label-mono">p = 0</span>
            <span className="label-mono">p = +14</span>
          </div>
        </div>
        <div className={`es-design-model card${shown ? " is-shown" : ""}`}>
          <div className="label-mono es-model-label">回歸模型</div>
          <div className="es-model-eq">
            Return<sub>it</sub> = Σ<sub>p</sub> β<sub>p</sub> Day<sub>ip</sub>
            + δ<sub>i</sub> + μ<sub>t</sub> + ε<sub>it</sub>
          </div>
          <div className="es-model-legend">
            <div className="label-mono es-ml-row">β<sub>p</sub> — 事件前後第 p 天的平均超額收益</div>
            <div className="label-mono es-ml-row">δ<sub>i</sub> — 個股固定效應</div>
            <div className="label-mono es-ml-row">μ<sub>t</sub> — 日期固定效應</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · Positive news SVG chart ────────────────────────────────── */
function ScenePositive() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(t);
  }, []);

  const range: [number, number] = [-10, 95];
  const path = makePath(POS_BPS, range);
  const zeroY = bpsToY(0, range);
  const eventX = dayToX(0);
  const peakX = dayToX(1);
  const preX = dayToX(-7);

  return (
    <div className="es-scene scene-pad es-scene--positive">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 正面新聞：七天提前上漲</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-chart-wrap">
        <div className="es-chart-title">正面情感新聞 · 事件前後 beta 調整超額收益（bps）</div>
        <svg className="es-svg" viewBox={`0 0 ${W} ${H}`}>
          {/* Zero line */}
          <line x1={X_PAD} y1={zeroY} x2={W - X_PAD} y2={zeroY} className="es-grid-line" />
          {/* Event day marker */}
          <line x1={eventX} y1={Y_PAD} x2={eventX} y2={H - Y_PAD} className="es-event-line" />
          {/* Pre-announcement marker at day -7 */}
          <line x1={preX} y1={Y_PAD} x2={preX} y2={H - Y_PAD} className="es-pre-line" strokeDasharray="4,3" />
          {/* Chart path */}
          <path
            d={path}
            className="es-line es-line--pos"
            style={{ strokeDasharray: drawn ? "none" : "1500", strokeDashoffset: drawn ? 0 : 1500 }}
          />
          {/* Peak annotation */}
          {drawn && (
            <g>
              <circle cx={peakX} cy={bpsToY(83, range)} r={5} className="es-dot es-dot--pos" />
              <text x={peakX + 8} y={bpsToY(83, range) - 4} className="es-annotation">+83 bps</text>
            </g>
          )}
          {/* x-axis labels */}
          {[-13,-7,0,7,14].map(d => (
            <text key={d} x={dayToX(d)} y={H - 4} className="es-axis-label" textAnchor="middle">{d}</text>
          ))}
          {/* Legend */}
          <text x={X_PAD} y={Y_PAD - 6} className="es-pre-label">p = −7 開始提前上漲</text>
        </svg>
        <MaskReveal show={drawn} delay={800} duration={600}>
          <div className="es-chart-note">
            事件後持續 2 天 · 然後消散 &nbsp;·&nbsp; 聰明錢在公告前 7 天提前佈局
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Step 2 · Negative news SVG chart ────────────────────────────────── */
function SceneNegative() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(t);
  }, []);

  const range: [number, number] = [-35, 15];
  const path = makePath(NEG_BPS, range);
  const zeroY = bpsToY(0, range);
  const eventX = dayToX(0);
  const dropX = dayToX(1);

  return (
    <div className="es-scene scene-pad es-scene--negative">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 負面新聞：事前零反應</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-chart-wrap">
        <div className="es-chart-title">負面情感新聞 · 事件前後 beta 調整超額收益（bps）</div>
        <svg className="es-svg" viewBox={`0 0 ${W} ${H}`}>
          <line x1={X_PAD} y1={zeroY} x2={W - X_PAD} y2={zeroY} className="es-grid-line" />
          <line x1={eventX} y1={Y_PAD} x2={eventX} y2={H - Y_PAD} className="es-event-line" />
          <path
            d={path}
            className="es-line es-line--neg"
            style={{ strokeDasharray: drawn ? "none" : "1500", strokeDashoffset: drawn ? 0 : 1500 }}
          />
          {drawn && (
            <g>
              <circle cx={dropX} cy={bpsToY(-26, range)} r={5} className="es-dot es-dot--neg" />
              <text x={dropX + 8} y={bpsToY(-26, range) + 14} className="es-annotation es-annotation--neg">−26 bps</text>
            </g>
          )}
          {[-13,-7,0,7,14].map(d => (
            <text key={d} x={dayToX(d)} y={H - 4} className="es-axis-label" textAnchor="middle">{d}</text>
          ))}
          <text x={X_PAD} y={Y_PAD - 6} className="es-pre-label">事前：完全沒有提前反應</text>
        </svg>
        <MaskReveal show={drawn} delay={800} duration={600}>
          <div className="es-chart-note">
            事件後持續 3 天 · 比正面新聞更長——負面衝擊難以提前消化
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Step 3 · 83 vs 26 comparison ────────────────────────────────────── */
function SceneAsymmetry() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--asymmetry">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 不對稱：融券限制的印記</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-asym-layout">
        <div className={`es-asym-col${shown ? " is-shown" : ""}`} style={{ transitionDelay: "0ms" }}>
          <div className="label-mono es-asym-label">正面新聞</div>
          <div className="hero-num es-asym-num es-asym-num--pos">+83</div>
          <div className="es-asym-unit">bps · 事件當天</div>
          <div className="es-asym-detail">
            <div className="es-asym-row">提前期：7 天</div>
            <div className="es-asym-row">持續：2 天後消散</div>
            <div className="es-asym-row">機制：直接買入，摩擦小</div>
          </div>
        </div>
        <div className="es-asym-divider" />
        <div className={`es-asym-col${shown ? " is-shown" : ""}`} style={{ transitionDelay: "200ms" }}>
          <div className="label-mono es-asym-label">負面新聞</div>
          <div className="hero-num es-asym-num es-asym-num--neg">−26</div>
          <div className="es-asym-unit">bps · 事件當天</div>
          <div className="es-asym-detail">
            <div className="es-asym-row">提前期：無</div>
            <div className="es-asym-row">持續：3 天後消散</div>
            <div className="es-asym-row">機制：融券困難，無法提前定價</div>
          </div>
        </div>
      </div>
      <MaskReveal show={shown} delay={400} duration={600}>
        <div className="es-asym-insight">
          正面衝擊是負面的 3 倍 &nbsp;·&nbsp; 融券限制讓負面信息無法提前定價——制度性不對稱
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 4 · Literature ─────────────────────────────────────────────── */
function SceneLiterature() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 300),
      setTimeout(() => setLit(2), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--lit">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 文獻支持</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="es-lit-title">制度設計寫在數據裡</h2>
      </MaskReveal>
      <div className="es-lit-cards">
        <div className={`es-lit-card card${lit >= 1 ? " is-lit" : ""}`}>
          <div className="label-mono es-lit-ref">Chen et al. (2019)</div>
          <div className="es-lit-finding">
            漲跌停板 + 融券限制讓負面信息更難被市場吸收——
            市場對壞消息的反應被制度性地壓制
          </div>
        </div>
        <div className={`es-lit-card card${lit >= 2 ? " is-lit" : ""}`}>
          <div className="label-mono es-lit-ref">Nagel (2005)</div>
          <div className="es-lit-finding">
            美股數據同樣顯示：融券限制影響負面消息的傳播速度，
            高度融券限制股票的負面消息傳播更慢
          </div>
        </div>
      </div>
      <MaskReveal show={lit >= 2} delay={200} duration={600}>
        <div className="es-lit-conclusion">
          A 股事件研究的不對稱圖形 = 融券限制的直接統計印記
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 5 · Placebo test SVG ───────────────────────────────────────── */
function ScenePlacebo() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(t);
  }, []);

  const range: [number, number] = [-50, 95];
  const truePosPath = makePath(POS_BPS, range);
  const zeroY = bpsToY(0, range);

  // Generate 30 fake placebo curves (simplified)
  const seed = (n: number) => Math.sin(n * 127.1 + 13.5) * 0.5 + Math.sin(n * 311.7) * 0.3;
  const placeboCurves = Array.from({ length: 30 }, (_, ci) =>
    DAYS.map((_, di) => seed(ci * 100 + di) * 18)
  );

  return (
    <div className="es-scene scene-pad es-scene--placebo">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 安慰劑測試</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-chart-wrap">
        <div className="es-chart-title">安慰劑（灰線）vs 真實事件研究結果（黑線）</div>
        <svg className="es-svg" viewBox={`0 0 ${W} ${H}`}>
          <line x1={X_PAD} y1={zeroY} x2={W - X_PAD} y2={zeroY} className="es-grid-line" />
          {drawn && placeboCurves.map((c, i) => (
            <path
              key={i}
              d={makePath(c, range)}
              className="es-placebo-line"
              style={{ opacity: 0, animation: `esPlaceboFade 400ms ease ${i * 30}ms forwards` }}
            />
          ))}
          <path
            d={truePosPath}
            className="es-line es-line--true"
            style={{ strokeDasharray: drawn ? "none" : "1500", strokeDashoffset: drawn ? 0 : 1500, transitionDelay: "800ms" }}
          />
          {[-13,-7,0,7,14].map(d => (
            <text key={d} x={dayToX(d)} y={H - 4} className="es-axis-label" textAnchor="middle">{d}</text>
          ))}
        </svg>
        <MaskReveal show={drawn} delay={1200} duration={600}>
          <div className="es-chart-note">
            200 次隨機重複在零附近 · 真實效應清楚站在安慰劑分佈之外 ——<strong> 不是統計噪音</strong>
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function EventStudyChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneDesign />;
  if (step === 1) return <ScenePositive />;
  if (step === 2) return <SceneNegative />;
  if (step === 3) return <SceneAsymmetry />;
  if (step === 4) return <SceneLiterature />;
  return <ScenePlacebo />;
}
