import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Background.css";

/* ── Step 0 · Problem framing ─────────────────────────────────────────── */
const TEXT_TYPES = [
  { label: "財經新聞", sub: "每日即時報道" },
  { label: "研究報告", sub: "分析師評語" },
  { label: "公司公告", sub: "財報 / 重大事件" },
];

function SceneIntro() {
  return (
    <div className="bg-scene scene-pad bg-scene--intro">
      <div className="kicker">Chapter 02 · 文字分析的進化史</div>
      <hr className="rule" style={{ marginTop: 16 }} />
      <div className="bg-intro-body">
        <div className="bg-intro-left">
          <MaskReveal show duration={900}>
            <h2 className="bg-intro-q serif-cn">
              怎麼讓機器量化<br />文字裡的信息？
            </h2>
          </MaskReveal>
          <MaskReveal show delay={600} duration={800}>
            <p className="bg-intro-sub">
              市場每天產生海量文字——<br />如何把它轉化成可預測的信號？
            </p>
          </MaskReveal>
        </div>
        <div className="bg-intro-right">
          {TEXT_TYPES.map((t, i) => (
            <div
              key={t.label}
              className="bg-text-card card"
              style={{ animationDelay: `${400 + i * 220}ms` }}
            >
              <span className="bg-text-card-label">{t.label}</span>
              <span className="bg-text-card-sub label-mono">{t.sub}</span>
            </div>
          ))}
          <div className="bg-arrow-row">
            <div className="bg-arrow-line" />
            <div className="bg-arrow-box">
              <span className="bg-arrow-q">?</span>
              <span className="label-mono" style={{ fontSize: 10 }}>量化模型</span>
            </div>
            <div className="bg-arrow-line" />
            <div className="bg-target-box card">
              <span className="bg-target-label">股票收益</span>
              <span className="label-mono" style={{ fontSize: 10 }}>預測目標</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · Dictionary method ───────────────────────────────────────── */
const POS_WORDS = ["走強", "漲停", "增長", "突破", "上調"];
const NEG_WORDS = ["下跌", "虧損", "違約", "減持", "利空"];

function SceneDict() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => (v < POS_WORDS.length ? v + 1 : v)), 200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-scene scene-pad bg-scene--dict">
      <div className="bg-method-header">
        <div className="kicker">方法一 · 字典法</div>
        <div className="bg-cite badge-mono">Loughran-McDonald &nbsp;·&nbsp; 2011</div>
      </div>
      <hr className="rule" style={{ marginTop: 14 }} />

      <div className="bg-dict-body">
        <div className="bg-dict-cols">
          <div className="bg-dict-col bg-dict-col--pos">
            <div className="bg-dict-col-head label-mono">正面詞 +1</div>
            {POS_WORDS.map((w, i) => (
              <div
                key={w}
                className={`bg-dict-word${i < visible ? " is-shown" : ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {w}
              </div>
            ))}
          </div>
          <div className="bg-dict-divider" />
          <div className="bg-dict-col bg-dict-col--neg">
            <div className="bg-dict-col-head label-mono">負面詞 −1</div>
            {NEG_WORDS.map((w, i) => (
              <div
                key={w}
                className={`bg-dict-word bg-dict-word--neg${i < visible ? " is-shown" : ""}`}
                style={{ transitionDelay: `${i * 60 + 100}ms` }}
              >
                {w}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dict-formula card">
          <div className="label-mono" style={{ marginBottom: 12 }}>計分公式</div>
          <div className="bg-formula-row">
            <span className="bg-formula-text serif-cn">情感分數</span>
            <span className="bg-formula-eq">=</span>
            <span className="bg-formula-pos">Σ 正面詞次數</span>
            <span className="bg-formula-eq">−</span>
            <span className="bg-formula-neg">Σ 負面詞次數</span>
          </div>
          <div className="bg-dict-verdict label-mono">
            直觀 · 可解釋 · 計算快——但問題很明顯
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 · Dictionary flaws ────────────────────────────────────────── */
const EXAMPLES = [
  { a: "大漲", b: "限制大漲", score: "+1", flaw: "語境盲區" },
  { a: "利潤增長", b: "無法維持利潤增長", score: "+1", flaw: "否定失效" },
];

function SceneDictFlaw() {
  return (
    <div className="bg-scene scene-pad bg-scene--dictflaw">
      <div className="bg-method-header">
        <div className="kicker">字典法的根本缺陷</div>
      </div>
      <hr className="rule" style={{ marginTop: 14 }} />

      <div className="bg-flaw-grid">
        <div className="bg-flaw-block card">
          <div className="bg-flaw-title">缺陷一：靜態詞表</div>
          <div className="bg-flaw-body">
            <p className="bg-flaw-p">語言在進化，新詞不斷出現。</p>
            <p className="bg-flaw-p">
              「敢死隊」在金融語境中暗示散戶投機湧入——<br />
              但字典裡找不到這個詞的情感標籤。
            </p>
            <div className="bg-flaw-tag label-mono">字典追不上語言演化</div>
          </div>
        </div>

        <div className="bg-flaw-block card">
          <div className="bg-flaw-title">缺陷二：語境盲區</div>
          <div className="bg-flaw-body">
            {EXAMPLES.map((ex) => (
              <div key={ex.a} className="bg-compare-row">
                <div className="bg-compare-pair">
                  <span className="bg-compare-phrase">「{ex.a}」</span>
                  <span className="bg-compare-arrow">→</span>
                  <span className="bg-compare-score bg-compare-score--pos">{ex.score}</span>
                </div>
                <div className="bg-compare-vs label-mono">vs</div>
                <div className="bg-compare-pair">
                  <span className="bg-compare-phrase">「{ex.b}」</span>
                  <span className="bg-compare-arrow">→</span>
                  <span className="bg-compare-score bg-compare-score--pos">{ex.score}</span>
                </div>
                <div className="bg-compare-same label-mono">同樣分數 !</div>
              </div>
            ))}
            <div className="bg-flaw-tag label-mono">詞和詞的搭配，字典看不到</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · Topic models ────────────────────────────────────────────── */
interface TopicBarProps { label: string; pct: number; delay: number; accent?: boolean }

function TopicBar({ label, pct, delay, accent }: TopicBarProps) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div className="bg-topic-row">
      <div className="bg-topic-label label-mono">{label}</div>
      <div className="bg-topic-track">
        <div
          className={`bg-topic-fill${accent ? " bg-topic-fill--accent" : ""}`}
          style={{ width: `${w}%`, transition: `width 900ms cubic-bezier(0.19,1,0.22,1) ${delay}ms` }}
        />
      </div>
      <div className="bg-topic-pct label-mono">{pct}%</div>
    </div>
  );
}

function SceneLDA() {
  return (
    <div className="bg-scene scene-pad bg-scene--lda">
      <div className="bg-method-header">
        <div className="kicker">方法二 · 話題模型</div>
        <div className="bg-cite-row">
          <span className="badge-mono">Blei et al. 2003 · LDA</span>
          <span className="badge-mono is-accent">Ke · Kelly · Xiu 2019 · SESTM</span>
        </div>
      </div>
      <hr className="rule" style={{ marginTop: 14 }} />

      <div className="bg-lda-body">
        <div className="bg-lda-left">
          <div className="bg-lda-doc card">
            <div className="label-mono" style={{ marginBottom: 12 }}>一篇財經新聞</div>
            <p className="bg-lda-snippet">
              「公司宣佈新一輪股票回購計劃，同時披露季度盈利超預期，
              受 IPO 重啟消息影響，板塊整體走強…」
            </p>
          </div>
          <div className="bg-lda-arrow">↓ LDA 分解</div>
          <div className="bg-lda-bars card">
            <div className="label-mono" style={{ marginBottom: 16 }}>話題混合比例</div>
            <TopicBar label="企業財報" pct={42} delay={200} accent />
            <TopicBar label="IPO / 再融資" pct={28} delay={450} />
            <TopicBar label="市場趨勢" pct={20} delay={700} />
            <TopicBar label="其他" pct={10} delay={950} />
          </div>
        </div>

        <div className="bg-lda-right">
          <div className="bg-sestm-box card">
            <div className="label-mono" style={{ marginBottom: 10 }}>SESTM 的做法</div>
            <div className="bg-sestm-row">
              <div className="bg-sestm-topic bg-sestm-topic--pos">話題 1<br /><span className="label-mono">正面情感</span></div>
              <div className="bg-sestm-topic bg-sestm-topic--neg">話題 2<br /><span className="label-mono">負面情感</span></div>
            </div>
            <div className="bg-sestm-note label-mono">
              用股票收益做監督學習<br />確定詞的話題歸屬
            </div>
          </div>
          <div className="bg-lda-verdict">
            <span className="serif-cn">比字典法進一步</span><br />
            <span className="bg-verdict-sub label-mono">但假設始終存在</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 · Topic model assumptions ────────────────────────────────── */
const ASSUMPTIONS = [
  { num: "01", text: "話題數量需事先人工設定" },
  { num: "02", text: "詞語在話題裡服從 Dirichlet 分佈" },
  { num: "03", text: "文章是話題的線性混合" },
  { num: "04", text: "這些分佈假設在不同市場 / 語言 / 時段都成立" },
];

function SceneLDAFlaw() {
  return (
    <div className="bg-scene scene-pad bg-scene--ldaflaw">
      <div className="bg-method-header">
        <div className="kicker">話題模型的根本侷限</div>
      </div>
      <hr className="rule" style={{ marginTop: 14 }} />

      <div className="bg-assump-body">
        <MaskReveal show duration={700}>
          <h3 className="bg-assump-q serif-cn">
            你必須事先假設很多東西
          </h3>
        </MaskReveal>

        <div className="bg-assump-list">
          {ASSUMPTIONS.map((a, i) => (
            <div
              key={a.num}
              className="bg-assump-item"
              style={{ animationDelay: `${300 + i * 280}ms` }}
            >
              <span className="bg-assump-num hero-num">{a.num}</span>
              <span className="bg-assump-text">{a.text}</span>
            </div>
          ))}
        </div>

        <MaskReveal show delay={1600} duration={800}>
          <div className="bg-assump-footer">
            這些主觀假設<span className="bg-accent-word">很難在跨市場 / 跨語言的場景裡都成立</span>
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Step 5 · Text regression + FarmPredict ──────────────────────────── */
const CORR_PAIRS = [
  ["漲停", "走強"],
  ["走強", "拉升"],
  ["拉升", "買盤"],
  ["漲停", "搶籌"],
];

function SceneRegression() {
  return (
    <div className="bg-scene scene-pad bg-scene--regression">
      <div className="bg-method-header">
        <div className="kicker">方法三 · 文本回歸 &nbsp;→&nbsp; FarmPredict 的出發點</div>
        <span className="badge-mono">Jegadeesh &amp; Wu · 2013</span>
      </div>
      <hr className="rule" style={{ marginTop: 14 }} />

      <div className="bg-reg-body">
        <div className="bg-reg-left">
          <div className="bg-reg-problem card">
            <div className="label-mono" style={{ marginBottom: 12 }}>文本回歸的問題</div>
            <div className="bg-reg-formula">
              收益 = β₁·漲停 + β₂·走強 + β₃·拉升 + … + ε
            </div>
            <div className="bg-corr-web">
              {CORR_PAIRS.map(([a, b]) => (
                <div key={`${a}-${b}`} className="bg-corr-pair">
                  <span className="bg-corr-word">{a}</span>
                  <span className="bg-corr-link label-mono">高度相關 ↔</span>
                  <span className="bg-corr-word">{b}</span>
                </div>
              ))}
            </div>
            <div className="bg-reg-verdict label-mono">
              D ≈ 71,000 維 · 多重共線性 · 估計極不穩定
            </div>
          </div>
        </div>

        <div className="bg-reg-right">
          <div className="bg-farm-box card">
            <div className="bg-farm-title label-mono">FarmPredict 的解法</div>
            <div className="bg-farm-steps">
              <div className="bg-farm-step">
                <span className="bg-farm-num">①</span>
                <div>
                  <div className="bg-farm-step-title">PCA 因子提取</div>
                  <div className="label-mono bg-farm-step-sub">把相關詞壓縮成 9 個因子</div>
                </div>
              </div>
              <div className="bg-farm-arrow">↓</div>
              <div className="bg-farm-step">
                <span className="bg-farm-num">②</span>
                <div>
                  <div className="bg-farm-step-title">條件篩詞</div>
                  <div className="label-mono bg-farm-step-sub">去除因子影響後選情感詞</div>
                </div>
              </div>
              <div className="bg-farm-arrow">↓</div>
              <div className="bg-farm-step">
                <span className="bg-farm-num">③</span>
                <div>
                  <div className="bg-farm-step-title">LASSO 正則化回歸</div>
                  <div className="label-mono bg-farm-step-sub">稀疏估計，抑制共線性</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function BackgroundChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneIntro />;
  if (step === 1) return <SceneDict />;
  if (step === 2) return <SceneDictFlaw />;
  if (step === 3) return <SceneLDA />;
  if (step === 4) return <SceneLDAFlaw />;
  return <SceneRegression />;
}
