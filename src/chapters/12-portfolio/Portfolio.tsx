import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Portfolio.css";

/* ── Step 0 · Construction rules ─────────────────────────────────────── */
const FLOW_STEPS = [
  { label: "評分", sub: "模型處理當日所有新聞，算出每股情感分數" },
  { label: "排序", sub: "所有有新聞的股票按情感分數排序" },
  { label: "多50 / 空50", sub: "做多最高分 50 支，做空最低分 50 支，各 1% 倉位" },
  { label: "收盤競價", sub: "當天收盤競價成交，流動性最佳" },
  { label: "次日平倉", sub: "持倉一天，次日收盤前平倉" },
];

function SceneRules() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = FLOW_STEPS.map((_, i) =>
      setTimeout(() => setLit(i + 1), 300 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="pf-scene scene-pad pf-scene--rules">
      <div className="pf-header">
        <div className="kicker">Chapter 12 · 投資組合：年化 116%</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="pf-rules-title">每日交易流程</h2>
      </MaskReveal>
      <div className="pf-flow">
        {FLOW_STEPS.map((s, i) => (
          <div key={s.label} className="pf-flow-step">
            {i > 0 && <div className="pf-flow-connector" />}
            <div className={`pf-flow-node card${lit > i ? " is-lit" : ""}`}>
              <div className="pf-flow-node-num label-mono">{String(i + 1).padStart(2, "0")}</div>
              <div className="pf-flow-node-label">{s.label}</div>
              <div className="pf-flow-node-sub label-mono">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 1 · Main results ────────────────────────────────────────────── */
function SceneResults() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pf-scene scene-pad pf-scene--results">
      <div className="pf-header">
        <div className="kicker">Chapter 12 · 主要結果</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pf-results-layout">
        <div className={`pf-result-block${shown ? " is-shown" : ""}`} style={{ transitionDelay: "0ms" }}>
          <div className="label-mono pf-rb-label">等權組合（EW）</div>
          <div className="pf-rb-stats">
            <div>
              <div className="hero-num pf-rb-num">116%</div>
              <div className="label-mono pf-rb-sub">年化收益率 APR</div>
            </div>
            <div>
              <div className="hero-num pf-rb-num">9.37</div>
              <div className="label-mono pf-rb-sub">夏普比率 SR</div>
            </div>
          </div>
          <div className="pf-rb-detail label-mono">多腿 80% · 空腿 18%</div>
        </div>
        <div className="pf-rb-divider" />
        <div className={`pf-result-block pf-result-block--vw${shown ? " is-shown" : ""}`} style={{ transitionDelay: "200ms" }}>
          <div className="label-mono pf-rb-label">市值加權組合（VW）</div>
          <div className="pf-rb-stats">
            <div>
              <div className="hero-num pf-rb-num pf-rb-num--muted">48%</div>
              <div className="label-mono pf-rb-sub">年化收益率 APR</div>
            </div>
            <div>
              <div className="hero-num pf-rb-num pf-rb-num--muted">3.34</div>
              <div className="label-mono pf-rb-sub">夏普比率 SR</div>
            </div>
          </div>
          <div className="pf-rb-detail label-mono">大盤股效率高 · 情感邊際效果小</div>
        </div>
      </div>
      <MaskReveal show={shown} delay={400} duration={600}>
        <div className="pf-results-note">2015–2019 完全 hold-out 測試 · 訓練期不可見</div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 2 · Market exposure ─────────────────────────────────────────── */
function SceneMarketExp() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pf-scene scene-pad pf-scene--market">
      <div className="pf-header">
        <div className="kicker">Chapter 12 · 市場風險暴露</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pf-market-layout">
        <div className={`pf-market-main${shown ? " is-shown" : ""}`}>
          <div className="label-mono pf-market-label">多空組合 R² (市場)</div>
          <div className="pf-r2-visual">
            <div className="pf-r2-bar-wrap">
              <div
                className="pf-r2-bar pf-r2-bar--alpha"
                style={{ width: shown ? "93.7%" : "0%", transition: "width 1200ms cubic-bezier(0.19,1,0.22,1) 0.3s" }}
              >
                <span className="pf-r2-bar-label">Alpha 93.7%</span>
              </div>
              <div
                className="pf-r2-bar pf-r2-bar--market"
                style={{ width: shown ? "6.3%" : "0%", transition: "width 1200ms cubic-bezier(0.19,1,0.22,1) 0.5s" }}
              >
                <span className="pf-r2-bar-label pf-r2-bar-label--sm">6.3%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pf-market-stats">
          {[
            { label: "Alpha 年化", val: "115%", sub: "幾乎等於原始收益" },
            { label: "日均收益", val: "31 bps", sub: "每個交易日" },
            { label: "多腿 R²市場", val: "44.7%", sub: "個別暴露大" },
            { label: "空腿 R²市場", val: "48.4%", sub: "合起來相互對沖" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="pf-market-stat card"
              style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(10px)", transition: `opacity 500ms ${i * 80 + 300}ms, transform 500ms ${i * 80 + 300}ms` }}
            >
              <div className="label-mono pf-ms-label">{s.label}</div>
              <div className="pf-ms-val">{s.val}</div>
              <div className="label-mono pf-ms-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · Transaction costs ──────────────────────────────────────── */
function SceneCosts() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const costs = [
    { label: "印花稅", bps: 10, note: "0.1%，只收賣方" },
    { label: "過戶費", bps: 1, note: "上交所，買賣都收" },
    { label: "佣金", bps: 5, note: "兩邊各 2.5 bps" },
  ];

  return (
    <div className="pf-scene scene-pad pf-scene--costs">
      <div className="pf-header">
        <div className="kicker">Chapter 12 · 真實交易成本</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pf-costs-layout">
        <div className="pf-cost-breakdown">
          <div className="label-mono pf-cb-title">每次完整交易（開+平）= 16 bps</div>
          {costs.map((c, i) => (
            <div
              key={c.label}
              className="pf-cost-row"
              style={{ opacity: shown ? 1 : 0, transitionDelay: `${i * 150}ms` }}
            >
              <div className="pf-cost-label">{c.label}</div>
              <div className="pf-cost-bar-wrap">
                <div
                  className="pf-cost-bar"
                  style={{ width: shown ? `${(c.bps / 16) * 100}%` : "0%", transitionDelay: `${i * 150 + 200}ms` }}
                />
              </div>
              <div className="pf-cost-bps">{c.bps} bps</div>
              <div className="label-mono pf-cost-note">{c.note}</div>
            </div>
          ))}
          <div
            className="pf-cost-total"
            style={{ opacity: shown ? 1 : 0, transitionDelay: "600ms" }}
          >
            <span className="pf-cost-total-label">合計</span>
            <span className="pf-cost-total-val hero-num">16 bps</span>
          </div>
        </div>
        <div className="pf-after-cost">
          <MaskReveal show={shown} delay={700} duration={600}>
            <div className="pf-ac-card card">
              <div className="label-mono pf-ac-label">換手率 91.6% → 扣成本後</div>
              <div className="pf-ac-stats">
                <div>
                  <div className="hero-num pf-ac-num">45%</div>
                  <div className="label-mono">APR</div>
                </div>
                <div>
                  <div className="hero-num pf-ac-num">4.46</div>
                  <div className="label-mono">SR</div>
                </div>
              </div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 · Circuit breaker limits ─────────────────────────────────── */
function SceneCircuit() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  const rows = [
    { label: "原始等權", apr: "116%", sr: "9.37", note: "無成本限制" },
    { label: "扣交易成本", apr: "45%", sr: "4.46", note: "−16 bps/手，換手 91.6%" },
    { label: "+ 漲跌停限制", apr: "41.2%", sr: "4.74", note: "漲跌停股票排除後重選" },
  ];

  return (
    <div className="pf-scene scene-pad pf-scene--circuit">
      <div className="pf-header">
        <div className="kicker">Chapter 12 · 漲跌停板限制</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="pf-circuit-title">層層加入實際限制後的表現</h2>
      </MaskReveal>
      <div className={`pf-circuit-table${shown ? " is-shown" : ""}`}>
        <div className="pf-ct-head">
          <div className="pf-ct-dim label-mono" />
          <div className="pf-ct-col label-mono">年化 APR</div>
          <div className="pf-ct-col label-mono">夏普 SR</div>
          <div className="pf-ct-col label-mono">說明</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`pf-ct-row${i === rows.length - 1 ? " pf-ct-row--final" : ""}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="pf-ct-dim label-mono">{r.label}</div>
            <div className="pf-ct-col pf-ct-apr">{r.apr}</div>
            <div className="pf-ct-col pf-ct-sr">{r.sr}</div>
            <div className="pf-ct-col pf-ct-note">{r.note}</div>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={400} duration={600}>
        <div className="pf-circuit-note">
          多頭腿受漲停板影響最大（漲停股恰好是情感最正面的）· 空頭腿相對穩定
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 5 · Long/Short decomposition ───────────────────────────────── */
function SceneDecompose() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const bars = [
    { label: "多頭腿（Long）", pct: 80, note: "年化 80%", desc: "市場暴露 + 情感 alpha" },
    { label: "空頭腿（Short）", pct: 18, note: "年化 18%", desc: "反向市場 + 情感 alpha" },
    { label: "多空組合（L+S）", pct: 116, note: "年化 116%", desc: "市場風險相消，Alpha 留存", highlight: true },
  ];

  return (
    <div className="pf-scene scene-pad pf-scene--decompose">
      <div className="pf-header">
        <div className="kicker">Chapter 12 · 多空腿分解</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="pf-decompose-title">為什麼多空對沖有效</h2>
      </MaskReveal>
      <div className="pf-decompose-bars">
        {bars.map((b, i) => (
          <div
            key={b.label}
            className={`pf-db-row${b.highlight ? " pf-db-row--hl" : ""}`}
            style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(12px)", transition: `opacity 500ms ${i * 150}ms, transform 500ms ${i * 150}ms` }}
          >
            <div className="pf-db-label">{b.label}</div>
            <div className="pf-db-bar-wrap">
              <div
                className={`pf-db-bar${b.highlight ? " pf-db-bar--hl" : ""}`}
                style={{ width: shown ? `${(b.pct / 120) * 100}%` : "0%", transitionDelay: `${i * 150 + 200}ms` }}
              />
            </div>
            <div className="pf-db-val">{b.note}</div>
            <div className="label-mono pf-db-desc">{b.desc}</div>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={600} duration={600}>
        <div className="pf-decompose-note">
          L+S 的 R²_market = 6.3% &nbsp;·&nbsp; 兩腿各有約 46% 市場暴露但方向相反，合起來幾乎為零
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function PortfolioChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneRules />;
  if (step === 1) return <SceneResults />;
  if (step === 2) return <SceneMarketExp />;
  if (step === 3) return <SceneCosts />;
  if (step === 4) return <SceneCircuit />;
  return <SceneDecompose />;
}
