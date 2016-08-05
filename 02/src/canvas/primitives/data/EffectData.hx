package canvas.primitives.data;
import js.Browser;

/**
 * ...
 * @author watanabe
 */
class EffectData
{

	public static inline var BLACK_RANDOM:Int = 0;
	public static inline var BLACK_TRUE:Int = 1;
	public static inline var BLACK_FALSE:Int = 2;
	
	public var pixelType:Int = BLACK_RANDOM;
	public var dynamicScale:Bool = true;
	public var isDepth:Bool = true;
	
	public function new(o:Dynamic) 
	{
		if (o != null) {
			
			if(o.pixelType!=null) 		pixelType 		= o.pixelType;
			if(o.dynamicScale!=null) 	dynamicScale 	= o.dynamicScale;
			if(o.isDepth!=null) 		isDepth 		= o.isDepth;
			
		}
		
	}
	
	public function getIsBlackPixel():Bool
	{
		var out:Bool = false;
		
		//Browser.window.alert("type " + pixelType);
		
		switch(pixelType) {
			case BLACK_RANDOM:
				out = Math.random() < 0.5 ? true : false;
				
			case BLACK_TRUE:
				out = true;
				
			case BLACK_FALSE:
				out = false;
				
			
		}
		
		return out;
	}
	
}