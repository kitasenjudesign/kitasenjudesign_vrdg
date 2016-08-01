package common;
import js.html.Element;
import tween.easing.Power0;
import tween.TweenMax;

/**
 * ...
 * @author watanabe
 */
class FadeSheet
{

	public var opacity:Float = 1;
	public var element:Element;
	
	public function new(ee:Element) 
	{
		element = ee;
	}
	
	public function fadeIn():Void {
		
		element.style.opacity = "0";
		opacity = 0;
		TweenMax.to(this, 1.0, {
			opacity:1,
			delay:0.2,
			ease:Power0.easeInOut,
			onUpdate:_onUpdate
		});
		
	}
	
	private function _onUpdate():Void
	{
		element.style.opacity = "" + opacity;
	}
	
}