package effect.pass;
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
					uniform sampler2D colTexture;
					uniform float strengthX;
					uniform float strengthY;
					uniform float counter;
					varying vec2 vUv;
					void main() {
						
						vec4 col = texture2D( texture, vUv);
						float f1 = strengthX * sin(counter);// pow(counter, 2.0 + 3.0 * col.x);//sin(counter * 3.9) * 0.23;
						float f2 = strengthY * sin(counter*0.92);// pow(counter, 2.0 + 3.0 * col.x) * 0.001;// pow(counter, 2.0 + 3.0 * col.y);//cos(counter * 3.7) * 0.23;
						
						vec2 axis = vec2( 
							vUv.x + (col.y-0.5)*f1, vUv.y + (col.z-0.5)*f2
						);
						
						vec4 texel = texture2D( tDiffuse, axis );
						//vec4 texel = texture2D( colTexture, axis );
						
						//vec3 luma = vec3( 0.299, 0.587, 0.114 );
						//float v = dot( texel.xyz, luma );//akarusa
						//vec2 axis = vec2( 0.5,v );						
						
						vec2 pp = vec2( 0.5, fract( texel.x + counter * 100.0 ) );
						
						vec4 out1 = texture2D( colTexture, pp );
						if ( texel.x == 0.0 ) {
							out1 = vec4(0.0, 0.0, 0.0, 1.0);
						}
						
						if ( texel.x == 0.0 || mod( floor( texel.x * 10000.0 + counter ),2.0) == 0.0 ) {
							texel.x = 0.0;
							texel.y = 0.0;
							texel.z = 0.0;							
						}else {
							texel.x = out1.x;// 1.0;
							texel.y = out1.y;// 1.0;
							texel.z = out1.z;// 1.0;														
						}
						
						
						gl_FragColor = texel;
						//gl_FragColor =  out1;// texel;
					}
	";
	
	
	private var _textures:Array<Texture>;
	private var _colors:Array<Texture>;
	
	
	
	public function new() 
	{
		
		_textures = [];
		for (i in 1...11) {	
			_textures.push( ImageUtils.loadTexture("displace" +(i)+".png") );
		}
		
		super( {
			uniforms: {
				"tDiffuse":	{ type: "t", value: null },
				"texture" : { type: "t", value: _textures[0] },
				"colTexture": { type: "t", value: _textures[1] },
				"strengthX": { type:"f", value:0 },
				"strengthY": { type:"f", value:0 },
				"counter":{type:"f",value:0}
			},		
			vertexShader: _vertex,
			fragmentShader: _fragment
			
		});
		
	}
	
	//
	public function update(audio:MyAudio):Void {
	
		uniforms.strengthX.value = Math.pow( audio.freqByteData[3] / 255, 4);
		uniforms.strengthY.value = Math.pow( audio.freqByteData[7] / 255, 4);
		uniforms.counter.value += audio.freqByteData[3] / 255 * 0.8;		
		
	}
	
	/**
	 * setTexture
	 */
	public function setTexture():Void
	{
		uniforms.texture.value = _textures[ Math.floor( Math.random() * _textures.length ) ];
		uniforms.colTexture.value = _textures[ Math.floor( Math.random() * _textures.length ) ];
		
	}
	
	
}