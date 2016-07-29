package sound;
import common.Dat;
import js.Browser;
import js.html.audio.AnalyserNode;
import js.html.audio.AudioContext;
import js.html.audio.MediaElementAudioSourceNode;
import js.html.audio.MediaStreamAudioSourceNode;
import js.html.AudioElement;
import js.html.Uint8Array;

/**
 * ...
 * @author nabe
 */
class MyAudio
{

	private var analyser:AnalyserNode;
	
	public var timeData:Uint8Array;
	public var audio:AudioElement;
	
	private var _oldFreqByteData	:Array<Int>;
	private var _impulse			:Array<Float> = [];
	private var _callback:Void->Void;
	public var freqByteData		:Uint8Array;
	public var subFreqByteData	:Array<Int>;
	public var freqByteDataAry	:Array<Int>;
	
	
	public var isStart:Bool = false;
	public var globalVolume:Float = 0.899;
	
	static public inline var FFTSIZE:Int = 64;
	public static var a:MyAudio;
	
	public function new() 
	{
		
	}

	public function init(callback:Void->Void):Void {
		
		//Tracer.debug("init");
		_callback = callback;
		a = this;
		var nav:Dynamic = Browser.navigator;
		nav.getUserMedia = ( nav.getUserMedia ||
                       nav.webkitGetUserMedia ||
                       nav.mozGetUserMedia ||
                       nav.msGetUserMedia);
		
		
		nav.getUserMedia({
			audio: true
		}, untyped _handleSuccess, untyped _handleError);
	
	}
	
	private function _handleError(evt):Void
	{
		Browser.window.alert("err");
	}
	
	private function _handleSuccess(evt):Void
	{
		var audioContext:AudioContext = new AudioContext();
        var source:MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(evt);
        analyser = untyped audioContext.createAnalyser();

		// Create a new analyser
		analyser.fftSize = FFTSIZE;

		_impulse = [];
		subFreqByteData = [];
		freqByteDataAry = [];
		_oldFreqByteData = [];
		for (i in 0...FFTSIZE) {
			subFreqByteData[i]	= 0;
			_oldFreqByteData[i]	= 0;
		}
		
		//source.connect(untyped audioContext.destination);
		source.connect(untyped analyser,0);
		// Connect up the audio output of the analyser to the audioContext destination i.e. the speakers (The analyser takes the output of the <audio> element and swallows it. If we want to hear the sound of the <audio> element then we need to re-route the analyser's output to the speakers)
		//analyser.connect(untyped audioContext.destination);
		
		isStart = true;
		
		Dat.gui.add(this, "globalVolume", 0.1, 3).step(0.1);
		Dat.gui.add(this, "setImpulse" );
		
		setImpulse();
		update();
		
		_callback();
	}
	
	//http://jsdo.it/kimmy/iBGe
	

	// Draw the audio frequencies to screen
	public function update():Void {
		
		if (!isStart) {
			trace("not work");
			return;
		}
		
		// Setup the next frame of the drawing
		//webkitRequestAnimationFrame(draw);
  
		// Create a new array that we can copy the frequency data into
		freqByteData = new Uint8Array(analyser.frequencyBinCount);
		
		// Copy the frequency data into our new array
		analyser.getByteFrequencyData(freqByteData);

		
		for (i in 0...freqByteData.length) { 
			subFreqByteData[i] = freqByteData[i] - _oldFreqByteData[i];
		}
		
		for (i in 0...freqByteData.length) {
			_oldFreqByteData[i] = freqByteData[i];
		}
		
		timeData = new Uint8Array(analyser.fftSize);
		analyser.getByteTimeDomainData(timeData);
		
		//
		for ( i in 0...freqByteData.length) {
			freqByteData[i] = Math.floor( freqByteData[i] * globalVolume ) +Math.floor( _impulse[i] );
		}		
		for ( i in 0...freqByteData.length) {
			subFreqByteData[i] = Math.floor( subFreqByteData[i] * globalVolume );
		}		
		for ( i in 0...freqByteData.length) {
			timeData[i] = Math.floor( timeData[i] * globalVolume );
		}		
	
		
		//copy
		for ( i in 0...freqByteData.length) {
			freqByteDataAry[i] = freqByteData[i];
		}
		
		_updateInpulse();
		
	}

	/**
	 * 
	 */
	private function _updateInpulse():Void {
	
		for (i in 0...FFTSIZE) {
			_impulse[i] += (0 -_impulse[i]) / 2;
		}
		
	}
		
	public function setImpulse(stlength:Float=1):Void {
	
		for (i in 0...FFTSIZE) {
			_impulse[i] = 255 * Math.random() * stlength;
		}		
		
	}
	
	
}