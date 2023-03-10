/*----------------------------
Roku tools
*/
'use strict';

const URL = 'https://mami.tools/tools/';
const ICON_DIR = './common/images/icon/';

// ヘッダーメニュー
const header = '<div class="header__inner">'
    +'<h1 class="header__title header-title">'
    +'<a href="index.html">★ Roku tools </a>'
    +'</h1>'
    +'<nav class="header__nav nav" id="js-nav">'
    +'<ul class="nav__items nav-items">'
    +'<li class="nav-items__item"><a href="index.html">トップページ</a></li>'
    +'<li class="nav-items__item"><a href="anki.html">暗記</a></li>'
    +'<li class="nav-items__item"><a href="redsheet.html">赤シート</a></li>'
    +'<li class="nav-items__item"><a href="calc.html">計算ツール</a></li>'
    +'<li class="nav-items__item tab_timer"><a href="timer.html">タイマー</a></li>'
    +'<li class="nav-items__item tab_game"><a href="reversi.html">ゲーム</a></li>'
    +'<li class="nav-items__item tab_edu"><a href="flash.html">知育</a></li>'
    +'<li class="nav-items__item"><a href="bmi.html">bmi</a></li>'
    +'</ul>'
    +'</nav>'
    +'<button class="header__hamburger hamburger" id="js-hamburger">'
    +'<span></span>'
    +'<span></span>'
    +'<span></span>'
    +'</button>'
    +'</div>'
$("header").html(header); // TODO load関数はローカルで使えないので。
// クリア
const clear = '<div class="btn -red" id="js_all_clear">全てクリア</div><div class="btn" id="js_clear">クリア</div>';
$(".clear_box").html(clear);

// タイマータブ
$('#tab_timer').html(
  '<div class="tabBox">'
   +'<a class="btn -tab" href="timer.html">タイマー</a>'
   +'<a class="btn -tab" href="watch.html">ストップウォッチ</a>'
  +'</div>'
)
// ゲームタブ
$('#tab_game').html(
  '<div class="tabBox">'
   +'<a class="btn -tab" href="reversi.html">オセロ</a>'
   +'<a class="btn -tab" href="memory.html">神経衰弱</a>'
   +'<a class="btn -tab" href="maze.html">迷路</a>'
  +'</div>'
)
// 知育タブ
$('#tab_edu').html(
  '<div class="tabBox">'
   +'<a class="btn -tab txtS" href="flash.html">フラッシュ暗算</a>'
   +'<a class="btn -tab txtS" href="prime.html">素数パズル</a>'
   +'<a class="btn -tab txtS" href="maketen.html">テンパズル</a>'
  +'</div>'
)
/*-----------------------------
* ヘッダー active
*/
var file = window.location.href.split('/').pop();
$('.nav__items>li').each(function(i, e){
  $(this).removeClass('active');
  if(file==$(this).find('a').attr('href')){
    $(this).addClass('active');
  } 
})
$('.-tab').each(function(i, e){
  $(this).removeClass('active');
  if(file==$(this).attr('href')){
    $(this).addClass('active');

    let menu = $(this).parent().parent().attr('id');
  $('.'+menu).addClass('active');
  } 
})
$('.-tab').click(function(){
  $('.nav__items>li').removeClass('active');
  
})

/*----------------------------*/
// スマホだったらソフトウェアキーボードを表示しない
if(isSP() || isTablet()){
    $(".input").attr('readOnly', 'true');
} else {
    $(".input").removeAttr('readOnly');
}

/*-----------------------
  エンターキー
-----------------------*/
// $('.input').keypress(function(e) {
//     // enter, tab
//     if (e.keyCode == 13 || e.keyCode == 9) {
//         $(this).select();
//       return false;
//     }
// });


/*-----------------------------
* リセットボタン
*/
$('#js_reset').click(function(){
  openConfirm('リセットしますか？', function(){
    location.href=location.href;
  })
})


