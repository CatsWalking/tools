/*--------------------------------------------------
openModal: モーダルウィンドウ（固定）
openDialog: ダイアログウィンドウ（ダイアログ外領域クリックで閉じる）
openBalloon: バルーンウィンドウ（クリックした箇所に表示）
openConfirm: はい、いいえの確認ウィンドウ
showLoadingImg: ローディングイメージを表示する

overlay_close: 背景クリックでモーダルを閉じるかどうか。
--------------------------------------------------*/
let current_scrollY;

/**
 * ポップアップウィンドウの表示
 * @param {*} msg         表示内容
 * @param {*} width       幅の指定があれば
 * @param {*} height      高さの指定があれば
 * @param {*} overlay_close   ダイアログ外領域クリックで閉じるかどうか(default: true)
 */
function openPopup(msg, width = "500", stretch = false, header = "", footer = "", overlay_close = true) {
  let height_style = stretch ? "-fullHeight" : "";
  let close_dialog = overlay_close ? 'onclick="closeDialog();"' : "";
  let str =
    '<div class="modal ' +    height_style +    '" style="width:' +    width +    'px;">' +
    ' <div class="modal__close" onclick="closeDialog();"></div>' +
    ' <div class="modal__header">' +    header +    "</div>" +
    ' <div class="modal__body scroll-area">' +    msg +    "</div>" +
    ' <div class="modal__footer">' +    footer +    "</div>" +
    "</div>" +
    '<div class="modal__bg" ' +    close_dialog +    "></div>"; // 背景
  $("body").append(str);

  // 背景スクロールを無効化
  disableScrolling();

  let height = isSP() ? 300 : 420;
  if (stretch) {
    height = $(".modal").height() - $(".modal__header").innerHeight() - $(".modal__footer").innerHeight();
  }
  $(".modal").children(".modal__body.scroll-area").css({
    height: height,
  });
  // 画面リサイズ時の可変処理
  $(window).on("resize", function () {
    height = $(".modal").height() - $(".modal__header").innerHeight() - $(".modal__footer").innerHeight();
    $(".modal").children(".modal__body.scroll-area").css({
      height: height,
    });
  });
}

/*--------------------------------------------------
 * ダイアログを表示
 * ダイアログ以外の領域クリックで閉じる
 */
// function openDialog(msgText, okFunc = null, width = "400", overlay_close = true, ok_str = "はい") {
//   let str =
//     '<div class="modal" style="width: ' + width + 'px">' + '<div class="modal__close" onclick="closeDialog();"></div>' + '<div class="modal__body u-pt20 u-pb20" style="text-align:center">' + msgText + "</div>" + '<div class="modal__footer">' + '  <button id="js_dialog_ok" class="btn -green">' + ok_str + "</button>" + "</div>" + "</div>";
//   // 背景クリックでモーダル閉じるか。
//   if (overlay_close == true) {
//     str = str + '<div class="modal__bg" onclick="closeDialog();"></div>';
//   } else {
//     str = str + '<div class="modal__bg"></div>';
//   }
//   document.body.insertAdjacentHTML("beforeend", str);
//   // 背景スクロールを無効化
//   disableScrolling();
//   // OK
//   document.getElementById("js_dialog_ok").addEventListener("click", () => {
//     closeDialog();
//     if (okFunc != null) {
//       okFunc();
//     }
//     return true;
//   });
// }
function openDialog(msgText, okFunc = null, width = "400", overlay_close = true, ok_str = "") {
  let btn = "";
  if (ok_str != "") {
    btn = '<div class="modal__footer"><button id="js_dialog_ok" class="btn -green">' + ok_str + "</button>" + "</div>";
  }

  let str = '<div class="modal" style="width: ' + width + 'px">' 
    + '<div class="modal__close" onclick="closeDialog();"></div>' 
    + '<div class="modal__body u-pt20 u-pb20" style="text-align:center">'+ msgText + "</div>" 
    + btn 
    + "</div>";
  // 背景クリックでモーダル閉じるか。
  if (overlay_close == true) {
    str = str + '<div class="modal__bg" onclick="closeDialog();"></div>';
  } else {
    str = str + '<div class="modal__bg"></div>';
  }
  document.body.insertAdjacentHTML("beforeend", str);
  // 背景スクロールを無効化
  disableScrolling();
  // OK
  $("#js_dialog_ok").click(function () {
    if (typeof okFunc == "function") {
      let res = okFunc();
      if (res) {
        closeDialog();
      }
    } else {
      closeDialog();
    }
    return true;
  });
}
/*--------------------------------------------------
 * モーダルを表示
 * ボタンクリックで閉じる
 */
function openModal(msgText, okFunc = null, width = "400", ok_str = "") {
  openDialog(msgText, okFunc, width, false, ok_str);
}

// 背景スクロールを無効化
function disableScrolling() {
  current_scrollY = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = -1 * current_scrollY + "px";
}

/**--------------------------------------------------
 * 確認モーダルの表示
 * @param {*} msgText
 * @param {*} yesFunc
 * @param {*} noFunc
 * @param {*} width
 */
function openConfirm(msgText, yesFunc, noFunc, width = 400) {
  let str =
    '<div class="modal" style="width:' +
    width +
    'px">' +
    '<div class="modal__close" onclick="closeDialog();"></div>' +
    '<div class="modal__body u-pt20 u-pb20" style="text-align:center">' +
    msgText +
    "</div>" +
    '  <div class="modal__footer">' +
    '    <button id="js_confirm_no" class="btn -gray">いいえ</button> ' +
    '    <button id="js_confirm_yes" class="btn -green">はい</button>' +
    "  </div>" +
    "</div>" +
    '<div class="modal__bg"></div>'; // 背景クリックでモーダル閉じない
  document.body.insertAdjacentHTML("beforeend", str);
  // 背景スクロールを無効化
  //    current_scrollY = window.pageYOffset || document.documentElement.scrollTop;
  //    document.body.style.position = 'fixed';
  //    document.body.style.width = '100%';
  //    document.body.style.top = -1 * current_scrollY + 'px';
  disableScrolling();
  // OK
  $(document).on("click", "#js_confirm_yes", function () {
    closeDialog();
    if (yesFunc && typeof yesFunc === "function") {
      yesFunc();
    }
    return true;
  });
  // NG
  $(document).on("click", "#js_confirm_no", function () {
    // 処理が指定されていたら実行
    if (noFunc && typeof noFunc === "function") {
      noFunc();
    }
    closeDialog();
    return false;
  });
}
// close
function closeDialog() {
  $(".modal").remove();
  $(".modal__bg").remove();
  // 背景スクロールを有効化してスクロール位置を復元
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";
  document.documentElement.scrollTop = current_scrollY;
}

/**
 * メッセージを表示して、ふわっと消す
 * @param {*} msg メッセージ
 * @param {*} delay 何秒間表示するか
 * @param {*} func メッセージ表示後の処理の指定があれば設定
 */
function openNotice(msg, delay = 600, func = null) {
  $("body").append($('<div id="open_notice" class="notice_message"><i class="fa fa-check fa-white"></i>' + msg + "</div>"));
  if (delay == "" || typeof delay === "undefined") delay = 600;
  $("#open_notice")
    .fadeIn(100)
    .delay(delay)
    .fadeOut(100, function () {
      $("#open_notice").remove();
      // 処理が指定されていたら実行
      if (typeof func !== "undefined" && func !== null) {
        func();
      }
    });
}

/**--------------------------------------------------
 * バルーンの表示
 * @param {*} elem
 * @param {*} msgText
 * @param {*} yesFunc
 */
function openBalloon(elem, msgText, yesFunc = null) {
  str =
    '<div class="c-balloon -warning">' +
    msgText +
    '<div class="buttons">' +
    "  <span class=\"btn -red js_balloon_yes\" onclick=\"$('.c-balloon').remove();$('.js_balloon_bg').remove();\">はい</span>" +
    "  <span class=\"btn -gray js_balloon_no\" onclick=\"$('.c-balloon').remove();$('.js_balloon_bg').remove();\">いいえ</span></div>" +
    "</div>";
  closeBalloon(elem);
  elem.append(str);

  $(".js_balloon_bg").remove();
  $("body").append('<div class="modal__bg -lighten js_balloon_bg"></div>'); // 背景クリックでモーダル閉じない
  // OK
  $(document).on("click", ".js_balloon_yes", function () {
    $(".c-balloon").remove();
    $(".js_balloon_bg").remove();
    yesFunc();
    closeBalloon(elem);
  });
  $(document).on("click", ".js_balloon_no", function () {
    $(".c-balloon").remove();
    $(".js_balloon_bg").remove();
    closeBalloon(elem);
  });
}
// バルーン非表示
function closeBalloon(e) {
  $(".c-balloon").remove();
  $(".js_balloon_bg").remove();
  $(".js_balloon_bg").parent().remove();
  $(document).off("click", ".js_balloon_yes");
  $(document).off("click", ".js_balloon_no");
}
/**--------------------------------------------------
 * ツールチップの表示
 * @param {*} elem
 * @param {*} msgText
 * @param {*} yesFunc
 */
function openTooltip(elem, msgText) {
  let pos = elem.position();
console.log(pos, pos.left+300);
  str = '<div class="c-balloon -right tooltip" style="font-size:0.9rem;z-index:99 !important;">' + msgText + "</div>";
  elem.append(str);
  $(".c-balloon").css("top", pos.top).css("left", pos.left + elem.width() + 40);
  $("body").append('<div id="tooltip_overlay" style="z-index:999;position:fixed;width:100%;height:100%;top:0;left:0;opacity:0.1;">');
}
$(document).on('click', '#tooltip_overlay', function(){
  $('.tooltip').remove();
  $(this).remove();
})
/**--------------------------------------------------
 * ローディングイメージ表示
 */
function showLoadingImg(waitMsec = 0) {
  // waitMsecミリ秒間だけループさせる
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
  // loading img
  let style = "position:fixed;top:50%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);";
  $("body").append('<img src="./common/images/gif_load.gif" id="img_loading" style="' + style + '">');
  // 画面ロック
  $("body").append('<div id="overlay" style="z-index:999;position:fixed;width:100%;height:100%;top:0;left:0;background:#000;opacity:0.1">');
}

// ローディングイメージ非表示
function hideLoadingImg() {
  $("#img_loading").remove();
  $("#overlay").remove();
}
