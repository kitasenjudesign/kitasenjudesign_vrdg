package emoji;
import js.html.Float32Array;
import three.BufferAttribute;
import three.BufferGeometry;
import three.Geometry;
import three.Mesh;
import three.Object3D;
import three.Points;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class Emoji extends Object3D
{

	public static inline var NUM:Int = 700;
	
	private var _points		:Points;
	private var _emojiMat	:EmojiShader;
	private var _emoji		:Points;
	private var _width		:Int = 32;	
	private var _height		:Int = 32;
	var animationFrameLength:Int = 32;
	
	public function new() 
	{
		super();
	}
	
	public function init():Void {
		
        var l:Int = (_width * _height );
        var vertices:Float32Array = new Float32Array( l * 3 );
        for ( i in 0...l) {
            var i3:Int = i * 3;
            vertices[ i3 ] = 300 * (Math.random() -0.5);
            vertices[ i3 + 1 ] = 300 * (Math.random() -0.5);
			vertices[ i3 + 2 ] = 300 * (Math.random() -0.5);
			
        }
		
		var aOffsets:Float32Array = new Float32Array( l * 2 );
        for ( i in 0...l) {
            var i2:Int = i * 2;
			var pos:Vector2 = getIconPos(Math.floor(Math.random() * 700));
            aOffsets[ i2 ] = pos.x;
            aOffsets[ i2 + 1 ] = pos.y;
        }

        //create the particles geometry
        var geometry:BufferGeometry = new BufferGeometry();
        geometry.addAttribute( 'position',  new BufferAttribute( vertices, 3 ) );
		geometry.addAttribute( 'aOffset', new BufferAttribute( aOffsets, 2 ) );
		
		_emojiMat = new EmojiShader();
		_emoji = new Points(cast geometry, _emojiMat);
		add(_emoji);
		
	}
	
	
	public function getIconPos(index:Int):Vector2 {
		
		/*
		endIndex = startIndex + range;
		
		var ratio:Float = light / 255;
		var num:Int = endIndex - startIndex;
		var no:Int = Math.floor( (endIndex - startIndex) * ratio + Math.floor(counter) );
		no = no % num;
		var index:Int = Math.floor( startIndex + no );
		*/
		index = index % Emoji.NUM;
		//counter++;
		
		var xx:Int = (index) % animationFrameLength;
		var yy:Int = animationFrameLength - 1 - Math.floor( index / animationFrameLength );		
		
		return new Vector2(xx / animationFrameLength, yy / animationFrameLength);
	}	
	
	
	public function update():Void {
		
		_emojiMat.update();
		
	}
	
}