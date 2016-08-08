package emoji;
import canvas.CanvasSrc;
import common.Config;
import data.TextureData;
import emoji.shader.CurlNoise;
import three.ImageUtils;
import three.ShaderMaterial;
import three.Texture;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class EmojiShader
{
	
	var animationFrameLength:Int = 0;// 32;
	
	
	public var vertexShader:String = CurlNoise.glsl + '
			uniform float strength;
			uniform float seed;
			uniform float scale;
			uniform float scale1;
			uniform vec3 posScale;
			uniform float counter;
			attribute vec2 aOffset;
			varying vec2 vaOffset;	  
			void main() {
				//vec3 ps = vec3(2.0, 2.0, 2.0);
				vaOffset = aOffset;
				
				vec3 cn = curlNoise(position * seed + counter);
				vec3 pp = position + vec3( cn.x * strength, cn.y * strength, cn.z * strength );
				//vec3 pp = position + vec3( cn.x, cn.y, cn.z ) * 10.0;
				
				gl_Position = projectionMatrix * modelViewMatrix * vec4( pp * posScale, 1.0 );
				gl_PointSize = scale1 * scale / gl_Position.w;
			}
	';
		
		
	public var fragmentShader:String = '
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
	
	  
	public var attributes	:Dynamic;
	public var uniforms	:Dynamic;
	
	public var shaderMaterial:ShaderMaterial;
  
	
	
	public function new() 
	{
		
	}
	
	public function init():Void {
	
		
		attributes = {
            aOffset:{type: 'v2', value:[]}
        }
		
		//trace("AAA" + Mosaic.W * Mosaic.H);
		for(i in 0...CanvasSrc.W * CanvasSrc.H){
			attributes.aOffset.value[i] = new Vector2(Math.random(), 0);//
		}
		
		//var tex:Texture = TextureData.emo2048.texture;// ImageUtils.loadTexture("./emo2048.png");// icons.png");
		var tex:Texture = TextureData.emo2048b.texture;// ImageUtils.loadTexture("./emo2048.png");// icons.png");
		
		animationFrameLength = TextureData.emo2048.xnum;
		tex.minFilter = Three.NearestFilter;
		tex.magFilter = Three.NearestFilter;
		
        uniforms = {
			strength:	{ type: 'f', value: 100.0 },
            seed:	{ type: 'f', value: 0.0 },
            counter:	{ type: 'f', value: 0 },
			texture:	 { type: 't', value: tex },
			scale1: 	{ type: 'f', value: Config.particleSize },
			scale: 		{ type: 'f', value: 1.0 },
			posScale: 	{type: 'v3', value: new Vector3(1.0, 1.0, 1.0)},
            offset: 	{type: 'v2', value: new Vector2(1/animationFrameLength, 0.0)},
            repeat: 	{type: 'v2', value: new Vector2(1/animationFrameLength, 1/animationFrameLength)}
        }
		
        shaderMaterial = new ShaderMaterial({
            uniforms: uniforms,
			attributes: attributes,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
			alphaTest: 0.5,
			depthWrite:false
        });
		
	}
	
	
}