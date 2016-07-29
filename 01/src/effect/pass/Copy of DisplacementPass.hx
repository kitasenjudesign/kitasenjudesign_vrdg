package effect.pass;
import sound.MyAudio;
import three.postprocessing.ShaderPass;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class DisplacementPass extends ShaderPass
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
						
						//
						if ( mod( floor( texel.x * 1000.0 ),2.0) == 0.0 ) {
							texel.x = 0.0;
							texel.y = 0.0;
							texel.z = 0.0;							
						}else {
							texel.x = 1.0;
							texel.y = 1.0;
							texel.z = 1.0;														
						}
						
						//texel.x *= col.x;
						//texel.y *= col.y;
						//texel.z *= col.z;
						
						//vec4 pb = mix( texture2D( tDiffuse, vUv), texture2D( texture, axis), 0.5+0.5*v);
						
						gl_FragColor = texel;
					}
	";
	
	
	
	public function new(tt:Texture) 
	{
		

		tt.needsUpdate = true;
		
		super( {
			uniforms: {
				"tDiffuse":	{ type: "t", value: null },
				"texture" : { type: "t", value: tt },
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
	
	public function setTexture(currentTexture:Texture) 
	{
		uniforms.texture.value = currentTexture;
	}
	
	
}