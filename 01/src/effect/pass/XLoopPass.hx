package effect.pass;
import sound.MyAudio;
import three.ImageUtils;
import three.postprocessing.ShaderPass;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class XLoopPass extends ShaderPass
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
					uniform sampler2D disTexture;
					uniform sampler2D colTexture;
					uniform float strengthX;
					uniform float strengthY;
					uniform float counter;
					uniform float isDisplace;
					uniform float isColor;
					varying vec2 vUv;
					
					float yama(float rr, float beki) {
						
						float hoge = 0.5 + 0.5 * sin(rr * 3.14 - 3.14 * 0.5);
						//out = pow(out, beki);
						return hoge;// out;
					
					}

					float yama2(float rr, float beki) {
						
						float hoge = rr * 2.0;
						if ( hoge < 1.0) {
							hoge = pow(hoge, 1./beki) * 0.5;
						}else {
							hoge = pow(hoge-1.0, beki) * 0.5 + 0.5;
						}
						//out = pow(out, beki);
						return hoge;// out;
					
					}
					
					
					void main() {
						
						//dispace
						vec4 texel = vec4(0.0);
						
						//0.4-0.6 no hani wo kurikaesu
						float minX = 0.45;
						float maxX = 0.55;
						float amp = maxX - minX;
						
						//float xx = clamp( vUv.x, minX, maxX );
						//xx = (xx - minX) / len;//0-1
						
					float nn = 10. * sin( counter * 0.07 );
						
					float xx = minX + amp * (0.5 + 0.5 * sin(yama2(vUv.x, 2.0) * nn * 3.14 - 3.14 * 0.5));
					float minA = 0.3;// 1;
					float maxA = 0.7;// 9;
					
					if (vUv.x < minA) {
						
						xx = xx * pow(vUv.x / minA, 0.2);
						
					}else if (vUv.x > maxA) {
						
						xx = mix(xx, vUv.x, pow((vUv.x - maxA) / (1.0 - maxA), 7.0));
						
					}
					
					float yy = vUv.y + 0.05 * sin(vUv.x * 6.0 * 3.14);
					
					xx = mix(vUv.x, xx, 0.5+0.5*sin(counter * 0.1) );
					yy = mix(vUv.y, yy, 0.5+0.5*sin(counter * 0.1) );
					
					
						//xx = 0.5+0.5*sin( 2.*3.14*vUv.x -3.14/2.0);
							
						//xx = 0.5 + 0.5 * sin(xx * 2.0 * 3.14 * 5.0);
						//vUv.x
						
					vec2 axis = vec2( xx, yy );
					texel = texture2D( tDiffuse, axis );
						
						
						//vec4 texel = texture2D( colTexture, axis );
						
						//vec3 luma = vec3( 0.299, 0.587, 0.114 );
						//float v = dot( texel.xyz, luma );//akarusa
						//vec2 axis = vec2( 0.5,v );						
						
						//position
					
						
						/*
						if ( texel.x == 0.0 || mod( floor( texel.x * 1000.0 + counter ),2.0) == 0.0 ) {
							texel.x = 0.0;
							texel.y = 0.0;
							texel.z = 0.0;							
						}else {
							texel.x = out1.x;//1.0;
							texel.y = out1.y;//1.0;
							texel.z = out1.z;//1.0;														
						}*/
						/*
							texel.x = out1.x;//1.0;
							texel.y = out1.y;//1.0;
							texel.z = out1.z;//1.0;							
						*/
						
						gl_FragColor = texel;
						//gl_FragColor =  out1;// texel;
					}
	";
	
	
	private var _textures:Array<Texture>;
	private var _colors:Array<Texture>;
	
	
	
	public function new() 
	{
		
		_textures = [];
		for (i in 1...11) {	
			_textures.push( ImageUtils.loadTexture("displace" +(i)+".png") );
		}
		_colors = [
			ImageUtils.loadTexture("grade.png"),
			ImageUtils.loadTexture("grade2.png"),
			ImageUtils.loadTexture("grade3.png"),
			ImageUtils.loadTexture("grade4.png")
		];
		
		
		super( {
			uniforms: {
				"tDiffuse":	{ type: "t", value: null },
				"isDisplace": 	{ type: "f", value: 1 },
				"isColor": 		{ type: "f", value: 1 },
				"disTexture" : { type: "t", value: _textures[0] },
				"colTexture": { type: "t", value: _colors[3] },
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
	
		uniforms.strengthX.value = Math.pow( audio.freqByteData[3] / 255, 4) * 0.75;
		uniforms.strengthY.value = Math.pow( audio.freqByteData[7] / 255, 4) * 0.75;
		uniforms.counter.value += audio.freqByteData[3] / 255 * 0.8;		
		
	}
	
	/**
	 * setTexture
	 */
	public function setTexture(isColor:Bool, isDisplace:Bool):Void
	{
		
		uniforms.isColor.value = (isColor) ? 1 : 0;
		uniforms.isDisplace.value = (isDisplace) ? 1 : 0;
		
		uniforms.disTexture.value = _textures[ Math.floor( Math.random() * _textures.length ) ];
		uniforms.colTexture.value = _colors[ Math.floor( Math.random() * _colors.length ) ];
		
	}
	
	
}