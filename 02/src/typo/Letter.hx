package typo;
import createjs.easeljs.Container;
import createjs.easeljs.Graphics;
import createjs.easeljs.Point;
import createjs.easeljs.Shape;
import js.Browser;
import js.html.svg.Number;
import net.badimon.five3D.typography.HelveticaMedium;

/**
 * ...
 * @author nab
 */
class Letter extends Container
{
	var _allPoints:Array<Point>;
	
	var _currentPoints:Array<Point>;
	var _currentIndex:Int = 0;
	
	var _count:Int = 0;
	var shape:Shape;
	var mojiAlpha:Float = 0.96;
	var _rad:Float = 0;
	var _total:Int = 0;
	var _old:Float=0;
	var _main:Main;
	public var isColor:Bool = false;
	public var A:Float = 110;
	
	public function new(m:Main) 
	{_main = m;super();
	}

	public function init(allPoints:Array<Array<Point>>):Void {//_count = Math.floor( 100 * Math.random() );_rad = Math.random() * 2 * Math.PI;_total = 300;_count = 0;_currentIndex = 0;
if(shape==null){	shape = new Shape();	addChild(shape);	shape.graphics.beginStroke(Graphics.getRGB(255, 255, 255, mojiAlpha)).setStrokeStyle(1, 0, 0, 0, true);}_allPoints = [];for (i in 0...allPoints.length) {	for (j in 0...allPoints[i].length) {		_allPoints.push(allPoints[i][j]);	}}//randmize/*var len:Int = Math.floor(_allPoints.length / 8);for (i in 0...len) {	var idx1:Int = Math.floor(Math.random() * _allPoints.length);	var idx2:Int = Math.floor(Math.random() * _allPoints.length);	var tmp = _allPoints[idx1];	_allPoints[idx1] = _allPoints[idx2];	_allPoints[idx2] = tmp;}*/isColor = !isColor;mojiAlpha = isColor ? 0.3 : 0.3;Browser.document.body.style.backgroundColor = (isColor) ? "#000000" : "#ffffff";
	}
	
	public function start() 
	{_count = 0;/*_count = 0;_rad = Math.random() * 2 * Math.PI;isColor = !isColor;Browser.document.body.style.backgroundColor = (isColor) ? "#888888" : "#ffffff";*/
	}

	
	
	public function update():Void {//if (_currentIndex >= _allPoints.length) return;trace(Date.now().getTime());var sec:Float = ( Date.now().getTime() / 1000 ) % 60;var rr:Float = sec / 60;
//if ( Math.abs( _old - sec ) > 55) _main.reset();trace(sec);_old = sec;
_currentIndex = Math.floor( _allPoints.length * rr);var pp:Point = _allPoints[_currentIndex];	var sx:Float = pp.x;var sy:Float = pp.y;var ex:Float = StageRef.stageWidth / 2 + 500 * Math.cos(rr * 2 * Math.PI - Math.PI / 2);var ey:Float = StageRef.stageHeight / 2 + 500 * Math.sin(rr * 2 * Math.PI - Math.PI / 2);
shape.graphics.moveTo(	ex,ey);						shape.graphics.lineTo(	sx, sy );
_total++;shape.compositeOperation = (isColor) ? "darker" : "normal";//darker
	}
	

	public function clear() 
	{shape.graphics.clear();//_total = 0;//_count = 0;//_currentIndex = 0;if (!isColor){	shape.graphics.beginStroke(Graphics.getRGB(0,0,0, mojiAlpha));}else {	shape.graphics.beginStroke(Graphics.getRGB(255,255,255, mojiAlpha));}
	}
	
	
}