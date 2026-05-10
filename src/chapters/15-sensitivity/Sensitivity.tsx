import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Sensitivity.css";

/* ── Step 0 · Input format matrix ────────────────────────────────────── */
const INPUT_CONFIGS = [
  { x: "二值化 X", y: "Beta 調整 Y", sr: 9.37, highlight: true },
  { x: "正規化 X", y: "Beta 調整 Y", sr: 6.9, highlight: false },
  { x: "二值化 X", y: "二值化 Y", sr: "3–4", highlight: false },
];

function SceneInput() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sv-scene scene-pad sv-scene--input">
      <div className="sv-header">
        <div className="kicker">Chapter 15 · 穩健性檢驗</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="sv-title">輸入形式的影響</h2>
      </MaskReveal>
      <div className="sv-input-table">
        <div className="sv-input-thead label-mono">
          <span>X 形式</span>
          <span>Y 形式</span>
          <span>夏普比率</span>
        </div>
        {INPUT_CONFIGS.map((c, i) => (
          <div
            key={i}
            className={`sv-input-row${c.highlight ? " sv-input-row--hl" : ""}`}
            style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(8px)", transition: `opacity 500ms ${i * 150}ms, transform 500ms ${i * 150}ms` }}
          >
            <span className="label-mono">{c.x}</span>
            <span className="label-mono">{c.y}</span>
            <span className={`sv-sr-val${c.highlight ? " sv-sr-val--hl" : ""}`}>{c.sr}</span>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={700} duration={600}>
        <div className="sv-note">
          原始設定（二值化 X + Beta 調整 Y）表現最佳；不同輸入形式下結果方向一致
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 1 · k-factor sensitivity ───────────────────────────────────── */
const K_POINTS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
const K_RETURNS = [28, 29, 31, 32, 31, 30, 31, 29, 30, 31, 29];

function SceneKSens() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const W = 560;
  const H = 200;
  const pad = { left: 40, right: 20, top: 20, bottom: 40 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const minR = 20;
  const maxR = 40;

  const pts = K_POINTS.map((_k, i) => {
    const x = pad.left + (i / (K_POINTS.length - 1)) * innerW;
    const y = pad.top + (1 - (K_RETURNS[i] - minR) / (maxR - minR)) * innerH;
    return { x, y };
  });

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const totalLen = 600;

  return (
    <div className="sv-scene scene-pad sv-scene--k">
      <div className="sv-header">
        <div className="kicker">Chapter 15 · 因子個數</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="sv-title">因子個數 k：1 到 1024，結果不敏感</h2>
      </MaskReveal>
      <div className="sv-k-layout">
        <div className="sv-k-chart card">
          <div className="label-mono sv-k-chart-title">日均收益（bps）vs k</div>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            {/* y-axis labels */}
            {[20, 25, 30, 35, 40].map(v => {
              const cy = pad.top + (1 - (v - minR) / (maxR - minR)) * innerH;
              return (
                <g key={v}>
                  <line x1={pad.left - 6} y1={cy} x2={pad.left + innerW} y2={cy} stroke="var(--rule)" strokeWidth={1} />
                  <text x={pad.left - 10} y={cy + 4} textAnchor="end" fontSize={11} fill="var(--text-faint)">{v}</text>
                </g>
              );
            })}
            {/* x-axis labels */}
            {K_POINTS.map((k, i) => {
              const cx = pad.left + (i / (K_POINTS.length - 1)) * innerW;
              return (
                <text key={k} x={cx} y={H - 8} textAnchor="middle" fontSize={10} fill="var(--text-faint)">
                  {k >= 1000 ? `${k / 1000}k` : k}
                </text>
              );
            })}
            {/* line */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLen}
              strokeDashoffset={shown ? 0 : totalLen}
              style={{ transition: "stroke-dashoffset 1200ms cubic-bezier(0.19,1,0.22,1)" }}
            />
            {/* dots */}
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4} fill="var(--accent)"
                style={{ opacity: shown ? 1 : 0, transition: `opacity 300ms ${400 + i * 80}ms` }}
              />
            ))}
          </svg>
        </div>
        <MaskReveal show={shown} delay={800} duration={600}>
          <div className="sv-k-insight">
            預測力來自<strong>殘差</strong>，不是因子數目；
            因子數量的精確選擇對結果影響不顯著
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Step 2 · Portfolio size ──────────────────────────────────────────── */
const PORT_DATA = [
  { size: 25, apr: 158, sr: 10.1, label: "高收益 · 較大波動" },
  { size: 50, apr: 116, sr: 9.37, label: "原始設定", highlight: true },
  { size: 100, apr: 89, sr: 7.2, label: "穩健 · 低收益" },
];

function ScenePortSize() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const maxApr = 180;

  return (
    <div className="sv-scene scene-pad sv-scene--port">
      <div className="sv-header">
        <div className="kicker">Chapter 15 · 組合規模</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="sv-title">組合規模：信號強度 vs 多樣化</h2>
      </MaskReveal>
      <div className="sv-port-layout">
        {PORT_DATA.map((d, i) => (
          <div
            key={d.size}
            className={`sv-port-card card${d.highlight ? " sv-port-card--hl" : ""}`}
            style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(12px)", transition: `opacity 500ms ${i * 150}ms, transform 500ms ${i * 150}ms` }}
          >
            <div className="sv-port-size-label label-mono">每腿 {d.size} 支</div>
            <div className="sv-port-apr">{d.apr}%</div>
            <div className="label-mono sv-port-sr-label">APR · SR {d.sr}</div>
            <div className="sv-port-apr-track">
              <div
                className={`sv-port-apr-fill${d.highlight ? " sv-port-apr-fill--hl" : ""}`}
                style={{ width: shown ? `${(d.apr / maxApr) * 100}%` : "0%", transitionDelay: `${i * 150 + 200}ms` }}
              />
            </div>
            <div className="label-mono sv-port-desc">{d.label}</div>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={700} duration={600}>
        <div className="sv-note">
          標準信號強度 vs 多樣化 trade-off；κ 篩選強度（6%–14% 分位數）對結果影響亦不顯著
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 3 · Robustness conclusion ──────────────────────────────────── */
function SceneRobust() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 400),
      setTimeout(() => setLit(2), 900),
      setTimeout(() => setLit(3), 1400),
      setTimeout(() => setLit(4), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const checks = [
    "輸入形式（X / Y 的二值化 vs 正規化）",
    "因子個數 k（1 到 1024）",
    "組合規模（25 / 50 / 100 支）",
    "κ 篩選強度（6% / 10% / 14% 分位數）",
  ];

  return (
    <div className="sv-scene scene-pad sv-scene--robust">
      <div className="sv-header">
        <div className="kicker">Chapter 15 · 穩健性結論</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="sv-title">四類穩健性檢驗均通過</h2>
      </MaskReveal>
      <div className="sv-robust-list">
        {checks.map((c, i) => (
          <div
            key={i}
            className={`sv-robust-item${lit > i ? " is-lit" : ""}`}
          >
            <span className="sv-robust-check">✓</span>
            <span className="sv-robust-text">{c}</span>
          </div>
        ))}
      </div>
      <MaskReveal show={lit >= 4} delay={300} duration={600}>
        <div className="sv-robust-conclusion">
          FarmPredict 的表現是<strong>穩健的</strong>——
          不依賴特定超參數選擇，不是某個特殊年份的偶然
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function SensitivityChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneInput />;
  if (step === 1) return <SceneKSens />;
  if (step === 2) return <ScenePortSize />;
  return <SceneRobust />;
}
