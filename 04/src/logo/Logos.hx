package logo;
import js.Browser;
import logo.LogoParam;
import three.ImageUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import three.Texture;
import three.Vector3;
import tween.easing.Cubic;
import tween.TweenMax;

/**
 * ...
 * @author watanabe
 */
class Logos {
	

	private static var _logos:Array<LogoData>;
	private static var _texture:Texture;

	public function new() 
	{
		
	}
	
	
	public static function init(callback:Void->Void):Void {
		
		_texture = ImageUtils.loadTexture("sheet/sheet1.png", null, callback);
		
	}
	
	
	public static function init2():Void{
		
		var param:Dynamic = LogoParam.getParam();
		var ww:Float = param.meta.size.w;
		var hh:Float = param.meta.size.h;
		
		var maker:LogoMaterialMaker = new LogoMaterialMaker();
		maker.init( param.frames, _texture, ww, hh );
		//add(logo);
		
		_logos = [];
		for (i in 0...param.frames.length) {
			
			var data:LogoData = maker.getData( i );
			_logos.push(data);
			
		}
		
		//Browser.window.alert("num -> " + _logos.length);
	}

	
	
	public static function getBaseTexture():Texture {
		return _texture;
	}
	
	public static function getRandom():LogoData {
		
		return _logos[ 0 ];// Math.floor(Math.random() * _logos.length) ];
		
	}

	/*
	public static function getRandom2(isWhite:Bool):LogoData {
		
		if (isWhite) {
			return _logos[ Math.floor(Math.random() * _logos.length/2 + _logos.length/2) ];
		}
		
		return _logos[ Math.floor(Math.random() * _logos.length/2) ];
		
	}*/
	
	
	public static function getTextureByName(s:String):LogoData {
		
		for (i in 0..._logos.length) {
			if ( _logos[i].filename == s ) {
				return _logos[i];
			}
		}

		return null;
	}
	
	public static function getTexture(idx:Int):LogoData {
		return _logos[idx];
	}
	
	
	public static function getLength():Int {
		return _logos.length;
	}
	
	
	
	
	
}