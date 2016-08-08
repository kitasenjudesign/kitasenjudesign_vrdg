package canvas;
import camera.ExCamera;
import canvas.primitives.Cube;
import canvas.primitives.data.EffectData;
import canvas.primitives.Primitives;
import effect.PostProcessing2;
//import emoji.EmojiPiece;
import js.Browser;
import js.html.Uint8Array;
import js.html.webgl.RenderingContext;
import sound.MyAudio;
import three.AmbientLight;
import three.BoxGeometry;
import three.Color;
import three.DirectionalLight;
import three.Material;
import three.Mesh;
import three.MeshDepthMaterial;
import three.MeshFaceMaterial;
import three.MeshLambertMaterial;
import three.MeshPhongMaterial;
import three.PointLight;
import three.Scene;
import three.TetrahedronGeometry;
import three.WebGLRenderer;

/**
 * ...
 * @author nabe
 */
class CanvasSrc
{
	
	public static var W:Int = 200;// 120; 
	public static var H:Int = 50;// * 2;

	private var _camera:ExCamera;
	private var _renderer:WebGLRenderer;
	private var _scene:Scene;
	private var _primitives:Primitives;
	private var _canvas:CanvasData;
	private var _imageData:Uint8Array;
	private var _pp:PostProcessing2;
	//private var p:EmojiPiece;
	private var _depthMat:MeshDepthMaterial;
	
	public function new() 
	{
		
	}

	/**
	 * init
	 */
	public function init():Void {
		_depthMat = new MeshDepthMaterial();
		_renderer = new WebGLRenderer({devicePixelRatio:1, antialias: false });
		_imageData = new Uint8Array(CanvasSrc.W * CanvasSrc.H * 4);

		//_renderer = new CanvasRenderer( { devicePixelRatio:1 } );
		//_renderer.autoClear = false;
        _renderer.setSize(Math.floor( CanvasSrc.W ) ,Math.floor( CanvasSrc.H ));
		_renderer.domElement.style.zIndex = "100000";
		_renderer.domElement.style.position = "absolute";
		_renderer.domElement.style.top = "0";
		_renderer.domElement.style.left = "0";
		_renderer.setClearColor(new Color(0x000000),1);
		Browser.document.body.appendChild(_renderer.domElement);
			
		_camera = new ExCamera(60, W / H, 2, 800);
		_camera.init();
		
		_scene = new Scene();
		
		/*
		var light:PointLight = new PointLight(0xffffff,1);
	   light.position.set(20, 30, 200);
	   _scene.add(light);
		*/
		var light:DirectionalLight = new DirectionalLight(0xffffff,1);
	   light.position.set(20, 30, 200);
	   _scene.add(light);
	   
	   var light2:AmbientLight = new AmbientLight(0x333333);
	   _scene.add(light2);
	   
		_pp = new PostProcessing2();
		_pp.init(_scene, _camera, _renderer);

		
		_canvas = new CanvasData();
		_canvas.init( this );
		
		_primitives = new Primitives();
		_primitives.init();
		_scene.add(_primitives);
		
		//update();
	}
	
	
	
	public function next(isRandom:Bool):EffectData {
		
		var data:EffectData = _primitives.next(isRandom);
		
		_scene.overrideMaterial = data.isDepth ? _depthMat : null;
		
		return data;
		
	}
	
	
	/**
	 * update
	 */
	public function update(a:MyAudio):Void {
		
		//p.updateEmoji();
		if (!a.isStart && a.freqByteData==null) return;
		
		
		_primitives.update(a);
		

		//_camera.radX += Math.PI / 200;
		_camera.update();
		//_renderer.autoClearColor = false;
		_renderer.render(_scene, _camera);
		//_pp.render();
		
		var context:RenderingContext = _renderer.getContext();
		context.readPixels(
			0,
			0,
			CanvasSrc.W,
			CanvasSrc.H,
			RenderingContext.RGBA,
			RenderingContext.UNSIGNED_BYTE,
			_imageData
        );
		
		//_renderer.autoClear = true;
		
		//webgl.render(_scene, _camera, _renderer);
		//Timer.delay(update, Math.floor(1000 / 30));
	}
	
	//
	public function getPixel(x:Int, y:Int):Float {
		
		var index:Int = cast ( x + y * CanvasSrc.W ) * 4;
		var r:Int = _imageData[ index ];
		var g:Int = _imageData[ index + 1 ];
		var b:Int = _imageData[ index + 2 ];
		var a:Int = _imageData[ index + 3 ];
		
		return (r + g + b) / 3;
	}
	
	//public function getElement():Element {
	//	return _renderer.domElement;
	//}
	
}