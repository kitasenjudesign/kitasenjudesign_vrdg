package canvas.primitives;
import common.MyDAELoader;
import sound.MyAudio;
import three.BoxGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class VrdgLogo extends PrimitiveBase
{
	//face wo load
	private var _loader:MyDAELoader;
	
	public function new() 
	{
		super();
	}
	
	override public function init(o:Dynamic):Void {
		super.init(o);
		
		if(_loader==null){
			_loader = new MyDAELoader();
			_loader.load("dae/logo.dae", _onLoad);
		}
		//var cube:Mesh = new Mesh(new BoxGeometry(100, 100, 100, 1, 1, 1), new MeshBasicMaterial( { color:0xff0000 } ));
		//add(cube);
	}
	
	private function _onLoad():Void
	{
		this.visible = false;		
		
		_loader.dae.scale.x = 0.7;
		_loader.dae.scale.y = 0.7;
		_loader.dae.scale.z = 0.7;
		
		add( _loader.dae );
		
	}
	

	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		
		
		this.rotation.y += rotV.y * 0.5 + 0.01;
		
		//super.update(a, rotV);
		
	}	
	
}