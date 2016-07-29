package utils;
import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Image;
import js.html.ImageData;
import js.html.ImageElement;
import js.html.VideoElement;
import js.JQuery;
import js.JQuery.JqEvent;

/**
 * ビットマップデータみたいに扱うことを想定されたクラス
 * @author nabe
 */
class MyBitmapData
{

	private var _context:CanvasRenderingContext2D;
	private var _imageData:ImageData;

	private var _width:Float;
	private var _height:Float;
	private var _canvas:CanvasElement;
	private var _callback:Void->Void;

	private var _video	:VideoElement;
	private var _img	:ImageElement;
	
	public var visible:Bool = true;
	
	public function new() 
	{
	}
	
	
	public function draw():Void {
		
	}
	
	/**
	 * MyBitmapData
	 */
	public function initB(video:VideoElement,ww:Float,hh:Float,img:ImageElement=null):Void {

		if(_canvas==null){
			_canvas = Browser.document.createCanvasElement();// == 
			_canvas.id = "bitmap";		
			_context = _canvas.getContext2d();
			
			_video = video;
			_width = ww;
			_height = hh;
			_canvas.width = cast _width;
			_canvas.height = cast _height;
			//ここでおおきさ
			_img = img;
			if (_img != null ) {
				//画像
				_context.drawImage(_img, 0, 0, _img.width, _img.height, 0, 0, _width, _height);				
			}else {
				//ビデオ				
				_context.drawImage(video, 0, 0, video.videoHeight, video.videoHeight, 0, 0, _width, _height);
			}
			
			_imageData = _context.getImageData(0, 0, _width, _height);
			
		}
	}
	
	//ビデオをdrawする
	public function drawVideo(ww:Float,hh:Float):Void {

		if( _video != null){
			_context.drawImage( _video, 0, 0, _video.videoHeight, _video.videoHeight, 0, 0, ww, hh);
		}else {
			_context.drawImage( _img, 0, 0, _img.width, _img.height, 0, 0, ww, hh);			
		}
		
		_imageData = _context.getImageData(0, 0, ww, hh);

	}
	
	
	
	public function updateImageData():Void {
		
		if(_context!=null){
			_imageData = _context.getImageData(0, 0, _width, _height);
		}
	}
	
	
	public function setPixel(color:Int, x:Int, y:Int):Void {
		
		var r:Int = (color & 0xff0000) >> 16;
		var g:Int = (color & 0x00ff00) >> 8;
		var b:Int = (color & 0x0000ff);
		var a:Int = (color & 0xff000000) >> 24;
		
		//trace("setPixel32");
		var index:Int = cast ((_width * y) + x) * 4;
		_imageData.data[index] = r;
		_imageData.data[index + 1] = g;
		_imageData.data[index + 2] = b;
		_imageData.data[index + 3] = a;
    
	}
	
	/**
	 * 
	 * @param	x
	 * @param	y
	 * @return
	 */
	public function getPixel(x:Int, y:Int, ww:Int):Float {
		
		//trace("getPixel32");
		var index:Int = cast ( x + y * ww ) * 4;
	
		var r:Int = _imageData.data[ index ];
		var g:Int = _imageData.data[ index + 1 ];
		var b:Int = _imageData.data[ index + 2 ];
		var a:Int = _imageData.data[ index + 3 ];
		
		return (r + g + b) / 3;
		
	}
	
	
	
	public function show():Void {
		visible = true;
		//new JQuery("#bitmap").show();
	}
	
	public function hide():Void {
		visible = false;
		//new JQuery("#bitmap").hide();
	}
	
	public function getCanvas():CanvasElement {
		return _canvas;
	}
	
	public function kill() 
	{
		
	}
	
	
	
}