package objects;
import three.Geometry;
import three.Mesh;

/**
 * ...
 * @author watanabe
 */
class NewFace extends Mesh
{

	private var _geometry:Geometry;
	private var _material:MyShaderMaterial;

	
	public function new(g:Geometry) 
	{
		_material = new MyShaderMaterial();
		_geometry = g;
		super(_geometry, _material);
		
		this.rotation.x = Math.random() * Math.PI * 2;
		this.rotation.y =  Math.random() * Math.PI * 2;
		this.rotation.z = Math.random() * Math.PI * 2;
		
	}
	
	
	public function update():Void {
		
		//
		_material.update();
		
	}
	
}