package faces.data;

/**
 * ...
 * @author watanabe
 */
class MaeFormH1 extends MaeFormBase
{

	private var _count:Int = -1;
	
	
	private var _cams:Array<CamData> = [
		new CamData(195, 0, 0 ),
		new CamData(195, 0, 0 ),
		new CamData(195, 0, 0 ),
		new CamData(225, 0.87, 0.03 )
		//new CamData(195, 0, 0 ),		
		//new CamData(225, -0.4, 0.03 )*/
	];
	
	
	public function new() 
	{
		super();
	}

	
	//35
	//1 line
	override public function setFormation(faces:Array<MaeFace>):Void
	{
		_faces = faces;
		_count++;
		
		
		var rotMode:Int = MaeFaceMesh.ROT_MODE_X;
		if (_camIndex != 0) {
			rotMode = MaeFaceMesh.getRandomRot();
		}
		_setRot(rotMode);
		
		//_faces[i].setRotMode( mode );
	
		Tracer.log("_setForm1");
		
		var data:CamData = _cams[_camIndex % _cams.length];
		_camIndex++;
		_camera.amp = data.amp;
		_camera.radX = data.radX;
		_camera.radY = data.radY;
		
		_camera.setFOV(35);//
		
		var offsetY:Float = -8;
		var spaceX:Float = 40;
		var xnum:Int = 20;
		var ynum:Int = 3;
		_width = xnum * spaceX;
		
		var len:Int = _faces.length;
		
		var ox:Float = 0;
		if (_count == 0) {
			ox = _width*0.63;
		}
		
		for (i in 0...len) {
			var ff:MaeFace = _faces[i];	
			ff.setMaterial( MaeFaceMesh.ROT_MODE_X );
		
			if (i < 20) {
				
				var xx:Float = i % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX + ox;
				ff.position.y = 8 + offsetY;
				ff.position.z = 100;
				ff.rotation.y = 0;
				if(_count==0){
					ff.updatePlate(i);
				}else {
					ff.updatePlate();					
				}
				
			}else {
				ff.visible = false;
				ff.enabled = false;
			}
		}
	}	
	
	//1line
	override public function update():Void {
		
		for ( i in 0..._faces.length) {
			_faces[i].position.x -= 0.1;
			if ( _faces[i].position.x < -_width/2) {
				_faces[i].position.x = _width / 2;
				_faces[i].updatePlate();
			}
		}
		
	}
	

	

}


