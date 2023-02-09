/*----------------------------
Roku tools
*/
'use strict';

const header = '<div class="header__inner">'
    +'<h1 class="header__title header-title">'
    +'<a href="index.html">★ Roku tools </a>'
    +'</h1>'
    +'<nav class="header__nav nav" id="js-nav">'
    +'<ul class="nav__items nav-items">'
    +'<li class="nav-items__item"><a href="redsheet.html">赤シート</a></li>'
    +'<li class="nav-items__item"><a href="calc.html">計算ツール</a></li>'
    +'<li class="nav-items__item"><a href="timer.html">タイマー</a></li>'
    +'<li class="nav-items__item"><a href="reversi.html">オセロ</a></li>'
    +'<li class="nav-items__item"><a href="memory.html">神経衰弱</a></li>'
    +'<li class="nav-items__item"><a href="flash.html">フラッシュ暗算</a></li>'
    +'<li class="nav-items__item"><a href="watch.html">ストップウォッチ</a></li>'
    +'<li class="nav-items__item"><a href="prime.html">素数パズル</a></li>'
    +'<li class="nav-items__item"><a href="maketen.html">テンパズル</a></li>'
    +'<li class="nav-items__item"><a href="bmi.html">bmi</a></li>'
    +'<li class="nav-items__item"><a href="maze.html">迷路</a></li>'
    +'<li class="nav-items__item"><a href="tools.html">ツール</a></li>'
    +'</ul>'
    +'</nav>'
    +'<button class="header__hamburger hamburger" id="js-hamburger">'
    +'<span></span>'
    +'<span></span>'
    +'<span></span>'
    +'</button>'
    +'</div>'
$("header").html(header); // TODO load関数はローカルで使えないので。

const clear = '<div class="btn -red" id="js_all_clear">全てクリア</div><div class="btn" id="js_clear">クリア</div>';
$(".clear_box").html(clear);




/*----------------------------*/
// スマホだったらソフトウェアキーボードを表示しない
if(isSP()){
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
 * タイマー
 */
let startTime = null;   // timer
let timerid;
let isPlay = false;
function runTimer(){
    let t = ((Date.now() - startTime) / 1000).toFixed(2);
   $('#timer').html(t);
    timerid = setTimeout(runTimer, 12);
}
/*-----------------------------
* リセットボタン
*/
$('#js_reset').click(function(){
  openConfirm('リセットしますか？', function(){
    location.href=location.href;
  })
})

/*-----------------------------
* 音アイコン
*/
$('.js_sound').on('click', function(){
  if($(this).attr('src').indexOf('_on')>-1){
    $(this).attr('src', './common/images/icon/sound_off.png')
    if($('#sound_status')){
      $('#sound_status').html('スピーカーはオフです');
    }
  } else {
    $(this).attr('src', './common/images/icon/sound_on.png')
    if($('#sound_status')){
      $('#sound_status').html('音が鳴ります');
    }
  }
})
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
