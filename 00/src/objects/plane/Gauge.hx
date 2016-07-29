package objects.plane;
import three.Mesh;
import three.PlaneBufferGeometry;
import three.ShaderMaterial;
import three.Vector2;

/**
 * ...
 * @author watanabe
 */
class Gauge extends Mesh
{

	private var _material:ShaderMaterial;
	private var _geometry:PlaneBufferGeometry;
	
	
	private var _vertex:String = "
	
			varying vec2 vUv;
	
			void main()	{
				vUv = uv;
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);    
				// 変換：カメラ座標 → 画面座標
				gl_Position = projectionMatrix * mvPosition;
				
			}	
	";
	
	
	private var _fragment:String = "
			uniform vec2 resolution;
			uniform float time;
			uniform float freqs[5];
			varying vec2 vUv; 
			
			vec4 getColor(float xx, float freq) {
				vec4 black = vec4(0.2, 0.2, 0.2, 1.0);
				vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
				
				if (xx < freq ) {
					return black;
				}
				
				return red;
					
			}
			
			void main()	{
				
				if (vUv.y < 0.1) {
			
					gl_FragColor = getColor( vUv.x, freqs[0] );
					
				}else if (0.2<vUv.y && vUv.y<0.3) {
					
					gl_FragColor = getColor( vUv.x, freqs[1] );
					
				}else if (0.4<vUv.y && vUv.y<0.5) {
					
					gl_FragColor = getColor( vUv.x, freqs[2] );
					
				}else if (0.6<vUv.y && vUv.y<0.7) {
					
					gl_FragColor = getColor( vUv.x, freqs[3] );
					
				}else if (0.8<vUv.y && vUv.y<0.9) {
					
					gl_FragColor = getColor( vUv.x, freqs[4] );
				}
				
			}	
	";
	
	
	/**
	 * new
	 */
	public function new() 
	{
		
		_geometry = new PlaneBufferGeometry( 100, 100,1,1 );			
		_material = new ShaderMaterial( {
			uniforms: {
				time:       { type:"f",value: 1.0 },
				resolution: { type:"v2", value: new Vector2(512, 512) },
				freqs	:	{ type:"fv1", value: [1,2,3,4,5] }
			},
			vertexShader: _vertex,
			fragmentShader: _fragment
		} );
			
		_material.transparent = true;
		_material.side = Three.DoubleSide;
		
		super( untyped _geometry, _material );
			
	}
	
	
	public function update():Void {
		
		//trace("Update");
		_material.uniforms.time.value+= 0.01;
		_material.uniforms.resolution.value.x = 512;
		_material.uniforms.resolution.value.y = 512;	

		_material.uniforms.freqs.value[0] = Math.random();
		_material.uniforms.freqs.value[1] = Math.random();
		_material.uniforms.freqs.value[2] = Math.random();
		_material.uniforms.freqs.value[3] = Math.random();
		_material.uniforms.freqs.value[4] = Math.random();
		
		
	}
	
	
	
}