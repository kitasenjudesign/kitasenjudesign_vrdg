package effect.pass;
import common.Dat;
import common.Path;
import data.TexLoader;
import sound.MyAudio;
import three.ImageUtils;
import three.postprocessing.ShaderPass;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class DisplacementPass extends ShaderPass
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
					
					vec4 getColor(vec4 texel) {
						
						vec4 out1 = vec4(0.0);
						vec2 pp = vec2( 0.5, fract( texel.x + counter ) );
							if ( pp.y < 0.5) {
								pp.y = pp.y * 2.0;
								out1 = texture2D( colTexture, pp );						
							}else {
								pp.y = (1.0 - (pp.y - 0.5) * 2.0);				
								out1 = texture2D( colTexture, pp );
							}
							if ( texel.x == 0.0 ) {
								out1 = vec4(0.0, 0.0, 0.0, 1.0);
							}		
							return out1;
					}
					
					void main() {
						
						//dispace
						vec4 texel = vec4(0.0);
						
						if(isDisplace == 1.0){
							vec4 col = texture2D( disTexture, vUv);
							float f1 = strengthX * sin(counter*0.17);// pow(counter, 2.0 + 3.0 * col.x);//sin(counter * 3.9) * 0.23;
							float f2 = strengthY * sin(counter*0.22);// pow(counter, 2.0 + 3.0 * col.x) * 0.001;// pow(counter, 2.0 + 3.0 * col.y);//cos(counter * 3.7) * 0.23;
							
							vec2 axis = vec2( 
								vUv.x + (col.y-0.5)*f1, vUv.y + (col.z-0.5)*f2
							);
							
							texel = texture2D( tDiffuse, axis );
						}else {
							
							texel = texture2D( tDiffuse, vUv );
						}
						
						
						//vec4 texel = texture2D( colTexture, axis );
						
						//vec3 luma = vec3( 0.299, 0.587, 0.114 );
						//float v = dot( texel.xyz, luma );//akarusa
						//vec2 axis = vec2( 0.5,v );						
						
						//position
						vec4 out1 = vec4(0.0);
						
						if( isColor == 1.0){
							out1 = getColor(texel);
						}else {
							out1 = texel;
						}
					
					

						
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
						
						gl_FragColor = out1;
						//gl_FragColor =  out1;// texel;
					}
	";
	
	
	private var _textures:Array<Texture>;
	private var _colors:Array<Texture>;
	private var _index:Int = 0;
	private var _dispX:Float = 0.3;
	private var _dispY:Float = 0.75;
	
	public function new() 
	{
		
		_textures = [];
		
		_textures.push( TexLoader.getNearestTexture(Path.assets + "displace/displaceV2.png") );
		//_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displaceV.png") );
		_textures.push( TexLoader.getNearestTexture(Path.assets + "displace/displaceA.png") );
		_textures.push( TexLoader.getNearestTexture(Path.assets + "displace/displace.png") );
		_textures.push( TexLoader.getNearestTexture(Path.assets + "displace/displaceH.png") );

	
		/*
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace1.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace2.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace3.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace4.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace5.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace6.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace7.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace8.png") );
		_textures.push( ImageUtils.loadTexture(Path.assets + "displace/displace9.png") );
		*/
			//_textures.push( ImageUtils.loadTexture("displaceV.png") );
		
		
		_colors = [
			ImageUtils.loadTexture(Path.assets + "/grade/grade.png"),
			ImageUtils.loadTexture(Path.assets + "/grade/grade2.png"),
			ImageUtils.loadTexture(Path.assets + "/grade/grade3.png"),
			ImageUtils.loadTexture(Path.assets + "/grade/grade4.png")
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
		
		Dat.gui.add(this, "_dispX",0,1).step(0.01).listen();
		Dat.gui.add(this, "_dispY",0,1).step(0.01).listen();
		
		
	}
	
	//
	public function update(audio:MyAudio):Void {
	
		if (!enabled) return;
		
		uniforms.strengthX.value = Math.pow( audio.freqByteData[3] / 255, 4) * _dispX;
		uniforms.strengthY.value = Math.pow( audio.freqByteData[7] / 255, 4) * _dispY;
		uniforms.counter.value += audio.freqByteData[3] / 255 * 0.8;		
		
	}
	
	/**
	 * setTexture
	 */
	public function setTexture(isColor:Bool, isDisplace:Bool):Void
	{
		
		uniforms.isColor.value = (isColor) ? 1 : 0;
		uniforms.isDisplace.value = (isDisplace) ? 1 : 0;
		
		uniforms.disTexture.value = _textures[ _index % _textures.length ];
		uniforms.colTexture.value = _colors[ _index % _colors.length  ];
		_index++;
		
	}
	
	
}