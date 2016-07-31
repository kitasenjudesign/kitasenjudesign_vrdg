package ;
import three.ImageUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import three.Texture;


/**
 * ...
 * @author nab
 */
class CubeTitle extends Object3D
{
	
	private var logo:Mesh;
	private var logo2:Mesh;
	
	private static var mate1	:MeshBasicMaterial;
	private static var mate2	:MeshBasicMaterial;
	private static var geo		:PlaneBufferGeometry;
	
	public function new() 
	{
		super();
	}
	
	public function init(w:Float):Void {
		
		var s:Float = 1.9;
		var ww:Float = 512*s;
		var hh:Float = 128*s;
	
		if ( mate1 == null) {
			var tex:Texture = ImageUtils.loadTexture("./sheet/title.png");
			mate1 = new MeshBasicMaterial(
				{ map:tex, transparent:true }
			);
			mate2 = new MeshBasicMaterial(
				{ map:tex, transparent:true,side:Three.BackSide,color:0xffffff }
			);
			geo = cast new PlaneBufferGeometry(ww, hh, 1, 1);
		}
		
		logo = new Mesh( cast geo, mate1);
		logo.position.x = -w + ww / 2 + 20;
		logo.position.y = w - hh / 2 - 5;
		logo.position.z = w;		
		add(logo);
		
		logo2 = new Mesh( cast geo, mate2);
		logo2.position.copy(logo.position.clone());
		add(logo2);
				
		
		
		
	}
	
	
}