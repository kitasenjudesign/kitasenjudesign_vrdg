package typo;
import net.badimon.five3D.typography.Typography3D;
import three.Vector2;

/**
 * ...
 * @author nab
 */
class BePoints
{

	public var SPACE:Float = 0.5;// 5;// 3;//5;
	private var _currentX:Float = 0;
	private var _currentY:Float=0;
	private var _points:Array<Array<Vector2>>;
	private var _count:Int = -1;

	public function new() 
	{
	}	
	
	
	public function getStrokes( points:Array<Array<Vector2>> ):Array<Stroke> {var strokes:Array<Stroke> = [];for (i in 0...points.length) {	var s:Stroke = new Stroke();// points[i];	s.init(points[i]);	strokes.push(s);}return strokes;
	}
	
	

	/** * すべてをポイントで分割する * @param	g * @param	moji * @param	isCentering * @param	scale * @param	letter
	*/
	public function getLetterPoints(moji:String,isCentering:Bool = false,scale:Float = 1,letter:Typography3D = null,isLineSplit:Bool = true
	):Array<Array<Vector2>> {
_points = [[]];var motif:Array<Dynamic> = letter.motifs.get(moji);//trace(motif);var ox:Float = 0;var oy:Float = 0;var s:Float = scale;	if (isCentering) {	ox = -letter.widths.get(moji) / 2;	if (moji == "1") {		ox += 5;	}	oy = -letter.getHeight() / 2;}		var len:Int = motif.length;for (i in 0...len){	switch (motif[i][0]){		case "M":			_currentX = s * (motif[i][1][0] + ox);			_currentY = s * (motif[i][1][1] + oy);			_count++;			_points[_count] = [new Vector2(_currentX, _currentY)];			//g.moveTo(_currentX, _currentY);			//break;		case "L":			if(isLineSplit){				lineTo( s * (motif[i][1][0] + ox), s * (motif[i][1][1] + oy));			}else {				_currentX = s * (motif[i][1][0] + ox);				_currentY = s * (motif[i][1][1] + oy);				_points[_count].push( new Vector2(_currentX, _currentY) );				//g.lineTo(_currentX,_currentY);			}			//break;		case "C":			//g.curveTo(s*(motif[i][1][0]+ox), s*(motif[i][1][1]+oy), s*(motif[i][1][2]+ox), s*(motif[i][1][3]+oy));			curveTo(				s * (motif[i][1][0] + ox),				s * (motif[i][1][1] + oy),				s * (motif[i][1][2] + ox),				s * (motif[i][1][3] + oy)			);			//break;		}	}	return _points;}public function lineTo( xx:Float, yy:Float):Void {		//ここに分割処理を入れる	var dx:Float = xx-_currentX;	var dy:Float = yy-_currentY;	var dist:Float = Math.sqrt( dx * dx + dy * dy);	var numBunkatsu:Int = Math.floor( dist / SPACE );	if (numBunkatsu <= 1) numBunkatsu = 1;			for (i in 0...numBunkatsu) {				var rate:Float = i / (numBunkatsu);		var pp:Vector2 = new Vector2(_currentX + rate * dx, _currentY + rate * dy);		//g.lineTo( pp.x, pp.y );		_points[_count].push( pp );			}		_currentX = xx;	_currentY = yy;		}/** * pointに分割する * @param	g * @param	cx * @param	cy * @param	xx * @param	yy */public function curveTo(cx:Float,cy:Float, xx:Float, yy:Float):Void {		var bezje:Be2d = new Be2d( 		new Vector2(_currentX, _currentY),		new Vector2(xx, yy),		new Vector2(cx, cy)	);		//分割数			var len:Float = bezje.getLength();	if (Math.isNaN(len)) {		for( i in 0...10){			_points[_count].push( bezje.f(i / 9) );		}	}else{		var sn:Float = Math.floor(len / SPACE);		if (sn <= 1) sn = 1;		//trace("sn =" + sn +" " + bezje.getLength() + " " + SPACE);		//率差分		var kd:Float = 1.0/sn;		var k:Float = 0;// kd;		var saisho:Bool = false;		//for( var k:Float=kd; k<1.0 ; k+=kd ){		while(k<1.0){				//長さからt値を得る			var t:Float = bezje.length2T( bezje.getLength() * k );			//trace(t);			//プロット			var pp:Vector2 = bezje.f(t);//ポイント			//g.lineTo(pp.x, pp.y);			_points[_count].push( pp );			k += kd;		}	}				_currentX = bezje.f(1).x;	_currentY = bezje.f(1).y;	}		/*public function getPoints():Array{	return _points;}*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}