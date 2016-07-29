package ;
import js.Browser;
import js.html.DivElement;
import js.JQuery;
import three.Mesh;
import three.PerspectiveCamera;
import three.Projector;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class DivViewer
{

	private var _divs:Array<DivElement>;
	
	public function new() 
	{
		
	}
	
	public function init():Void{

		_divs = [];
	  	for (i in 0...100) {
			var ele:DivElement = Browser.document.createDivElement();
			Browser.document.body.appendChild(ele);
		
			//new JQuery(ele).addClass("unko");
			new JQuery(ele).css({
				top:1000 * Math.random(),
				left:1000 * Math.random(),
				color:"#ffffff"
			});
			ele.innerHTML = cast i;
			_divs.push(ele);
		}
	}
		
	
	
	public function update(camera:PerspectiveCamera,cubes:Array<Mesh>):Void
	{
		//計算
		var width:Float = Browser.window.innerWidth;
		var height:Float = Browser.window.innerHeight;
			
		if(cubes != null){
			for (i in 0...cubes.length) {
					
				var tgt:DivElement = _divs[i];
				var vector:Vector3 = cubes[i].position.clone();
				var projector:Projector = new Projector();
					
				//projector.projectVector( vector, _camera );
				projector.projectVector(
					vector.setFromMatrixPosition( cubes[i].matrixWorld ), camera
				);//mtrix
				
				//projector.projectVector(cubes[i].localToWorld(new Vector3(0, 0, 0)), _camera);
					
				var xx:Float = ( vector.x * width / 2 ) + width / 2;
				var yy:Float = -( vector.y * height / 2 ) + height / 2;
				//trace(xx + "_" + yy);
					
				new JQuery(tgt).css({
					position	:"absolute",
					left		:(xx - 5) + "px",
					top			:(yy - 5) + "px"
				});
					
			}
		}
	}
	
}