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
let timer_id;
let isPlay = false;
let t ;
function runTimer(){
    t = ((Date.now() - startTime) / 1000).toFixed(2);
    document.getElementById('timer').textContent=t;
    timerid = setTimeout(runTimer, 12);
}



$('#js_reset').click(function(){
  openConfirm('リセットしますか？', function(){
    location.href=location.href;
  })
})

