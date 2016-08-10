package faces.data;

/**
 * ...
 * @author watanabe
 */
class MaeFormV extends MaeFormBase
{

	private var _cams:Array<CamData> = [
		new CamData(215, 0, 0 ),
		new CamData(215, 0, -0.5 ),
		new CamData(215, 0, 0.5 ),
		new CamData(116, -0.34, -0.59 )
	];
	
	
	public function new() 
	{
		super();
	}
	
	
	override public function setFormation(faces:Array<MaeFace>):Void
	{
		_faces = faces;
		
		var data:CamData = _cams[_camIndex % _cams.length];
		_camIndex++;
		
		//30zutsu
		var rotMode:Int = MaeFaceMesh.getRandomRot();
		_setRot(rotMode);
		
		
		
		//_lines.startY = -80;
		_camera.amp = data.amp;
		_camera.radX = data.radX;
		_camera.radY = data.radY;
		
		_camera.setFOV(35);//
		
		var spaceX:Float = 50;
		var spaceY:Float = 50;
		var xnum:Int = 9;
		var ynum:Int = 5;
		var num:Int = xnum * ynum;
		_width = spaceX * xnum;
		_height = spaceY * (ynum);
		
		var len:Int = _faces.length;
		var oz:Float = -200;
		
		for (i in 0...len) {
			var ff:MaeFace = _faces[i];
			ff.enabled = true;
			ff.visible = true;
			
			if (i < num) {
				
				var xx:Float = i % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX;
				ff.position.y = yy * spaceY;	
				ff.position.z = 0;// 100 * (Math.random() - 0.5);
				ff.rotation.y = 0;
								ff.updatePlate();

			}else{
				
				ff.enabled = false;
				ff.visible = false;				
				
			}
			//30ko zutsu			
		}
	}		
	
	
	
	//ue
	override public function update():Void {
		//yy houkou
		for ( i in 0..._faces.length) {
			_faces[i].position.y += 0.25;
			if ( _faces[i].position.y > _height/2) {
				_faces[i].position.y = -_height / 2;
				_faces[i].updatePlate();
			}						
		}		
	}	
}