/*----------------------------
Roku tools
*/
'use strict';

const URL = 'https://mami.tools/tools/';
const ICON_DIR = './common/images/icon/';

// ヘッダーメニュー
const header = '<div class="header__inner">'
    +'<h1 class="header__title header-title">'
    +'<a>★ Roku tools </a>'
    // +'<a href="index.html">★ Roku tools </a>'
    +'</h1>'
    +'<nav class="header__nav nav" id="js-nav">'
    +'<ul class="nav__items nav-items">'
    // +'<li class="nav-items__item"><a href="index.html">トップページ</a></li>'
    // +'<li class="nav-items__item"><a href="anki.html">暗記</a></li>'
    // +'<li class="nav-items__item"><a href="redsheet.html">赤シート</a></li>'
    // +'<li class="nav-items__item"><a href="calc.html">計算ツール</a></li>'
    +'<li class="nav-items__item"><a href="factorization_kuma.html">因数分解</a></li>'
   // +'<li class="nav-items__item"><a href="divisor.html">約数</a></li>'
    +'<li class="nav-items__item"><a href="flash.html">flash暗算</a></li>'
    +'<li class="nav-items__item tab_timer"><a href="timer.html">タイマー</a></li>'
    +'<li class="nav-items__item tab_game"><a href="reversi.html">ゲーム</a></li>'
    // +'<li class="nav-items__item tab_edu"><a href="flash.html">知育</a></li>'
    // +'<li class="nav-items__item"><a href="bmi.html">bmi</a></li>'
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

/*-----------------------------------------------------------------
 * 
 * 
 * roku tools 
 * 
 * 
 */
class RokuTool {
constructor(conf, initCallback, createQuestion) {
  this.current_cnt = 0;
  this.all_cnt = 0;
  this.miss = 0;
  this.correct = 0;
  this.answer = '';
  this.history = [];   // 履歴を入れておく
  this.questions = [];   // 指定回数分設問を入れておく
  this.timer;
  this.conf = conf;

  this.initCallback = initCallback;
  this.createQuestion = createQuestion;

  // 設定タブ　クリックイベントリスナ
  $.each(this.conf, (k, v)=>{
    this.clickTab(k);
  })
    
  // 設定タプにタラメータの値を反映
  this.setConf();
  $('.js_start').click(()=>{
    this.startGame();     // howtoスタートボタンのクリックイベントリスナ
  })
  $('#start_message').click((e)=>{
    this.start(e);
  })
  $(document).on('click', '.js_quit', ()=>{
    this.quit();          // 終了ボタン
  })
  $(document).on('click', '.js_retry', ()=>{
    this.retry();         // リトライボタン
  })
  $('#display_help').click((e)=>{
    this.displayHelp (e);  // ヘルプアイコン
  })
  $('[name=display_help]').click(()=>{
    this.toggleHelp();    // ヘルプラジオ
  })
  // this.start();         // タップしてスタート
  $('#js_clear').click(()=>{
    this.clear();
  })
  $('.tenkey_box li').click((e)=>{
    this.tenkey();
  })
  $(document).keydown((e) =>{
    this.keyboard(e);
  })
  $('#js_ok').click((e)=>{
    this.go(e);            // goボタン
  })
}

init = () =>{
  this.miss = 0;
  this.current_cnt=1;
  $('#current_cnt').html(this.current_cnt);
  $('#howto').css('display', 'none');
  $('#timer').html('0.00');
  this.prepare();
  if(typeof this.initCallback=='function'){
    // コールバック
    this.initCallback(this);
  }
}
prepare = ()=>{
  $('#question').html('');
  $('#answer').html('');
  $('#help').html('');
  this.correct = 0; // 正解
  this.answer = '';
}

//-------------------------
// タップしてスタート
start = (e) =>{
    this.init();
    // タイマースタート
    this.timer.runTimer();
    // 設問作成
    setTimeout(() => {
      if(typeof this.createQuestion=='function'){
        // コールバック
        this.createQuestion(this);
      }
    }, "700");
  $(e.currentTarget).css('display', 'none');
}

/*-----------------------
 end
-----------------------*/
end = ()=>{
  $('#howto').css('display', 'block');
  let score_time = ((Date.now() - this.timer.startTime) / 1000).toFixed(2);
  let str = "<p>Finish!!</p>"
    + "<p>レベル： " + this.conf.level + "</p>"
    + "<p>タイム： <span style='font-size:2.2rem;'>" + score_time + "</span></p>"
    + "<p>間違えた回数： " + this.miss +"回</p>"
    +"<div class='btn_box'><div class='btn js_retry'>もう一回</div>"
    +"<div class='btn js_quit'>終了</div></div>"
    +"<div class='txtSS mt20'>レベルやスピードを変更するときは「終了」</div>";
  // 履歴を保存
  this.history.push((this.history.length+1)+'. '+'level' + this.conf.level + " <b style='font-size:1.5rem;'> " + score_time + " </b> (miss " + this.miss + ")");
  if(this.history.length>1){
    str = str + '<hr>' + this.history.join('<br>');
  }
  $('#howto').html(str);
  this.timer.stopTimer();
  $('#message').css('display', 'block');
}

/*----------------------- 
 判定！！OK
-----------------------*/
go = ()=>{
  if(!this.timer.isRunning){
    return;
  }
  if(parseInt(this.answer) == parseInt(this.correct)){
      if(parseInt(this.current_cnt) == parseInt(this.conf.times)){
          // 指定回数完了！！ 
          this.end();
          return;
      }
      // カウントアップ
      this.current_cnt += 1;
      // OKくまさんを表示して、0.7秒後に次の問題へ
      this.showOkAnimal();
  } else {
      Gakuburu($('#question'), 300);
      this.miss++;
  }
}
// OKくまさんを表示して、0.7秒後に次の問題へ
showOkAnimal = ()=>{
  $('#ok_sign').addClass('fadeUp');
  $('#ok_sign').css('display', 'block');
  setTimeout(() => {
      this.prepare();
      this.createQuestion(this);
  }, "700");
}
/*-----------------------------
* 設定タブ
*/
clickTab(tab){
  $('.tab_'+tab+' div').click((e)=>{
    this.conf[tab] = $(e.currentTarget).html();
    $(e.currentTarget).parent().find('.status').removeClass('-green');
    $(e.currentTarget).addClass('-green');
  })
}
/*-----------------------------
* urlパラメータを取得
*/
getConfParam(){
  let p=[];
  $.each(this.conf, (k,v)=>{
    p.push(k+"="+v)
  })
  let param = p.join('&');
  if($('#display_help').length>0){
    param += '&display_help='+isActive($('#display_help'))
  }
  if($('#display_animal').length>0){
    param += '&display_animal='+isActive($('#display_animal'))
  }
  return param;
}
/*-----------------------------
* 設定タプにタラメータの値を反映
*/
setConf(){
  let params = getParams();
  if(Object.keys(params).length>0){
    Object.keys(params).forEach((k) =>{
      // set conf
      this.conf[k] = params[k];
      $('.tab_'+k+' div').removeClass('-green');
      let obj
      for(let i=0; i<$('.tab_'+k+' div').length; i++){
        obj = $($('.tab_'+k+' div')[i])
        if(obj.html()==params[k]){
          obj.addClass('-green')
        }
      }
    });

    $.each(params, function(k, v){
      this.conf[k] = params[k];
      $('.tab_'+k+' div').removeClass('-green');
      $('.tab_'+k+' div').each((e)=>{
        if($(e.currentTarget).html()==params[k]){
          $(e.currentTarget).addClass('-green');
        }
      })
    })
    this.toggleRadio(params['display_help'], $('[name=display_help]'));
    this.toggleRadio(params['display_animal'], $('[name=display_animal]'));
  }
}
// 設定のラジオボタンをセット
toggleRadio(para, elem){
  if(typeof para!='undefined' && para.length>0){
    if(para=='1'){
      elem.eq(0).prop('checked', true);
      elem.eq(0).parent().addClass('-checked');
      elem.eq(1).prop('checked', false);
      elem.eq(1).parent().removeClass('-checked');
    } else {
      elem.eq(0).prop('checked', false);
      elem.eq(0).parent().removeClass('-checked');
      elem.eq(1).prop('checked', true);
      elem.eq(1).parent().addClass('-checked');
    }
  }
}

//-------------------------
// howtoスタート
startGame = ()=>{
  $('.level_'+this.conf['level']).addClass('-green');
  $('.speed_'+this.conf['speed']).addClass('-green');
  $('.times_'+this.conf['times']).addClass('-green');
  $('#all_cnt').html(this.conf.times);
  $('#howto').css('display', 'none');
}
// 終了
quit = ()=>{
  openConfirm('quit?', ()=>{
    location.href = getUrl() + "?" + this.getConfParam();
  })
}
// リトライ
retry = ()=>{
  $('#howto').css('display', 'none');
  $('#start_message').css('display', 'block');
  // initialize
  this.init();
}
//-------------------
// テンキー
//-------------------
tenkey = (e)=>{
  if(!this.timer.isRunning){
    return;
  }
  this.answer = this.answer + String($(e.currentTarget).html());
  $('#answer').html(this.answer);
}
//-------------------
// キーボード
//-------------------
keyboard = (e)=>{
  const key = e.keyCode-48;
  if(this.timer.isRunning){
    if(key==-35){
      // エンターキー
      this.go(e);
    } else if(key==-40){
      // clear
      this.clear()
    } else if(key>=0 && key<=9){
      // tenkey
      this.answer = this.answer + key;
      $('#answer').html(this.answer);
    }
  }
}

/*-----------------------
clear
-----------------------*/
clear = ()=>{
  if(!this.timer.isRunning){
      return;
  }
  this.answer = this.answer.substring(0, this.answer.length-1);
  $('#answer').html(this.answer);
}
// ヘルプtoggle
displayHelp = (e)=>{
  $('#help').toggle();
  toggleIcon($(e.currentTarget), ICON_DIR+'beginner.png');
}

toggleHelp = ()=>{
  // ヒントtoggle
  if($('[name=display_help]:checked').val()==1){
      $('#display_help').attr('src', ICON_DIR+'beginner.png');
      $('#help').css('display', 'block');
  } else {
      $('#display_help').attr('src', ICON_DIR+'beginner_off.png');
      $('#help').css('display', 'none');
  }
}

}


