SpeechRecognition = webkitSpeechRecognition;

class VoiceInput {
	_targetElement;
	_currentValue;
	_recognition;
	_oneTime; // 一度の認識で終了するかどうか.

	constructor(element) {
		this._targetElement = element;
		this._currentValue = element.value;
		const recognition = new SpeechRecognition();

		// 認識途中にも受け取る
		recognition.interimResults = true;

		// set event handler.
		recognition.onaudiostart = () => {
			console.log('SpeechRecognition', 'onaudiostart');
		};
		recognition.onaudioend = () => {
			console.log('SpeechRecognition', 'onaudioend');
		};
		recognition.onresult = (event) => {
			if (event.results[0].isFinal) {
				// 確定した. -> 現在の値も更新.
				this._currentValue = this._currentValue + event.results[0][0].transcript
				this._targetElement.value = this._currentValue;
                console.log(123,this._currentValue);
			} else {
				this._targetElement.value = this._currentValue + event.results[0][0].transcript;
			}
		};
		recognition.onnomatch = () => {
			console.log('SpeechRecognition', 'onnomatch');
		};
		recognition.onend = () => {
			console.log('SpeechRecognition', 'onend', this._targetElement.id);
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
		}
	}

	stop() {
        console.log('stop',111);
		if (this._recognition) {
            console.log('stop',222);
			this._recognition.stop();
			this._recognition = undefined;
		}
	}
}