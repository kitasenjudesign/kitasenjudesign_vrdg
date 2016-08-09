package emoji;
import common.Path;
import three.ImageUtils;
import three.ShaderMaterial;
import three.Texture;
import three.TextureLoader;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class EmojiShader extends ShaderMaterial
{
	
	private var animationFrameLength	:Int=32;
	private var _texture				:Texture;
	
	public var vertex:String = '
			uniform float scale;
			uniform vec3 posScale;
			attribute vec2 aOffset;
			varying vec2 vaOffset;	  
			void main() {
				//vec3 ps = vec3(2.0, 2.0, 2.0);
				vaOffset = aOffset;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position * posScale, 1.0 );
				gl_PointSize = 2.0 * scale / gl_Position.w;
			}
	';
		
		
	public var fragment:String = '
		  uniform vec3 color;
		  uniform sampler2D texture;
		  uniform vec2 offset;
		  varying vec2 vaOffset;
		  uniform vec2 repeat;
		  
		  void main() {
			
			vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
			vec4 color0 = texture2D( texture, uv * repeat + vaOffset  );//
			gl_FragColor = color0;
			
		  }
	';	
	
	
	
	public function new() 
	{
		
		_texture = new TextureLoader().load(Path.assets+ "emoji/emo2048_64.png");
		// ImageUtils.loadTexture("./emo2048.png");// icons.png");
		_texture.minFilter = Three.NearestFilter;
		_texture.magFilter = Three.NearestFilter;
		_texture.needsUpdate = true;
		
        uniforms = {
            texture:	 { type: 't', value: _texture },
			scale: 		{ type: 'f', value: 3000.0 },
			posScale: 	{type: 'v3', value: new Vector3(1.0, 1.0, 1.0)},
            //offset: 	{type: 'v2', value: new Vector2(1/animationFrameLength, 0.0)},
            repeat: 	{type: 'v2', value: new Vector2(1/animationFrameLength, 1/animationFrameLength)}
        }
		
       super({
            uniforms: uniforms,
			//attributes: attributes,
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
			alphaTest: 0.5,
			depthWrite:false
        });
		
	}
	
	
	/**
	 * update
	 */
	public function update():Void {
		
		//uniforms.texture.value = _texture;
		
	}
	
}