import type { ChapterDef } from "./types";
import ColdopenChapter from "../chapters/01-coldopen/Coldopen";
import { narrations as coldopenNarrations } from "../chapters/01-coldopen/narrations";
import BackgroundChapter from "../chapters/02-background/Background";
import { narrations as backgroundNarrations } from "../chapters/02-background/narrations";
import ChineseMarketChapter from "../chapters/03-chinese-market/ChineseMarket";
import { narrations as chineseMarketNarrations } from "../chapters/03-chinese-market/narrations";
import PcaReviewChapter from "../chapters/04-pca-review/PcaReview";
import { narrations as pcaReviewNarrations } from "../chapters/04-pca-review/narrations";
import MethodOverviewChapter from "../chapters/05-method-overview/MethodOverview";
import { narrations as methodOverviewNarrations } from "../chapters/05-method-overview/narrations";
import MethodStep1Chapter from "../chapters/06-method-step1/MethodStep1";
import { narrations as methodStep1Narrations } from "../chapters/06-method-step1/narrations";
import MethodStep2Chapter from "../chapters/07-method-step2/MethodStep2";
import { narrations as methodStep2Narrations } from "../chapters/07-method-step2/narrations";
import MethodStep3Chapter from "../chapters/08-method-step3/MethodStep3";
import { narrations as methodStep3Narrations } from "../chapters/08-method-step3/narrations";
import DataChapter from "../chapters/09-data/Data";
import { narrations as dataNarrations } from "../chapters/09-data/narrations";
import SentimentWordsChapter from "../chapters/10-sentiment-words/SentimentWords";
import { narrations as sentimentWordsNarrations } from "../chapters/10-sentiment-words/narrations";
import EventStudyChapter from "../chapters/11-event-study/EventStudy";
import { narrations as eventStudyNarrations } from "../chapters/11-event-study/narrations";
import PortfolioChapter from "../chapters/12-portfolio/Portfolio";
import { narrations as portfolioNarrations } from "../chapters/12-portfolio/narrations";
import ComparisonChapter from "../chapters/13-comparison/Comparison";
import { narrations as comparisonNarrations } from "../chapters/13-comparison/narrations";
import ResidualVsFactorChapter from "../chapters/14-residual-vs-factor/ResidualVsFactor";
import { narrations as residualVsFactorNarrations } from "../chapters/14-residual-vs-factor/narrations";
import SensitivityChapter from "../chapters/15-sensitivity/Sensitivity";
import { narrations as sensitivityNarrations } from "../chapters/15-sensitivity/narrations";
import ConclusionChapter from "../chapters/16-conclusion/Conclusion";
import { narrations as conclusionNarrations } from "../chapters/16-conclusion/narrations";

export const CHAPTERS: ChapterDef[] = [
  {
    id: "coldopen",
    title: "開場",
    narrations: coldopenNarrations,
    Component: ColdopenChapter,
  },
  {
    id: "background",
    title: "文字分析的進化史",
    narrations: backgroundNarrations,
    Component: BackgroundChapter,
  },
  {
    id: "chinese-market",
    title: "中文市場的特殊性",
    narrations: chineseMarketNarrations,
    Component: ChineseMarketChapter,
  },
  {
    id: "pca-review",
    title: "複習 PCA",
    narrations: pcaReviewNarrations,
    Component: PcaReviewChapter,
  },
  {
    id: "method-overview",
    title: "FarmPredict 框架概覽",
    narrations: methodOverviewNarrations,
    Component: MethodOverviewChapter,
  },
  {
    id: "method-step1",
    title: "第一步：提取潛在因子",
    narrations: methodStep1Narrations,
    Component: MethodStep1Chapter,
  },
  {
    id: "method-step2",
    title: "第二步：條件篩選與殘差",
    narrations: methodStep2Narrations,
    Component: MethodStep2Chapter,
  },
  {
    id: "method-step3",
    title: "第三步：預測模型",
    narrations: methodStep3Narrations,
    Component: MethodStep3Chapter,
  },
  {
    id: "data",
    title: "數據與預處理",
    narrations: dataNarrations,
    Component: DataChapter,
  },
  {
    id: "sentiment-words",
    title: "情感詞與詞典比較",
    narrations: sentimentWordsNarrations,
    Component: SentimentWordsChapter,
  },
  {
    id: "event-study",
    title: "事件研究：信息傳播不對稱",
    narrations: eventStudyNarrations,
    Component: EventStudyChapter,
  },
  {
    id: "portfolio",
    title: "投資組合績效",
    narrations: portfolioNarrations,
    Component: PortfolioChapter,
  },
  {
    id: "comparison",
    title: "深度學習 vs FarmPredict",
    narrations: comparisonNarrations,
    Component: ComparisonChapter,
  },
  {
    id: "residual-vs-factor",
    title: "消融實驗：殘差 vs 因子",
    narrations: residualVsFactorNarrations,
    Component: ResidualVsFactorChapter,
  },
  {
    id: "sensitivity",
    title: "穩健性檢驗",
    narrations: sensitivityNarrations,
    Component: SensitivityChapter,
  },
  {
    id: "conclusion",
    title: "結論",
    narrations: conclusionNarrations,
    Component: ConclusionChapter,
  },
];
