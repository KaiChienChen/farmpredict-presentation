import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./MethodOverview.css";

/* ── Name acronym breakdown ───────────────────────────────────────────── */
const ACRONYM = [
  { letter: "F", word: "Factor", cn: "因子", color: "var(--accent)" },
  { letter: "A", word: "Augmented", cn: "增強", color: "var(--accent)" },
  { letter: "R", word: "Regularized", cn: "正則化", color: "#b45309" },
  { letter: "M", word: "Model for", cn: "預測模型", color: "var(--text-mute)" },
];

/* ── Pipeline steps ───────────────────────────────────────────────────── */
const PIPELINE = [
  {
    num: "01",
    title: "提取潛在因子",
    en: "Factor Extraction",
    method: "PCA",
    io: { in: "X (n×p 詞袋)", out: "F (因子) + U (殘差)" },
    color: "var(--accent)",
  },
  {
    num: "02",
    title: "條件篩選情感詞",
    en: "Conditional Screening",
    method: "相關篩選",
    io: { in: "U (殘差) + Y (收益)", out: "Û_Ŝ (~1000 個情感詞)" },
    color: "#b45309",
  },
  {
    num: "03",
    title: "LASSO 回歸預測",
    en: "Penalized Regression",
    method: "LASSO",
    io: { in: "F + Û_Ŝ", out: "Ŷ (個股收益預測)" },
    color: "#166534",
  },
];

/* ── Step 0 · Name + pipeline overview ───────────────────────────────── */
function SceneOverview() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const ts = PIPELINE.map((_, i) =>
      setTimeout(() => setLit(i + 1), 400 + i * 600)
    );
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className="mo-scene scene-pad mo-scene--overview">
      <div className="mo-header">
        <div className="kicker">Chapter 05 · FarmPredict 框架概覽</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      {/* Acronym row */}
      <div className="mo-acronym">
        {ACRONYM.map((a, i) => (
          <div key={a.letter} className="mo-acr-item" style={{ animationDelay: `${i * 120}ms` }}>
            <span className="mo-acr-letter hero-num" style={{ color: a.color }}>{a.letter}</span>
            <span className="mo-acr-word serif-it">{a.word}</span>
            <span className="mo-acr-cn label-mono">{a.cn}</span>
          </div>
        ))}
        <div className="mo-acr-tail label-mono">Prediction</div>
      </div>

      {/* Pipeline */}
      <div className="mo-pipeline">
        {PIPELINE.map((p, i) => (
          <div key={p.num} className="mo-pipe-wrap">
            <div
              className={`mo-pipe-box card${lit > i ? " is-lit" : ""}`}
              style={{ "--pipe-color": p.color } as React.CSSProperties}
            >
              <div className="mo-pipe-num label-mono" style={{ color: p.color }}>{p.num}</div>
              <div className="mo-pipe-method badge-mono" style={{ color: p.color, borderColor: p.color }}>
                {p.method}
              </div>
              <div className="mo-pipe-title">{p.title}</div>
              <div className="mo-pipe-en label-mono">{p.en}</div>
              <div className="mo-pipe-io">
                <div className="mo-io-row label-mono">
                  <span className="mo-io-in-label">IN</span>
                  <span className="mo-io-val">{p.io.in}</span>
                </div>
                <div className="mo-io-row label-mono">
                  <span className="mo-io-out-label">OUT</span>
                  <span className="mo-io-val">{p.io.out}</span>
                </div>
              </div>
            </div>
            {i < PIPELINE.length - 1 && (
              <div className={`mo-pipe-arrow${lit > i ? " is-lit" : ""}`}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 1 · Logic thread ────────────────────────────────────────────── */
const LOGIC = [
  {
    step: "Step 1 · PCA",
    goal: "控制共線性",
    why: "71,000 個詞高度相關，直接回歸不穩定",
    how: "壓縮成 9 個正交因子 F，殘差 U 無話題相關性",
    color: "var(--accent)",
  },
  {
    step: "Step 2 · 條件篩詞",
    goal: "找個股特異信號",
    why: "控制話題後，哪些詞還能預測個股收益？",
    how: "計算 corr(Û_j, Ŷ_u)，選 |相關係數| 最大的 ~1000 個詞",
    color: "#b45309",
  },
  {
    step: "Step 3 · LASSO",
    goal: "稀疏預測",
    why: "即使篩完還有 ~1000 個詞，需要進一步選",
    how: "L₁ 懲罰讓大部分係數歸零，只留真正有預測力的詞",
    color: "#166534",
  },
];

function SceneLogic() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const ts = LOGIC.map((_, i) =>
      setTimeout(() => setShown(i + 1), 200 + i * 500)
    );
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className="mo-scene scene-pad mo-scene--logic">
      <div className="mo-header">
        <div className="kicker">三步的邏輯線</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="mo-logic-body">
        {LOGIC.map((l, i) => (
          <div key={l.step} className={`mo-logic-row${shown > i ? " is-shown" : ""}`}>
            <div className="mo-logic-step label-mono" style={{ color: l.color }}>{l.step}</div>
            <div className="mo-logic-goal" style={{ color: l.color }}>{l.goal}</div>
            <div className="mo-logic-why label-mono">問題：{l.why}</div>
            <div className="mo-logic-how label-mono">方法：{l.how}</div>
            {i < LOGIC.length - 1 && <div className="mo-logic-down">↓</div>}
          </div>
        ))}
      </div>

      <MaskReveal show delay={1700} duration={700}>
        <div className="mo-logic-foot">
          全程<span style={{ color: "var(--accent)", fontWeight: 700 }}>無監督 · 無先驗假設</span>——話題結構完全從數據自己學
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 2 · vs SESTM ────────────────────────────────────────────────── */
const COMPARE_ROWS = [
  { dim: "話題假設", farm: "無——數據自己學", sestm: "假設 2 個話題（正面 / 負面）" },
  { dim: "話題估計", farm: "無監督 PCA", sestm: "監督學習（用股票收益標記）" },
  { dim: "情感詞篩選", farm: "條件篩選（控制因子後）", sestm: "邊際篩選（直接相關）" },
  { dim: "詞語互動", farm: "因子捕捉共同成分", sestm: "忽略詞和詞之間的相關性" },
  { dim: "可擴展性", farm: "任意語言 / 市場 / 模型", sestm: "預設結構難以跨場景" },
];

function SceneVsSestm() {
  return (
    <div className="mo-scene scene-pad mo-scene--vs">
      <div className="mo-header">
        <div className="kicker">FarmPredict vs SESTM · 根本差別</div>
        <span className="badge-mono">Ke · Kelly · Xiu 2019</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="mo-vs-body">
        <div className="mo-vs-table">
          {/* Header */}
          <div className="mo-vs-row mo-vs-row--head">
            <div className="mo-vs-cell mo-vs-cell--dim" />
            <div className="mo-vs-cell mo-vs-cell--farm label-mono">FarmPredict</div>
            <div className="mo-vs-cell mo-vs-cell--sestm label-mono">SESTM</div>
          </div>
          {/* Rows */}
          {COMPARE_ROWS.map((r, i) => (
            <div
              key={r.dim}
              className="mo-vs-row"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="mo-vs-cell mo-vs-cell--dim label-mono">{r.dim}</div>
              <div className="mo-vs-cell mo-vs-cell--farm">{r.farm}</div>
              <div className="mo-vs-cell mo-vs-cell--sestm">{r.sestm}</div>
            </div>
          ))}
        </div>

        <MaskReveal show delay={900} duration={700}>
          <div className="mo-vs-verdict card">
            <span className="mo-vs-verdict-icon">→</span>
            <div>
              <div className="mo-vs-verdict-title">關鍵差別：條件篩詞 vs 邊際篩詞</div>
              <div className="mo-vs-verdict-desc label-mono">
                SESTM 先估計話題再篩詞，兩步誤差會累積；<br />
                FarmPredict 在控制因子後直接做條件篩選，一步到位，假設更少
              </div>
            </div>
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function MethodOverviewChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneOverview />;
  if (step === 1) return <SceneLogic />;
  return <SceneVsSestm />;
}
