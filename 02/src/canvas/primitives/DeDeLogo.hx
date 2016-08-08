package canvas.primitives;
import data.MyDaeLoader.MyDAELoader;
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
class DeDeLogo extends PrimitiveBase
{
	//face wo load
	private var _loader:MyDAELoader;
	
	private var _dede1:Object3D;
	private var _dede2:Object3D;
	private var _dede3:Object3D;
	
	public function new() 
	{
		super();
	}
	
	override public function init(o:Dynamic):Void {
		super.init(o);
		
		if(_loader==null){
			_loader = new MyDAELoader();
			_loader.load("dae/mouse.dae", _onLoad);
		}
		
	}
	
	private function _onLoad():Void
	{
		this.visible = false;
		_loader.dae.scale.x = 0.2;
		_loader.dae.scale.y = 0.2;
		_loader.dae.scale.z = 0.2;
		add( _loader.dae );
		_dede1 = _loader.dae;
		
		_dede2 = _loader.dae.clone();
		add(_dede2);
		_dede2.position.x = 150;
		
		_dede3 = _loader.dae.clone();
		add(_dede3);
		_dede3.position.x = -150;
		
	}
	

	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		if(_dede1!=null){
			//_dede1.rotation.y += rotV.y * 0.5 + 0.01;
		}
		if(_dede2!=null){
			//_dede2.rotation.y = _dede1.rotation.y;
		}
		if(_dede3!=null){
			//_dede3.rotation.y = _dede1.rotation.y;
		}
		//super.update(a, rotV);
		
	}	
	
}