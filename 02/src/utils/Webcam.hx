package utils;
import js.Browser;
import js.html.Element;
import js.html.ImageElement;
import js.html.rtc.LocalMediaStream;
import js.html.rtc.NavigatorUserMediaSuccessCallback;
import js.html.VideoElement;
import js.JQuery;

/**
 * ...
 * @author nabe
 */
class Webcam
{
	
	private var _callback:Void->Void;
	public var video	:VideoElement;
	public var img		:ImageElement;
	public var isError	:Bool = false;
	public function new() 
	{
	}

	/**
	 * 
	 * @param	callback
	 */
	public function init(sizeW:Int,sizeH:Int,callback:Void->Void):Void {_callback = callback;video = cast Browser.document.getElementById("vi");	video.width = cast sizeW;video.height = cast sizeH;video.style.display = "none";var nav:Dynamic = Browser.navigator;nav.getMedia = (  nav.getUserMedia ||
                            nav.webkitGetUserMedia ||
                            nav.mozGetUserMedia ||
                            nav.msGetUserMedia );if (nav.getMedia == null) {	_onErr(null);}else{	nav.getMedia( { video:true, audio:false }, _onHoge,_onErr);}
	}
	
	
	function _onErr(err) 
	{//Browser.window.alert("ウェブカムが検出できませんでした。");//Browser.document.getElementById("info").innerHTML = "Your webcam is not be detected.";Browser.document.getElementById("info").style.display = "none";img = Browser.document.createImageElement();img.onload = cast _onLoadImg;img.src = "mona.jpg";
	}
	
	function _onLoadImg() 
	{isError = true;_callback();
	}
	
	function _onHoge(stream:LocalMediaStream):Bool 
	{
var win:Dynamic = Browser.window;video.src = win.URL.createObjectURL(stream);Browser.document.getElementById("info").style.display = "none";//trace("size ="+video.videoWidth + " " + video.videoHeight);//trace("size =" + video.width + " " + video.height);_callback();return true;
	}
}