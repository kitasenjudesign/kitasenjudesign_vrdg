package effect.shaders;
import three.ImageUtils;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class DisplaceShader
{

	public function new() 
	{
		
	}
	
	public static function getObject(tt:Texture):Dynamic {
		
		tt.minFilter = Three.NearestFilter;
		tt.magFilter = Three.NearestFilter;
		tt.needsUpdate = true;
			
			
		return {
			
			uniforms: {
				"tDiffuse":	{ type: "t", value: null },
				"texture" : { type: "t", value: tt },
				"counter":{type:"f",value:0}
			},

			vertexShader:
				"
					varying vec2 vUv;
					void main() {
						vUv = uv;
						gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
					}				
				",

				
			fragmentShader:
				"
					uniform sampler2D tDiffuse;
					uniform sampler2D texture;
					uniform float counter;
					varying vec2 vUv;
					void main() {
						
						vec4 col = texture2D( texture, vUv);
						vec2 axis = vec2( 
							vUv.x + col.x*0.1, vUv.y + col.y*0.1
						);
						vec4 texel = texture2D( tDiffuse, axis );
						
						//vec4 pb = mix( texture2D( tDiffuse, vUv), texture2D( texture, axis), 0.5+0.5*v);
						
						gl_FragColor = texel;
					}
				"
		};

	}
	
	/*
	
	
	*/
}