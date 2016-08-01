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
	
	override public function init():Void {
		
		if(_loader==null){
			_loader = new MyDAELoader();
			_loader.load("dae/mouse.dae", _onLoad);
		}
		//var cube:Mesh = new Mesh(new BoxGeometry(100, 100, 100, 1, 1, 1), new MeshBasicMaterial( { color:0xff0000 } ));
		//add(cube);
	}
	
	/*
	 		var loader = untyped __js__("new THREE.ColladaLoader()");
		loader.options.convertUpAxis = true;		
		loader.load( 'mae_face.dae', _onComplete );
		//loader.load( 'mae_face_hole.dae', _onComplete );
		
		
	}
	
	
	
	private function _onComplete(collada):Void 
	{
		
		dae = collada.scene;
	 */
	
	private function _onLoad():Void
	{
		this.visible = false;
		_loader.dae.scale.x = 0.3;
		_loader.dae.scale.y = 0.3;
		_loader.dae.scale.z = 0.3;
		add( _loader.dae );
		_dede1 = _loader.dae;
		
		_dede2 = _loader.dae.clone();
		add(_dede2);
		_dede2.position.x = 200;
		
		_dede3 = _loader.dae.clone();
		add(_dede3);
		_dede3.position.x = -200;
		
	}
	

	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		if(_dede1!=null){
			_dede1.rotation.y += rotV.y * 0.5 + 0.01;
		}
		if(_dede2!=null){
			_dede2.rotation.y = _dede1.rotation.y;
		}
		if(_dede3!=null){
			_dede3.rotation.y = _dede1.rotation.y;
		}
		//super.update(a, rotV);
		
	}	
	
}