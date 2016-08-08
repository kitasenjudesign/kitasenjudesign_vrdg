package planes;
import data.TextureData;
import emoji.EmojiSingleShader;
import emoji.EmojiSpritePos;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class IconGenerator extends Object3D
{
	public static var MAX:Int = 10;

	public var icons:Array<ImgPlane>;
	public var currentIcons:Array<ImgPlane>;
	
	public function new() 
	{
		super();
	}
	
	/**
	 * init
	 */
	public function init():Void {
	
		//最初に１０個作る
		icons = [];
		currentIcons = [];
		for (i in 0...MAX) {
			var p:ImgPlane = new ImgPlane();
			p.scale.set(0.1, 0.1, 0.1);
			p.init(null);
			add(p);
			icons.push(p);
		}
		
	}
	
	public function reset():Void {
	
		var num:Int = 3;
		var ran:Float = Math.random();
		var isRandom:Bool = false;
		if (ran < 0.1) {
			num = 2;
		}else if (ran < 0.2) {
			num = 1;
			isRandom = false;
		}else if (ran < 0.22) {
			num = 15;
			isRandom = true;
		}
		
		for ( i in 0...icons.length) {
			icons[i].visible = false;
		}
		
		currentIcons = [];
		for (i in 0...num) {
			icons[i].visible = true;
			icons[i].setIcon( Math.floor( TextureData.emo128.xnum * Math.random() ) );
			
			if (num == 1) {
				icons[i].position.x = 0;
				icons[i].position.y = 0;	
				
			}else if (num==2) {
				icons[0].position.x = -300;
				icons[0].position.y = 0;	
				icons[1].position.x = 300;
				icons[1].position.y = 0;	
				
			}else if (!isRandom) {
				icons[i].position.x = (i / (num - 1) - 0.5) * 500;
				icons[i].position.y = 0;				
			}else {
				icons[i].position.x = 400 * (Math.random() - 0.5);
				icons[i].position.y = 300 * (Math.random() - 0.5);				
			}
			
			currentIcons.push(icons[i]);
		}
		
		
	}
	
	public function getRandom():ImgPlane
	{
		
		if (currentIcons.length == 0) {
			return null;
		}
		
		return currentIcons[Math.floor(Math.random() * currentIcons.length)];
		
	}
	
	
}