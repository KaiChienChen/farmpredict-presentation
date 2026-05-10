import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  {
    text: "PCA 的直覺清楚了之後，我們來看 FarmPredict 怎麼把它串起來。FarmPredict 全名是 Factor-Augmented Regularized Model for Prediction，因子增強的正則化預測模型。整個框架分三步：第一步，PCA 提取潛在因子；第二步，條件篩選情感詞；第三步，LASSO 正則化回歸預測收益。",
  },
  {
    text: "這三步的邏輯是一條線。先把數據裡的公共話題提出來，用 PCA 控制掉話題帶來的相關性；再去找在話題層面解釋不了的個股特異信號；最後做稀疏回歸，讓機器決定哪些詞的個股信號最強。整個過程對「話題是什麼」沒有任何假設，全部從數據自己學。這比直接把七萬個詞放進回歸聰明太多了。",
  },
  {
    text: "和 SESTM 的根本差別在哪裡？SESTM 先假設只有兩個話題——正面和負面——再用收益做監督學習估計詞的情感。這是兩步估計，而且第一步假設了話題個數和結構。FarmPredict 不假設話題數量，直接從數據裡無監督地學，而且條件篩詞是在控制住因子之後做的，這是關鍵的差別。",
  },
];
