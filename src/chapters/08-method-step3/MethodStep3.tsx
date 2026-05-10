import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./MethodStep3.css";

/* ── Step 0 · Prediction model ─────────────────────────────────────────── */
function SceneModel() {
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
    <div className="ms3-scene scene-pad ms3-scene--model">
      <div className="ms3-header">
        <div className="kicker">Chapter 08 · 第三步：LASSO 稀疏回歸</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={700}>
        <h2 className="ms3-model-title">建立預測模型</h2>
      </MaskReveal>
      <div className="ms3-model-eq">
        <span className={`ms3-eq-part${phase >= 1 ? " is-lit" : ""}`}>Y<sub>i</sub></span>
        <span className="ms3-eq-op"> = </span>
        <span className={`ms3-eq-part${phase >= 1 ? " is-lit" : ""}`}>a</span>
        <span className="ms3-eq-op"> + </span>
        <span className={`ms3-eq-part ms3-eq-part--b${phase >= 2 ? " is-lit" : ""}`}>
          b<sup>T</sup> f<sub>i</sub>
        </span>
        <span className="ms3-eq-op"> + </span>
        <span className={`ms3-eq-part ms3-eq-part--c${phase >= 3 ? " is-lit" : ""}`}>
          β<sup>T</sup> u<sub>i,Ŝ</sub>
        </span>
        <span className="ms3-eq-op"> + ε<sub>i</sub></span>
      </div>
      <div className="ms3-model-legend">
        <div className={`ms3-legend-row${phase >= 2 ? " is-shown" : ""}`}>
          <span className="ms3-legend-sym ms3-legend-sym--b">b<sup>T</sup> f<sub>i</sub></span>
          <span className="ms3-legend-desc">9 個因子的線性組合（話題控制部分）</span>
        </div>
        <div className={`ms3-legend-row ms3-legend-row--c${phase >= 3 ? " is-shown" : ""}`}>
          <span className="ms3-legend-sym ms3-legend-sym--c">β<sup>T</sup> u<sub>i,Ŝ</sub></span>
          <span className="ms3-legend-desc">~1000 個情感詞殘差的線性組合（情感信號部分）</span>
        </div>
      </div>
      <MaskReveal show={phase >= 3} delay={200} duration={700}>
        <div className="ms3-model-note">
          比直接對原始詞袋 X 做回歸更廣義——兩部分分別捕捉話題結構和情感信號
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 1 · LASSO formula + coefficient viz ────────────────────────── */
const COEF_DATA = [
  { w: "跌停", v: -0.82 }, { w: "敢死隊", v: -0.61 }, { w: "漲停", v: 0.79 },
  { w: "走強", v: 0.55 }, { w: "日盤", v: -0.38 }, { w: "募資", v: 0 },
  { w: "IPO", v: 0 }, { w: "公告", v: 0 }, { w: "發行", v: 0 },
  { w: "激勵", v: 0 }, { w: "重組", v: 0 }, { w: "治理", v: 0 },
];

function SceneLasso() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ms3-scene scene-pad ms3-scene--lasso">
      <div className="ms3-header">
        <div className="kicker">Chapter 08 · LASSO 懲罰</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="ms3-lasso-layout">
        <div className="ms3-lasso-left">
          <MaskReveal show duration={600}>
            <div className="ms3-lasso-eq">
              min &nbsp;
              <span style={{ fontSize: "0.9em" }}>
                1/n Σ(…)<sup>2</sup> + λ₁‖β‖₁ + λ₂‖b‖₁
              </span>
            </div>
          </MaskReveal>
          <div className="ms3-lasso-note">
            <div className="label-mono" style={{ marginBottom: 8 }}>L₁ 懲罰的效果</div>
            <div className="ms3-lasso-effect">
              大多數詞的係數 → 精確壓縮為 <strong>0</strong>
            </div>
            <div className="ms3-lasso-effect ms3-lasso-effect--em">
              少數詞保留非零係數 → 最終情感詞
            </div>
          </div>
        </div>
        <div className="ms3-lasso-right">
          <div className="label-mono" style={{ marginBottom: 12, fontSize: 14 }}>係數示意（λ 懲罰後）</div>
          <div className="ms3-coef-grid">
            {COEF_DATA.map((d, i) => (
              <div key={d.w} className="ms3-coef-row">
                <span className="ms3-coef-word label-mono">{d.w}</span>
                <div className="ms3-coef-bar-wrap">
                  <div
                    className={`ms3-coef-bar${d.v === 0 ? " ms3-coef-bar--zero" : d.v > 0 ? " ms3-coef-bar--pos" : " ms3-coef-bar--neg"}`}
                    style={{
                      width: shown ? `${Math.abs(d.v) * 100}%` : "0%",
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </div>
                {d.v === 0 && <span className="ms3-coef-zero label-mono">0</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 · LASSO vs Ridge ──────────────────────────────────────────── */
function SceneRidge() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const exWords = ["跌停", "敢死隊", "IPO", "發行", "募資", "激勵", "治理", "重組"];
  const ridgeVals = [0.38, 0.28, 0.12, 0.09, 0.07, 0.06, 0.05, 0.04];
  const lassoVals = [0.82, 0.61, 0, 0, 0, 0, 0, 0];

  return (
    <div className="ms3-scene scene-pad ms3-scene--ridge">
      <div className="ms3-header">
        <div className="kicker">Chapter 08 · 為什麼用 LASSO</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="ms3-ridge-title">稀疏性：LASSO 的核心優勢</h2>
      </MaskReveal>
      <div className="ms3-compare-layout">
        <div className="ms3-compare-panel card">
          <div className="ms3-compare-panel-head label-mono">Ridge 回歸</div>
          <div className="ms3-compare-panel-sub">所有詞都有非零係數，往零縮小</div>
          <div className="ms3-bar-list">
            {exWords.map((w, i) => (
              <div key={w} className="ms3-bar-row">
                <span className="ms3-bar-word label-mono">{w}</span>
                <div className="ms3-bar-track">
                  <div
                    className="ms3-bar-fill ms3-bar-fill--ridge"
                    style={{ width: shown ? `${ridgeVals[i]! * 100}%` : "0%", transitionDelay: `${i * 50}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ms3-compare-panel card ms3-compare-panel--lasso">
          <div className="ms3-compare-panel-head label-mono">LASSO 回歸</div>
          <div className="ms3-compare-panel-sub">大多數詞係數精確為零，保留少數關鍵詞</div>
          <div className="ms3-bar-list">
            {exWords.map((w, i) => (
              <div key={w} className="ms3-bar-row">
                <span className="ms3-bar-word label-mono">{w}</span>
                <div className="ms3-bar-track">
                  {lassoVals[i]! > 0 ? (
                    <div
                      className="ms3-bar-fill ms3-bar-fill--lasso"
                      style={{ width: shown ? `${lassoVals[i]! * 100}%` : "0%", transitionDelay: `${i * 50}ms` }}
                    />
                  ) : (
                    <span className="ms3-bar-zero label-mono">0</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MaskReveal show={shown} delay={500} duration={700}>
        <div className="ms3-ridge-insight">
          稀疏性假設：真正影響個股收益的情感詞是少數，不可能每個詞都有預測力
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 3 · Scoring new articles ───────────────────────────────────── */
function SceneScore() {
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

  const steps = [
    { label: "X_new", desc: "新文章詞袋向量（71K 維）" },
    { label: "投影 B̂", desc: "f_new = (B̂ᵀB̂)⁻¹ B̂ᵀ X_new" },
    { label: "殘差 u_new", desc: "u_new = X_new − B̂ f_new" },
    { label: "Ŷ_new", desc: "â + b̂ᵀ f_new + β̂ᵀ u_{new,Ŝ}" },
  ];

  return (
    <div className="ms3-scene scene-pad ms3-scene--score">
      <div className="ms3-header">
        <div className="kicker">Chapter 08 · 對新文章評分</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="ms3-score-title">評分流程：三步得到情感分數</h2>
      </MaskReveal>
      <div className="ms3-score-pipeline">
        {steps.map((s, i) => (
          <div key={s.label} className="ms3-score-step">
            {i > 0 && <div className="ms3-score-arrow">↓</div>}
            <div className={`ms3-score-node card${lit > i ? " is-lit" : ""}`}>
              <div className="ms3-score-node-main">{s.label}</div>
              <div className="ms3-score-node-desc label-mono">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <MaskReveal show={lit >= 4} delay={100} duration={700}>
        <div className="ms3-score-result">
          Ŷ_new 越高 → 對應股票今天越可能有<strong>正面超額收益</strong>
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 4 · Full comparison ────────────────────────────────────────── */
function SceneFullCompare() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  const rows = [
    { dim: "篩詞方式", sestm: "邊際篩選", farm: "條件篩選（控制因子）" },
    { dim: "話題建模", sestm: "兩話題先驗假設", farm: "PCA 自動選因子數" },
    { dim: "估計步驟", sestm: "兩步（篩詞 → MLE）", farm: "一步（LASSO 直接回歸）" },
    { dim: "預測器", sestm: "情感分數（固定）", farm: "可換 NN / 其他 ML" },
    { dim: "統計假設", sestm: "兩話題混合模型", farm: "稀疏線性（最少假設）" },
  ];

  return (
    <div className="ms3-scene scene-pad ms3-scene--full-compare">
      <div className="ms3-header">
        <div className="kicker">Chapter 08 · 完整對比總結</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="ms3-fc-title">FarmPredict vs SESTM</h2>
      </MaskReveal>
      <div className={`ms3-fc-table${shown ? " is-shown" : ""}`}>
        <div className="ms3-fc-head">
          <div className="ms3-fc-dim label-mono" />
          <div className="ms3-fc-col label-mono">SESTM</div>
          <div className="ms3-fc-col ms3-fc-col--farm label-mono">FarmPredict</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.dim}
            className="ms3-fc-row"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="ms3-fc-dim label-mono">{r.dim}</div>
            <div className="ms3-fc-col">{r.sestm}</div>
            <div className="ms3-fc-col ms3-fc-col--farm">{r.farm}</div>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={500} duration={600}>
        <div className="ms3-fc-note">
          框架通用：最後一步可換神經網路 / 隨機森林 / 任何預測模型，前兩步邏輯不變
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function MethodStep3Chapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneModel />;
  if (step === 1) return <SceneLasso />;
  if (step === 2) return <SceneRidge />;
  if (step === 3) return <SceneScore />;
  return <SceneFullCompare />;
}
