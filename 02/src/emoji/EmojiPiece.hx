package emoji;
import three.ImageUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneGeometry;
import three.Texture;
import three.Vector2;

/**
 * ...
 * @author nabe
 */
class EmojiPiece extends Mesh
{

	private var _geo:PlaneGeometry;
	private var _mat:MeshBasicMaterial;
	private var _texture:Texture;
	private	var animationFrameLength:Int=32;
	private var EMOJI_MAX:Int = 845;
	private var _count:Float=0;

	public function new() 
	{
		_texture = ImageUtils.loadTexture("./emo2048.png");
		_texture.minFilter = Three.NearestFilter;
		_texture.magFilter = Three.NearestFilter;
		_geo = new PlaneGeometry(80, 80, 1, 1);
		_mat = new MeshBasicMaterial( { map:_texture,side:Three.DoubleSide,shading:Three.FlatShading } );
		
		super(_geo, _mat);
		updateEmoji();
	}
	
	
	
	
	public function updateEmoji():Void {
		
		var vv:Vector2 = _getIconPos(Math.floor(_count)%700);
		_count+=0.4;
		
		_texture.offset.x = vv.x;//正規化した位置
		_texture.offset.y = vv.y;
		_texture.repeat.x = 1 / animationFrameLength;//正規化した幅
		_texture.repeat.y = 1 / animationFrameLength;
		
	}
	
	
	
	private function _getIconPos(index:Int):Vector2 {
		//var index:Int = Math.floor( light * 2.3 );
		//index = index + Math.floor(counter);
		//index = index % Math.floor( 255 * 2.3 );
		
		var xx:Int = (index) % animationFrameLength;
		var yy:Int = (animationFrameLength - 1) - Math.floor( index / animationFrameLength );		
		
		
		return new Vector2(xx / animationFrameLength, yy / animationFrameLength);
	}
	
}