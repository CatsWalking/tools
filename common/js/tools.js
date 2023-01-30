/*----------------------------
Roku tools
*/
'use strict';

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
