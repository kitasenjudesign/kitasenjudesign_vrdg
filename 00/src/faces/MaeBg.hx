package faces;
import three.BoxGeometry;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.Mesh;
import three.PlaneBufferGeometry;
import three.Points;
import three.PointsMaterial;
import three.ShaderMaterial;
import three.Vector3;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author watanabe
 */
class MaeBg extends Points
{
	
	private var _vertex:String = "
void main()
{
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);    
  gl_Position = projectionMatrix * mvPosition;
}";

	private var _fragment:String = "

uniform vec3 col;
void main()
{
  // テクスチャの色情報をそのままピクセルに塗る
	gl_FragColor = vec4(col,1.0);
}
	
";



	private static var _geo:Geometry;//PlaneBufferGeometry;
	private var _mat:PointsMaterial;
	
	private var _twn:TweenMaxHaxe;
	private var _light:Float;
	
	public function new() 
	{
		
		if (_geo == null) {
			var w:Float = 30 / 2 - 0.5;
			_geo = new Geometry();
			_geo.vertices.push(new Vector3(-w,-w,0));
			_geo.vertices.push(new Vector3(-w,w,0));
			_geo.vertices.push(new Vector3(w,w,0));
			_geo.vertices.push(new Vector3(w,-w,0));
		}
		
		_mat = new PointsMaterial({
			color:0xffffff,size:2
		});
		
		super(untyped _geo, _mat);
	}
	
	/**
	 * flash
	 */
	public function flash():Void {
		//
		Tracer.log("flash");
		/*
		_light = 1;
		if (_twn != null) {
			_twn.kill();
		}
		_twn = TweenMax.to(this, 0.5, {
			_light:0.5,
			onUpdate:_onUpdate
		});
		*/
	}
	
	function _onUpdate() 
	{
		_mat.color.setRGB(_light, _light, _light);	
	}
	
}