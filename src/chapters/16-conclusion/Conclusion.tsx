import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Conclusion.css";

/* ── Step 0 · Core results ────────────────────────────────────────────── */
function SceneResults() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 1700),
      setTimeout(() => setPhase(4), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="cc-scene scene-pad cc-scene--results">
      <div className="cc-header">
        <div className="kicker">Chapter 16 · 結論</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={700}>
        <h2 className="cc-results-title">FarmPredict · 完整數據驅動</h2>
      </MaskReveal>
      <div className="cc-results-grid">
        <div className={`cc-result-card card cc-result-card--hero${phase >= 1 ? " is-lit" : ""}`}>
          <div className="label-mono cc-result-tag">完全數據驅動 · 無字典 · 無先驗假設</div>
          <div className="cc-dare-devil">「敢死隊」</div>
          <div className="label-mono cc-result-sub">從 100 萬篇文章中自動學到負面信號</div>
        </div>
        <div className={`cc-result-card card${phase >= 2 ? " is-lit" : ""}`}>
          <div className="label-mono cc-result-tag">等權多空 · 測試期</div>
          <div className="cc-big-num">116%</div>
          <div className="label-mono cc-result-sub">年化收益 · SR 9.37</div>
        </div>
        <div className={`cc-result-card card${phase >= 3 ? " is-lit" : ""}`}>
          <div className="label-mono cc-result-tag">扣除真實交易成本 + 漲跌停後</div>
          <div className="cc-big-num">SR 4.74</div>
          <div className="label-mono cc-result-sub">依然穩健</div>
        </div>
        <div className={`cc-result-card card${phase >= 4 ? " is-lit" : ""}`}>
          <div className="label-mono cc-result-tag">對比所有 baseline</div>
          <div className="cc-beat-text">BERT · BiRNN · TextCNN<br />SESTM · 動量策略</div>
          <div className="label-mono cc-result-sub">全部顯著更好 · p &lt; 0.01</div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · Three conclusions ───────────────────────────────────────── */
const CONCLUSIONS = [
  {
    num: "01",
    head: "殘差比因子更重要",
    body: "文本 ML 裡，公共話題因子的功能是控制，不是預測；個股特異殘差才是情感信號的來源",
    tag: "方法論洞察",
  },
  {
    num: "02",
    head: "中國市場有可量化的不對稱信息傳播",
    body: "正面新聞可提前 7 天佈局；負面新聞因融券限制只在公告當天反應——制度性結構，可被機器學習",
    tag: "市場微觀結構",
  },
  {
    num: "03",
    head: "FarmPredict 是通用框架",
    body: "高維文本分析：無監督提因子 → 條件篩選殘差 → 稀疏回歸。換市場、換語言、換 ML 模型，邏輯不變",
    tag: "可推廣性",
  },
];

function SceneConclusions() {
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
    <div className="cc-scene scene-pad cc-scene--conclusions">
      <div className="cc-header">
        <div className="kicker">Chapter 16 · 三個最重要的結論</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="cc-conclusions-list">
        {CONCLUSIONS.map((c, i) => (
          <div
            key={c.num}
            className={`cc-conclusion-item${lit > i ? " is-lit" : ""}`}
          >
            <div className="cc-conclusion-num">{c.num}</div>
            <div className="cc-conclusion-body">
              <div className="cc-conclusion-head">{c.head}</div>
              <div className="cc-conclusion-text">{c.body}</div>
              <div className="label-mono cc-conclusion-tag">{c.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2 · Q&A ─────────────────────────────────────────────────────── */
function SceneQA() {
  return (
    <div className="cc-scene scene-pad cc-scene--qa">
      <div className="cc-header">
        <div className="kicker">Chapter 16 · 開放討論</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="cc-qa-center">
        <MaskReveal show duration={800}>
          <div className="cc-qa-main">Q &amp; A</div>
        </MaskReveal>
        <MaskReveal show delay={400} duration={600}>
          <div className="cc-qa-sub">How Much Can Machines Learn Finance From Chinese Text Data?</div>
        </MaskReveal>
        <MaskReveal show delay={800} duration={600}>
          <div className="cc-qa-authors label-mono">
            Fan · Xue · Zhou &nbsp;·&nbsp; Princeton / Fudan · 2021
          </div>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function ConclusionChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneResults />;
  if (step === 1) return <SceneConclusions />;
  return <SceneQA />;
}
