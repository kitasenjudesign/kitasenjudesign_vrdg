package objects.data;
import effect.PostProcessing2;

/**
 * ...
 * @author watanabe
 */
class EffectData
{

	
	public static inline var COLOR_NONE:Int = 0;
	public static inline var COLOR_GRADE:Int = 1;
	public static inline var COLOR_MONO:Int = 2;
	
	public static inline var DISPLACE_NONE:Int = 0;
	public static inline var DISPLACE_X:Int = 1;
	public static inline var DISPLACE_MAP:Int = 2;// tate ni
	
	public var colorType:Int = 0;
	public var displaceType:Int = 0;
	public var strength:Float = 1;
	public var name:String = "";
	public var wireframe:Bool = false;
	
	// 5 shurui
	public static var EFFECT_NORMAL:EffectData = new EffectData( {
		name:"EFFECT_NORMAL",
		colorType:COLOR_NONE,
		displaceType:DISPLACE_NONE,
		strength:1,
		wireframe:false
	});
	public static var EFFECT_MONO:EffectData = new EffectData( {
		name:"EFFECT_MONO",
		colorType:COLOR_MONO,
		displaceType:DISPLACE_NONE,
		strength:1,
		wireframe:false		
	});
	public static var EFFECT_DISPLACE_X:EffectData = new EffectData( {
		name:"EFFECT_DISPLACE_X",
		colorType:COLOR_NONE,
		displaceType:DISPLACE_X,
		strength:0.3,
		wireframe:false		
	});
	public static var EFFECT_DISPLACE_MAP:EffectData = new EffectData( {
		name:"EFFECT_DISPLACE_MAP",
		colorType:COLOR_NONE,
		displaceType:DISPLACE_MAP,
		strength:0.8,
		wireframe:false		
	});
	public static var EFFECT_COLOR:EffectData = new EffectData( {
		name:"EFFECT_COLOR",
		colorType:COLOR_GRADE,
		displaceType:DISPLACE_NONE,
		strength:1,
		wireframe:false		
	});
	
	public static var EFFECT_COLOR_WIRE:EffectData = new EffectData( {
		name:"EFFECT_COLOR_WIRE",
		colorType:COLOR_GRADE,
		displaceType:DISPLACE_NONE,
		strength:1,
		wireframe:true		
	});
	
	
	//
	public static var effects:Array<EffectData> = [
	
		EFFECT_NORMAL,
		EFFECT_DISPLACE_X,
		EFFECT_DISPLACE_MAP//,

		//EFFECT_COLOR,
		//EFFECT_MONO,
	];
	
	
	private static var _count:Int = -1;
	
	
	public static function getNext():EffectData {
		_count++;
		_count = _count % effects.length;
		return effects[_count];
		//return EFFECT_COLOR;
	}
	
	public static function getPrev():EffectData {
		_count--;
		if (_count < 0)_count = effects.length - 1;
		return effects[_count];
		
	}
	
	/**
	 * kokowoyaru
	 * @param	o
	 */
	public function new(o:Dynamic) 
	{
		if (o != null) {
			
			name = o.name;
			colorType = o.colorType;
			displaceType = o.displaceType;
			strength = o.strength;		
			wireframe = o.wireframe;
		}
		
	}
	
}