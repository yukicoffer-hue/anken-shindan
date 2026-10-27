// ===== 設定（ここだけ書き換える）。index.html と thanks.html の両方が読む =====
window.LP_CONFIG = {
  // TimeRexの予約ページURL（X流入用・60分）。運用開始前に、TimeRex側のページ名から本名と「テスト用」を外すこと
  timerexUrl: "https://timerex.net/s/kazuki8063825_f733/4aea2dc5",
  // 面談の時間（分）。TimeRexの設定と必ず合わせる
  meetingMinutes: 60,
  // 特典（プロフェッショナルOS）を受け取れる期限。診断結果が出てからの分数。期限を過ぎた人には実際に渡さない
  bonusMinutes: 30,
  // Xのアカウント名（@なし）
  xAccount: "Yuuki170314",
  // GA4の測定ID（例: G-XXXXXXX）。空なら計測しない
  ga4Id: "G-DFK5XBWTTD",
  // 案件データの取得日
  dataDate: "2026年10月27日",
  // 顔になる人物（ここを変えると、LPの名前・肩書・写真・実績がまとめて変わる）
  persona: {
    name: "ふじさん",
    title: "21歳でサイドFIRE",
    photo: "face-illust.webp",
    recordLabel: "累計案件獲得数",
    recordValue: "800",
    recordUnit: "件以上",
  },
};

// 案件のレベル（Lv1〜4は2026-10-27、Lv5は2026-10-28のCW新着案件の報酬欄から）
// price＝相場表に出す幅、from＝診断結果に出す「1本◯円〜」の表記
window.LP_LEVELS = {
  1: { name: "ショート動画のカット・テロップ", unit: "1本あたり", price: "500〜2,000円", from: "1本500円〜",
       ex: [["美容系ショート（60〜90秒）", "2,000円"], ["Vlogショートの編集アシスタント", "1,200円"], ["YouTubeのテンプレ編集", "1,100円"]] },
  2: { name: "企画込みのショート・広告動画", unit: "1本あたり", price: "3,000〜6,000円", from: "1本3,000円〜",
       ex: [["Meta広告用の動画（月20本）", "4,000円"], ["動物園のショート動画（月4本〜）", "3,000円"], ["旅行系YouTube（演者あり）", "6,000円〜"]] },
  3: { name: "YouTubeの長尺編集", unit: "1本あたり", price: "8,000〜13,000円", from: "1本8,000円〜",
       ex: [["美容医療YouTube（完成10〜12分）", "8,200円"], ["YouTube横動画の継続", "8,000〜13,000円"], ["YouTube（10〜30分）の継続", "11,000円"]] },
  4: { name: "継続の編集・SNS運用まるごと", unit: "月あたり", price: "5〜15万円", from: "月5万円〜",
       ex: [["登録者数万人のYouTube（週1本）", "5〜10万円"], ["セミナー映像の短尺化（継続）", "10〜15万円"], ["SNS動画の企画から編集まで", "5〜10万円"]] },
  5: { name: "YouTubeディレクター・企業のSNS運用", unit: "月あたり", price: "20〜40万円", from: "月20万円〜",
       ex: [["YouTubeディレクター（経験者）", "20〜25万円"], ["YouTube動画制作のディレクター（長期）", "20〜30万円"], ["SNS・ショート動画のメインディレクター", "40万円〜"]] },
};

// GA4（設定されているときだけ）
(function () {
  var C = window.LP_CONFIG;
  window.lpTrack = function (name, params) { if (window.gtag) window.gtag("event", name, params || {}); };
  if (!C.ga4Id) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.ga4Id);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", C.ga4Id);
})();

// GA4を使っているときだけ、ページ下にアクセス解析の一文を出す（Googleアナリティクスの利用規約で必要）
document.addEventListener("DOMContentLoaded", function () {
  if (!window.LP_CONFIG.ga4Id) return;
  var p = document.createElement("p");
  p.className = "ga-note";
  p.append("このサイトでは、利用状況を知るためにGoogleアナリティクスを使っています。Cookieを使って匿名でデータを集めており、個人を特定するものではありません。");
  var a = document.createElement("a");
  a.href = "https://policies.google.com/technologies/partner-sites?hl=ja";
  a.target = "_blank"; a.rel = "noopener";
  a.textContent = "Googleによるデータの使われ方";
  p.append(" ", a);
  var host = document.querySelector("footer") || document.body;
  host.append(p);
});

// 端末に結果と期限を保存（読み込み失敗しても動く）
window.lpStore = {
  get: function (k) { try { return JSON.parse(localStorage.getItem("lp_" + k)); } catch (e) { return null; } },
  set: function (k, v) { try { localStorage.setItem("lp_" + k, JSON.stringify(v)); } catch (e) {} },
};
