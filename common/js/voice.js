SpeechRecognition = webkitSpeechRecognition;

class VoiceInput {
	_targetElement;
	_currentValue;
	_recognition;
	_oneTime; 					// 一度の認識で終了するかどうか.
	_addNewLine = true;			// 改行を挟むかどうか
	_showIntermediate = true;	// 途中のプロセスも表示する
	_len = 0;					// 文字列の長さ
	_timer_id;					// 文字列の記帳を監視する（しばらく放置されていたらstopする）
	_silent_cnt = 0;
	_auto_off_cnt = 10

	constructor(element) {
		this._targetElement = element;
		this._currentValue = element.value;
		const recognition = new SpeechRecognition();
		recognition.lang = "ja-JP";
		recognition.interimResults = true;// 認識途中にも受け取る
		// set event handler.
		recognition.onaudiostart = () => {
			// console.log('SpeechRecognition', 'onaudiostart');
		};
		recognition.onaudioend = () => {
			// console.log('SpeechRecognition', 'onaudioend');
		};
		recognition.onresult = (event) => {
			if (event.results[0].isFinal) {
				// 確定した ---> 現在の値も更新
				this._currentValue = this._currentValue + "\n" + event.results[0][0].transcript
				this._targetElement.value = this._currentValue;
			} else if(this._showIntermediate) {
				// 入力途中のプロセスも表示
				this._targetElement.value = this._currentValue + "\n" +event.results[0][0].transcript;
			}
		};
		recognition.onnomatch = () => {
			// console.log('SpeechRecognition', 'onnomatch');
		};
		recognition.onend = () => {
			// console.log('SpeechRecognition', 'onend', this._targetElement.id);
			// 自動で停止するので、stop()コールまでは継続してstart()する.
			if (this._recognition && !this._oneTime) {
				this._recognition.start();
				return;
			}
		};
		this._recognition = recognition;
	}

	/**
	 * 認識開始.
	 * @param {*} oneTime true - 一度の認識で終了する
	 */
	start(oneTime) {
		if (this._recognition) {
			this._oneTime = oneTime;
			this._recognition.start();

			// 30秒音声を拾わなかったらオフにする
			this._timer_id = setInterval(()=>{
				if(this._len==this._targetElement.value.length){
					if(this._silent_cnt>this._auto_off_cnt){
						console.log('off');
						// オフにする
						this.stop();
						clearInterval(this._timer_id);
						if(typeof $('.js_microphone')!='undefined'){
							toggleIcon($('.js_microphone'), ICON_DIR+'microphone.png');
						}
					}
					this._silent_cnt++;
				}
				this._len = this._targetElement.value.length;
			}, 1000);
		}
	}
	stop() {
		if (this._recognition) {
			this._recognition.stop();
			this._recognition = undefined;
		}
	}
}
