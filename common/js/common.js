$(document).on('click', '#js-hamburger', function () { //ハンバーガーメニューをクリックしたら
  $(this).toggleClass('active'); // ハンバーガーメニューにactiveクラスを付け外し
  $('#js-nav').toggleClass('active'); // ナビゲーションメニューにactiveクラスを付け外
});
//--------------------------------------------------------------------------
//
// common
//
//--------------------------------------------------------------------------
// パラメータを除去したURLを返す
function getUrl() {
  return location.protocol + "//" + location.host + location.pathname; //+ location.search;
}
function getFileName() {
  return window.location.href.split("/").pop();
}
function getUrlParam() {
  let url = location.protocol + "//" + location.host + location.pathname + location.search;
  url += url.indexOf("?") == "-1" ? "?" : "&";
  return url;
}
// パラメータを連想配列に
function getParam()
{
	var url_search = location.search.substr(1).split('&');
	var para = [];
	var key = null;
	for(var i = 0 ; i < url_search.length ; i++)	{
		key = url_search[i].split("=");
		para[key[0]] = key[1];
	}
	return (para);
}
function getParam2(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getToday() {
  var now = new Date();
  return now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
}
function getTime() {
  var now = new Date();
  return +("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
}
function formated_time(t) {
  let formated_time = t;
  if (t.match(/[0-9]{4}/)) {
    formated_time = t.substr(0, 2) + ":" + t.substr(-2);
  } else if (t.match(/[0-9]{3}/)) {
    formated_time = "0" + t.substr(0, 1) + ":" + t.substr(-2);
  }
  return formated_time;
}


//------------------------------------
// radio label class
//------------------------------------
$(document).on("click", ".radioarea input", function () {
  $(this).parent().parent().find("label").removeClass("-checked");
  $(this).parent().addClass("-checked");
});
//------------------------------------
// tabmenu label class
//------------------------------------
$(document).on("click", ".tabmenuarea input", function () {
  $(this).parent().parent().find("label").removeClass("-checked");
  $(this).parent().addClass("-checked");
});
//------------------------------------
// checkbox label class
//------------------------------------
$(document).on("click", ".checkboxarea input", function () {
  if ($(this).prop("checked")) {
    $(this).parent().addClass("-checked");
  } else {
    $(this).parent().removeClass("-checked");
  }
});
$(".js_file").on("change", function () {
  //ファイルが選択されたら
  var file = $(this).prop("files")[0]; //ファイルの情報を代入(file.name=ファイル名/file.size=ファイルサイズ/file.type=ファイルタイプ)
  $(".js_filename").text(file.name); //ファイル名を出力
  $(".js_fileclear").show(); //クリアボタンを表示
});
$(".js_fileclear").click(function () {
  //クリアボタンがクリックされたら
  $(".js_file").val(""); //inputをリセット
  $(".js_filename").text("ファイルが未選択です"); //ファイル名をリセット
  $(this).hide(); //クリアボタンを非表示
});

function hide(elem) {
  elem.style.display = "none";
}
function show(elem) {
  elem.style.display = "block";
}
function toggle(elem) {
  if (elem.style.display == "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}
/**
 * 全角を半角に変換
 * @param str
 * @returns {*}
 */
function zenToHan(str) {
  str = str.replace(/ー|−/g, "-");
  str = str.replace(/\．/g, ".");
  return str.replace(/[Ａ-Ｚａ-ｚ０-９！-]/g, function (s) {
    str = String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    return str.replace(/ō/g, "-");
  });
}
function zen2han(name) {
  $(document).on("change", name, function () {
    $(name).val(zenToHan($(name).val()));
  });
}
/**
 * 丸め
 * @param val
 * @param decimal_place
 * @returns {number}
 */
function round(val, decimal_place) {
  let keta;
  if (decimal_place == 1) {
    keta = 10;
  } else if (decimal_place == 2) {
    keta = 100;
  } else if (decimal_place == 3) {
    keta = 1000;
  }
  return Math.round(val * keta) / keta;
}

/**
 * 乱数
 * @param min
 * @param max
 * @returns {*}
 */
function rand(min, max) {
  return Math.floor(Math.random() * max - 1) + min + 1;
}

/**
 * dynamicListener.min.js
 */
!(function (e) {
  "use strict";
  Element.prototype.matches ||
    (Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (e) {
        for (var t = (this.document || this.ownerDocument).querySelectorAll(e), r = t.length; --r >= 0 && t.item(r) !== this; );
        return r > -1;
      }),
    (e.addDynamicEventListener = function (e, t, r, o, n) {
      e.addEventListener(
        t,
        (function (e, t) {
          return function (r) {
            if (r.target && r.target.matches(e)) return (r.delegatedTarget = r.target), void t.apply(this, arguments);
            var o = event.path || (event.composedPath && event.composedPath());
            if (o)
              for (var n = 0; n < o.length; ++n) {
                var a = o[n];
                if ((a.matches(e) && ((r.delegatedTarget = a), t.apply(this, arguments)), a === r.currentTarget)) return;
              }
          };
        })(r, o),
        n
      );
    });
})(this);

function goToTop() {
  const duration = 150;
  let currentY = window.pageYOffset; // 現在のスクロール位置を取得
  let step = duration / currentY > 1 ? 10 : 100; // 三項演算子
  let timeStep = (duration / currentY) * step; // スクロール時間
  let intervalId = setInterval(function () {
    currentY = window.pageYOffset;
    if (currentY === 0) {
      clearInterval(intervalId); // ページ最上部に来たら終了
    } else {
      scrollBy(0, -step); // step分上へスクロール
    }
  }, timeStep);
}

/**
 * URLからパラメータをオブジェクトとして取得
 * 引数としてURLを渡せばオブジェクトに変換する
 *
 * @param {string} search
 * @param {Window|null} _window
 * @returns object
 */
function getUrlQueryParams(search = null, _window = null) {
  let result = {};
  _window = _window ? _window : window;

  if (!search) {
    search = _window.location.search;
  }
  if (search.indexOf("?") !== -1) {
    search = search.split("?")[1];
  }

  if (!search) {
    return result;
  }

  search.split("&").forEach(function (val) {
    let sep = val.split("=");
    result[sep[0]] = sep[1];
  });
  return result;
}

/**
 * URLパラメータを更新する
 * ※ URLを変更します
 *
 * @param {string|object} key
 * @param {mixed} val
 * @param {Window|null} _window
 */
function updateUrlQueryParams(key, val = null, _window = null) {
  let params = getUrlQueryParams(null, _window);
  _window = _window ? _window : window;
  // オブジェクト指定なら結合
  if (typeof key === "object") {
    params = Object.assign(params, key);
  } else {
    params[key] = val;
  }
  _window.location.href = getUrl() + "?" + new URLSearchParams(params).toString();
}

/**
 * URLパラメータから指定のキーを削除する
 * ※ URLを変更します
 *
 * @param {string} key
 * @param {Window|null} _window
 */
function removeUrlQueryParams(key, _window = null) {
  let params = getUrlQueryParams(null, _window);
  _window = _window ? _window : window;
  delete params[key];
  _window.location.href = getUrl() + "?" + new URLSearchParams(params).toString();
}
function sleep(waitMsec) {
  var startMsec = new Date();
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

/*------------------------------------------------------------------------------
  フローティングボタン
----------------------------------------------------------------------------*/
$(function () {
  $(".c-btnBox__float_toggle").click(function () {
    $(".c-btnBox__float").fadeToggle(200);
  });
  let over_flg = false;
  $(".c-btnBox__float_toggle, .c-btnBox__float").hover(
    function () {
      over_flg = true;
    },
    function () {
      over_flg = false;
    }
  );
  // 領域外をクリックしたらメニューを閉じる
  $("body").click(function () {
    if (over_flg == false) {
      $(".c-btnBox__float").fadeOut(200);
    }
  });
});

function getAgent(){
  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0) {
    return 1; // sp
  } else if (navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0) {
      return 2; // tablet  
  } else {
      return 3; // pc
  }
}
function isSP() {
  return getAgent()==1 ? true : false;
}
function isTablet() {
  return getAgent()==2 ? true : false;
}
function isPC() {
  return getAgent()==3 ? true : false;
}


/**
 * ステータス切り替えタブ
 */
function switchTab(name, callback = null) {
  let swith_group_name = "#tab_" + name;

  $(swith_group_name + " > span").click(function () {
    $(swith_group_name).children("span").removeClass("active");
    $(this).addClass("active");
    $("[name=" + name + "]").val($(this).data(name));
    // list更新
    if (callback) {
      callback($(this).data(name));
    }
  });
}

/*------------------------------------------------------------------------------
  ツールチップの表示
----------------------------------------------------------------------------*/
$(function () {
  $("[data-help]").on("mouseover", function (e) {
    openTooltip($(this), $(this).attr("data-help"));
  });
  $("[data-help]").on("mouseout", function (e) {
    closeBalloon();
  });
});

String.prototype.bytes = function () {
  var length = 0;
  for (var i = 0; i < this.length; i++) {
    var c = this.charCodeAt(i);
    if ((c >= 0x0 && c < 0x81) || c === 0xf8f0 || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
      length += 1;
    } else {
      length += 2;
    }
  }
  return length;
};

/**
 * phpのstrtrをjs用に追加
 *
 * @param {Dict} dic
 * @returns
 */
String.prototype.strtr = function (dic) {
  const str = this.toString(),
    makeToken = (inx) => `{{###~${inx}~###}}`,
    tokens = Object.keys(dic).map((key, inx) => ({
      key,
      val: dic[key],
      token: makeToken(inx),
    })),
    tokenizedStr = tokens.reduce((carry, entry) => carry.replace(new RegExp(entry.key, "g"), entry.token), str);

  return tokens.reduce((carry, entry) => carry.replace(new RegExp(entry.token, "g"), entry.val), tokenizedStr);
};

/*------------------------------------------------------------------------------
  td全体をリンク領域にする
----------------------------------------------------------------------------*/
$(function () {
  $(document).on("click", "td[data-linkarea]", function () {
    // $("td[data-linkarea]").on("click", function () {
    location.href = $(this).data("linkarea");
  });
  $(".extra_linkarea").on("click", function (e) {
    e.stopPropagation();
  });
});

/*
 フォームを監視し、変更後に指定のリンクをクリックしたらアラートを表示する
 リンクにはclassにis_confirm_move を付与しておく。
*/
let is_changed = false;
function observeForm() {
  $("form").change(function () {
    is_changed = true;
    $(".js_confirm_move").on("click", function () {
      let link = $(this).attr("href");
      event.preventDefault();
      openConfirm(
        "フォームに変更がありました。保存せずに移動しますか？",
        function () {
          location.href = link;
        },
        null,
        500
      );
    });
  });
}
// ゼロ埋め
function zero_padding(t, len) {
  return ('0' + t).slice(-len);
}
// reload
$('#js_retry').click(function(){
  openConfirm('次のゲームをしますか？', function(){
    location.href = location.href;
  })
  
})
function getWindowSize(){
  return window.innerWidth;
  // return $(window).width();
}