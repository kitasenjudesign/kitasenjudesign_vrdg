package effect.pass;
import sound.MyAudio;
import three.ImageUtils;
import three.postprocessing.ShaderPass;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class XLoopPass extends ShaderPass
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
					//uniform sampler2D disTexture;
					//uniform sampler2D colTexture;
					uniform float strength;
					uniform float counter;
					uniform float isDisplace;
					uniform float isColor;
					varying vec2 vUv;
					
					float yama(float rr, float beki) {
						
						float hoge = 0.5 + 0.5 * sin(rr * 3.14 - 3.14 * 0.5);
						//out = pow(out, beki);
						return hoge;// out;
					
					}

					float yama2(float rr, float beki) {
						
						float hoge = rr * 2.0;
						if ( hoge < 1.0) {
							hoge = pow(hoge, 1./beki) * 0.5;
						}else {
							hoge = pow(hoge-1.0, beki) * 0.5 + 0.5;
						}
						//out = pow(out, beki);
						return hoge;// out;
					
					}
					
					
					void main() {
						
						//dispace
						vec4 texel = vec4(0.0);
						
						//0.4-0.6 no hani wo kurikaesu
						float minX = 0.45;
						float maxX = 0.55;
						float amp = maxX - minX;
						
						//float xx = clamp( vUv.x, minX, maxX );
						//xx = (xx - minX) / len;//0-1
							
						float nn = 10. * sin( counter * 0.07 );
							
						float xx = minX + amp * (0.5 + 0.5 * sin(yama2(vUv.x, 2.0) * nn * 3.14 - 3.14 * 0.5));
						float minA = 0.3;// 1;
						float maxA = 0.7;// 9;
						
						if (vUv.x < minA) {
							
							xx = xx * pow(vUv.x / minA, 0.2);
							
						}else if (vUv.x > maxA) {
							
							xx = mix(xx, vUv.x, pow((vUv.x - maxA) / (1.0 - maxA), 7.0));
							
						}
						
						xx += 0.01 * sin(vUv.y * 2. * 3.14);
						float yy = vUv.y + 0.05 * sin(vUv.x * 6.0 * 3.14);
						
							//float ss = strength;
						float ss = 0.5 + 0.5 * sin(counter * 0.1);
						ss = ss * strength;
						xx = mix(vUv.x, xx, ss );
						yy = mix(vUv.y, yy, ss );
						
						//xx = 0.5+0.5*sin( 2.*3.14*vUv.x -3.14/2.0);
							
						//xx = 0.5 + 0.5 * sin(xx * 2.0 * 3.14 * 5.0);
						//vUv.x
						
						vec2 axis = vec2( xx, yy );
						texel = texture2D( tDiffuse, axis );
						vec4 out1 = texel;						
						
						gl_FragColor = out1;
						//gl_FragColor =  out1;// texel;
					}
	";
	
	
	private var _textures:Array<Texture>;
	private var _colors:Array<Texture>;
	
	
	
	public function new() 
	{
		
		_textures = [];
		
		super( {
			uniforms: {
				"tDiffuse":	{ type: "t", value: null },
				"isDisplace": 	{ type: "f", value: 1 },
				"isColor": 		{ type: "f", value: 1 },
				"strength": { type:"f", value:0 },
				"counter":{type:"f",value:0}
			},		
			vertexShader: _vertex,
			fragmentShader: _fragment
			
		});
		
	}
	
	
	
	
	/**
	 * 
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
	
		if (!enabled) return;
		
		uniforms.strength.value = 0.7 + audio.freqByteData[5] / 255*0.3;
		uniforms.counter.value += audio.freqByteData[3] / 255 * 0.8;		
		
	}
	
	/**
	 * setTexture
	 */
	public function setTexture(isColor:Bool, isDisplace:Bool):Void
	{
		
		uniforms.isColor.value = (isColor) ? 1 : 0;
		uniforms.isDisplace.value = (isDisplace) ? 1 : 0;
		
		//uniforms.disTexture.value = _textures[ Math.floor( Math.random() * _textures.length ) ];
		//uniforms.colTexture.value = _colors[ Math.floor( Math.random() * _colors.length ) ];
		
	}
	
	
}