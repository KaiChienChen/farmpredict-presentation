import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./PcaReview.css";

/* ── Step 0 · Problem setup ───────────────────────────────────────────── */
function SceneProblem() {
  return (
    <div className="pca-scene scene-pad pca-scene--problem">
      <div className="pca-header">
        <div className="kicker">Chapter 04 · 複習 PCA：主成分分析</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pca-problem-body">
        <div className="pca-problem-left">
          <MaskReveal show duration={800}>
            <div className="pca-matrix-label label-mono">數據矩陣 X</div>
            <div className="pca-matrix">
              <div className="pca-matrix-bracket pca-matrix-bracket--l">[</div>
              <div className="pca-matrix-inner">
                <div className="pca-matrix-dots">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className={`pca-dot${Math.random() > 0.7 ? " pca-dot--on" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div className="pca-matrix-bracket pca-matrix-bracket--r">]</div>
              <div className="pca-matrix-dim">
                <span className="pca-dim-n">n</span>
                <span className="pca-dim-sep"> × </span>
                <span className="pca-dim-p">p</span>
              </div>
            </div>
            <div className="pca-matrix-sub label-mono">
              n = 914,070 篇文章 &nbsp;·&nbsp; p ≈ 71,000 個詞
            </div>
          </MaskReveal>
        </div>

        <div className="pca-problem-right">
          <div className="pca-prob-card card">
            <div className="pca-prob-num hero-num">01</div>
            <div className="pca-prob-content">
              <div className="pca-prob-title">維度災難</div>
              <div className="pca-prob-desc">
                p &gt; n 時，OLS 無唯一解<br />
                <span className="label-mono" style={{ color: "var(--text-faint)" }}>
                  71,000 個詞 vs 914,070 篇文章
                </span>
              </div>
            </div>
          </div>
          <div className="pca-prob-card card" style={{ animationDelay: "280ms" }}>
            <div className="pca-prob-num hero-num">02</div>
            <div className="pca-prob-content">
              <div className="pca-prob-title">多重共線性</div>
              <div className="pca-prob-desc">
                詞與詞高度相關 → 估計極不穩定<br />
                <span className="label-mono" style={{ color: "var(--text-faint)" }}>
                  「漲停」出現 → 「走強」必然出現
                </span>
              </div>
            </div>
          </div>
          <MaskReveal show delay={600} duration={700}>
            <div className="pca-prob-solution">
              PCA 解決這兩個問題的方式：<br />
              把 p 維�壓縮成 <span style={{ color: "var(--accent)", fontWeight: 700 }}>k 個因子</span>（k ≪ p）
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · IPO intuition ───────────────────────────────────────────── */
const IPO_WORDS = ["上市", "募資", "發行價", "網上申購"];

function SceneIntuition() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="pca-scene scene-pad pca-scene--intuition">
      <div className="pca-header">
        <div className="kicker">PCA 的核心直覺</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pca-intuition-body">
        <div className="pca-intuition-left">
          <div className="pca-ipo-label label-mono">IPO 相關詞——高度相關</div>
          <div className="pca-word-cluster">
            {IPO_WORDS.map((w, i) => (
              <div
                key={w}
                className={`pca-word-node${phase >= 1 ? " is-connected" : ""}`}
                style={{
                  top: `${[20, 8, 55, 68][i]}%`,
                  left: `${[10, 60, 5, 62][i]}%`,
                  animationDelay: `${i * 150}ms`,
                }}
              >
                {w}
              </div>
            ))}
            {phase >= 1 && (
              <svg className="pca-edges" viewBox="0 0 300 200">
                {[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]].map(([a,b], i) => {
                  const positions = [
                    [40, 46], [190, 26], [24, 120], [196, 146]
                  ];
                  return (
                    <line
                      key={i}
                      x1={positions[a][0]} y1={positions[a][1]}
                      x2={positions[b][0]} y2={positions[b][1]}
                      className="pca-edge"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                  );
                })}
              </svg>
            )}
          </div>
        </div>

        <div className={`pca-compress-arrow${phase >= 1 ? " is-shown" : ""}`}>
          <div className="pca-arrow-line" />
          <div className="pca-arrow-label label-mono">PCA 壓縮</div>
          <div className="pca-arrow-head">→</div>
        </div>

        <div className={`pca-factor-out${phase >= 2 ? " is-shown" : ""}`}>
          <div className="pca-factor-node">
            <div className="pca-factor-title">IPO 因子</div>
            <div className="label-mono pca-factor-sub">1 個主成分</div>
          </div>
          <div className="pca-factor-meaning">
            <div className="pca-factor-meaning-title">代表：</div>
            <div className="pca-factor-meaning-text">「這篇文章的 IPO 話題有多強？」</div>
            <div className="pca-factor-formula label-mono">
              f_IPO = v₁·X₁ + v₂·X₂ + v₃·X₃ + v₄·X₄
            </div>
          </div>
        </div>
      </div>
      <div className="pca-intuition-footer">
        4 個相關詞 → 1 個因子分數 · 信息量幾乎不損失，維度從 4 降到 1
      </div>
    </div>
  );
}

/* ── Step 2 · Eigendecomposition math ────────────────────────────────── */
function MatrixBox({ label, sub, color }: { label: string; sub?: string; color?: string }) {
  return (
    <div className="pca-mbox" style={{ borderColor: color || "var(--rule)" }}>
      <div className="pca-mbox-label" style={{ color: color || "var(--text)" }}>{label}</div>
      {sub && <div className="pca-mbox-sub label-mono">{sub}</div>}
    </div>
  );
}

function SceneEigen() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1100);
    const t3 = setTimeout(() => setStep(3), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="pca-scene scene-pad pca-scene--eigen">
      <div className="pca-header">
        <div className="kicker">數學：協方差矩陣特徵分解</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pca-eigen-body">
        <div className="pca-equation">
          <div className={`pca-eq-part${step >= 1 ? " is-shown" : ""}`}>
            <MatrixBox label="X ᵀX" sub="p × p 協方差矩陣" color="var(--text)" />
          </div>
          <div className={`pca-eq-eq${step >= 1 ? " is-shown" : ""}`}>=</div>
          <div className={`pca-eq-part${step >= 2 ? " is-shown" : ""}`}>
            <MatrixBox label="V" sub="特徵向量矩陣" color="var(--accent)" />
          </div>
          <div className={`pca-eq-part${step >= 2 ? " is-shown" : ""}`}>
            <MatrixBox label="Λ" sub="特徵值對角矩陣" color="#b45309" />
          </div>
          <div className={`pca-eq-part${step >= 2 ? " is-shown" : ""}`}>
            <MatrixBox label="Vᵀ" sub="特徵向量矩陣轉置" color="var(--accent)" />
          </div>
        </div>

        <div className={`pca-eigen-legend${step >= 3 ? " is-shown" : ""}`}>
          <div className="pca-legend-item">
            <div className="pca-legend-dot" style={{ background: "var(--accent)" }} />
            <div>
              <div className="pca-legend-title" style={{ color: "var(--accent)" }}>V 的列向量</div>
              <div className="pca-legend-desc label-mono">主成分方向 · 把詞空間旋轉到無相關的新座標系</div>
            </div>
          </div>
          <div className="pca-legend-item">
            <div className="pca-legend-dot" style={{ background: "#b45309" }} />
            <div>
              <div className="pca-legend-title" style={{ color: "#b45309" }}>Λ 的對角元素 λ₁ ≥ λ₂ ≥ …</div>
              <div className="pca-legend-desc label-mono">每個方向解釋的方差量 · 越大 = 越重要的話題</div>
            </div>
          </div>
          <div className="pca-legend-item">
            <div className="pca-legend-dot" style={{ background: "var(--text-mute)" }} />
            <div>
              <div className="pca-legend-title">取前 k 個特徵向量</div>
              <div className="pca-legend-desc label-mono">k ≪ p，保留最主要的話題方向，丟棄噪音</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · Factor decomposition ───────────────────────────────────── */
function SceneDecomp() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="pca-scene scene-pad pca-scene--decomp">
      <div className="pca-header">
        <div className="kicker">因子分解：X ≈ F Bᵀ + U</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pca-decomp-body">
        <div className="pca-decomp-eq">
          <div className={`pca-deq-part${phase >= 1 ? " is-shown" : ""}`}>
            <div className="pca-deq-box pca-deq-box--x">
              <div className="pca-deq-label">X</div>
              <div className="label-mono pca-deq-sub">n × p<br />原始詞袋矩陣</div>
            </div>
          </div>
          <div className={`pca-deq-sym${phase >= 1 ? " is-shown" : ""}`}>≈</div>
          <div className={`pca-deq-part${phase >= 2 ? " is-shown" : ""}`}>
            <div className="pca-deq-box pca-deq-box--f">
              <div className="pca-deq-label">F</div>
              <div className="label-mono pca-deq-sub">n × k<br />因子分數矩陣</div>
            </div>
            <div className="pca-deq-box pca-deq-box--b">
              <div className="pca-deq-label">Bᵀ</div>
              <div className="label-mono pca-deq-sub">k × p<br />因子載荷矩陣</div>
            </div>
          </div>
          <div className={`pca-deq-sym${phase >= 2 ? " is-shown" : ""}`}>+</div>
          <div className={`pca-deq-part${phase >= 3 ? " is-shown" : ""}`}>
            <div className="pca-deq-box pca-deq-box--u">
              <div className="pca-deq-label">U</div>
              <div className="label-mono pca-deq-sub">n × p<br />特異性殘差</div>
            </div>
          </div>
        </div>

        <div className="pca-decomp-cards">
          <div className={`pca-decomp-card card pca-decomp-card--f${phase >= 2 ? " is-shown" : ""}`}>
            <div className="pca-dc-head" style={{ color: "var(--accent)" }}>F · 共同因子部分</div>
            <div className="pca-dc-body">
              每篇文章在 9 個話題上的「得分」<br />
              反映文章屬於哪類話題、有多強
            </div>
            <div className="pca-dc-example label-mono">
              f = [IPO: 0.8, 財報: 0.1, 市場趨勢: 0.3, …]
            </div>
          </div>
          <div className={`pca-decomp-card card pca-decomp-card--u${phase >= 3 ? " is-shown" : ""}`}>
            <div className="pca-dc-head pca-dc-head--u">U · 特異性殘差</div>
            <div className="pca-dc-body">
              因子解釋不了的「剩餘」部分<br />
              反映文章相對於話題的特異信息
            </div>
            <div className="pca-dc-example label-mono" style={{ color: "#b45309" }}>
              ← 這才是 FarmPredict 的預測力來源！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 · Figure 3 scree plot ────────────────────────────────────── */
function SceneScree() {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 200); return () => clearTimeout(t); }, []);

  return (
    <div className="pca-scene scene-pad pca-scene--scree">
      <div className="pca-header">
        <div className="kicker">調整特徵值碎石圖</div>
        <span className="badge-mono">Figure 3 · Fan, Xue, Zhou (2021) p.23</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pca-scree-body">
        <div className={`pca-fig-frame${shown ? " is-shown" : ""}`}>
          <img
            src={`${import.meta.env.BASE_URL}figures/fig3-scree.png`}
            alt="Figure 3: Adjusted eigenvalue scree plot"
            className="pca-fig-img"
          />
          <div className="pca-fig-caption label-mono">
            Figure 3(a) 調整特徵值碎石圖 · Figure 3(b) 差分圖
          </div>
        </div>
        <div className="pca-scree-notes">
          <div className="pca-scree-note card">
            <div className="pca-scree-note-num hero-num" style={{ color: "var(--accent)" }}>2</div>
            <div>
              <div className="pca-scree-note-title">強因子</div>
              <div className="label-mono pca-scree-note-sub">前 2 個特徵值遠超閾值<br />遠高於其他因子</div>
            </div>
          </div>
          <div className="pca-scree-note card">
            <div className="pca-scree-note-num hero-num" style={{ color: "var(--text-mute)" }}>7</div>
            <div>
              <div className="pca-scree-note-title">弱因子</div>
              <div className="label-mono pca-scree-note-sub">仍超過調整後閾值<br />C=150 判定為顯著</div>
            </div>
          </div>
          <div className="pca-scree-note card" style={{ borderLeft: "3px solid var(--accent)" }}>
            <div className="pca-scree-note-num hero-num" style={{ color: "var(--accent)" }}>9</div>
            <div>
              <div className="pca-scree-note-title" style={{ color: "var(--accent)" }}>k̂ = 9 個因子</div>
              <div className="label-mono pca-scree-note-sub">C = 150 調整特徵值閾值法<br />Fan et al. (2020)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 5 · k selection formula ────────────────────────────────────── */
function SceneKSelection() {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div className="pca-scene scene-pad pca-scene--ksel">
      <div className="pca-header">
        <div className="kicker">k 的自動選擇：調整特徵值閾值法</div>
        <span className="badge-mono">Fan et al. 2020</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pca-ksel-body">
        <div className="pca-ksel-formula card">
          <div className="label-mono pca-ksel-formula-label">Adjusted Eigenvalue Thresholding</div>
          <div className="pca-ksel-eq">
            <span className="pca-ksel-sym">k̂</span>
            <span className="pca-ksel-op"> = </span>
            <span className="pca-ksel-text">max</span>
            <span className="pca-ksel-brace">&#123;</span>
            <span className="pca-ksel-var">j</span>
            <span className="pca-ksel-op"> &lt; </span>
            <span className="pca-ksel-var">|D<sub>freq</sub>|</span>
            <span className="pca-ksel-op"> : </span>
            <span className="pca-ksel-lambda">λ̂<sub>j</sub><sup>C</sup></span>
            <span className="pca-ksel-op"> &gt; </span>
            <span className="pca-ksel-thresh">
              1 + C<span className="pca-ksel-root">√(p / (n−1))</span>
            </span>
            <span className="pca-ksel-brace">&#125;</span>
          </div>
          <div className="pca-ksel-legend">
            <div className="pca-ksel-leg-item">
              <span className="pca-ksel-lambda" style={{ fontSize: 20 }}>λ̂<sub>j</sub><sup>C</sup></span>
              <span className="label-mono"> 偏差修正後的第 j 個特徵值</span>
            </div>
            <div className="pca-ksel-leg-item">
              <span className="pca-ksel-thresh" style={{ fontSize: 20 }}>C</span>
              <span className="label-mono"> 超參數，控制寬鬆程度</span>
            </div>
          </div>
        </div>

        <div className={`pca-ksel-result${shown ? " is-shown" : ""}`}>
          <div className="pca-ksel-params">
            <div className="pca-param">
              <div className="pca-param-val hero-num">150</div>
              <div className="pca-param-label label-mono">C = 150<br />超參數設定</div>
            </div>
            <div className="pca-param-arrow">→</div>
            <div className="pca-param pca-param--result">
              <div className="pca-param-val hero-num" style={{ color: "var(--accent)" }}>9</div>
              <div className="pca-param-label label-mono">k̂ = 9 個顯著因子<br />百萬篇新聞的底層話題維度</div>
            </div>
          </div>
          <div className="pca-ksel-insight">
            這 9 個因子涵蓋：企業財報 · 中國經濟 · 基金 · 公司治理 · IPO · 盈利 · 激勵 · 重組 · 其他
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 6 · Summary ─────────────────────────────────────────────────── */
function SceneSummary() {
  return (
    <div className="pca-scene scene-pad pca-scene--summary">
      <div className="pca-header">
        <div className="kicker">PCA 直覺總結</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="pca-summary-body">
        <MaskReveal show duration={800}>
          <div className="pca-summary-hero">
            高維相關詞袋
            <span className="pca-summary-arrow"> → </span>
            <span style={{ color: "var(--accent)" }}>少數因子</span>
            <span className="pca-summary-plus"> + </span>
            <span style={{ color: "#b45309" }}>特異殘差</span>
          </div>
        </MaskReveal>

        <div className="pca-summary-cards">
          <div className="pca-sum-card card pca-sum-card--f">
            <div className="pca-sum-head label-mono">因子部分 F</div>
            <div className="pca-sum-role">控制共線性</div>
            <div className="pca-sum-items">
              <div className="pca-sum-item label-mono">✓ 因子間近似不相關</div>
              <div className="pca-sum-item label-mono">✓ 解決高維多重共線性</div>
              <div className="pca-sum-item label-mono">✓ k = 9 ≪ p = 71,000</div>
            </div>
            <div className="pca-sum-verdict pca-sum-verdict--neutral label-mono">
              預測力：次要（8 bps/天）
            </div>
          </div>
          <div className="pca-sum-card card pca-sum-card--u">
            <div className="pca-sum-head label-mono">殘差部分 U</div>
            <div className="pca-sum-role">個股特異信號</div>
            <div className="pca-sum-items">
              <div className="pca-sum-item label-mono">✓ 去除話題後的特異信息</div>
              <div className="pca-sum-item label-mono">✓ 條件篩詞在此上進行</div>
              <div className="pca-sum-item label-mono">✓ LASSO 在此選情感詞</div>
            </div>
            <div className="pca-sum-verdict pca-sum-verdict--key label-mono">
              預測力：主要（30 bps/天）
            </div>
          </div>
        </div>

        <MaskReveal show delay={600} duration={700}>
          <div className="pca-summary-foot">
            下一章：FarmPredict 如何把 F 和 U 組合成完整的三步預測框架
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function PcaReviewChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneProblem />;
  if (step === 1) return <SceneIntuition />;
  if (step === 2) return <SceneEigen />;
  if (step === 3) return <SceneDecomp />;
  if (step === 4) return <SceneScree />;
  if (step === 5) return <SceneKSelection />;
  return <SceneSummary />;
}
