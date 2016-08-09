package ;

import camera.ExCamera;
import canvas.CanvasSrc;
import common.Dat;
import common.StageRef;
import effect.PostProcessing2;
import emoji.Emojis;
import haxe.Timer;
import js.Browser;
import planes.PlaneFactory;
import sound.MyAudio;
import three.Clock;
import three.controls.OrbitControls;
import three.Mesh;
import three.Scene;
import three.Vector3;
import three.WebGLRenderer;


/**
 * ...
 * @author watanabe
 */

class Main3d 
{	
	
	public static  var W	:Int = 1280;//160;
	public static  var H	:Int = 800;//120;
	
	var ww:Int = CanvasSrc.W;
	var hh:Int = CanvasSrc.H;
    var animationFrameLength = 32; //スプライトシートのコマ数

    var clock = new Clock();
	var camera:ExCamera;
	var control:OrbitControls;
	
	public static var renderer:WebGLRenderer;
	var scene:Scene;
	var counter:Int=0;
	var scale:Float = 1;
	
	//var _webcam		:Webcam;
	//var _bitmapData	:MyBitmapData;
	//var _shader		:EmojiShader;
	
	//var _canvas		:CanvasSrc;
	
	var _mosaic		:Mosaic;
	var _emoji		:Emojis;
	var _pp			:PostProcessing2;
	var _audio		:MyAudio;
	var _planes		:PlaneFactory;
	
	var dummy		:Mesh;
	
	
	public function new() {
	
		
		
	}
	
	public function init():Void
	{
		renderer = new WebGLRenderer({devicePixelRatio:1, antialias: false, preserveDrawingBuffer: true, alpha:false});
		Browser.document.body.appendChild(renderer.domElement);
		renderer.domElement.id = "webgl";// .position = "absolute";
		
		Dat.init(_onInit0);
	}
	
	private function _onInit0():Void{

		//bg nara nanimoshinai
		if (Dat.bg) return;		
		
        _audio = new MyAudio();
		_audio.init(_onInit);		
		
	}
	
	private function _onInit():Void{
		
		scene = new Scene();
		
        renderer.setSize(W, H);
        
		renderer.domElement.style.position = "absolute";
		renderer.domElement.style.zIndex = "2002";
		renderer.domElement.style.width = "" + W;
		renderer.domElement.style.height = "" + H;
		
		camera = new ExCamera(30, W/H, 2, 10000);
		camera.init( renderer.domElement );
		camera.amp = 1000;
		camera.position.z =350;
		camera.lookAt(new Vector3());
		
		_mosaic = new Mosaic();
		_mosaic.init(scene, camera, renderer);
		//_mosaic.rotation.x = Math.PI / 2;
		scene.add(_mosaic);
		
		animate();
		
		Dat.gui.add(camera, "amp", 10, 20000).listen();
		Dat.gui.add(camera, "radX", 0, 2 * Math.PI).step(0.01).listen();
		Dat.gui.add(camera, "radY", 0, 2 * Math.PI).step(0.01).listen();
		
		StageRef.setCenter();
		Browser.window.onresize = _onResize;
		_onResize(null);
	}
	
	//mode wo changeする。
	//body dake
	private function goFullScreen():Void {
		untyped Browser.document.body.webkitRequestFullscreen();
	}	
	
	
	private function _onResize(e) {
		W = StageRef.stageWidth;
		H = StageRef.stageHeight;
		renderer.domElement.width = W;// + "px";
		renderer.domElement.height = H;// + "px";		
		renderer.setSize(W, H);
		camera.aspect = W / H;// , 10, 50000);
		camera.updateProjectionMatrix();	
    }

    private function animate() {
        
		_audio.update();
		
		camera.update();
		//control.update();  	
		counter++;
		
		_mosaic.update(_audio);
		
		Timer.delay(animate, Math.floor( 1000 / 48 ));
		
    }	
	

}