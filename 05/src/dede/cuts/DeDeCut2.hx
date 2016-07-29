package dede.cuts;

/**
 * ...
 * @author watanabe
 */
class DeDeCut2  extends DeDeCutBase
{

	public function new() 
	{
		super();
	}
	
	/**
	 * next
	 */
	override public function next():Void
	{
		_lines.next();
	}	
	
	
	override public function start():Void {

		_lines.visible = true;
		_lines.setGeoMax(200);
		
		_vrdg.visible = false;
		_vrdg.setGeoMax(1);		
		
	}
	
	
}