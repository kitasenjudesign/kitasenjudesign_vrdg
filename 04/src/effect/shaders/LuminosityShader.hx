package effect.shaders;
import three.ImageUtils;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class LuminosityShader
{

	public function new() 
	{
		
	}
	
	public static function getObject(tt:Texture):Dynamic {
		
		return {
			
			uniforms: {
				"tDiffuse":	{ type: "t", value: null },
				"texture" : { type: "t", value: tt },
				"texture2" : { type: "t", value: tt }
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
					uniform sampler2D texture2;
					varying vec2 vUv;
					void main() {
						vec4 texel = texture2D( tDiffuse, vUv );
						vec3 luma = vec3( 0.299, 0.587, 0.114 );
						float v = dot( texel.xyz, luma );//akarusa
						vec2 axis = vec2( 0.5,v );
						
						//vec4 pa = texture2D( tDiffuse, vUv);
						
						//vec4 pb = texture2D( texture, axis);
						//vec4 pb = mix( texture2D( tDiffuse, vUv), texture2D( texture, axis), 0.6+0.4*vUv.y);
						
						//fu tatsu wo mazeteiru
						vec4 pb = mix( texture2D( texture2, axis), texture2D( texture, axis), vUv.y);
						
						
						gl_FragColor = vec4( pb.x,pb.y,pb.z, 1.0 );
					}
				"
		};

	}
	
	/*
	
	
	*/
}