package effect.pass;
import common.Path;
import sound.MyAudio;
import three.ImageUtils;
import three.postprocessing.ShaderPass;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class ColorMapPass extends ShaderPass
{
	private var _vertex:String = "
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}		
	";
	
	private var _fragment:String = "
					uniform sampler2D tDiffuse;
					uniform sampler2D texture;
					uniform float strength;
					uniform float counter;
					uniform float mono;
					varying vec2 vUv;
					void main() {
						
						vec4 texel = texture2D( tDiffuse, vUv );
						vec4 out1 = vec4(0.0);
						
					//mono == false
					if ( mono == 0.0) {
						
						vec2 pp = vec2( 0.5, fract( texel.x * strength + counter ) );//akarusanioujite	
						float rr = texel.x * 2.0;
						if (rr > 1.0) rr = 1.0;
					
						if ( pp.y < 0.5) {
								pp.y = pp.y * 2.0;
								out1 = texture2D( texture, pp ) * rr;					
						}else {
								pp.y = (1.0 - (pp.y - 0.5) * 2.0);				
								out1 = texture2D( texture, pp ) * rr;
						}
						
						if ( texel.x == 0.0 ) {
								out1 = vec4(0.0, 0.0, 0.0, 1.0);
						}		
					
					}else{
							
						//bakibaki
						float nn = 10000. + 9995. * sin(counter*0.01);
						if ( texel.x == 0.0 || mod( floor( texel.x * nn ),2.0) == 0.0 ) {
							out1.x = 0.0;
							out1.y = 0.0;
							out1.z = 0.0;							
						}else {
							out1.x = 1.0;
							out1.y = 1.0;
							out1.z = 1.0;														
						}
						
					}
						gl_FragColor = out1;// out1;// texel;
						//gl_FragColor =  out1;// texel;
					}
	";
	
	
	private var _textures:Array<Texture>;
	private var _colors:Array<Texture>;
	
	
	
	public function new() 
	{
		
		_textures = [];
		_textures.push( ImageUtils.loadTexture(Path.assets+ "grade/grade.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "grade/grade2.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "grade/grade3.png") );
		
		super( {
			uniforms: {
				"tDiffuse":	{ type: "t", value: null },
				"texture" : { type: "t", value: _textures[0] },
				"strength": { type:"f", value:0 },
				"counter": { type:"f", value:0 },
				"mono":{type:"f",value:1}
			},		
			vertexShader: _vertex,
			fragmentShader: _fragment
			
		});
		
	}
	
	//
	public function update(audio:MyAudio):Void {
	
		if (!enabled) return;
		
		uniforms.strength.value = Math.pow( audio.freqByteData[3] / 255, 2)*1000;
		uniforms.counter.value += audio.freqByteData[3] / 255 * 0.8;		
		
	}
	
	/**
	 * setTexture
	 */
	public function setTexture():Void
	{
		uniforms.texture.value = _textures[ Math.floor( Math.random() * _textures.length ) ];	
	}
	
	public function setColor():Void {
		
	}
	
	public function setMono(b:Bool) 
	{
		uniforms.mono.value = (b) ? 1 : 0;
	}
	
	
}