package planes;
import data.TextureData;
import emoji.EmojiSingleShader;
import sound.MyAudio;
import three.ImageUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.PlaneBufferGeometry;
import three.PlaneGeometry;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class ImgPlane extends PlaneBase
{

	public var vx:Float = 0;
	public var vy:Float = 0;
	public var vr:Float = 0;
	private var _plane:Mesh;
	private var _count:Int = 0;
	var shader:EmojiSingleShader;
	static var _geo:PlaneBufferGeometry;
	var _mesh:Mesh;
	public var selectIndex:Int = 0;
	
	public function new() 
	{
		super();
	}
	
	override public function init(callback:PlaneBase-> Void):Void {
		_count = 0;
		_callback = callback;
		if (_geo == null) {	
			_geo = new PlaneBufferGeometry(256,256,1,1);
			//w*w;
		}
			shader = new EmojiSingleShader();
			shader.init();
			//shader.setIconIndex( Math.floor(200 * Math.random()));
			setIcon(0);
			_mesh = new Mesh(	
				cast _geo,	shader.shaderMaterial	
				//new MeshBasicMaterial( { color:0xff0000,depthTest:false,transparent:true,side:Three.DoubleSide }
			);
		
	
		add(_mesh);
		vy = 2+3 * (Math.random());
	}
	
	
	override public function setIcon(idx:Int):Void {
		shader.setIconIndex( idx );selectIndex = idx;
	}
	
	override public function update(audio:MyAudio):Void {
		_count++;
		if (_count == 100) {	
			_callback( cast this);
		}else{	
		
			//this.scale.set(1 - _count / 100, 1 - _count / 100, 1 - _count / 100);
		vx *= 1 + 0.2 * audio.freqByteData[2] / 255;	
		vy *= 1 + 0.5 * audio.freqByteData[4] / 255;		
		this.rotation.z += vr;	
		this.position.y += vy;		
		vx *= 0.99;	
		vy *= 0.99;	
		//vz *= 0.99;
		
		}
	}
}
	
