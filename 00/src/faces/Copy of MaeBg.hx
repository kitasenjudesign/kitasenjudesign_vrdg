package faces;
import three.BoxGeometry;
import three.Geometry;
import three.Mesh;
import three.PlaneBufferGeometry;
import three.ShaderMaterial;
import three.Vector3;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author watanabe
 */
class MaeBg extends Mesh
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



	private var _geo:Geometry;//PlaneBufferGeometry;
	private var _mat:ShaderMaterial;
	private var _twn:TweenMaxHaxe;
	private var _light:Float;
	
	public function new() 
	{
		
		_geo = new PlaneBufferGeometry(30, 30, 1, 1);
		_mat = new ShaderMaterial({
			vertexShader: _vertex,
			fragmentShader: _fragment,
			uniforms: {
				col: { type: 'v3', value: new Vector3(1,1,1)}                               
			},
			wireframe:true
		});	
		
		super(untyped _geo, _mat);
	}
	
	/**
	 * flash
	 */
	public function flash():Void {
		//
		Tracer.log("flash");
		_light = 1;
		if (_twn != null) {
			_twn.kill();
		}
		_twn = TweenMax.to(this, 0.5, {
			_light:0,
			onUpdate:_onUpdate
		});
		
	}
	
	function _onUpdate() 
	{
		_mat.uniforms.col.value.x = _light;
		_mat.uniforms.col.value.y = _light;
		_mat.uniforms.col.value.z = _light;		
	}
	
}