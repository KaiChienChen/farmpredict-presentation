import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Coldopen.css";

/* ── Step 0 ── Full-screen question ───────────────────────────────────── */
function SceneQuestion() {
  return (
    <div className="co-scene scene-pad co-scene--question">
      <div className="co-question-body">
        <MaskReveal show duration={700}>
          <div className="co-paper-title serif-it">
            "How Much Can Machines Learn Finance From Chinese Text Data?"
          </div>
        </MaskReveal>
        <MaskReveal show delay={200} duration={600}>
          <div className="co-paper-authors kicker">
            Fan · Xue · Zhou &nbsp;·&nbsp; Princeton ORFE / Fudan SDS &nbsp;·&nbsp; 2021
          </div>
        </MaskReveal>
        <hr className="rule co-title-rule" />
        <h1 className="co-q-headline">
          <MaskReveal show delay={500} duration={1000}>
            <span className="serif-cn co-q-line">機器能讀懂</span>
          </MaskReveal>
          <MaskReveal show delay={900} duration={1000}>
            <span className="serif-cn co-q-line co-q-em">中文財經文本</span>
          </MaskReveal>
          <MaskReveal show delay={1300} duration={1000}>
            <span className="serif-cn co-q-line">嗎？</span>
          </MaskReveal>
        </h1>
        <MaskReveal show delay={1700} duration={800}>
          <div className="co-q-model-badge label-mono">FarmPredict vs SESTM</div>
        </MaskReveal>
        <MaskReveal show delay={2100} duration={900}>
          <p className="co-q-sub">
            不靠字典，不靠人工標記——讓機器自己從文字裡學
          </p>
        </MaskReveal>
      </div>
      <div className="co-click-hint label-mono">點擊繼續 →</div>
    </div>
  );
}

/* ── Step 1 ── Key numbers ────────────────────────────────────────────── */
interface StatBarProps {
  label: string;
  value: string;
  sub: string;
  pct: number; /* bar fill 0-100 */
  delay: number;
  accent?: boolean;
}

function StatBar({ label, value, sub, pct, delay, accent }: StatBarProps) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFilled(pct), delay + 120);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div className="co-stat" style={{ animationDelay: `${delay}ms` }}>
      <div className="co-stat-top">
        <span className={`co-stat-val hero-num${accent ? " co-stat-val--accent" : ""}`}>{value}</span>
        <span className="co-stat-label label-mono">{label}</span>
      </div>
      <div className="co-bar-track">
        <div
          className={`co-bar-fill${accent ? " co-bar-fill--accent" : ""}`}
          style={{ width: `${filled}%`, transition: `width 1100ms cubic-bezier(0.19,1,0.22,1) ${delay}ms` }}
        />
      </div>
      <div className="co-stat-sub">{sub}</div>
    </div>
  );
}

function SceneNumbers() {
  return (
    <div className="co-scene scene-pad co-scene--numbers">
      <div className="co-num-header">
        <div className="kicker">測試期 2015–2019 · 等權多空組合</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="co-stats-grid">
        <StatBar
          label="年化收益率"
          value="116%"
          sub="等權組合，2015–2019 完全 hold-out 測試"
          pct={92}
          delay={100}
          accent
        />
        <StatBar
          label="夏普比率"
          value="9.37"
          sub="同期市場指數收益率接近 0"
          pct={75}
          delay={340}
          accent
        />
        <StatBar
          label="扣成本後夏普"
          value="4.74"
          sub="含印花稅 + 過戶費 + 佣金 + 漲跌停板限制"
          pct={38}
          delay={580}
        />
        <StatBar
          label="有效新聞篇數"
          value="914K"
          sub="新浪財經，2000–2019，20 年跨度"
          pct={72}
          delay={820}
        />
      </div>
      <div className="co-num-foot label-mono">
        訓練集 2000–2014 &nbsp;·&nbsp; 驗證集 2011–2014 &nbsp;·&nbsp; 測試集 2015–2019（完全隔離）
      </div>
    </div>
  );
}

/* ── Step 2 ── Roadmap ────────────────────────────────────────────────── */
const BLOCKS: { num: string; title: string; items: readonly string[]; highlight?: boolean }[] = [
  {
    num: "01",
    title: "問題背景",
    items: ["傳統方法的侷限", "字典法 / 話題模型 / 文本回歸", "中文市場特殊性"],
  },
  {
    num: "02",
    title: "方法論",
    items: ["PCA 複習：主成分分析", "FarmPredict 三步走", "因子提取 → 條件篩詞 → LASSO"],
    highlight: true,
  },
  {
    num: "03",
    title: "實證結果",
    items: ["情感詞驗證", "事件研究：+83 bps vs −26 bps", "組合表現 vs BERT / BiRNN"],
  },
];

function SceneRoadmap() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = BLOCKS.map((_, i) =>
      setTimeout(() => setLit(i + 1), 300 + i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="co-scene scene-pad co-scene--roadmap">
      <div className="co-road-header">
        <div className="kicker">今天的報告</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="co-road-grid">
        {BLOCKS.map((b, i) => (
          <div
            key={b.num}
            className={`co-road-block${b.highlight ? " co-road-block--hl" : ""}${lit > i ? " is-lit" : ""}`}
          >
            <div className="co-road-num hero-num">{b.num}</div>
            <div className="co-road-title">{b.title}</div>
            <ul className="co-road-items">
              {b.items.map((it) => (
                <li key={it} className="co-road-item label-mono">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="co-road-note">
        方法論部分會先複習 PCA ——&nbsp;
        <span style={{ color: "var(--accent)" }}>FarmPredict 的核心第一步就是 PCA</span>
        ，這塊不清楚後面會跟不上
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function ColdopenChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneQuestion />;
  if (step === 1) return <SceneNumbers />;
  return <SceneRoadmap />;
}
