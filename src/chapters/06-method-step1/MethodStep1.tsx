import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./MethodStep1.css";

/* ── Step 0 · Binary bag-of-words ─────────────────────────────────────── */
const SAMPLE_WORDS = [
  { word: "漲停", val: 1 }, { word: "走強", val: 0 }, { word: "IPO", val: 1 },
  { word: "增長", val: 0 }, { word: "募資", val: 1 }, { word: "下跌", val: 0 },
  { word: "公告", val: 1 }, { word: "虧損", val: 0 }, { word: "發行", val: 1 },
  { word: "回購", val: 0 }, { word: "利潤", val: 1 }, { word: "跌停", val: 0 },
];

function SceneData() {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 500); return () => clearTimeout(t); }, []);

  return (
    <div className="ms1-scene scene-pad ms1-scene--data">
      <div className="ms1-header">
        <div className="kicker">Chapter 06 · 第一步：提取潛在因子</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="ms1-data-body">
        <div className="ms1-data-left">
          <MaskReveal show duration={700}>
            <div className="ms1-article card">
              <div className="label-mono ms1-article-head">文章 i</div>
              <p className="ms1-article-text">
                「公司宣佈 <strong>IPO</strong> 計劃，預計<strong>募資</strong>
                不低於五億元，<strong>漲停</strong>…<strong>發行</strong>價定為…
                <strong>公告</strong>稱…」
              </p>
            </div>
          </MaskReveal>

          <div className="ms1-data-arrow">↓ 詞袋化 + 二值化</div>

          <div className={`ms1-vec-wrap${shown ? " is-shown" : ""}`}>
            <div className="label-mono ms1-vec-head">
              X<sub>i</sub> ∈ &#123;0,1&#125;<sup>p</sup> &nbsp;·&nbsp; p ≈ 71,000
            </div>
            <div className="ms1-vec-grid">
              {SAMPLE_WORDS.map((w, i) => (
                <div key={w.word} className="ms1-vec-cell" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className={`ms1-vec-val${w.val ? " ms1-vec-val--on" : ""}`}>{w.val}</div>
                  <div className="ms1-vec-word label-mono">{w.word}</div>
                </div>
              ))}
              <div className="ms1-vec-cell ms1-vec-ellipsis">
                <div className="ms1-vec-val">…</div>
                <div className="ms1-vec-word label-mono">71K</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ms1-data-right">
          <div className="ms1-why card">
            <div className="ms1-why-head label-mono">為什麼用 0/1 而非詞頻？</div>
            <div className="ms1-why-row">
              <div className="ms1-why-item ms1-why-item--bad">
                <div className="ms1-why-label label-mono">詞頻（TF）</div>
                <div className="ms1-why-desc">量綱差異大<br />高頻詞主導估計<br />稀疏度不一致</div>
                <div className="ms1-why-verdict label-mono">✗ 不穩定</div>
              </div>
              <div className="ms1-why-sep">vs</div>
              <div className="ms1-why-item ms1-why-item--good">
                <div className="ms1-why-label label-mono" style={{ color: "var(--accent)" }}>二值化（0/1）</div>
                <div className="ms1-why-desc">隱式正規化<br />量綱一致<br />模型更穩定</div>
                <div className="ms1-why-verdict label-mono" style={{ color: "var(--accent)" }}>✓ 採用</div>
              </div>
            </div>
          </div>

          <div className="ms1-dim card">
            <div className="label-mono ms1-dim-head">矩陣規模</div>
            <div className="ms1-dim-eq">
              <span className="ms1-dim-mat">X</span>
              <span className="ms1-dim-op">:</span>
              <span className="ms1-dim-n">914,070</span>
              <span className="ms1-dim-op">×</span>
              <span className="ms1-dim-p">71,000</span>
            </div>
            <div className="label-mono ms1-dim-sub">n 篇文章 × p 個常用詞</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · Factor model X = F Bᵀ + U ──────────────────────────────── */
function SceneFactorModel() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ts = [400, 1000, 1600, 2200].map((d, i) => setTimeout(() => setPhase(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className="ms1-scene scene-pad ms1-scene--model">
      <div className="ms1-header">
        <div className="kicker">因子模型假設</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="ms1-model-body">
        <div className="ms1-model-eq">
          {[
            { sym: "X", sub: "n×p 詞袋", color: "var(--text)", phase: 1 },
            { sym: "=", sub: "", color: "var(--text-mute)", phase: 1 },
            { sym: "F", sub: "n×k 因子分數", color: "var(--accent)", phase: 2 },
            { sym: "Bᵀ", sub: "k×p 因子載荷", color: "var(--accent)", phase: 2 },
            { sym: "+", sub: "", color: "var(--text-mute)", phase: 2 },
            { sym: "U", sub: "n×p 殘差", color: "#b45309", phase: 3 },
          ].map((item, i) => (
            <div
              key={i}
              className={`ms1-eq-part${phase >= item.phase ? " is-shown" : ""}`}
            >
              {item.sub ? (
                <div className="ms1-eq-box" style={{ borderColor: item.color }}>
                  <div className="ms1-eq-sym" style={{ color: item.color }}>{item.sym}</div>
                  <div className="ms1-eq-sub label-mono">{item.sub}</div>
                </div>
              ) : (
                <div className="ms1-eq-op" style={{ color: item.color }}>{item.sym}</div>
              )}
            </div>
          ))}
        </div>

        <div className={`ms1-model-cards${phase >= 4 ? " is-shown" : ""}`}>
          <div className="ms1-model-card card ms1-model-card--f">
            <div className="ms1-mc-sym">F</div>
            <div className="ms1-mc-title" style={{ color: "var(--accent)" }}>話題分數矩陣</div>
            <div className="ms1-mc-desc">每篇文章在 k 個話題上的強度分數<br />{"f_{i,1}"} = IPO 話題強度，{"f_{i,2}"} = 財報話題強度…</div>
          </div>
          <div className="ms1-model-card card ms1-model-card--b">
            <div className="ms1-mc-sym">B</div>
            <div className="ms1-mc-title" style={{ color: "var(--accent)" }}>因子載荷矩陣</div>
            <div className="ms1-mc-desc">每個話題在各個詞上的權重<br />{"b_{j,1}"} 大 = 詞 j 是 IPO 話題的重要詞</div>
          </div>
          <div className="ms1-model-card card ms1-model-card--u">
            <div className="ms1-mc-sym" style={{ color: "#b45309" }}>U</div>
            <div className="ms1-mc-title" style={{ color: "#b45309" }}>特異性殘差</div>
            <div className="ms1-mc-desc">話題解釋不了的部分<br />個股特異信息藏在這裡——後面的關鍵！</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 · PCA estimation ──────────────────────────────────────────── */
const FORMULAS = [
  {
    num: "①",
    lhs: "F̂",
    rhs: "= √n × [k largest eigenvectors of XX ᵀ]",
    note: "對 n×n 矩陣做特徵分解（n < p 時更快）",
    color: "var(--accent)",
    delay: 200,
  },
  {
    num: "②",
    lhs: "B̂",
    rhs: "= X ᵀ F̂ / n",
    note: "因子載荷 = 數據與因子的協方差",
    color: "var(--accent)",
    delay: 700,
  },
  {
    num: "③",
    lhs: "Û",
    rhs: "= X − F̂ B̂ ᵀ",
    note: "殘差 = 原始矩陣 − 因子重構部分",
    color: "#b45309",
    delay: 1200,
  },
];

function ScenePCA() {
  return (
    <div className="ms1-scene scene-pad ms1-scene--pca">
      <div className="ms1-header">
        <div className="kicker">PCA 估計公式</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="ms1-pca-body">
        {FORMULAS.map((f) => (
          <div key={f.num} className="ms1-formula-row card" style={{ animationDelay: `${f.delay}ms` }}>
            <div className="ms1-formula-num label-mono" style={{ color: f.color }}>{f.num}</div>
            <div className="ms1-formula-eq">
              <span className="ms1-formula-lhs" style={{ color: f.color }}>{f.lhs}</span>
              <span className="ms1-formula-rhs">{f.rhs}</span>
            </div>
            <div className="ms1-formula-note label-mono">{f.note}</div>
          </div>
        ))}

        <MaskReveal show delay={1800} duration={700}>
          <div className="ms1-pca-note card">
            <div className="ms1-pca-note-icon">💡</div>
            <div>
              <div className="ms1-pca-note-title">計算技巧</div>
              <div className="ms1-pca-note-desc label-mono">
                XX ᵀ 是 n×n（≈ 914K²）——但只取前 k=9 個特徵向量，用 Lanczos 算法很快<br />
                若直接對 X ᵀX（71K×71K）做分解反而更慢
              </div>
            </div>
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Step 3 · k robustness ────────────────────────────────────────────── */
const K_TESTS = [
  { c: "C = 1", k: 1043, perf: "~30 bps", robust: true },
  { c: "C = 30", k: 78, perf: "~30 bps", robust: true },
  { c: "C = 150", k: 9, perf: "31 bps", robust: true, selected: true },
  { c: "C = 500", k: 2, perf: "~29 bps", robust: true },
];

function SceneKRobust() {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 400); return () => clearTimeout(t); }, []);

  return (
    <div className="ms1-scene scene-pad ms1-scene--robust">
      <div className="ms1-header">
        <div className="kicker">k 的選擇：穩健性測試</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="ms1-robust-body">
        <div className="ms1-robust-left">
          <div className="ms1-robust-title">不同 C 對應的因子個數</div>
          <div className="ms1-k-table">
            <div className="ms1-k-head">
              <span className="label-mono">超參數 C</span>
              <span className="label-mono">k̂ 因子數</span>
              <span className="label-mono">日均收益</span>
            </div>
            {K_TESTS.map((row, i) => (
              <div
                key={row.c}
                className={`ms1-k-row${row.selected ? " ms1-k-row--sel" : ""}${shown ? " is-shown" : ""}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <span className={`label-mono${row.selected ? " ms1-sel-c" : ""}`}>{row.c}</span>
                <span className="ms1-k-val hero-num" style={{ fontSize: 32 }}>{row.k}</span>
                <span className="label-mono ms1-perf">{row.perf}</span>
              </div>
            ))}
          </div>
          <div className="ms1-robust-note label-mono">
            k 從 2 到 1043 變化，日均收益幾乎不變
          </div>
        </div>

        <div className="ms1-robust-right">
          <MaskReveal show delay={800} duration={700}>
            <div className="ms1-robust-insight card">
              <div className="ms1-ri-title">因子個數不是關鍵</div>
              <div className="ms1-ri-body">
                預測力主要來自殘差 U，不是因子 F。<br /><br />
                因子的作用是<strong>控制共線性</strong>——把話題從詞袋裡提出來，讓殘差「乾淨」。<br /><br />
                至於提幾個因子，影響不大。
              </div>
              <div className="ms1-ri-preview label-mono">
                → 下一步就是用這個「乾淨」的殘差 Û 來篩情感詞
              </div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 · Figure 10 factor topics ────────────────────────────────── */
const FACTOR_TOPICS = [
  { num: "F1", label: "企業動態", en: "Firm" },
  { num: "F2", label: "中國宏觀", en: "China Economic" },
  { num: "F3", label: "基金產品", en: "Funds" },
  { num: "F4", label: "公司治理", en: "Corporate Governance" },
  { num: "F5", label: "IPO", en: "IPO" },
  { num: "F6", label: "盈利公告", en: "Earnings" },
  { num: "F7", label: "股權激勵", en: "Incentive" },
  { num: "F8", label: "資產重組", en: "Restructuring" },
  { num: "F9", label: "雜類", en: "Others" },
];

function SceneTopics() {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 200); return () => clearTimeout(t); }, []);

  return (
    <div className="ms1-scene scene-pad ms1-scene--topics">
      <div className="ms1-header">
        <div className="kicker">9 個因子的話題內容</div>
        <span className="badge-mono">Figure 10 · p.45 · 因子高載荷詞雲</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="ms1-topics-body">
        <div className={`ms1-fig-frame${shown ? " is-shown" : ""}`}>
          <img
            src={`${import.meta.env.BASE_URL}figures/fig10-factor-topics.png`}
            alt="Figure 10: Factor word clouds showing 9 topic factors"
            className="ms1-fig-img"
          />
          <div className="ms1-fig-caption label-mono">
            Figure 10 — 每個因子的高載荷詞雲，顯示話題語義
          </div>
        </div>

        <div className="ms1-topics-right">
          <div className="ms1-topics-grid">
            {FACTOR_TOPICS.map((f, i) => (
              <div
                key={f.num}
                className="ms1-topic-chip"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="ms1-topic-num label-mono">{f.num}</span>
                <span className="ms1-topic-label">{f.label}</span>
              </div>
            ))}
          </div>
          <MaskReveal show delay={900} duration={700}>
            <div className="ms1-topics-note">
              這些話題<strong>本身是中性的</strong>——<br />
              跟個股漲跌沒有直接關係。<br />
              <span style={{ color: "var(--accent)" }}>情感信號在殘差 Û 裡，不在因子 F 裡。</span>
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function MethodStep1Chapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneData />;
  if (step === 1) return <SceneFactorModel />;
  if (step === 2) return <ScenePCA />;
  if (step === 3) return <SceneKRobust />;
  return <SceneTopics />;
}
