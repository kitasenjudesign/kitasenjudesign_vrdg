package canvas.old;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.ImageData;

/**
 * ...
 * @author nabe
 */
class CanvasDataOld
{
	
	private var _context:CanvasRenderingContext2D;
	private var _imageData:ImageData;

	public function new() 
	{
	}
	
	public function init(src:CanvasSrc):Void {
	var canvas:CanvasElement = cast src.getElement();_context = canvas.getContext2d();
	}
	
	
	public function update():Void {
	_imageData = _context.getImageData(0, 0, CanvasSrc.W, CanvasSrc.H);
	}
	
	
	/* 
	 * @param	x
	 * @param	y
	 * @return
	 */
	public function getPixel(x:Int, y:Int):Float {//trace("getPixel32");var index:Int = cast ( x + y * CanvasSrc.W ) * 4;
	var r:Int = _imageData.data[ index ];var g:Int = _imageData.data[ index + 1 ];var b:Int = _imageData.data[ index + 2 ];var a:Int = _imageData.data[ index + 3 ];return (r + g + b) / 3;
	}
	
	
	public function getImageData():ImageData {return _imageData;
	}
	
}