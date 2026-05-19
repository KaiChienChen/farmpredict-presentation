import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import { TeX } from "../../components/TeX";
import type { ChapterStepProps } from "../../registry/types";
import "./EventStudy.css";

/* ── Step 0 · Event study design ─────────────────────────────────────── */
function SceneDesign() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--design">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 事件研究：不對稱的代價</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={700}>
        <h2 className="es-design-title">事件研究設計</h2>
      </MaskReveal>
      <div className="es-design-layout">
        <div className="es-timeline">
          <div className="es-tl-bar">
            <div className="es-tl-seg es-tl-seg--pre" />
            <div className="es-tl-event">
              <div className="es-tl-event-dot" />
              <div className="label-mono es-tl-event-label">事件日</div>
            </div>
            <div className="es-tl-seg es-tl-seg--post" />
          </div>
          <div className="es-tl-labels">
            <span className="label-mono">p = −14</span>
            <span className="label-mono">p = 0</span>
            <span className="label-mono">p = +14</span>
          </div>
        </div>
        <div className={`es-design-model card${shown ? " is-shown" : ""}`}>
          <div className="label-mono es-model-label">事件研究回歸模型</div>
          <TeX display>
            {`r_{i,t}^{\\text{adj}} = \\sum_{p=-14}^{14} \\beta_p \\cdot D_{ip} + \\delta_i + \\mu_t + \\varepsilon_{it}`}
          </TeX>
          <div className="es-model-legend">
            <div className="label-mono es-ml-row"><TeX>{`\\beta_p`}</TeX> — 事件前後第 <TeX>{`p`}</TeX> 天的平均 <TeX>{`\\beta`}</TeX> 調整超額收益</div>
            <div className="label-mono es-ml-row"><TeX>{`D_{ip}`}</TeX> — 指示變量：股票 <TeX>{`i`}</TeX> 的事件是否發生在第 <TeX>{`t{-}p`}</TeX> 天</div>
            <div className="label-mono es-ml-row"><TeX>{`\\delta_i`}</TeX> — 個股固定效應</div>
            <div className="label-mono es-ml-row"><TeX>{`\\mu_t`}</TeX> — 時間固定效應</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 · Positive news – paper screenshot ────────────────────────── */
function ScenePositive() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--positive">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 正面新聞：七天提前上漲</div>
        <span className="badge-mono">Figure 5 (左面板) · Fan, Xue, Zhou (2021)</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-paper-layout">
        <div className={`es-paper-frame${shown ? " is-shown" : ""}`}>
          <img
            src={`${import.meta.env.BASE_URL}figures/fig5-event-study.png`}
            alt="Figure 5 left panel: positive news event study"
            className="es-paper-img"
          />
        </div>
        <div className="es-paper-notes">
          <MaskReveal show={shown} delay={200} duration={600}>
            <div className="es-paper-note-card card">
              <div className="label-mono es-pn-label">左圖：正面新聞</div>
              <div className="es-pn-key"><span className="es-pn-num">−7</span> 天前已顯著上漲</div>
              <div className="label-mono es-pn-detail">消息提前洩露，聰明錢佈局</div>
            </div>
          </MaskReveal>
          <MaskReveal show={shown} delay={500} duration={600}>
            <div className="es-paper-note-card card es-pnc--accent">
              <div className="label-mono es-pn-label">事件當天峰值</div>
              <div className="es-pn-key"><span className="es-pn-num">+83</span> bps</div>
              <div className="label-mono es-pn-detail">beta 調整超額收益</div>
            </div>
          </MaskReveal>
          <MaskReveal show={shown} delay={800} duration={600}>
            <div className="es-paper-note-card card">
              <div className="label-mono es-pn-label">機制</div>
              <div className="es-pn-desc">正面消息 → 直接買入無摩擦 → 可提前定價</div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 · Negative news – paper screenshot ────────────────────────── */
function SceneNegative() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--negative">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 負面新聞：事前零反應</div>
        <span className="badge-mono">Figure 5 (右面板) · Fan, Xue, Zhou (2021)</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-paper-layout">
        <div className={`es-paper-frame${shown ? " is-shown" : ""}`}>
          <img
            src={`${import.meta.env.BASE_URL}figures/fig5-event-study.png`}
            alt="Figure 5 right panel: negative news event study"
            className="es-paper-img"
          />
        </div>
        <div className="es-paper-notes">
          <MaskReveal show={shown} delay={200} duration={600}>
            <div className="es-paper-note-card card">
              <div className="label-mono es-pn-label">右圖：負面新聞</div>
              <div className="es-pn-key"><span className="es-pn-num--neg">0</span> 天前反應</div>
              <div className="label-mono es-pn-detail">事件前曲線平坦，零提前反映</div>
            </div>
          </MaskReveal>
          <MaskReveal show={shown} delay={500} duration={600}>
            <div className="es-paper-note-card card es-pnc--neg">
              <div className="label-mono es-pn-label">事件當天跌幅</div>
              <div className="es-pn-key"><span className="es-pn-num--neg">−26</span> bps</div>
              <div className="label-mono es-pn-detail">beta 調整超額收益</div>
            </div>
          </MaskReveal>
          <MaskReveal show={shown} delay={800} duration={600}>
            <div className="es-paper-note-card card">
              <div className="label-mono es-pn-label">機制</div>
              <div className="es-pn-desc">融券限制 → 即使提前知道壞消息也難以做空 → 無法提前定價</div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · 83 vs 26 comparison ────────────────────────────────────── */
function SceneAsymmetry() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--asymmetry">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 不對稱：融券限制的印記</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-asym-layout">
        <div className={`es-asym-col${shown ? " is-shown" : ""}`} style={{ transitionDelay: "0ms" }}>
          <div className="label-mono es-asym-label">正面新聞</div>
          <div className="hero-num es-asym-num es-asym-num--pos">+83</div>
          <div className="es-asym-unit">bps · 事件當天</div>
          <div className="es-asym-detail">
            <div className="es-asym-row">提前期：7 天</div>
            <div className="es-asym-row">持續：2 天後消散</div>
            <div className="es-asym-row">機制：直接買入，摩擦小</div>
          </div>
        </div>
        <div className="es-asym-divider" />
        <div className={`es-asym-col${shown ? " is-shown" : ""}`} style={{ transitionDelay: "200ms" }}>
          <div className="label-mono es-asym-label">負面新聞</div>
          <div className="hero-num es-asym-num es-asym-num--neg">−26</div>
          <div className="es-asym-unit">bps · 事件當天</div>
          <div className="es-asym-detail">
            <div className="es-asym-row">提前期：無</div>
            <div className="es-asym-row">持續：3 天後消散</div>
            <div className="es-asym-row">機制：融券困難，無法提前定價</div>
          </div>
        </div>
      </div>
      <MaskReveal show={shown} delay={400} duration={600}>
        <div className="es-asym-insight">
          正面衝擊是負面的 3 倍 &nbsp;·&nbsp; 融券限制讓負面信息無法提前定價——制度性不對稱
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 4 · Literature ─────────────────────────────────────────────── */
function SceneLiterature() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setLit(1), 300),
      setTimeout(() => setLit(2), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--lit">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 文獻支持</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="es-lit-title">制度設計寫在數據裡</h2>
      </MaskReveal>
      <div className="es-lit-cards">
        <div className={`es-lit-card card${lit >= 1 ? " is-lit" : ""}`}>
          <div className="label-mono es-lit-ref">Chen et al. (2019)</div>
          <div className="es-lit-finding">
            漲跌停板 + 融券限制讓負面信息更難被市場吸收——
            市場對壞消息的反應被制度性地壓制
          </div>
        </div>
        <div className={`es-lit-card card${lit >= 2 ? " is-lit" : ""}`}>
          <div className="label-mono es-lit-ref">Nagel (2005)</div>
          <div className="es-lit-finding">
            美股數據同樣顯示：融券限制影響負面消息的傳播速度，
            高度融券限制股票的負面消息傳播更慢
          </div>
        </div>
      </div>
      <MaskReveal show={lit >= 2} delay={200} duration={600}>
        <div className="es-lit-conclusion">
          A 股事件研究的不對稱圖形 = 融券限制的直接統計印記
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Step 5 · Placebo test ───────────────────────────────────────────── */
function ScenePlacebo() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="es-scene scene-pad es-scene--placebo">
      <div className="es-header">
        <div className="kicker">Chapter 11 · 安慰劑實驗</div>
        <span className="badge-mono">Figure 6 · Fan, Xue, Zhou (2021)</span>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="es-placebo-layout">
        <div className={`es-paper-frame es-placebo-fig${shown ? " is-shown" : ""}`}>
          <img
            src={`${import.meta.env.BASE_URL}figures/fig6-placebo.png`}
            alt="Figure 6: Placebo test — 200 random windows vs real event study curves"
            className="es-paper-img"
          />
          <div className="label-mono" style={{ fontSize: 14, marginTop: 8, color: "var(--text-faint)" }}>
            Figure 6 — 200 條安慰劑曲線（灰）vs 真實事件研究曲線（黑）
          </div>
        </div>
        <div className="es-placebo-notes">
          <MaskReveal show={shown} delay={200} duration={600}>
            <div className="es-paper-note-card card">
              <div className="label-mono es-pn-label">實驗設計</div>
              <div className="es-pn-desc">對每支股票隨機選 28 天窗口作假事件日，重複 200 次，各自跑事件研究回歸</div>
            </div>
          </MaskReveal>
          <MaskReveal show={shown} delay={500} duration={600}>
            <div className="es-paper-note-card card es-pnc--accent">
              <div className="label-mono es-pn-label">安慰劑結果</div>
              <div className="es-pn-key" style={{ fontSize: 28 }}>200 條曲線貼近零線</div>
              <div className="label-mono es-pn-detail">無任何系統性提前上漲模式</div>
            </div>
          </MaskReveal>
          <MaskReveal show={shown} delay={800} duration={600}>
            <div className="es-paper-note-card card">
              <div className="label-mono es-pn-label">結論</div>
              <div className="es-pn-desc">真實曲線清楚站在安慰劑分佈之外——效應是真實的，不是統計噪音</div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function EventStudyChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneDesign />;
  if (step === 1) return <ScenePositive />;
  if (step === 2) return <SceneNegative />;
  if (step === 3) return <SceneAsymmetry />;
  if (step === 4) return <SceneLiterature />;
  return <ScenePlacebo />;
}
