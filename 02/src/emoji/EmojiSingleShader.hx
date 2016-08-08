package emoji;
import canvas.CanvasSrc;
import data.TextureData;
import three.ImageUtils;
import three.ShaderMaterial;
import three.Texture;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class EmojiSingleShader
{
	var animationFrameLength:Int=32;
	
	
	public var vertexShader:String = '
		varying vec2 vUv;// fragmentShaderに渡すためのvarying変数
		uniform vec2 offset;
		uniform vec2 repeat;
		
		void main()
		{
		  // 処理する頂点ごとのuv(テクスチャ)座標をそのままfragmentShaderに横流しする
		  vUv = uv;
		  // 変換：ローカル座標 → 配置 → カメラ座標
		  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);    
		  // 変換：カメラ座標 → 画面座標
		  gl_Position = projectionMatrix * mvPosition;
		}
	';
		
		
	public var fragmentShader:String = '
		//uniform 変数としてテクスチャのデータを受け取る
		uniform sampler2D texture;
		uniform vec2 offset;
		uniform vec2 repeat;
		
		// vertexShaderで処理されて渡されるテクスチャ座標
		varying vec2 vUv;                                             

		void main()
		{
		  // テクスチャの色情報をそのままピクセルに塗る
		  gl_FragColor = texture2D(texture, vUv * repeat + offset);
		}
	';	
	
	
	public var attributes	:Dynamic;
	public var uniforms	:Dynamic;
	
	public var shaderMaterial:ShaderMaterial;
	private var _pos:EmojiSpritePos;
	private static var tex:Texture;
	
	
	public function new() 
	{
		
	}
	
	public function init():Void {
	
		animationFrameLength = TextureData.emo128.xnum;
		_pos = new EmojiSpritePos(TextureData.emo128);
		attributes = {
            //aOffset:{type: 'v2', value:[]},
            //aStart:{type: 'f', value:[]}
        }

		
		//trace("AAA" + Mosaic.W * Mosaic.H);
		//for(i in 0...CanvasSrc.W * CanvasSrc.H){
			//attributes.aOffset.value[i] = new Vector2(Math.random(), 0);//
		//}
		
		if(tex == null){
			tex = TextureData.emo128.texture;// ImageUtils.loadTexture("./emo2048.png");
			tex.minFilter = Three.NearestFilter;
			tex.magFilter = Three.NearestFilter;
		}
		
        uniforms = {
			
            texture: { type: 't', value: tex },
			//scale: { type: 'f', value: 3000.0 },
			//posScale: {type: 'v3', value: new Vector3(1.0, 1.0, 1.0)},
            offset: {type: 'v2', value: _pos.getIconPosByIndex(92)},//_pos.getIconPos(255*Math.random()) },//test
            repeat: { type: 'v2', value: new Vector2(1 / animationFrameLength, 1 / animationFrameLength ) }
			
        }
		
        shaderMaterial = new ShaderMaterial({
            uniforms: uniforms,
			attributes: attributes,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
			alphaTest: 0.5,
			depthWrite:false,
			side:Three.DoubleSide
        });
		
		//setHeight(0.5);
	}
	
	
	public function setIconIndex(n:Int):Void {
	
		n = n % TextureData.emo128.max;
		uniforms.offset.value = _pos.getIconPosByIndex(n);
		
	}
	
	
	/**
	 * 
	 * @param	ratio
	 */
	public function setHeight( ratio:Float ):Void {
		
		//offset　整合わせ技？
		var pos:Vector2 = _pos.getIconPos(255 * Math.random());
		pos.y = pos.y + (1 / animationFrameLength * (1-ratio)) / 2;
		uniforms.offset.value =  pos;
		uniforms.repeat.value = new Vector2(1 / animationFrameLength, 1 / animationFrameLength * ratio );
		
	}
	
}