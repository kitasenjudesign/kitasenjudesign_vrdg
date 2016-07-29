package objects;
import objects.shaders.CurlNoise;
import three.ImageUtils;
import three.ShaderMaterial;
import three.Texture;


/**
 * ...
 * @author watanabe
 */
class MyShaderMaterial extends ShaderMaterial
{

	private var vv:String = CurlNoise.glsl + "
	
varying vec2 vUv;// fragmentShaderに渡すためのvarying変数
uniform float counter;
uniform float amp;
void main()
{
	// 処理する頂点ごとのuv(テクスチャ)座標をそのままfragmentShaderに横流しする
	vUv = uv;
	//
	float a = length(position);
	float radX = -atan(position.z, position.x) + position.y*2.0;//横方向の角度
	float radY = asin(position.y / a);	
	
	vec3 aa = vec3(position);
	aa.x = aa.x + counter;
	aa.y = aa.y + counter * 0.73;
	//a = a + 0.5 * curlNoise(aa).x;
	a = a + amp * snoise(aa);
	float xx = a * sin( radX ) * cos(radY);//横
	float yy = a * sin( radY );//縦
	float zz = a * cos( radX ) * cos(radY);//横	

	
  // 変換：ローカル座標 → 配置 → カメラ座標
  vec4 mvPosition = modelViewMatrix * vec4(xx,yy,zz, 1.0);//vec4(vv, 1.0);    
  // 変換：カメラ座標 → 画面座標
  gl_Position = projectionMatrix * mvPosition;
}	
	";
	
	private var ff:String = "
//uniform 変数としてテクスチャのデータを受け取る
uniform sampler2D texture;

// vertexShaderで処理されて渡されるテクスチャ座標
varying vec2 vUv;                                             

void main()
{
  // テクスチャの色情報をそのままピクセルに塗る
	vec4 sum = vec4( 0.0 );
	//sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;
	//sum += texture2D( texture, vec2( vUv.x-0.1, vUv.y ) )*0.333;
	sum = texture2D( texture2, vec2( vUv.x, vUv.y ) )*1.0;
	//sum += texture2D( texture, vec2( vUv.x+0.1, vUv.y ) )*0.333;
	//sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;  
  
	gl_FragColor = sum;// texture2D(texture, vUv);
}	
	";
	
	private static var _texture1:Texture;
	
	/*
			var vv:Vector3 = _base[i];

			var a:Float = Math.sqrt( vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);
			var radX:Float = -Math.atan2(vv.z, vv.x) + vv.y * Math.sin(_count) * _nejireX;//横方向の角度
			var radY:Float = Math.asin(vv.y / a);// + _nejireY;// * Math.sin(_count * 0.8);//縦方向の角度

			var amp:Float = (1-_sphere) * a + (_sphere) * 1;
			amp += Math.sin(_count * 0.7) * _getNoise(vv.x, vv.y + _count * _noiseSpeed, vv.z) * _noise;

			var yoko:Float = Math.sin( 0.5*( vv.y * 2 * Math.PI ) + _count * _yokoSpeed ) * _yokoRatio;
			var zengo:Float = Math.cos( 0.5*( vv.y * 2 * Math.PI ) + _count * 3 ) * 0.2 * _zengoRatio;
			
			var tgtX:Float = amp * Math.sin( radX ) * Math.cos(radY) + zengo;//横
			var tgtY:Float = amp * Math.sin( radY );//縦
			var tgtZ:Float = amp * Math.cos( radX ) * Math.cos(radY) + yoko;//横	
			
			g.vertices[i].x += ( tgtX - g.vertices[i].x) / 2; 
			g.vertices[i].y += ( tgtY - g.vertices[i].y) / 2;
			g.vertices[i].z += ( tgtZ - g.vertices[i].z) / 2;	
	*/
	
	/**
	 * new
	 * @param	tt
	 * @param	t2
	 */
	public function new() 
	{
		if (_texture1 == null) {
			_texture1 = ImageUtils.loadTexture("mae_face.png");
		}
		
		super({
				vertexShader: vv,
				fragmentShader: ff,
				uniforms: {
					texture: { type: 't', value: _texture1 },
					counter: { type:'f', value:100 * Math.random() },
					amp: { type:'f', value:10 * Math.random() }
					
				}
		});
		this.side = Three.DoubleSide;
		
	}
	
	public function update():Void {
		//color.uniforms.texture.value = _texture1;
		//trace(this.uniforms.counter.value);
		this.uniforms.counter.value += 0.01;// Math.random();// Math.random();
		
		//needsUpdate = true;
	}
	
	
	
}