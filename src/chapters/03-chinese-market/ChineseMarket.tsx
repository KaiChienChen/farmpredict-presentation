import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./ChineseMarket.css";

/* ── Step 0 · Word segmentation ───────────────────────────────────────── */
const CN_CHARS = ["股", "市", "大", "漲"];
const CN_SEGMENTS = [
  { chars: [0, 1], label: "股市", meaning: "stock market" },
  { chars: [2, 3], label: "大漲", meaning: "surge" },
];
const EN_TOKENS = ["stock", "market", "rises"];

function SceneSegmentation() {
  const [phase, setPhase] = useState(0);
  // phase 0: show raw, phase 1: show cuts, phase 2: show labels
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="cm-scene scene-pad cm-scene--seg">
      <div className="cm-header">
        <div className="kicker">Chapter 03 · 中文市場的特殊性</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="cm-seg-body">
        {/* English side */}
        <div className="cm-seg-side">
          <div className="cm-seg-lang label-mono">English</div>
          <div className="cm-en-tokens">
            {EN_TOKENS.map((t, i) => (
              <span key={t} className="cm-en-token" style={{ animationDelay: `${i * 180}ms` }}>
                {t}
              </span>
            ))}
          </div>
          <div className="cm-seg-note">空格 = 天然詞邊界</div>
          <div className="cm-seg-badge label-mono cm-badge-ok">✓ 無需分詞</div>
        </div>

        <div className="cm-seg-divider" />

        {/* Chinese side */}
        <div className="cm-seg-side">
          <div className="cm-seg-lang label-mono">中文</div>
          <div className="cm-cn-word-wrap">
            <div className={`cm-cn-raw${phase >= 1 ? " is-cut" : ""}`}>
              {CN_CHARS.map((ch, i) => {
                const seg = CN_SEGMENTS.find(s => s.chars.includes(i));
                const segIdx = CN_SEGMENTS.indexOf(seg!);
                return (
                  <span
                    key={i}
                    className={`cm-cn-char cm-cn-char--${segIdx % 2 === 0 ? "a" : "b"}${phase >= 1 ? " is-segmented" : ""}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
            {phase >= 2 && (
              <div className="cm-cn-labels">
                {CN_SEGMENTS.map((s, i) => (
                  <div key={s.label} className={`cm-cn-label cm-cn-label--${i % 2 === 0 ? "a" : "b"}`}>
                    <span className="cm-cn-label-word">{s.label}</span>
                    <span className="label-mono cm-cn-label-en">{s.meaning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="cm-seg-note">沒有空格，切詞是個模型問題</div>
          <div className="cm-seg-badge cm-seg-badge--jieba label-mono">
            Jieba · HMM-based · O(n) 線性時間
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · Market structure ────────────────────────────────────────── */
interface MktBarProps { label: string; pct: number; note: string; delay: number; highlight?: boolean }

function MktBar({ label, pct, note, delay, highlight }: MktBarProps) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div className="cm-mkt-row">
      <div className="cm-mkt-label">{label}</div>
      <div className="cm-mkt-track">
        <div
          className={`cm-mkt-bar${highlight ? " cm-mkt-bar--hl" : ""}`}
          style={{ width: `${w}%`, transition: `width 1000ms cubic-bezier(0.19,1,0.22,1) ${delay}ms` }}
        >
          <span className="cm-mkt-pct label-mono">{pct}%</span>
        </div>
      </div>
      <div className="cm-mkt-note label-mono">{note}</div>
    </div>
  );
}

function SceneMarket() {
  return (
    <div className="cm-scene scene-pad cm-scene--market">
      <div className="cm-header">
        <div className="kicker">市場結構</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="cm-market-body">
        <div className="cm-market-chart">
          <div className="cm-chart-title">個人散戶佔總交易量比例</div>
          <div className="cm-mkt-rows">
            <MktBar label="中國 A 股" pct={68} note="個人投資者主導" delay={200} highlight />
            <MktBar label="美國股市" pct={18} note="機構投資者主導" delay={500} />
          </div>
          <div className="cm-chart-note label-mono">
            來源：Fan, Xue, Zhou (2021) · Chen et al. (2019)
          </div>
        </div>

        <div className="cm-market-right">
          <MaskReveal show duration={700} delay={300}>
            <div className="cm-insight card">
              <div className="cm-insight-icon">散戶</div>
              <div className="cm-insight-text">
                <div className="cm-insight-title">情緒化交易更普遍</div>
                <div className="cm-insight-sub label-mono">
                  散戶更容易跟著新聞買賣<br />
                  → 文本信號效果在 A 股可能更強
                </div>
              </div>
            </div>
          </MaskReveal>
          <MaskReveal show duration={700} delay={700}>
            <div className="cm-insight card">
              <div className="cm-insight-icon">信號</div>
              <div className="cm-insight-text">
                <div className="cm-insight-title">更多「新聞驅動」資金</div>
                <div className="cm-insight-sub label-mono">
                  機構比例低 → 市場對文字信息<br />
                  的反應更直接、更快
                </div>
              </div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 · Regulations ─────────────────────────────────────────────── */
function SceneRegulation() {
  const [showShort, setShowShort] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowShort(true), 600); return () => clearTimeout(t); }, []);

  return (
    <div className="cm-scene scene-pad cm-scene--reg">
      <div className="cm-header">
        <div className="kicker">監管機制</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="cm-reg-body">
        {/* Price limit */}
        <div className="cm-reg-card card">
          <div className="cm-reg-card-head label-mono">機制一 · 漲跌停板</div>
          <div className="cm-price-band">
            <div className="cm-price-ceil label-mono">+10% 漲停板</div>
            <div className="cm-price-zone">
              <div className="cm-price-bar cm-price-bar--up" />
              <div className="cm-price-mid label-mono">今日開盤價</div>
              <div className="cm-price-bar cm-price-bar--dn" />
            </div>
            <div className="cm-price-floor label-mono">−10% 跌停板</div>
          </div>
          <div className="cm-reg-desc">
            個股每日漲跌幅硬性限制在 ±10%<br />
            <span className="cm-reg-cite label-mono">Chen et al. 2019</span>
          </div>
        </div>

        {/* Short selling */}
        <div className={`cm-reg-card card cm-reg-card--short${showShort ? " is-shown" : ""}`}>
          <div className="cm-reg-card-head label-mono">機制二 · 融券限制</div>
          <div className="cm-short-wall">
            <div className="cm-short-barrier">
              <div className="cm-barrier-brick label-mono">申請門檻高</div>
              <div className="cm-barrier-brick label-mono">標的股票少</div>
              <div className="cm-barrier-brick label-mono">借券成本高</div>
              <div className="cm-barrier-brick label-mono">持倉時間短</div>
            </div>
            <div className="cm-short-arrow">←&nbsp;做空的「牆」</div>
          </div>
          <div className="cm-reg-desc">
            做空門檻遠高於美股<br />
            負面信息難以提前定價
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · Asymmetry (paper figure) ───────────────────────────────── */
function SceneAsymmetry() {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 200); return () => clearTimeout(t); }, []);

  return (
    <div className="cm-scene scene-pad cm-scene--asym">
      <div className="cm-header">
        <div className="kicker">融券限制的後果 · 信號不對稱</div>
        <span className="badge-mono">Figure 5 · Fan, Xue, Zhou (2021) p.34</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <div className="cm-asym-body2">
        {/* Paper figure */}
        <div className={`cm-fig-frame${shown ? " is-shown" : ""}`}>
          <img
            src={`${import.meta.env.BASE_URL}figures/fig5-event-study.png`}
            alt="Figure 5: Event study — positive vs negative news abnormal returns"
            className="cm-fig-img"
          />
          <div className="cm-fig-caption label-mono">
            Figure 5 — Event study cumulative abnormal returns, Day −13 to +14
          </div>
        </div>

        {/* Callout annotations */}
        <div className="cm-callouts">
          <div className="cm-callout cm-callout--pos">
            <div className="cm-callout-num hero-num">+83</div>
            <div className="cm-callout-unit label-mono">bps · Day 0</div>
            <div className="cm-callout-desc">正面消息高峰超額收益</div>
            <div className="cm-callout-note label-mono">
              Day −7 就開始爬坡<br />提前反映 = 可做多套利
            </div>
          </div>

          <hr className="rule" />

          <div className="cm-callout cm-callout--neg">
            <div className="cm-callout-num hero-num">−26</div>
            <div className="cm-callout-unit label-mono">bps · Day 0</div>
            <div className="cm-callout-desc">負面消息當天超額收益</div>
            <div className="cm-callout-note label-mono">
              Day 0 之前幾乎無提前期<br />融券難 = 負面信號被壓抑
            </div>
          </div>

          <hr className="rule" />

          <div className="cm-callout-summary label-mono">
            不對稱根源：融券限制讓負面信號<br />
            無法提前定價——A 股獨有現象
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function ChineseMarketChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneSegmentation />;
  if (step === 1) return <SceneMarket />;
  if (step === 2) return <SceneRegulation />;
  return <SceneAsymmetry />;
}
