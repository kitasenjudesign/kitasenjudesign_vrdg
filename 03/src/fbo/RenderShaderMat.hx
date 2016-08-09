package fbo;
import common.Path;
import three.ImageUtils;
import three.ShaderMaterial;
import three.Texture;
import three.TextureLoader;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class RenderShaderMat extends ShaderMaterial
{
	public static inline var animationFrameLength	:Int = 32;

	private var _vertex:String  = "
//float texture containing the positions of each particle
uniform sampler2D positions;
uniform sampler2D texture;
uniform vec2 nearFar;
uniform float pointSize;
varying vec2 vUv;
varying float size;

uniform float scale;
attribute vec2 aOffset;
attribute float rand;
varying vec2 vaOffset;	  

void main() {

	//positions画像のuv と vertexのposition が 対応するようになっている
    //the mesh is a nomrliazed square so the uvs = the xy positions of the vertices
    vec3 pos = texture2D( positions, position.xy ).xyz;
	vUv = uv;

	vaOffset = aOffset;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos + rand, 1.0 );
	gl_PointSize = 2.0 * scale / gl_Position.w;	
	
    //pos now contains the position of a point in space taht can be transformed
    //gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
    //size
    //gl_PointSize = size = 3.0;// max( 1., ( step( 1. - ( 1. / 512. ), position.x ) ) * pointSize );
}	
	";	
	
	
	
	private var _fragment:String = "
uniform sampler2D texture;
varying vec2 vUv;
varying vec2 vaOffset;
uniform vec2 repeat;
void main()
{
			vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
			vec4 color0 = texture2D( texture, uv * repeat + vaOffset  );//
			gl_FragColor = color0;
}
	";
	
	
	public function new() 
	{
		var tex:Texture = ImageUtils.loadTexture(Path.assets + "emoji/emoji2048_64.png");
		//tex.format = Three.RGBAFormat;
		
           super( {
                uniforms: {
                    positions: { type: "t", value: null },
                    pointSize: { type: "f", value: 40 },
					texture: { type: "t", value: tex },
					scale: 		{ type: 'f', value: 3000.0 },
					repeat: 	{type: 'v2', value: new Vector2(1/animationFrameLength, 1/animationFrameLength)}					
                },
                vertexShader: _vertex,
                fragmentShader: _fragment,
                transparent: true,
                side:Three.DoubleSide
//                blending:THREE.AdditiveBlending
            } );		
			depthTest = true;
			transparent = true;
			//blending = Three.AdditiveBlending;      
			alphaTest = 0.5;
			
			
	}
	
}