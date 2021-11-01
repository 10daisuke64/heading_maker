/* ---------------------------
  定義
----------------------------- */
const $input_en = $("#js-input-en");
const $input_ja = $("#js-input-ja");

// 乱数発生
function random_number(min,max) {
  var random = Math.floor( Math.random() * (max - min + 1) ) + min;
  return random;
}

/* ---------------------------
  font-familyの登録
----------------------------- */
// 欧文フォント
array_en = new Array();
array_en =
[
  { name: "Montserrat", weight: ["300","700"] },
  { name: "Roboto", weight: ["300","700"] },
  { name: "Lato", weight: ["300","700"] },
  { name: "Playfair+Display", weight: ["400","700"] },
  { name: "Jost", weight: ["300","400","600"] },
  { name: "Playball", weight: ["400"] },
  { name: "Cormorant+Infant", weight: ["300","500","700"] },
  { name: "Josefin+Sans", weight: ["400","600"] },
  { name: "Caveat", weight: ["400","700"] },
  { name: "Styles", weight: ["400"] }
]

// 日本語フォント
array_ja = new Array();
array_ja =
[
  { name: "Noto+Sans+JP", weight: ["400"] },
  { name: "Noto+Serif+JP", weight: ["300","400"] },
  { name: "Shippori+Mincho+B1", weight: ["400"] },
  { name: "Shippori+Mincho", weight: ["400"] },
  { name: "Sawarabi+Gothic", weight: ["400"] },
  { name: "Sawarabi+Mincho", weight: ["400"] },
  { name: "Zen+Kaku+Gothic+Antique", weight: ["400"] }
]


/* ---------------------------
  Google fonts 読み込み
----------------------------- */
// 欧文
var loop_google_font_en = "";
$.each(array_en, function(index,val){
  loop_google_font_en += "family=" + val.name + ":wght@" + val.weight.join(";") + "&";
})
// 日本語
var loop_google_font_ja = "";
$.each(array_ja, function(index,val){
  loop_google_font_ja += "family=" + val.name + ":wght@" + val.weight.join(";") + "&";
})
// linkタグの形へ連結
const link_google_font = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + loop_google_font_en + loop_google_font_ja + 'display=swap">'
$("head").append(link_google_font);


/* ---------------------------
  ランダムにカードを表示
----------------------------- */
// 配列の個数を取得
const array_en_length = array_en.length - 1;
const array_ja_length = array_ja.length - 1;

for (var i = 0; i < 60; i++) {
  var random_number_en = random_number(0, array_en_length);
  var random_number_ja = random_number(0, array_ja_length);

  //--------------- 英語 ---------------
  // フォント名
  var random_font_en = "font-family:'" + array_en[random_number_en]["name"] + "';";
  random_font_en = random_font_en.replaceAll("+", " ");
  // 太さ
  var array_weight_en_length = array_en[random_number_en]["weight"].length - 1;
  var random_weight_en = "font-weight:" + array_en[random_number_en]["weight"][random_number(0, array_weight_en_length)] + ";";

  //--------------- 日本語---------------
  // フォント名
  var random_font_ja = "font-family:'" + array_ja[random_number_ja]["name"] + "';";
  random_font_ja = random_font_ja.replaceAll("+", " ");
  // 太さ
  var array_weight_ja_length = array_ja[random_number_ja]["weight"].length - 1;
  var random_weight_ja = "font-weight:" + array_ja[random_number_ja]["weight"][random_number(0, array_weight_ja_length)] + ";";


  // 吐き出すコードの連結
  var random_en = '<li><div class="display"><h2 class="en" style="' + random_font_en +  random_weight_en + '"></h2><p class="ja" style="' + random_font_ja +  random_weight_ja + '"></p></div></li>';

  $("#js-list").append(random_en);
}



/* ---------------------------
  表示テキスト
----------------------------- */
// 表示テキストの初期値
$(function(){
  var en_val = $input_en.val();
  $(".en").text(en_val);
  var ja_val = $input_ja.val();
  $(".ja").text(ja_val);
})

// 表示テキストの変更
$input_en.keyup(function(){
  var en_val = $(this).val();
  $(".en").text(en_val);
})
$input_ja.keyup(function(){
  var ja_val = $(this).val();
  $(".ja").text(ja_val);
})

/* ---------------------------
  font-familyの表示
----------------------------- */
// font-familyの表示の仕込み
$(".display").each(function(){
  var en_font = $(this).find(".en").css("font-family");
  var en_weight = $(this).find(".en").css("font-weight");
  var ja_font = $(this).find(".ja").css("font-family");
  var ja_weight = $(this).find(".ja").css("font-weight");

  // CSSの記述
  var copy_css =
  '.en {\n  font-family: ' + en_font + ';\n  font-weight: ' + en_weight + ';\n}\n' + '.ja {\n  font-family: ' + ja_font + ';\n  font-weight: ' + en_weight + ';\n}\n';

  // 挿入するテキストエリア
  var copy_css_textarea =
  '<div class="copy"><div class="copy__inner"><textarea>' + copy_css + '</textarea><button>Copy!</button></div></div>';

  $(this).after(copy_css_textarea);
})

// font-familyの表示のスライドトグル
$(".display").on("click", function(){
  $(this).next(".copy").slideToggle(200);
})


/* ---------------------------
  CSSのコピー
----------------------------- */
$(".copy button").on("click", function(){
  $(this).siblings("textarea").select();
	document.execCommand('copy');
})

/* ---------------------------
  リロード
----------------------------- */
$("#js-reload").on("click", function(){
  location.reload();
})
