package canvas.primitives;
import three.DirectionalLight;
import three.IcosahedronGeometry;
import three.ImageUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshLambertMaterial;
import three.MeshPhongMaterial;
import three.Object3D;
import three.SphereGeometry;

/**
 * ...
 * @author nabe
 */
class Sphere extends PrimitiveBase
{
	
	private var _mesh:Mesh;
	private var _mat:MeshBasicMaterial;

	public function new() 
	{
		super();
	}
	
	
	
	override public function init(o:Dynamic):Void {
		super.init(o);
		
		if(_mat==null){
		/*var light:DirectionalLight = new DirectionalLight(0xffffff, 0.1);light.position.set( -10, 5, 3);add(light);*/
		_mat = new MeshBasicMaterial( { map:ImageUtils.loadTexture("images/beachball.png"),  side:Three.DoubleSide } );
		_mesh = new Mesh( 	
			new SphereGeometry(70, 8, 8),	
			//new IcosahedronGeometry(85, 1),	
			_mat
		);
		add(_mesh);
		}
	}
	
	override public function start():Void {
	
		/*
		if(Math.random()<0.3){
			_mesh.scale.set(6, 6, 6);
			_mat.wireframe = true;
			_mat.wireframeLinewidth = 2;
		}else {
			_mesh.scale.set(1, 1, 1);			
			if (Math.random() < 0.5) {
				_mat.wireframe = true;
			}else {
				_mat.wireframe = false;
			}
		}
		*/
		
		
	}	
	
	
}