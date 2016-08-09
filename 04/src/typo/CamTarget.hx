package typo;
import camera.ExCamera;
import three.BoxGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.OctahedronGeometry;
import three.Vector3;
import typo.data.CutData;

/**
 * ...
 * @author watanabe
 */
class CamTarget extends Mesh
{

	private var _data:CutData;
	private var _count:Vector3 = new Vector3();
	private var _speed:Float = 0;
	public var sinPos:Vector3 = new Vector3();
	
	public function new() 
	{

		super(
			new OctahedronGeometry(30),//, 4, 4),
			new MeshBasicMaterial( { wireframe:true, color:0xffffff } )
		);
		
		#if debug
			this.visible = true;
		#else
			this.visible = false;		
		#end
		
	}

	public function init(data:CutData):Void {
		_data = data;
	}
	
	public function update():Void {
		
		_updateSinPos();
		//are no toki
		//if (_data.getTyp()>=1) {
		if( _data.camPosMode == ExCamera.POS_FOLLOW){
			_updateFollow();
		}else {
			_updateZero();
		}
		
	}
	
	private function _updateSinPos():Void
	{
		rotation.x += 0.02;
		rotation.y += 0.02;
		rotation.z += 0.02;
		
		_count.x += _speed + 0.5;
		_count.y += _speed * 1.25 + 1;
		
		sinPos.x = Math.cos(_count.x / 20) * 1000 + 100 * Math.sin(_count.y / 100);
		sinPos.y = Math.sin(_count.x / 45) * 1000;
		sinPos.z = Math.sin(_count.x / 25) * 1000 + 100 * Math.cos(_count.y / 100);		
	}
	
	
	private function _updateZero():Void
	{
		position.x += (0 - position.x) / 4;// Math.cos(_count.x / 20) * 1000;
		position.y += (0 - position.y) / 4;
		position.z += (0 - position.z) / 4;
	}
	
	public function _updateFollow():Void {
		
		
		
		position.x = sinPos.x;// Math.cos(_count.x / 20) * 1000 + 100 * Math.sin(_count.y / 100);
		position.y = sinPos.y;Math.sin(_count.x / 45) * 1000;
		position.z = sinPos.z;Math.sin(_count.x / 25) * 1000 + 100 * Math.cos(_count.y / 100);
		
		//position.x += _getNoise(_count.x*0.1,_count.z*0.1,_count.y*0.1) * 50;
		//position.y += _getNoise(_count.y*0.1,_count.x*0.1,_count.z*0.1) * 50;
		//position.z += _getNoise(_count.z*0.1,_count.y*0.1,_count.x*0.1) * 50;
		
	}
	
	public function setSpeed(f:Float):Void {
		
		_speed = f+0.01;
		
	}
	
	private function _getNoise(xx:Float,yy:Float,zz:Float):Float
	{
		var f = untyped __js__("noise.perlin3");
		var n:Float = f(xx, yy, zz);
		return n;
	}
}