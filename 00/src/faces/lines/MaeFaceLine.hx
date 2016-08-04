package faces.lines;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class MaeFaceLine
{

	public var lines:Array<ConnectLine> = [];
	
	public function new() 
	{
		
	}
	
	/**
	 * addVertex
	 * @param	vv
	 */
	public function addVertex(v1:Vector3,v2:Vector3):Void {
		
		lines.push(
			new ConnectLine(v1,v2)
		);
		
	}
	
	
	
	
}