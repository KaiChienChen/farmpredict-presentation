import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Data.css";

/* ── Step 0 · BFS Crawler ─────────────────────────────────────────────── */
function SceneCrawler() {
  const [count, setCount] = useState(0);
  const [nodes, setNodes] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 1800;
    const target = 6300000;
    const raf = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(ease * target));
      setNodes(Math.floor(ease * 7));
      if (t < 1) requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="dt-scene scene-pad dt-scene--crawler">
      <div className="dt-header">
        <div className="kicker">Chapter 09 · 數據：新浪財經九十萬篇</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="dt-crawler-body">
        <div className="dt-crawler-left">
          <div className="dt-big-num">
            <div className="hero-num dt-hero">{(count / 1000000).toFixed(1)}M</div>
            <div className="label-mono dt-hero-label">網頁爬取總量</div>
          </div>
          <div className="dt-crawler-stats">
            <div className="dt-stat">
              <div className="dt-stat-val">2000–2019</div>
              <div className="label-mono dt-stat-sub">新浪財經 · 20 年跨度</div>
            </div>
            <div className="dt-stat">
              <div className="dt-stat-val">5.88M</div>
              <div className="label-mono dt-stat-sub">有效新聞頁面</div>
            </div>
          </div>
        </div>
        <div className="dt-crawler-right">
          <div className="label-mono dt-bfs-title">廣度優先搜尋（BFS）爬蟲邏輯</div>
          <svg className="dt-bfs-svg" viewBox="0 0 460 340">
            {/* Queue label */}
            <text x="230" y="20" className="dt-bfs-text" style={{ fontSize: 13, fill: "var(--text-faint)" }}>Queue → 按層展開</text>
            {/* Root node */}
            <circle cx="230" cy="52" r="42" className="dt-bfs-node dt-bfs-node--root" />
            <text x="230" y="59" className="dt-bfs-text" style={{ fontSize: 16 }}>首頁</text>
            {/* Level 1 label */}
            <text x="50" y="101" className="dt-bfs-text" style={{ fontSize: 12, fill: "var(--text-faint)" }}>第 1 層</text>
            {/* Level 1 — 3 nodes */}
            {[88, 230, 372].map((cx, i) => (
              <g key={i} style={{ opacity: nodes >= 2 ? 1 : 0, transition: `opacity 400ms ${i * 150}ms` }}>
                <line x1="230" y1="94" x2={cx} y2="109" className="dt-bfs-line" />
                <circle cx={cx} cy="145" r="36" className="dt-bfs-node" />
                <text x={cx} y="152" className="dt-bfs-text" style={{ fontSize: 15 }}>
                  {["財報", "公告", "新聞"][i]}
                </text>
              </g>
            ))}
            {/* Level 2 label */}
            <text x="50" y="199" className="dt-bfs-text" style={{ fontSize: 12, fill: "var(--text-faint)" }}>第 2 層</text>
            {/* Level 2 — 2 children per L1 */}
            {[46, 120, 193, 267, 340, 414].map((cx, i) => (
              <g key={i} style={{ opacity: nodes >= 5 ? 1 : 0, transition: `opacity 400ms ${i * 100}ms` }}>
                <line x1={[88, 88, 230, 230, 372, 372][i]!} y1="181" x2={cx} y2="217" className="dt-bfs-line" />
                <circle cx={cx} cy="245" r="28" className="dt-bfs-node dt-bfs-node--leaf" />
                <text x={cx} y="251" className="dt-bfs-text" style={{ fontSize: 12 }}>
                  {i < 5 ? `新聞${i + 1}` : "…"}
                </text>
              </g>
            ))}
            {/* Dotted connector from L2 to L3 */}
            <line x1="230" y1="273" x2="230" y2="305" className="dt-bfs-line" style={{ strokeDasharray: "4,3", opacity: nodes >= 5 ? 0.4 : 0 }} />
            {/* Level 3 label */}
            <text x="50" y="322" className="dt-bfs-text" style={{ fontSize: 12, fill: "var(--text-faint)" }}>第 3 層</text>
            <text x="230" y="322" className="dt-bfs-text" style={{ fontSize: 12, fill: "var(--text-faint)", opacity: nodes >= 5 ? 1 : 0 }}>… 個別新聞頁面</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · Cleaning funnel ──────────────────────────────────────────── */
const FUNNEL_STEPS = [
  { label: "爬取網頁", val: "6,300,000", pct: 100 },
  { label: "有效新聞", val: "5,880,000", pct: 93 },
  { label: "去重複 / 有時間戳", val: "2,100,000", pct: 33 },
  { label: "配對單一股票", val: "1,450,000", pct: 23 },
  { label: "配對有效收益", val: "914,070", pct: 14 },
];

function SceneFunnel() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="dt-scene scene-pad dt-scene--funnel">
      <div className="dt-header">
        <div className="kicker">Chapter 09 · 數據清洗漏斗</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="dt-funnel-title">五步清洗 → 914K 有效新聞</h2>
      </MaskReveal>
      <div className="dt-funnel-list">
        {FUNNEL_STEPS.map((s, i) => (
          <div
            key={s.label}
            className="dt-funnel-row"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="dt-funnel-label label-mono">{s.label}</div>
            <div className="dt-funnel-bar-wrap">
              <div
                className={`dt-funnel-bar${i === FUNNEL_STEPS.length - 1 ? " dt-funnel-bar--final" : ""}`}
                style={{ width: shown ? `${s.pct}%` : "0%" }}
              />
            </div>
            <div className="dt-funnel-val">{s.val}</div>
          </div>
        ))}
      </div>
      <MaskReveal show={shown} delay={700} duration={600}>
        <div className="dt-funnel-note">
          下午 1 點前發布 → 配對當天收益 &nbsp;·&nbsp; 收盤後發布 → 配對次一交易日收益
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 2 · Beta-adjusted return ────────────────────────────────────── */
function SceneBeta() {
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
    <div className="dt-scene scene-pad dt-scene--beta">
      <div className="dt-header">
        <div className="kicker">Chapter 09 · Beta 調整收益</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="dt-beta-layout">
        <MaskReveal show duration={700}>
          <div className="dt-beta-eq">
            <span className={`dt-eq-part${phase >= 1 ? " is-lit" : ""}`}>r̃<sub>it</sub></span>
            <span className="dt-eq-op"> = </span>
            <span className={`dt-eq-part${phase >= 1 ? " is-lit" : ""}`}>r<sub>it</sub></span>
            <span className="dt-eq-op"> − </span>
            <span className={`dt-eq-part dt-eq-part--b${phase >= 2 ? " is-lit" : ""}`}>β<sub>i</sub></span>
            <span className="dt-eq-op dt-eq-op--b"> × </span>
            <span className={`dt-eq-part dt-eq-part--b${phase >= 2 ? " is-lit" : ""}`}>r<sub>market,t</sub></span>
          </div>
        </MaskReveal>
        <div className="dt-beta-cards">
          <div className={`dt-beta-card card${phase >= 1 ? " is-lit" : ""}`}>
            <div className="label-mono dt-beta-card-label">β<sub>i</sub> 估計</div>
            <div className="dt-beta-card-body">2005–2014 年日收益數據<br />OLS 回歸算出個股 β</div>
          </div>
          <div className={`dt-beta-card card${phase >= 2 ? " is-lit" : ""}`}>
            <div className="label-mono dt-beta-card-label">剔除市場波動</div>
            <div className="dt-beta-card-body">上證綜指（SSEC）作為市場基準<br />分紅 / 拆股調整後計算</div>
          </div>
          <div className={`dt-beta-card card dt-beta-card--goal${phase >= 3 ? " is-lit" : ""}`}>
            <div className="label-mono dt-beta-card-label">目的</div>
            <div className="dt-beta-card-body">讓模型只捕捉<strong>個股特異信號</strong><br />不把大盤漲跌算成情感的功勞</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · Jieba + vocab stats ─────────────────────────────────────── */
function SceneVocab() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { label: "有效文章", val: "914K", sub: "篇" },
    { label: "不重複詞彙", val: "1.18M", sub: "個" },
    { label: "高頻詞（≥50 篇）", val: "71K", sub: "個（模型輸入）" },
    { label: "中位數文章", val: "309", sub: "個詞" },
    { label: "非零率", val: "0.29%", sub: "（極度稀疏）" },
  ];

  return (
    <div className="dt-scene scene-pad dt-scene--vocab">
      <div className="dt-header">
        <div className="kicker">Chapter 09 · 分詞與詞袋統計</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="dt-vocab-layout">
        <div className="dt-vocab-left">
          <MaskReveal show duration={600}>
            <div className="dt-seg-demo card">
              <div className="label-mono dt-seg-label">結巴（Jieba）HMM 分詞示例</div>
              <div className="dt-seg-row">
                <span className="dt-seg-raw">「公司宣佈增持計劃抢反彈」</span>
              </div>
              <div className="dt-seg-arrow">↓ HMM + Viterbi</div>
              <div className="dt-seg-tokens">
                {["公司", "宣佈", "增持", "計劃", "抢反彈"].map((w) => (
                  <span key={w} className="dt-seg-token">{w}</span>
                ))}
              </div>
            </div>
          </MaskReveal>
          <MaskReveal show={shown} delay={200} duration={600}>
            <div className="dt-sparsity card">
              <div className="label-mono dt-seg-label">詞袋向量稀疏度（71K 維）</div>
              <div className="dt-sparsity-bar">
                <div
                  className="dt-sparsity-filled"
                  style={{ width: shown ? "0.29%" : "0%" }}
                />
                <div className="dt-sparsity-zero" />
              </div>
              <div className="dt-sparsity-note label-mono">0.29% 非零 &nbsp;·&nbsp; 99.71% 為 0</div>
            </div>
          </MaskReveal>
        </div>
        <div className="dt-vocab-right">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="dt-vocab-stat card"
              style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(12px)", transition: `opacity 500ms ${i * 80}ms, transform 500ms ${i * 80}ms` }}
            >
              <div className="label-mono dt-vocab-stat-label">{s.label}</div>
              <div className="dt-vocab-stat-val hero-num">{s.val}</div>
              <div className="dt-vocab-stat-sub label-mono">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step 4 · Rolling window ──────────────────────────────────────────── */
function SceneWindow() {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setActive(i);
        i++;
        if (i > 9) clearInterval(interval);
      }, 180);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const windows = Array.from({ length: 10 }, (_, i) => {
    const half = Math.floor(i / 2);
    const isH1 = i % 2 === 0;
    const train = isH1
      ? `${2005 + half}–${2014 + half}`
      : `${2005 + half}.7–${2015 + half}.6`;
    return { train, test: `${2015 + half} H${isH1 ? 1 : 2}` };
  });

  return (
    <div className="dt-scene scene-pad dt-scene--window">
      <div className="dt-header">
        <div className="kicker">Chapter 09 · 滾動窗口設計</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="dt-window-title">10 年訓練 / 6 個月測試 · 共 10 個窗口</h2>
      </MaskReveal>
      <div className="dt-timeline-bar">
        <div className="dt-tl-seg dt-tl-seg--train" style={{ flex: 11 }}>
          <span className="label-mono dt-tl-label">訓練集 2000–2010</span>
        </div>
        <div className="dt-tl-seg dt-tl-seg--val" style={{ flex: 4 }}>
          <span className="label-mono dt-tl-label">驗證 2011–2014</span>
        </div>
        <div className="dt-tl-seg dt-tl-seg--test" style={{ flex: 5 }}>
          <span className="label-mono dt-tl-label">測試期 2015–2019</span>
        </div>
      </div>
      <div className="dt-windows-list">
        {windows.map((w, i) => (
          <div
            key={i}
            className={`dt-window-row${active >= i ? " is-active" : ""}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="label-mono dt-window-num">窗口 {i + 1}</span>
            <div className="dt-window-train">訓練：{w.train}</div>
            <div className="dt-window-arrow">→</div>
            <div className="dt-window-test">預測：{w.test}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function DataChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneCrawler />;
  if (step === 1) return <SceneFunnel />;
  if (step === 2) return <SceneBeta />;
  if (step === 3) return <SceneVocab />;
  return <SceneWindow />;
}
