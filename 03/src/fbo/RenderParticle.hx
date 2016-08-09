package fbo;
import emoji.Emoji;
import js.html.Float32Array;
import three.BufferAttribute;
import three.BufferGeometry;
import three.Points;
import three.Vector2;

/**
 * ...
 * @author watanabe
 */
class RenderParticle extends Points
{
	
	private var _renderShaderMat:RenderShaderMat;
	private var _particleGeo:BufferGeometry;
	private var _width:Int;
	private var _height:Int;
	public function new(ww:Int, hh:Int) 
	{
		_width = ww;
		_height = hh;
		_renderShaderMat = new RenderShaderMat();
		_particleGeo = _getParticleGeo();
		
        //the rendermaterial is used to render the particles
       // _particles = new Points( cast particleGeo, _renderShaderMat );
        //_line = new Line( cast particleGeo, _renderShaderMat );
        //_mesh = new Mesh( cast particleGeo, _renderShaderMat );

		super(cast _particleGeo, _renderShaderMat);
		
		this.sortParticles = true;
		
	}
	
	private function _getParticleGeo():BufferGeometry
	{
        var l:Int = (_width * _height );
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
			var pos:Vector2 = _getIconPos(Math.floor(Math.random() * Emoji.NUM));
            aOffsets[ i2 ] = pos.x;
            aOffsets[ i2 + 1 ] = pos.y;
        }
		
		var life:Float32Array = new Float32Array( l );
         for ( i in 0...l) {
            life[ i ] = Math.random();
        }
		
		var rand:Float32Array = new Float32Array( l );
         for ( i in 0...l) {
            rand[ i ] = Math.random();
        }
		
        //create the particles geometry
        var geometry:BufferGeometry = new BufferGeometry();
        geometry.addAttribute( 'position',  new BufferAttribute( vertices, 3 ) );
		geometry.addAttribute( 'aOffset', new BufferAttribute( aOffsets, 2 ) );
		geometry.addAttribute( 'rand', new BufferAttribute( rand, 1 ) );
			
		return geometry;
		
	}
	
	
	public function updateIconPos(idx:Int,isRandom:Bool=false):Void {
		
		_particleGeo.attributes.aOffset.needsUpdate = true;
		var ary:Array<Dynamic> = _particleGeo.attributes.aOffset.array;
		
		var l:Int = _width * _height;
		for ( i in 0...l) {
            var i2:Int = i * 2;
			var pos:Vector2 = (isRandom) ? _getIconPos(Math.floor(Math.random()*Emoji.NUM)) : _getIconPos(idx);
			ary[ i2 ] = pos.x;
			ary[ i2 + 1 ] = pos.y;
        }
		
	}
	
	
	
	private function _getIconPos(index:Int):Vector2 {
		
		var nn:Int = RenderShaderMat.animationFrameLength;
		index = index % Emoji.NUM;
		var xx:Int = (index) % nn;
		var yy:Int = nn - 1 - Math.floor( index / nn );		
		
		return new Vector2(xx / nn, yy / nn);
	}			
	
	public function getGeometry():BufferGeometry {
		return _particleGeo;
	}
	public function getMaterial():RenderShaderMat {
		return _renderShaderMat;
	}
	
}