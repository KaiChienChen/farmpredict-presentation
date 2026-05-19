import { useEffect, useState } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import { TeX } from "../../components/TeX";
import type { ChapterStepProps } from "../../registry/types";
import "./SentimentWords.css";

/* ── Step 0 · Word lists ──────────────────────────────────────────────── */
const POS_WORDS = ["漲停", "走強", "十只", "漲", "抢反彈"];
const NEG_WORDS = ["跌停", "敢死隊", "準確率", "日盤", "跌"];

function SceneWordList() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const timers = Array.from({ length: 10 }, (_, i) =>
      setTimeout(() => setLit(i + 1), 300 + i * 220)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="sw-scene scene-pad sw-scene--wordlist">
      <div className="sw-header">
        <div className="kicker">Chapter 10 · 情感詞驗證：敢死隊</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="sw-wl-title">模型選出的情感詞</h2>
      </MaskReveal>
      <div className="sw-wl-layout">
        <div className="sw-wl-col">
          <div className="sw-wl-col-head sw-wl-col-head--pos label-mono">正面詞 Top 5</div>
          {POS_WORDS.map((w, i) => (
            <div
              key={w}
              className={`sw-word-item sw-word-item--pos${lit > i ? " is-lit" : ""}`}
            >
              <span className="sw-word-rank label-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="sw-word-text">{w}</span>
              <span className="sw-word-tag label-mono">交易性</span>
            </div>
          ))}
        </div>
        <div className="sw-wl-divider" />
        <div className="sw-wl-col">
          <div className="sw-wl-col-head sw-wl-col-head--neg label-mono">負面詞 Top 5</div>
          {NEG_WORDS.map((w, i) => (
            <div
              key={w}
              className={`sw-word-item sw-word-item--neg${lit > i + 5 ? " is-lit" : ""}${w === "敢死隊" ? " sw-word-item--highlight" : ""}`}
            >
              <span className="sw-word-rank label-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="sw-word-text">{w}</span>
              {w === "敢死隊" && <span className="sw-word-tag sw-word-tag--star label-mono">★ 典型案例</span>}
            </div>
          ))}
        </div>
      </div>
      <MaskReveal show={lit >= 10} duration={600}>
        <p className="sw-wl-note">正面詞偏「交易行為」，負面詞兼具交易信號和市場比喻語言</p>
      </MaskReveal>
    </div>
  );
}

/* ── Step 1 · 敢死隊 case ─────────────────────────────────────────────── */
function SceneDareDevil() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="sw-scene scene-pad sw-scene--daredevil">
      <div className="sw-header">
        <div className="kicker">Chapter 10 · 案例深挖</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <div className="sw-dd-body">
        <MaskReveal show duration={900}>
          <div className="sw-dd-word">敢死隊</div>
        </MaskReveal>
        <div className={`sw-dd-cols${phase >= 1 ? " is-shown" : ""}`}>
          <div className="sw-dd-card card">
            <div className="label-mono sw-dd-card-label">字面意思</div>
            <div className="sw-dd-card-body">執行敢死任務的隊伍</div>
          </div>
          <div className="sw-dd-card card">
            <div className="label-mono sw-dd-card-label">股市比喻</div>
            <div className="sw-dd-card-body">市場暴跌時衝進去抄底的散戶資金</div>
          </div>
        </div>
        <div className={`sw-dd-verdict${phase >= 2 ? " is-shown" : ""}`}>
          <div className="sw-dd-dict card">
            <span className="label-mono">Loughran-McDonald 詞典</span>
            <span className="sw-dd-dict-result sw-dd-dict-result--no">找不到 ✗</span>
          </div>
          <div className="sw-dd-arrow">→</div>
          <div className="sw-dd-dict card sw-dd-dict--found">
            <span className="label-mono">FarmPredict 從數據學到</span>
            <span className="sw-dd-dict-result sw-dd-dict-result--yes">負面信號 ✓</span>
          </div>
        </div>
        <MaskReveal show={phase >= 3} duration={700}>
          <p className="sw-dd-insight">
            人有語言直覺，機器沒有——但機器可以從統計模式裡找到同樣的規律
          </p>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ── Step 2 · FarmPredict vs SESTM words ─────────────────────────────── */
const FARM_NEG = ["跌停", "敢死隊", "準確率", "日盤", "跌幅"];
const SESTM_NEG = ["跌停", "造假", "涉嫌", "大跌", "立案"];

function SceneCompareWords() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sw-scene scene-pad sw-scene--compare">
      <div className="sw-header">
        <div className="kicker">Chapter 10 · 兩套負面詞表對比</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="sw-cmp-title">條件篩選 vs 邊際篩選</h2>
      </MaskReveal>
      <div className="sw-cmp-layout">
        <div className="sw-cmp-col">
          <div className="sw-cmp-head label-mono">FarmPredict 負面詞</div>
          <div className="sw-cmp-tag label-mono">資產定價 · 交易語言</div>
          {FARM_NEG.map((w, i) => (
            <div
              key={w}
              className="sw-cmp-word sw-cmp-word--farm"
              style={{ opacity: shown ? 1 : 0, transitionDelay: `${i * 80}ms` }}
            >
              {w}
            </div>
          ))}
        </div>
        <div className="sw-cmp-col">
          <div className="sw-cmp-head label-mono">SESTM 負面詞（邊際篩選）</div>
          <div className="sw-cmp-tag label-mono">法律事件 · 行政詞彙</div>
          {SESTM_NEG.map((w, i) => (
            <div
              key={w}
              className="sw-cmp-word sw-cmp-word--sestm"
              style={{ opacity: shown ? 1 : 0, transitionDelay: `${i * 80 + 400}ms` }}
            >
              {w}
            </div>
          ))}
        </div>
      </div>
      <MaskReveal show={shown} delay={500} duration={600}>
        <p className="sw-cmp-note">兩個方法找的信息維度根本不同——FarmPredict 抓交易信號，SESTM 抓法律事件</p>
      </MaskReveal>
    </div>
  );
}

/* ── Step 3 · Market observation ─────────────────────────────────────── */
function SceneMarket() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sw-scene scene-pad sw-scene--market">
      <div className="sw-header">
        <div className="kicker">Chapter 10 · A 股市場觀察</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>
      <MaskReveal show duration={600}>
        <h2 className="sw-mkt-title">正面詞的性質在中美市場截然不同</h2>
      </MaskReveal>
      <div className="sw-mkt-compare">
        <div className={`sw-mkt-card card${shown ? " is-shown" : ""}`} style={{ transitionDelay: "0ms" }}>
          <div className="sw-mkt-flag label-mono">A 股市場</div>
          <div className="sw-mkt-type">交易性詞彙</div>
          <div className="sw-mkt-examples">漲停板 · 抢反弹 · 資金流入</div>
          <div className="sw-mkt-reason">散戶主導 · 羊群效應<br />跟著交易信號走，不分析基本面</div>
        </div>
        <div className="sw-mkt-vs">vs</div>
        <div className={`sw-mkt-card card sw-mkt-card--us${shown ? " is-shown" : ""}`} style={{ transitionDelay: "200ms" }}>
          <div className="sw-mkt-flag label-mono">美股市場</div>
          <div className="sw-mkt-type">基本面詞彙</div>
          <div className="sw-mkt-examples">低估值 · 回購 · 盈利超預期</div>
          <div className="sw-mkt-reason">機構主導 · 基本面分析<br />消息直接反映在公司價值判斷</div>
        </div>
      </div>
      <MaskReveal show={shown} delay={400} duration={600}>
        <p className="sw-mkt-note">正面交易消息直接觸發散戶買盤——A 股的制度和投資者結構都寫在情感詞裡</p>
      </MaskReveal>
    </div>
  );
}

/* ── Step 4 · Panel regression ───────────────────────────────────────── */
function ScenePanelReg() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sw-scene scene-pad sw-scene--panel">
      <div className="sw-header">
        <div className="kicker">Chapter 10 · 面板回歸驗證</div>
        <hr className="rule" style={{ marginTop: 16 }} />
      </div>

      <MaskReveal show duration={700}>
        <div className="sw-panel-formula card">
          <div className="label-mono sw-panel-formula-label">面板回歸模型（含控制變量）</div>
          <div style={{ fontSize: "2em" }}>
            <TeX display>
              {`\\tilde{r}_{i,t} = \\alpha + \\gamma \\cdot S_{i,t-1} + \\boldsymbol{\\theta}^\\top \\mathbf{Z}_{i,t} + \\delta_i + \\mu_t + \\varepsilon_{i,t}`}
            </TeX>
          </div>
          <div className="sw-panel-formula-legend">
            <div className="label-mono"><TeX>{`\\tilde{r}_{i,t}`}</TeX> — 個股 <TeX>{`\\beta`}</TeX> 調整超額收益</div>
            <div className="label-mono"><TeX>{`\\gamma`}</TeX> — 情感係數</div>
            <div className="label-mono"><TeX>{`S_{i,t-1}`}</TeX> — 前一天情感分數（滯後一期）</div>
            <div className="label-mono"><TeX>{`\\boldsymbol{\\theta}^\\top\\mathbf{Z}_{i,t}`}</TeX> — 控制變量：市值、賬面市值比、波動率、<TeX>{`\\beta`}</TeX>、滯後收益、盈餘意外</div>
            <div className="label-mono"><TeX>{`\\delta_i`}</TeX> — 個股固定效應</div>
            <div className="label-mono"><TeX>{`\\mu_t`}</TeX> — 時間固定效應（與事件研究符號一致）</div>
          </div>
        </div>
      </MaskReveal>

      <div className="sw-panel-layout">
        <div className="sw-panel-left">
          <MaskReveal show delay={300} duration={600}>
            <div className="sw-panel-target card">
              <div className="label-mono sw-panel-target-label">預測目標：個股 beta 調整收益</div>
              <div className="sw-panel-coef">
                <span className="hero-num sw-panel-num">0.193</span>
                <span className="sw-panel-stars">***</span>
              </div>
              <div className="label-mono sw-panel-sub">
                <TeX>{`\\gamma`}</TeX> 係數估計（最嚴格規格）
              </div>
              <div className="sw-panel-r2">
                <TeX>{`R^2`}</TeX>：0.007 → <strong>0.031</strong>（加入情感分數後）
              </div>
            </div>
          </MaskReveal>
        </div>
        <div className="sw-panel-right">
          <MaskReveal show={shown} duration={600}>
            <div className="sw-panel-target card sw-panel-target--mkt">
              <div className="label-mono sw-panel-target-label">換成：大盤指數（CSI 300）</div>
              <div className="sw-panel-coef">
                <span className="sw-panel-num-na">—</span>
              </div>
              <div className="label-mono sw-panel-sub">所有規格均不顯著</div>
              <div className="sw-panel-r2">情感分數對大盤沒有預測力</div>
            </div>
          </MaskReveal>
        </div>
      </div>
      <MaskReveal show={shown} delay={300} duration={600}>
        <div className="sw-panel-insight">
          對個股顯著 + 對大盤無效 = 模型捕捉的是<strong>個股特異信息</strong>，不是市場情緒
        </div>
      </MaskReveal>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function SentimentWordsChapter({ step }: ChapterStepProps) {
  if (step === 0) return <SceneWordList />;
  if (step === 1) return <SceneDareDevil />;
  if (step === 2) return <SceneCompareWords />;
  if (step === 3) return <SceneMarket />;
  return <ScenePanelReg />;
}
