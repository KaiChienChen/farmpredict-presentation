import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./ResidualVsFactor.css";

/* ── Step 0 · Ablation design ─────────────────────────────────────────── */
function SceneDesign() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 400),
      setTimeout(() => setLit(2), 900),
      setTimeout(() => setLit(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const configs = [
    { id: "factor", label: "僅用因子", desc: "9 個話題分數 → LASSO", color: "muted" },
    { id: "residual", label: "僅用殘差", desc: "情感詞殘差 → LASSO", color: "accent" },
    { id: "full", label: "完整模型", desc: "因子 + 殘差 → LASSO", color: "muted" },
  ];

  return (
    <div className="rv-scene scene-pad rv-scene--design">
      <div className="rv-header">
        <div className="kicker">Chapter 14 · 消融實驗</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="rv-title">哪個更重要：因子還是殘差？</h2>
      </MaskReveal>
      <div className="rv-design-grid">
        {configs.map((c, i) => (
          <div
            key={c.id}
            className={`rv-config-card card rv-config-card--${c.color}${lit > i ? " is-lit" : ""}`}
          >
            <div className="rv-config-label">{c.label}</div>
            <div className="label-mono rv-config-desc">{c.desc}</div>
          </div>
        ))}
      </div>
      <MaskReveal show={lit >= 3} delay={200} duration={600}>
        <div className="rv-design-note label-mono">
          控制所有其他條件，只改變輸入特徵組合，測量對預測力的影響
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 1 · Results bar chart ───────────────────────────────────────── */
const ABLATION = [
  { label: "僅用因子", bps: 8, r2: -0.17, highlight: false },
  { label: "僅用殘差", bps: 30, r2: 3.67, highlight: true },
  { label: "完整模型", bps: 31, r2: 3.67, highlight: false },
];

function SceneResults() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  const maxBps = 36;

  return (
    <div className="rv-scene scene-pad rv-scene--results">
      <div className="rv-header">
        <div className="kicker">Chapter 14 · 消融結果</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="rv-results-layout">
        <div className="rv-results-chart">
          <div className="label-mono rv-chart-head">日均收益（bps）</div>
          {ABLATION.map((d, i) => (
            <div key={d.label} className="rv-bar-group">
              <div className="rv-bar-label">{d.label}</div>
              <div className="rv-bar-track">
                <div
                  className={`rv-bar-fill${d.highlight ? " rv-bar-fill--hl" : ""}`}
                  style={{
                    width: shown ? `${(d.bps / maxBps) * 100}%` : "0%",
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
                <span
                  className="rv-bar-val"
                  style={{ opacity: shown ? 1 : 0, transitionDelay: `${i * 120 + 400}ms` }}
                >
                  {d.bps} bps
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="rv-results-r2">
          <div className="label-mono rv-chart-head">調整 R²</div>
          {ABLATION.map((d, i) => (
            <div key={d.label} className="rv-r2-row">
              <div className="rv-r2-val"
                style={{ opacity: shown ? 1 : 0, transitionDelay: `${i * 120 + 200}ms` }}
              >
                <span className={d.r2 < 0 ? "rv-r2-neg" : ""}>{d.r2}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MaskReveal show={shown} delay={700} duration={600}>
        <div className="rv-result-insight">
          殘差獨立攜帶全部預測力；加入因子後幾乎無改善（31 vs 30 bps）
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 2 · Why factors fail ────────────────────────────────────────── */
function SceneWhyFactors() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="rv-scene scene-pad rv-scene--why">
      <div className="rv-header">
        <div className="kicker">Chapter 14 · 為什麼因子無效</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="rv-why-title">話題識別 ≠ 情感判斷</h2>
      </MaskReveal>
      <div
        className="rv-why-layout"
        style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(12px)", transition: "opacity 500ms, transform 500ms" }}
      >
        <div className="rv-why-example card">
          <div className="rv-why-example-text label-mono">
            一篇「IPO 文章」的因子載荷很高
          </div>
          <div className="rv-why-arrow">→</div>
          <div className="rv-why-example-conclusion">
            <div className="rv-why-x">✗</div>
            <div className="rv-why-note label-mono">不代表這支股票今天漲或跌</div>
          </div>
        </div>
        <div className="rv-why-split">
          <div className="rv-why-box card rv-why-box--neutral">
            <div className="rv-why-box-head">因子的功能</div>
            <div className="rv-why-box-body label-mono">識別話題類別<br />（IPO / 宏觀 / 業績…）</div>
            <div className="rv-why-box-tag">中性標籤</div>
          </div>
          <div className="rv-why-box card rv-why-box--signal">
            <div className="rv-why-box-head">殘差的功能</div>
            <div className="rv-why-box-body label-mono">話題無法解釋的偏差<br />（這篇 IPO 文章比平均更正面？）</div>
            <div className="rv-why-box-tag">真正信號</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · Methodology implication ────────────────────────────────── */
function SceneMethodology() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 600),
      setTimeout(() => setLit(2), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rv-scene scene-pad rv-scene--method">
      <div className="rv-header">
        <div className="kicker">Chapter 14 · 方法論含義</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="rv-meth-title">文本 ML 在金融：因子是控制，不是預測</h2>
      </MaskReveal>
      <div className="rv-meth-paths">
        <div className={`rv-meth-path rv-meth-path--wrong card${lit >= 1 ? " is-lit" : ""}`}>
          <div className="rv-meth-path-tag label-mono">❌ 錯誤直覺</div>
          <div className="rv-meth-path-flow">
            <span className="rv-meth-node">話題分數</span>
            <span className="rv-meth-arrow">→</span>
            <span className="rv-meth-node rv-meth-node--target">直接預測收益</span>
          </div>
          <div className="label-mono rv-meth-path-note">因子投資的邏輯：越多因子越好</div>
        </div>
        <div className={`rv-meth-path rv-meth-path--right card${lit >= 2 ? " is-lit" : ""}`}>
          <div className="rv-meth-path-tag label-mono">✓ 正確框架</div>
          <div className="rv-meth-path-flow">
            <span className="rv-meth-node">話題分數</span>
            <span className="rv-meth-arrow">→</span>
            <span className="rv-meth-node rv-meth-node--control">控制公共相關性</span>
            <span className="rv-meth-arrow">→</span>
            <span className="rv-meth-node rv-meth-node--target">殘差信號</span>
            <span className="rv-meth-arrow">→</span>
            <span className="rv-meth-node rv-meth-node--predict">預測收益</span>
          </div>
          <div className="label-mono rv-meth-path-note">先控制話題，讓特異情感浮出水面</div>
        </div>
      </div>
      <MaskReveal show={lit >= 2} delay={300} duration={600}>
        <div className="rv-meth-footer">
          對文本 ML 金融應用有重要的<strong>方法論含義</strong>：不要直接用話題分數預測，要先控制話題，再在殘差裡找信號
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function ResidualVsFactorChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneDesign />;
  if (step === 1) return <SceneResults />;
  if (step === 2) return <SceneWhyFactors />;
  return <SceneMethodology />;
}
