package jp.nabe.utils;
import js.Browser;

/**
 * ...
 * @author nabe
 */
class PCChecker
{

	public function new() 
	{
		
	}
	
	public static function isPC():Bool {
		
		if ((Browser.navigator.userAgent.indexOf('iPhone') > 0 ||
			Browser.navigator.userAgent.indexOf('iPad') > 0) || 
			Browser.navigator.userAgent.indexOf('iPod') > 0 || 
			Browser.navigator.userAgent.indexOf('Android') > 0) {
			//location.href = '/sp/';
			
			return false;
		}
		
		return true;
		
	}
	
	public static function isIE():Bool {
	
		var ua:String = Browser.window.navigator.userAgent.toLowerCase();
		if (ua.indexOf("msie") != -1) {
			return true;
		}
		return false;
	}
	
	public static function isSafari():Bool {
		var ua:String = Browser.window.navigator.userAgent.toLowerCase();
		trace(ua);
		if (ua.indexOf("safari") != -1 && ua.indexOf("chrome")==-1) {
			return true;
		}
		return false;	
		
	}
	
	public static function isFirefox():Bool {
		var ua:String = Browser.window.navigator.userAgent.toLowerCase();
		if (ua.indexOf("firefox") != -1) {
			return true;
		}
		return false;	
		
	}
	
	
}