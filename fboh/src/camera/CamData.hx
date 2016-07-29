package camera;

/**
 * ...
 * @author nabe
 */
class CamData
{

	public static var camA:CamData = new CamData("normal_1",	8000, 0, 0);	
	public static var camB:CamData = new CamData("normal_2",	5400, 0, 0);	
	public static var camC:CamData = new CamData("normal_3",	2700, 0, 0);	
	public static var camD:CamData = new CamData("normal_4",	7215, -0.3, -0.65);	
	public static var camE:CamData = new CamData("normal_5",	2800, 1, 0);	
	public static var camF:CamData = new CamData("normal_6",	3800, 0, -1.419);	
	

	
	public static var cam1:CamData = new CamData("zoom",	3800, 0, 0);	
	public static var cam2:CamData = new CamData("zoom_naname", 4640, -0.609, -0.609);
	public static var cam2b:CamData = new CamData("zoom_naname", 4640, 0.581, -0.609);
	
	public static var cam3:CamData = new CamData("zoom_down", 4412, 0, 0.91);
	public static var cam4:CamData = new CamData("zoom_yoko", 6000, 1.5, 0);

	//public static var cam2:CamData = 
	
	public static var cams:Array<CamData> = [ camA,camA, camB,camC,camE,camF ];

	public static var camsH:Array<CamData> = [ camA, cam2, cam3, camD,camF ];//なんかつくる
	public static var camsV:Array<CamData> = [ camA, cam2, cam2b, cam3, cam4 ];//なんかつくる
	
	public var name	:String = "";
	public var radX	:Float = 0;
	public var radY	:Float = 0;
	public var amp	:Float = 0;
	
	
	public function new(n:String, a:Float, rx:Float,ry:Float) 
	{
		this.name = n;
		this.amp = a;
		this.radX = rx;
		this.radY = ry;
		
	}
	
	public static function setRandom(cam:ExCamera,isV:Bool):Void {
		
		if (isV) {
			setCam( cam, camsV[ Math.floor(Math.random() * camsV.length) ] );
		}else{
			setCam( cam, cams[ Math.floor(Math.random() * cams.length) ] );
		}
	}
	
	/**
	 * 
	 * @param	cam
	 */
	public static function setCam(cam:ExCamera, d:CamData):Void {
	
		//Browser.window.alert("setCam");
		cam.amp 	= d.amp;
		cam.radX 	= d.radX;
		cam.radY 	= d.radY;
		cam.setPolar(d.amp, d.radX, d.radY);
	}	
	
	
}