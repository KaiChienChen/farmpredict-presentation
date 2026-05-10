import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Comparison.css";

/* ── Step 0 · Models intro ───────────────────────────────────────────── */
const MODELS = [
  { name: "BERT", desc: "12層 Transformer · 768 隱藏單元 · 12 注意力頭", tag: "預訓練中文" },
  { name: "BiRNN", desc: "雙向 LSTM · 序列建模", tag: "預訓練中文" },
  { name: "TextCNN", desc: "一維卷積神經網路 · 文字特徵提取", tag: "預訓練中文" },
  { name: "FarmPredict", desc: "PCA + 條件篩選 + LASSO · 無需預訓練", tag: "無預訓練" },
];

function SceneModels() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = MODELS.map((_, i) =>
      setTimeout(() => setLit(i + 1), 300 + i * 350)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="cp-scene scene-pad cp-scene--models">
      <div className="cp-header">
        <div className="kicker">Chapter 13 · 深度學習 vs FarmPredict</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="cp-models-title">同樣數據 · 同樣滾動窗口 · 誰更好？</h2>
      </MaskReveal>
      <div className="cp-models-grid">
        {MODELS.map((m, i) => (
          <div
            key={m.name}
            className={`cp-model-card card${m.name === "FarmPredict" ? " cp-model-card--farm" : ""}${lit > i ? " is-lit" : ""}`}
          >
            <div className="label-mono cp-model-tag">{m.tag}</div>
            <div className="cp-model-name">{m.name}</div>
            <div className="cp-model-desc label-mono">{m.desc}</div>
          </div>
        ))}
      </div>
      <MaskReveal show={lit >= 4} delay={100} duration={600}>
        <div className="cp-models-note">相同數據 · 相同 10 個滾動窗口 · 直接比較日均收益和 R²</div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 1 · Performance bar chart ──────────────────────────────────── */
const PERF_DATA = [
  { name: "FarmPredict", bps: 31, r2: 3.67, pretrained: true, highlight: true },
  { name: "BERT", bps: 13, r2: 0.75, pretrained: true },
  { name: "BiRNN", bps: 14, r2: 1.33, pretrained: true },
  { name: "TextCNN", bps: 15, r2: 1.20, pretrained: true },
];

function ScenePerf() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  const maxBps = 35;

  return (
    <div className="cp-scene scene-pad cp-scene--perf">
      <div className="cp-header">
        <div className="kicker">Chapter 13 · 結果對比</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="cp-perf-layout">
        <div className="cp-perf-chart">
          <div className="label-mono cp-chart-title">日均收益（bps）</div>
          {PERF_DATA.map((d, i) => (
            <div key={d.name} className="cp-bar-row">
              <div className="cp-bar-label">{d.name}</div>
              <div className="cp-bar-track">
                <div
                  className={`cp-bar-fill${d.highlight ? " cp-bar-fill--hl" : ""}`}
                  style={{ width: shown ? `${(d.bps / maxBps) * 100}%` : "0%", transitionDelay: `${i * 100}ms` }}
                />
                <span
                  className="cp-bar-val"
                  style={{ opacity: shown ? 1 : 0, transitionDelay: `${i * 100 + 400}ms` }}
                >
                  {d.bps} bps
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="cp-perf-r2">
          <div className="label-mono cp-chart-title">調整 R²</div>
          {PERF_DATA.map((d, i) => (
            <div key={d.name} className="cp-r2-row">
              <div className="cp-bar-label">{d.name}</div>
              <div className="cp-r2-val" style={{ opacity: shown ? 1 : 0, transitionDelay: `${i * 100 + 200}ms` }}>
                {d.r2}%
              </div>
            </div>
          ))}
        </div>
      </div>
      <MaskReveal show={shown} delay={600} duration={600}>
        <div className="cp-perf-note">
          FarmPredict 日均 31 bps vs BERT 13 bps · 差距 18 bps · 統計顯著 p &lt; 0.01
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 2 · Pre-training effect ─────────────────────────────────────── */
const PRETRAIN_DATA = [
  { name: "BERT", pretrained: 13, random: 6.5 },
  { name: "BiRNN", pretrained: 14, random: 7 },
  { name: "TextCNN", pretrained: 15, random: 6 },
];

function ScenePretraining() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const max = 18;

  return (
    <div className="cp-scene scene-pad cp-scene--pretrain">
      <div className="cp-header">
        <div className="kicker">Chapter 13 · 預訓練的作用</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="cp-pretrain-title">預訓練 vs 隨機初始化</h2>
      </MaskReveal>
      <div className="cp-pretrain-chart">
        {PRETRAIN_DATA.map((d, i) => (
          <div key={d.name} className="cp-pt-group">
            <div className="cp-pt-name">{d.name}</div>
            <div className="cp-pt-bars">
              <div className="cp-pt-bar-row">
                <span className="label-mono cp-pt-bar-label">預訓練</span>
                <div className="cp-pt-bar-wrap">
                  <div
                    className="cp-pt-bar cp-pt-bar--pretrained"
                    style={{ width: shown ? `${(d.pretrained / max) * 100}%` : "0%", transitionDelay: `${i * 150}ms` }}
                  />
                </div>
                <span className="cp-pt-val" style={{ opacity: shown ? 1 : 0 }}>{d.pretrained} bps</span>
              </div>
              <div className="cp-pt-bar-row">
                <span className="label-mono cp-pt-bar-label">隨機初始化</span>
                <div className="cp-pt-bar-wrap">
                  <div
                    className="cp-pt-bar cp-pt-bar--random"
                    style={{ width: shown ? `${(d.random / max) * 100}%` : "0%", transitionDelay: `${i * 150 + 150}ms` }}
                  />
                </div>
                <span className="cp-pt-val" style={{ opacity: shown ? 1 : 0 }}>{d.random} bps</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={600} duration={600}>
        <div className="cp-pretrain-insight">
          深度模型能力主要來自<strong>預訓練學到的語言表示</strong>，不是架構本身的優勢
          <br />
          FarmPredict 無需預訓練，直接從任務數據學，效果更好
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 3 · Momentum in A-shares ───────────────────────────────────── */
const MOMENTUM_DATA = [
  { label: "1 週動量（5 天）", apr: -12, sr: -0.9 },
  { label: "1 月動量（22 天）", apr: -18, sr: -1.2 },
  { label: "3 月動量（66 天）", apr: -14, sr: -1.1 },
];

function SceneMomentum() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="cp-scene scene-pad cp-scene--momentum">
      <div className="cp-header">
        <div className="kicker">Chapter 13 · 動量策略在 A 股</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="cp-mom-title">動量在 A 股完全反向</h2>
      </MaskReveal>
      <div className="cp-mom-bars">
        {MOMENTUM_DATA.map((d, i) => (
          <div
            key={d.label}
            className="cp-mom-row"
            style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(10px)", transition: `opacity 500ms ${i * 150}ms, transform 500ms ${i * 150}ms` }}
          >
            <div className="cp-mom-label">{d.label}</div>
            <div className="cp-mom-bar-wrap">
              <div className="cp-mom-zero" />
              <div
                className="cp-mom-bar"
                style={{ width: shown ? `${(Math.abs(d.apr) / 25) * 100}%` : "0%", transitionDelay: `${i * 150 + 200}ms` }}
              />
            </div>
            <div className="cp-mom-val">
              <span className="cp-mom-apr">{d.apr}%</span>
              <span className="label-mono cp-mom-sr">SR {d.sr}</span>
            </div>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={500} duration={600}>
        <div className="cp-mom-ref card">
          <div className="label-mono">對比：FarmPredict 同期</div>
          <div className="cp-mom-farm">+116% APR · SR 9.37</div>
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 4 · Mechanism ───────────────────────────────────────────────── */
function SceneMechanism() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 400),
      setTimeout(() => setLit(2), 1100),
      setTimeout(() => setLit(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { label: "追漲殺跌", desc: "散戶在市場上漲時追買，下跌時恐慌賣出" },
    { label: "短期過衝", desc: "股價因羊群效應超過基本面合理估值" },
    { label: "反轉", desc: "過衝之後修正，過去漲的反而跌" },
  ];

  return (
    <div className="cp-scene scene-pad cp-scene--mechanism">
      <div className="cp-header">
        <div className="kicker">Chapter 13 · 動量失效的原因</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="cp-mech-title">A 股散戶效應：過衝後反轉</h2>
      </MaskReveal>
      <div className="cp-mech-flow">
        {steps.map((s, i) => (
          <div key={s.label} className="cp-mech-step">
            {i > 0 && <div className="cp-mech-arrow">→</div>}
            <div className={`cp-mech-node card${lit > i ? " is-lit" : ""}`}>
              <div className="cp-mech-node-main">{s.label}</div>
              <div className="label-mono cp-mech-node-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <MaskReveal show={lit >= 3} delay={200} duration={600}>
        <div className="cp-mech-note">
          動量在美股（機構主導）有效，在 A 股（散戶主導）失效——制度和投資者結構決定信號方向
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function ComparisonChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneModels />;
  if (step === 1) return <ScenePerf />;
  if (step === 2) return <ScenePretraining />;
  if (step === 3) return <SceneMomentum />;
  return <SceneMechanism />;
}
