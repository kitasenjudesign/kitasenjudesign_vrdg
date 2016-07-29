package planes.rtt;

import data.Paths;
import data.TextureData;
import emoji.EmojiSingleShader;
import three.Mesh;
import three.MeshBasicMaterial;
import three.OrthographicCamera;
import three.PlaneBufferGeometry;
import three.PlaneGeometry;
import three.Scene;
import three.Texture;
import three.Vector3;
import three.WebGLRenderer;
import three.WebGLRenderTarget;

/**
 * ...
 * @author nabe
 */
class RTTTexture
{
	
	public static inline var width	:Float = 512;
	public static inline var height	:Float = 1;//2;
	
	public static inline var TYPE_0:Int = 0;
	public static inline var TYPE_1:Int = 1;
	public static inline var TYPE_2:Int = 2;
	public static inline var TYPE_3:Int = 3;
	
	private var _scene:Scene;
	private var _camera:OrthographicCamera;
	private var _paths:Array<Paths>;
	private var _mesh:Mesh;
	private var _count:Int=0;
	private var _renderTarget:WebGLRenderTarget;
	private var _render:WebGLRenderer;
	private static var _geo:PlaneBufferGeometry;
	private var _vr:Float = 0;
	private var shader:EmojiSingleShader;
	private var _life:Int=0;
	private var _type:Int = 0;
	
	public function new() 
	{
	}
	
	/**
	 * ２０個くらいつくっておき、内容がその都度　カエル
	 * @param	data
	 */
	public function init():Void {
		
		_render = Main3d.renderer;
		_renderTarget = new WebGLRenderTarget(width, height);
		
		// , { minFilter:Three.NearestFilter, magFilter:Three.NearestFilter } );
		
		_scene = new Scene();
		//left,right,top,bottom
		_camera = new OrthographicCamera(	-RTTTexture.width / 2,	RTTTexture.width / 2,	RTTTexture.height / 2,	-RTTTexture.height / 2);
		_camera.position.z = 300; _camera.lookAt(new Vector3());
		
		if (_geo == null) {	
			_geo = new PlaneBufferGeometry(width, width, 1, 1);//w*w;		
		}
		
		shader = new EmojiSingleShader();
		shader.init();
		
		_mesh = new Mesh(	
			cast _geo,	shader.shaderMaterial	
		//new MeshBasicMaterial( { color:0xff0000,depthTest:false,transparent:true,side:Three.DoubleSide } ));
		);
		
		_scene.add(_mesh);
		_vr = Math.PI / 20 * (Math.random() - 0.5);	//setSizeByRatio(0.1);
	}
	
	
	/*
	public function setSize(px:Float):Void {setSizeByRatio( px / RTTTexture.width );
	}*/
	
	/*
	public function setSizeByRatio(ratio:Float):Void{_mesh.scale.y = ratio;shader.setHeight(ratio);
	}*/
	
	public function setIconIndex(idx:Int):Void {
		shader.setIconIndex(idx);
	}
	
	public function start(idx:Int,life:Int) 
	{
		setIconIndex(idx);
		_life = life;
		_type = Math.floor( Math.random() * 4 );
		_count = 0;
		_vr = Math.PI / 40 * (Math.random() - 0.5);	
	}	
	
	
	/**
	 * モードをいくつかにして適当に動かす	
	 */
	public function update():Void {
		var ratio:Float = _count / _life;
		_count++;
		if (_mesh != null) {
			
			switch(_type) {		
				case TYPE_0:			
					_mesh.rotation.z +=  _vr;		
				case TYPE_1:			
					_mesh.position.y = width / 2 * Math.sin(ratio * 2 * Math.PI);		
				case TYPE_2:			
					//_mesh.rotation.z +=  _vr;
					_mesh.position.y = width / 2 * Math.sin(ratio * 2 * Math.PI) * Math.sin(ratio * 3.2 * Math.PI );
				case TYPE_3:			
					_mesh.rotation.z +=  _vr/4;
					_mesh.position.y = width / 2 * Math.sin(ratio * 1.3 * Math.PI) * Math.sin(ratio * 1.9 * Math.PI );
					
			}
			
			//_mesh.rotation.y += _vr/10;		
			//_mesh.rotation.x+=  _vr/3;		
			_render.autoClearColor = true;
			untyped _render.render(_scene, _camera, _renderTarget);
			_render.autoClearColor = false;
		}
	}
	
	
	public function getRenderTarget():WebGLRenderTarget {
	return _renderTarget;
	}
	

}