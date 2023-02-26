$(function(){
    'use strict';

	// 最大ファイルサイズ
	// const MAX_FILE_SIZE = 1048576 * 2;
	const MAX_FILE_SIZE = 1048576 * 4;

	// ファイルフォーマットチェック
	var checkFileFormat = function( type, size ) {
		if ( ! /^image\/(gif|png|jpeg)$/.test( type ) ) {
			alert( "画像ファイルではありません。" );
			return false;
		}
		if ( size > MAX_FILE_SIZE ) {
			alert( "ファイルサイズは " + MAX_FILE_SIZE + "bytes 以下にしてください。" );
			return false;
		}
		return true;
	};


	// .main は drag drop 不可にしておく
	$(".main").on("dragenter dragover dragleave drop", function(){
		return false;
	});


	// #js-id_drop_zone は drag & drop 可能に
	$("#js-id_drop_zone")
	// ドラッグオーバー時は背景色を変更
	.on( "dragover.js", function(){
		$(this).css({"backgroundColor":"#FFA"});
		return false;
	})
	// ドラッグアウト時も背景色を変更
	.on( "dragleave.js", function(){
		$(this).css({"backgroundColor":"#DDD"});
		return false;
	})
	// ドロップ時の処理
	.on( "drop.js", function(evt){
		var that = this;
		var file = evt.originalEvent.dataTransfer.files[0];
		var data = {
			name : file.name,
			size : file.size,
			type : file.type,
			base64 : ""
		};

		// フォーマットチェック
		if ( ! checkFileFormat( data.type, data.size ) ) {
			$(that).css({"backgroundColor":"#DDD"});
			return false;
		}

		// 読み込み処理
		var fileReader = new FileReader();
		fileReader.readAsDataURL( file );
		fileReader.onload = function( event ) {
			data.base64 = this.result.split(',')[1];	// base64取得
			displayImage( data );
		};

		// 読み込み終わりの処理
		fileReader.onloadend = function(){
			$(that).css({"backgroundColor":"#DDD"});
		};

		return false;
	})
	// クリック時はfileダイアログオープン
	.on( "click.js", function(){
		$("#js-id_file").trigger( "click" );
	});


	// クリックアップロード時は onChange イベント経由で処理
	$("#js-id_file").on( "change.js", function(){
		var files = $(this).prop( "files" );

		// 何もアップロードされなかった場合
		if ( files.length !== 1 ) {
			return false;
		}

		var file = files[0];
		var data = {
			name : file.name,
			size : file.size,
			type : file.type,
			base64 : ""
		};

		// フォーマットチェック
		if ( ! checkFileFormat( data.type, data.size ) ) {
			return false;
		}

		// ファイル読込
		var fileReader = new FileReader();
		fileReader.readAsDataURL( file );
		fileReader.onload = function( event ) {
			data.base64 = this.result.split(',')[1]; // base64取得
			displayImage( data );
		};

		// 読み込み終わり時の処理
		fileReader.onloadend = function( event ){
		};

	});

	// 画像表示
	var displayImage = function( data ) {
		$("#js-id_result").html("").append(
			$("<p />").text( "file name:" + data.name + " , size: " + data.size + "bytes" ),
			$("<img />").attr({src: "data:" + data.type +  ";base64," + data.base64})
		);
	};
})