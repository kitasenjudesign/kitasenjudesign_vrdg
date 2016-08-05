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
class DeDeFace extends PrimitiveBase
{
	//face wo load
	private var _loader:MyDAELoader;
	
	private var _face1:Object3D;
	private var _face2:Object3D;
	
	public function new() 
	{
		super();
	}
	
	override public function init(o:Dynamic):Void {
		super.init(o);
		
		if(_loader==null){
			_loader = new MyDAELoader();
			_loader.load("mae_face.dae", _onLoad);
		}
		//var cube:Mesh = new Mesh(new BoxGeometry(100, 100, 100, 1, 1, 1), new MeshBasicMaterial( { color:0xff0000 } ));
		//add(cube);
	}
	
	private function _onLoad():Void
	{
		this.visible = false;
		_face1 = _loader.dae;
		add(_face1);
		_face2 = _loader.dae.clone();
		add(_face2);
		
		_face1.position.x = 200;
		_face2.position.x = -200;
	}
	

	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		if( _face1 != null ){
			_face1.rotation.x += rotV.x * 0.5 + 0.01;
			_face1.rotation.y += rotV.y * 0.45 + 0.01;
			_face1.rotation.z += rotV.z * 0.39 + 0.01;
			
			_face2.rotation.x += rotV.y * 0.44 + 0.01;
			_face2.rotation.y += rotV.z * 0.49 + 0.01;
			_face2.rotation.z += rotV.x * 0.41 + 0.01;
			
		}
		//super.update(a, rotV);
		
	}	
	
}