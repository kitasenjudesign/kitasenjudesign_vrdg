package faces;
import js.html.Uint8Array;
import objects.shaders.CurlNoise;
import sound.MyAudio;
import three.ImageUtils;
import three.ShaderMaterial;
import three.Texture;
import three.Vector3;


/**
 * ...
 * @author watanabe
 */
class MaeShaderMaterial extends ShaderMaterial
{

	private var ff:String = "
		//uniform 変数としてテクスチャのデータを受け取る
		uniform sampler2D texture;
		uniform sampler2D colTexture;
		uniform vec3 _lightPosition; //光源位置座標
		uniform float _wireframe;
		// vertexShaderで処理されて渡されるテクスチャ座標
		varying vec2 vUv;                                             
		varying vec3 vNormal;
		varying vec3 vPos;
		varying vec4 vLight;
		varying vec4 vAbs;
		
		void main()
		{
			if ( _wireframe == 1.0 ) {
				
				gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
				
			}else{
			
			
				// テクスチャの色情報をそのままピクセルに塗る
				vec4 col = texture2D( texture, vec2( vUv.x, vUv.y ) )*1.0;
				//gl_FragColor = col;// texture2D(texture, vUv);
				
				//視点座標系における光線ベクトル
				vec4 viewLightPosition = vLight;// 
				//vec4 viewLightPosition = viewMatrix * vec4( _lightPosition, 0.0);
				//vec3 lightDirection = normalize(vPos - _lightPosition);
				//float dotNL = clamp(dot( vLight.xyz, vNormal), 0.0, 1.0);
				
				//ベクトルの規格化
				vec3 N = normalize(vNormal);                //法線ベクトル
				vec3 L = normalize(viewLightPosition.xyz); //光線ベクトル
				
				//法線ベクトルと光線ベクトルの内積
				float dotNL = dot(N, L);

				//拡散色の決定
				vec3 diffuse = col.xyz * dotNL * 0.3 + col.xyz * 0.7;
				
				//diffuse = diffuse * vAbs.xyz;
				
				
						vec2 pp = vec2( 0.5, fract( length(vAbs) ) );
						//vec2 pp = vec2( fract(vUv.x+vAbs.x*0.03), fract(vUv.y+vAbs.z*0.03) );
						vec4 out1 = texture2D( colTexture, pp );
						
						diffuse = out1.xyz * dotNL * 0.3 + out1.xyz * 0.7;
						//diffuse.x += out1.x;
						//diffuse.y += out1.y;
						//diffuse.z += out1.z;
			
				
				
				gl_FragColor = vec4( diffuse, 1.0);			
			
			}
		}	
	";
	
	
	
	private var vv:String = CurlNoise.glsl + "

const float PI = 3.141592653;
	
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec4 vLight;
varying vec4 vAbs;

uniform float _noise;
uniform float _count;
uniform float _freqByteData[32];
uniform vec3 _lightPosition; //光源位置座標

void main()
{
	vUv = uv;
	//頂点法線ベクトルを視点座標系に変換する行列=normalMatrix
	//vNormal = (normal * normalMatrix);
	//vec4 fuga = projectionMatrix * vec4( normal * normalMatrix , 0.0);
	vNormal = normalMatrix * normal;
	
	//視点座標系における光線ベクトル
	vLight = (viewMatrix * vec4( _lightPosition, 0.0));

	
	vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
	
	//vecNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
	//patams
	
	float nejireX		= pow( _freqByteData[16] / 255.0, 1.5) * 15.0;
	float nejireY		= pow(_freqByteData[18] / 255.0, 2.0) * PI * 2.0;// * 0.5;
	float noise 		= pow(_freqByteData[12] / 255.0, 1.0) * _noise;//1.5;
	float speed 		= pow(_freqByteData[8] / 255.0, 2.0) * 0.5;
	float sphere 		= pow(_freqByteData[4]/255.0, 2.0);
	float noiseSpeed 	= 0.1 + pow( _freqByteData[19] / 255.0, 4.0) * 0.25;
	float scale 		= 1.0 + pow(_freqByteData[1] / 255.0, 3.0) * 0.4;				
	float yokoRatio 	= pow(_freqByteData[5] / 255.0, 2.0);
	float yokoSpeed 	= pow(_freqByteData[13] / 255.0, 2.0) * 4.0;
	float zengoRatio 	= pow(_freqByteData[19] / 255.0, 2.0);		
	float tate			= 1.0 + ( pow(_freqByteData[14] / 255.0, 2.0) * 1.0 - pow(_freqByteData[3] / 255.0, 2.0) * 1.0 );
	
	////////////////////
	vec3 vv = position;
	/*
		var a:Float = Math.sqrt( vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);
		var radX:Float = -Math.atan2(vv.z, vv.x) + vv.y * Math.sin(_count) * _nejireX;//横方向の角度
		var radY:Float = Math.asin(vv.y / a);// + _nejireY;// * Math.sin(_count * 0.8);//縦方向の角度	
	*/	
	float a = length(vv);
	float radX = (-atan(vv.z, vv.x) + PI * 0.5) + vv.y * sin(_count) * nejireX;//横方向の角度
	float radY = asin(vv.y / a);
	
	/*
		var amp:Float = (1-_sphere) * a + (_sphere) * 1;
		amp += Math.sin(_count * 0.7) * _getNoise(vv.x, vv.y + _count * _noiseSpeed, vv.z) * _noise;
	*/

	//float snoise(vec3 v) { 
	float amp = (1.0 - sphere) * a + sphere * 1.0;
	vec3 snoisePos = vec3(vv.x, vv.y + _count * noiseSpeed, vv.z);
	amp += sin(_count * 0.7) * snoise(snoisePos) * noise;
	
	/*
		var yoko:Float = Math.sin( 0.5*( vv.y * 2 * Math.PI ) + _count * _yokoSpeed ) * _yokoRatio;
		var zengo:Float = Math.cos( 0.5*( vv.y * 2 * Math.PI ) + _count * 3 ) * 0.2 * _zengoRatio;
			
		var tgtX:Float = amp * Math.sin( radX ) * Math.cos(radY) + zengo;//横
		var tgtY:Float = amp * Math.sin( radY );//縦
		var tgtZ:Float = amp * Math.cos( radX ) * Math.cos(radY) + yoko;//横	
	*/

	float yoko = sin( 0.5*( vv.y * 2.0 * PI ) + _count * yokoSpeed ) * yokoRatio;
	float zengo = cos( 0.5*( vv.y * 2.0 * PI ) + _count * 3.0 ) * 0.2 * zengoRatio;	
	
	vec3 hoge = vec3(0.0);
		hoge.x = amp * sin( radX ) * cos(radY) + zengo;//横
		hoge.y = amp * sin( radY ) * tate;//縦
		hoge.z = amp * cos( radX ) * cos(radY) + yoko;//横	
		
	// 変換：ローカル座標 → 配置 → カメラ座標
	vec4 mvPosition = modelViewMatrix * vec4(hoge, 1.0);//vec4(vv, 1.0);    
	
	//vLight =  projectionMatrix * viewMatrix * vec4( _lightPosition, 0.0);
	vAbs = vec4(0.0);
	vAbs.x = hoge.x - position.x;
	vAbs.y = hoge.y - position.y;
	vAbs.z = hoge.z - position.z;

	// 変換：カメラ座標 → 画面座標
	gl_Position = projectionMatrix * mvPosition;
	
	
}

	";
	

	
	
	/*
		freqByteData
		
		_nejireX = Math.pow(_audio.freqByteData[16] / 255, 1.5) * 10;
		_nejireY = Math.pow(_audio.freqByteData[18] / 255, 2) * Math.PI * 2;// * 0.5;
				
		_noise = Math.pow(_audio.freqByteData[12] / 255,1) * 4.5;
		_speed = Math.pow( _audio.freqByteData[8] / 255, 2) * 0.5;
		_sphere = Math.pow( _audio.freqByteData[4]/255, 5);
		_noiseSpeed = 0.1 + Math.pow( _audio.freqByteData[19] / 255, 4) * 0.05;
		_scale = 1 + Math.pow(_audio.freqByteData[1] / 255, 3) * 0.4;				
				
		_yokoRatio =  Math.pow(_audio.freqByteData[5] / 255, 2);
		_yokoSpeed =  Math.pow(_audio.freqByteData[13] / 255, 2) * 4;
		_zengoRatio =  Math.pow(_audio.freqByteData[19] / 255, 2);	
	
	*/
	
	
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
	
	
	private static var _texture1:Texture;
	private static var _colorTextures:Array<Texture>;
	private var _indecies:Array<Int>;
	private var _freq:Array<Int>;
	private var _currentTexture:Texture;
	/**
	 * new
	 * @param	tt
	 * @param	t2
	 */
	public function new() 
	{
		if (_texture1 == null) {
			_texture1 = ImageUtils.loadTexture("mae_face.png");//mae_face.png");
		}
		
		_indecies = [];
		_freq = [];
		for (i in 0...MyAudio.a.freqByteDataAry.length) {
			_indecies[i] = Math.floor( Math.random() * MyAudio.a.freqByteDataAry.length);
			_freq[i] = 0;
		}
		
		changeTexture();
		super({
				vertexShader: vv,
				fragmentShader: ff,
				uniforms: {
					texture: { type: 't', 		value: _texture1 },
					colTexture:  { type: 't', 		value: _currentTexture },
					_noise: { type: 'f', 		value: 1.5+Math.random() },
					_freqByteData:{type:"fv1",	value:MyAudio.a.freqByteDataAry},//Uint8Array
					_count: { type:'f', 		value:100 * Math.random() },					
					_lightPosition: { type: "v3", value: new Vector3(0, 100, 50) },
					_wireframe: {type:"f",value:1}
				}
		});
		
		this.wireframe = true;
		//this.side = Three.DoubleSide;
		//this.wireframe = true;
		
	}
	
	public function changeTexture():Void {
		
		if ( _colorTextures == null ) {
			_colorTextures = [
				ImageUtils.loadTexture("grade.png"),
				ImageUtils.loadTexture("grade2.png"),
				ImageUtils.loadTexture("grade3.png"),
				ImageUtils.loadTexture("grade4.png"),
				ImageUtils.loadTexture("grade8.png")
			];
		}
		_currentTexture = _colorTextures[Math.floor(_colorTextures.length*Math.random())];
		
	}
	
	private function _getIndex():Array<Int>
	{
		var ary:Array<Int> = [];
		for (i in 0...10) {
			ary[i] = Math.floor(25 * Math.random());
		}
		return ary;
	}
	
	
	public function setWireframe(b:Bool):Void {
		
		if (b) {
			uniforms._wireframe.value = 1;
			this.wireframe = true;
		}else {
			uniforms._wireframe.value = 0;			
			this.wireframe = false;			
		}
		this.wireframe = true;
		this.wireframeLinewidth = 0.1;
	}
	
	
	public function update(a:MyAudio,lifeRatio:Float):Void {
		//color.uniforms.texture.value = _texture1;
		//trace(this.uniforms.counter.value);
		if(a!=null && a.isStart){
			_updateFreq(a, lifeRatio);
			var speed:Float 
			= Math.pow( a.freqByteData[_indecies[8]] / 255, 2) * 0.5;
			uniforms._count.value += speed;// Math.random();// Math.random();
			uniforms._freqByteData.value = _freq;// Math.random();// Math.random();
		}
		//needsUpdate = true;
		
	}
	
	//
	private function _updateFreq(audio:MyAudio,lifeRatio:Float):Void {
		for(i in 0..._freq.length){
			_freq[i] = audio.freqByteData[_indecies[i]];
		}
	}
	
	
}