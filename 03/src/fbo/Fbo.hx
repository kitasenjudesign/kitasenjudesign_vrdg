package fbo;
import js.html.Float32Array;
import sound.MyAudio;
import three.BufferAttribute;
import three.BufferGeometry;
import three.Line;
import three.Mesh;
import three.OrthographicCamera;
import three.Points;
import three.Scene;
import three.ShaderMaterial;
import three.Vector2;
import three.WebGLRenderer;
import three.WebGLRenderTarget;

/**
 * ...
 * @author watanabe
 */
class Fbo
{

	private var _simuShaderMat	:SimulationShaderMat;
	private var _renderShaderMat:RenderShaderMat;
	private var _renderGeo		:BufferGeometry;
	
	//private var _renderer			:WebGLRenderer;
	private var _posRttA			:WebGLRenderTarget;
	private var _posRttB			:WebGLRenderTarget;
	
	private var _simScene			:Scene;			
	private var _simCam				:OrthographicCamera;
	private var _simMesh			:Mesh;
	//private var _particles			
	
	private var _flag:Bool = false;
	private var _particles:Points;
	
	private var _width:Int = 512;
	private var _height:Int = 512;
	private var _line:Line;
	private var animationFrameLength:Int = 32;
	private var _mesh:Mesh;

	
	public function new() 
	{
		
	}
	
	public function init(ww:Int,hh:Int):Void {
		
		_width = ww;
		_height = hh;
		
		_simuShaderMat = new SimulationShaderMat(ww, hh);
		_renderShaderMat = new RenderShaderMat();
		
		//3 rtt setup
        _simScene = new Scene();
        _simCam = new OrthographicCamera(-1,1,1,-1,1/Math.pow( 2, 53 ),1 );

		 //4 create a target texture
		 
        _posRttA = new WebGLRenderTarget( _width,_height, {
            minFilter: Three.NearestFilter,//important as we want to sample square pixels
            magFilter: Three.NearestFilter,//
            format: Three.RGBFormat,//could be RGBAFormat
            type:Three.FloatType//important as we need precise coordinates (not ints)
        });
        _posRttB = _posRttA.clone();//もう一個用意
		
		//5 the simulation:
        //create a bi-unit quadrilateral and uses the simulation material to update the Float Texture
        var simGeo:BufferGeometry = new BufferGeometry();
        simGeo.addAttribute( 
			'position', 
			new BufferAttribute( 
				new Float32Array([   -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0 ]), 3
			)
		);
        simGeo.addAttribute( 
			'uv',
			new BufferAttribute(
				new Float32Array([   0, 1, 1, 1, 1, 0,     0, 1, 1, 0, 0, 0 ]), 2
			)
		);

		 var l:Int = (_width * _height );
		var life:Float32Array = new Float32Array( l );
        for ( i in 0...l) {
            life[ i ] = Math.random() * 0.4;
        }
		simGeo.addAttribute( 
			'life',	new BufferAttribute(life, 1)
		);
		
		_simMesh = new Mesh( cast simGeo, _simuShaderMat );
		_simScene.add( _simMesh );
        //exports.simuMat = simulationMaterial;

		
        //6 the particles:
        //create a vertex buffer of size width * height with normalized coordinates
		_renderGeo = _getParticleGeo();
		
        //the rendermaterial is used to render the particles
        _particles = new Points( cast _renderGeo, _renderShaderMat );
        _line = new Line( cast _renderGeo, _renderShaderMat );
        _mesh = new Mesh( cast _renderGeo, _renderShaderMat );
	}
	
	private function _getParticleGeo() 
	{
        var l:Int = (_width * _height );//////////////////num
        var vertices = new Float32Array( l * 3 );
        for ( i in 0...l) {
            var i3:Int = i * 3;
            vertices[ i3 ] = ( i % _width ) / _width ;
            vertices[ i3 + 1 ] = ( i / _width ) / _height;
        }

		//textureの位置そ示している
		var aOffsets:Float32Array = new Float32Array( l * 2 );
        for ( i in 0...l) {
            var i2:Int = i * 2;
			var pos:Vector2 = getIconPos(Math.floor(Math.random() * 845));
            aOffsets[ i2 ] = pos.x;
            aOffsets[ i2 + 1 ] = pos.y;
        }
		
		
        //create the particles geometry
        var geometry:BufferGeometry = new BufferGeometry();
        geometry.addAttribute( 'position',  new BufferAttribute( vertices, 3 ) );
		geometry.addAttribute( 'aOffset', new BufferAttribute( aOffsets, 2 ) );//koko
		//geometry.addAttribute( 'life',  new BufferAttribute( life, 1 ) );
		//geometry.addAttribute( 'life', new BufferAttribute( life, 1 ) );
			
		return geometry;
	}
	
	public function getIconPos(index:Int):Vector2 {
		
		index = index % 845;
		var xx:Int = (index) % animationFrameLength;
		var yy:Int = animationFrameLength - 1 - Math.floor( index / animationFrameLength );		
		
		return new Vector2(xx / animationFrameLength, yy / animationFrameLength);
	}		
	
	/**
	 * update
	 */
	public function update(audio:MyAudio, render:WebGLRenderer):Void {
		
		_simuShaderMat.update( audio );
		//_renderShaderMat.uniforms.timer.value += 0.01;
		//_renderGeo.attributes.life += 0.01;
        //フレームごとにrtt,rtt2を入れ替え
        if(_flag){
            render.render( _simScene, _simCam, _posRttA, true );//simuShader wo keisan _posRttA wo tsukuru
            _renderShaderMat.uniforms.positions.value = _posRttA;//posRttB wo tsukatte ugokasu
            _simuShaderMat.uniforms.texture.value = _posRttA;//next
        }else{
            render.render( _simScene, _simCam, _posRttB, true );//simuShader wo keisan _posRttB wo tsukuru
            _renderShaderMat.uniforms.positions.value = _posRttB;//posRttB wo tsukatte ugokasu			
            _simuShaderMat.uniforms.texture.value = _posRttB;//posRttB wo tsugi no keisan he
        }
        _flag = !_flag;		
		
	}

	public function getMesh():Mesh {
		return _mesh;
	}
	
	public function getLine():Line
	{
		return _line;
	}
	
	public function getParticles():Points
	{
		return _particles;
	}
}