package canvas.primitives;
import three.Geometry;
import three.Material;
import three.Mesh;

/**
 * ...
 * @author watanabe
 */
class ExMesh extends Mesh
{

    public var amp    	:Float = 200.0;
	public var radX   	:Float = 0.01;// Math.PI / 5;
    public var radY   	:Float = 0.01;// Math.PI / 5;

	public var vx:Float = Math.random()-0.5;
	public var vy:Float = Math.random()-0.5;
	public var vz:Float = Math.random()-0.5;
	
	public function new(g:Geometry,m:Material) 
	{
		super(g, m);
	}
	
	/**
	 * 
	 */
	public function update():Void {
		
		var amp1		:Float = this.amp * Math.cos(this.radY);
		position.x = amp1 * Math.sin( this.radX );//横
		position.y = this.amp * Math.sin(this.radY);
		position.z = amp1 * Math.cos( this.radX );//横
						
		
	}
	
}