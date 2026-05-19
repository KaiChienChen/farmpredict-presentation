import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import { TeX } from "../../components/TeX";
import type { ChapterStepProps } from "../../registry/types";
import "./MethodStep2.css";

/* ── Step 0 · Marginal filtering problem ─────────────────────────────── */
function SceneMarginal() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 400),
      setTimeout(() => setLit(2), 1100),
      setTimeout(() => setLit(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ms2-scene scene-pad ms2-scene--marginal">
      <div className="ms2-header">
        <div className="kicker">Chapter 07 · 第二步：條件篩選情感詞</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={700}>
        <h2 className="ms2-problem-title">邊際篩選：一個根本性問題</h2>
      </MaskReveal>
      <div className="ms2-marginal-flow">
        <div className={`ms2-flow-box card${lit >= 1 ? " is-lit" : ""}`}>
          <div className="label-mono ms2-flow-label">IPO 話題文章</div>
          <div className="ms2-flow-words">
            {["IPO", "募資", "發行", "上市", "承銷"].map((w) => (
              <span key={w} className="ms2-word-chip">{w}</span>
            ))}
          </div>
        </div>
        <div className="ms2-flow-arrow">+</div>
        <div className={`ms2-flow-box card${lit >= 2 ? " is-lit" : ""}`}>
          <div className="label-mono ms2-flow-label">當天股票漲</div>
          <div className="ms2-flow-eq">corr(詞, Y) &gt; α</div>
        </div>
        <div className="ms2-flow-arrow">→</div>
        <div className={`ms2-flow-box card ms2-flow-box--danger${lit >= 3 ? " is-lit" : ""}`}>
          <div className="label-mono ms2-flow-label">邊際篩選誤判</div>
          <div className="ms2-flow-wrong">IPO 詞 = 情感正面詞 ✗</div>
          <div className="ms2-flow-note">話題信號 ≠ 個股信號</div>
        </div>
      </div>
      <MaskReveal show={lit >= 3} duration={600}>
        <p className="ms2-marginal-note">
          不控制話題因子 → 邊際篩選把「IPO 話題」誤判為「個股情感」
        </p>
      </MaskReveal>
    </div>
  );
}

/* ── Step 1 · Conditional screening flow ─────────────────────────────── */
function SceneFlow() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 300),
      setTimeout(() => setLit(2), 900),
      setTimeout(() => setLit(3), 1500),
      setTimeout(() => setLit(4), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const nodes = [
    { id: "Y", label: "Y", sub: "個股 beta 調整收益" },
    { id: "reg", label: "回歸因子 F̂", sub: "控制公共話題" },
    { id: "res", label: "殘差 Ŷ_u", sub: "個股特異收益" },
    { id: "corr", label: "corr(Û_j, Ŷ_u)", sub: "條件相關性" },
  ];

  return (
    <div className="ms2-scene scene-pad ms2-scene--flow">
      <div className="ms2-header">
        <div className="kicker">Chapter 07 · 條件篩選思路</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="ms2-flow-title">先控制公共話題，再找個股信號</h2>
      </MaskReveal>
      <div className="ms2-flow-pipeline">
        {nodes.map((n, i) => (
          <div key={n.id} className="ms2-pipeline-step">
            {i > 0 && <div className="ms2-pipeline-arrow">→</div>}
            <div className={`ms2-pipeline-node card${lit > i ? " is-lit" : ""}`}>
              <div className="ms2-pipeline-node-main">{n.label}</div>
              <div className="label-mono ms2-pipeline-node-sub">{n.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <MaskReveal show={lit >= 4} delay={100} duration={700}>
        <div className="ms2-flow-insight card">
          <span className="ms2-flow-insight-em">關鍵：</span>
          先把 Y 對因子做回歸，在殘差 Ŷ_u 裡找詞的預測力——不是直接對 Y
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 2 · Formula ─────────────────────────────────────────────────── */
function SceneFormula() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ms2-scene scene-pad ms2-scene--formula">
      <div className="ms2-header">
        <div className="kicker">Chapter 07 · 條件篩選公式</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="ms2-formula-block">
        <div className="ms2-formula-eq">
          <span className={`ms2-f-part${phase >= 1 ? " is-lit" : ""}`}>
            <TeX>{`\\hat{S} = \\{j : |\\mathrm{corr}(\\hat{U}_j,\\, \\hat{Y}_u)| > \\alpha\\}`}</TeX>
          </span>
          <span className={`ms2-f-part ms2-f-part--b${phase >= 2 ? " is-lit" : ""}`}>
            <TeX>{`\\cap\\; \\{j : k_j \\geq \\kappa\\}`}</TeX>
          </span>
        </div>
        <div className="ms2-formula-legend">
          <div className={`ms2-legend-item${phase >= 1 ? " is-shown" : ""}`}>
            <span className="ms2-legend-sym"><TeX>{`\\hat{U}_j`}</TeX></span>
            <span className="ms2-legend-desc">詞 j 在文章中的特異殘差（控制話題後）</span>
          </div>
          <div className={`ms2-legend-item${phase >= 1 ? " is-shown" : ""}`}>
            <span className="ms2-legend-sym"><TeX>{`\\hat{Y}_u`}</TeX></span>
            <span className="ms2-legend-desc">個股特異收益（Y 對因子回歸後的殘差）</span>
          </div>
          <div className={`ms2-legend-item ms2-legend-item--b${phase >= 2 ? " is-shown" : ""}`}>
            <span className="ms2-legend-sym"><TeX>{`\\kappa`}</TeX></span>
            <span className="ms2-legend-desc">詞頻下限（約 14% 分位數，~10K 詞）</span>
          </div>
          <div className={`ms2-legend-item ms2-legend-item--b${phase >= 2 ? " is-shown" : ""}`}>
            <span className="ms2-legend-sym"><TeX>{`\\alpha`}</TeX></span>
            <span className="ms2-legend-desc">相關係數閾值，調至 |Ŝ| ≈ 1000 個詞</span>
          </div>
        </div>
      </div>
      <MaskReveal show={phase >= 3} duration={700}>
        <div className="ms2-formula-result">
          最終情感詞集 Ŝ ≈ <span className="ms2-num">1,000</span> 個詞
          &nbsp;·&nbsp; 從 71,000 維詞袋壓縮而來
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 3 · Key intuition ───────────────────────────────────────────── */
function SceneIntuition() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ms2-scene scene-pad ms2-scene--intuition">
      <div className="ms2-header">
        <div className="kicker">Chapter 07 · 條件篩選的關鍵直覺</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="ms2-intuition-body">
        <MaskReveal show duration={800}>
          <div className="ms2-intuition-q">
            不是問：哪個詞跟收益<em>相關</em>？
          </div>
        </MaskReveal>
        <MaskReveal show delay={600} duration={800}>
          <div className="ms2-intuition-q ms2-intuition-q--ans">
            而是問：扣掉公共話題後，哪個詞還能預測<em>個股特異收益</em>？
          </div>
        </MaskReveal>
        <div className={`ms2-case-box card${shown ? " is-shown" : ""}`}>
          <div className="label-mono ms2-case-label">案例</div>
          <div className="ms2-case-word">敢死隊</div>
          <div className="ms2-case-desc">
            任何公開情感詞典都沒有這個詞。<br />
            但條件相關性顯著 → FarmPredict 自己學到了它是<strong>負面信號</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 · Screening difference (focused) ─────────────────────────── */
function SceneCompare() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="ms2-scene scene-pad ms2-scene--compare">
      <div className="ms2-header">
        <div className="kicker">Chapter 07 · 條件篩選 vs 邊際篩選（SESTM）</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="ms2-compare-title">篩詞上的根本差別</h2>
      </MaskReveal>
      <div className="ms2-diff-layout">
        <div className={`ms2-diff-box card ms2-diff-box--sestm${phase >= 1 ? " is-shown" : ""}`}>
          <div className="label-mono ms2-diff-label">SESTM（邊際篩選）</div>
          <div className="ms2-diff-formula">corr(詞<sub>j</sub>, Y) &gt; α</div>
          <div className="ms2-diff-verdict ms2-diff-verdict--bad">
            問題：話題詞因為「正好在漲股票的文章裡」而被選中，不代表真正的個股情感信號
          </div>
        </div>
        <div className="ms2-diff-arrow">vs</div>
        <div className={`ms2-diff-box card ms2-diff-box--farm${phase >= 2 ? " is-shown" : ""}`}>
          <div className="label-mono ms2-diff-label">FarmPredict（條件篩選）</div>
          <div className="ms2-diff-formula">corr(Û<sub>j</sub>, Ŷ<sub>u</sub>) &gt; α</div>
          <div className="ms2-diff-verdict ms2-diff-verdict--good">
            先控制話題因子再篩詞——選出的是「在任何話題背景下都有個股預測力」的真正情感詞
          </div>
        </div>
      </div>
      <MaskReveal show={phase >= 2} delay={200} duration={600}>
        <div className="ms2-diff-note">
          完整的 FarmPredict vs SESTM 對比見「方法論概覽」章節
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function MethodStep2Chapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneMarginal />;
  if (step === 1) return <SceneFlow />;
  if (step === 2) return <SceneFormula />;
  if (step === 3) return <SceneIntuition />;
  return <SceneCompare />;
}
