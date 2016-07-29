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
						vec4 texel = texture2D( tDiffuse, vUv );
						vec3 luma = vec3( 0.299, 0.587, 0.114 );
						float v = dot( texel.xyz, luma );
						v = v + counter;
						vec2 axis = vec2( 0.5,fract(v) );
						
						//vec4 pa = texture2D( tDiffuse, vUv);
						
						vec4 pb = texture2D( texture, axis);
						//vec4 pb = mix( texture2D( tDiffuse, vUv), texture2D( texture, axis), 0.5+0.5*v);
						
						gl_FragColor = vec4( pb.x,pb.y,pb.z, 1.0 );
					}
				"
		};

	}
	
	/*
	
	
	*/
}