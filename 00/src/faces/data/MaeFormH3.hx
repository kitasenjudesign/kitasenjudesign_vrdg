package faces.data;

/**
 * ...
 * @author watanabe
 */
class MaeFormH3 extends MaeFormBase
{

	
	private var _cams:Array<CamData> = [
		new CamData(255, 0, 0 ),
		new CamData(255, 0, 0.4 ),
		new CamData(255, 0, -0.4 ),
		new CamData(255, 0.55, 0.87 ),		
		new CamData(255, 0.75, -0.8 ),
		
	];
	
	
	public function new() 
	{
		super();
	}
	
	//3line
	override public function setFormation(faces:Array<MaeFace>):Void
	{
		_faces = faces;
		
		var rotMode:Int = (_camIndex==0) ? MaeFaceMesh.ROT_MODE_X : MaeFaceMesh.getRandomRot();
		_setRot(rotMode);
		
		var data:CamData = _cams[_camIndex % _cams.length];
		_camIndex++;
		_camera.amp = data.amp;
		_camera.radX = data.radX;
		_camera.radY = data.radY;

		_camera.setFOV(35);//
		
		var offsetY:Float = 0;
		var spaceX:Float = 45;
		var spaceY:Float = 45;
		var xnum:Int = 20;
		var ynum:Int = 3;
		var len:Int = _faces.length;
		_width = xnum * spaceX;
		_height = ynum * spaceY;
		
		for (i in 0...len) {
			
			var ff:MaeFace = _faces[i];
			if(i<60){
				
				var xx:Float = i % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX;
				ff.position.y = yy * spaceY + offsetY;	
				ff.position.z = 0;
				ff.rotation.y = 0;
				ff.updatePlate();

			}else {
				
				ff.enabled = false;
				ff.visible = false;				
				
			}
			
		}
	}
	
	//3line
	override public function update():Void {
		for ( i in 0..._faces.length) {
			_faces[i].position.x -= 0.25;
			if ( _faces[i].position.x < -_width/2) {
				_faces[i].position.x = _width / 2;
				_faces[i].updatePlate();
			}			
		}		
	}	
	
		
	
	
	
}