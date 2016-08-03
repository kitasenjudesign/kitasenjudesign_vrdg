package clock;
import common.ExVector3;
import three.Object3D;
import three.PointCloud;
import three.PointCloudMaterial;
import three.Vector2;
import three.Vector3;
import typo.Stroke;
import typo.StrokeUtil;
/**
 * ...
 * @author nabe
 */
class DotDigit extends Object3D
{
	public static inline var Z_MAX:Int = 3000;

	public static inline var TYPE_DOT_MONOSPACE:Int = 0;	
	public static inline var TYPE_DOT_CONTINUE:Int = 1;
	
	public static inline var TYPE_LINE_MONOSPACE:Int = 2;
	public static inline var TYPE_LINE_CONTINUE:Int = 3;
	
	public static inline var TYPE_RANDOM_MONOSPACE:Int = 4;
	public static inline var TYPE_RANDOM_CONTINUE:Int = 5;
	
	
	public static inline var NUM_TYPE:Int = 4;
	
	private var _geoMax		:Int = 100;
	private var _strokes	:Array<Stroke>;
	private var _clouds	:Array<PointCloud>;
	
	private var _vx:Float = 0;
	private var _vy:Float = 0;
	private var _vz:Float = 0;
	
	private var _rotSpeed:Float = 0.002;
	
	private static var _mat:PointCloudMaterial;
	public var hq:Bool = false;// true;
	private var _counter:Float = 100;
	private var _speed:Float = 0.001;
	private var _vertexCounter:Int = 0;
	//private var lines:DotDigitLine;
	
	private var _dots:Array<Array<ExVector3>>;
	private var _sec:Float = 0;
	
	var _isLine:Bool = true;// line の　visible
	var _random:Bool = false;
	var _renzoku:Bool = false;
	
	public var power:Float = 0;// 0.004;
	var _outline:Object3D;
	var _space:Float = 10;
	var _numDots:Int = 0;
	var _factory:Array<ExVector3>;
	var _moji:String = "";
	var _font:Int = 0;
	//public var isRandom:Bool = false;
	
	
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 * @param	strokes
	 */
	public function init():Void {
	
	}
	
	public function setGeoMax(num:Int):Void {
		_geoMax = num;
		_factory = [];	
		for (i in 0..._geoMax) {
			var v:ExVector3 = MyPointCloud.cloud.getNextPoint();
			v.enabled = false;
			_factory.push( v );
			
		}
	}
	
	/**
	 * setStrokes
	 * @param	strokes
	 */
	public function setStrokes(str:String,scale:Float,space:Float,font:Int):Void {
		
		//BRDG+H
		
		//var m:Mesh = new Mesh(new BoxGeometry(10, 10, 10, 1, 1, 1), new MeshBasicMaterial( { color:0x00ff00 } ));
		//add(m);
		
		_space = space;
		
		//trace("==init2");
		_strokes = StrokeUtil.getStrokes(str, scale, font);

		//分類する
		_dots = [];
		
		_numDots = 0;
		for (i in 0..._strokes.length) {
			var n:Int = _strokes[i].getNum(_space);
			_dots[i] = [];
			
			for (j in 0...n) {
				
				var v:ExVector3 = _factory[_numDots % _factory.length];//cast _cloud.geometry.vertices[count%GEO_MAX];
				v.sr = j / n;
				v.r = _counter;
				v.enabled = false;
				_numDots++;
				_dots[i].push( v );
				
			}
			
		}
		
		if (_numDots >= _geoMax) {
			trace("====koeteru==== ");
		}
	
		
		/////////////////////////////////outline
		if (_moji != str || font!=_font) {
			if (_outline != null) {
				remove(_outline);
			}
			_outline = BeyondCodeGeo.getMesh(str,font);
			_outline.position.z = -1;
			
			add(_outline);
		}
		
		_font = font;
		_moji = str;
		update(2);
	}
	
	
	
	
	/**
	 * 
	 * @param	tp
	 */
	public function setType(tp:Int):Void {
	
		switch(tp) {
			case TYPE_DOT_MONOSPACE:
				//noline_monospace
				_isLine = false;
				_renzoku = false;		
				_random = false;
			case TYPE_DOT_CONTINUE:
				//noline_succession
				_isLine = false;
				_renzoku = true;
				_random = false;
				
			case TYPE_LINE_MONOSPACE:
				//line_monospace
				_isLine = true;
				_renzoku = false;
				_random = false;
			case TYPE_LINE_CONTINUE:
				//line_succession
				_isLine = true;
				_renzoku = true;			
				_random = false;
			
			case TYPE_RANDOM_MONOSPACE:
				_isLine = false;
				_renzoku = false;
				_random = true;

			case TYPE_RANDOM_CONTINUE:
				_isLine = false;
				_renzoku = true;
				_random = true;
				
				
		}
	}
	
	/**
	 * setSpeed
	 * @param	spd
	 */
	public function setSpeed(spd:Float):Void {
		
		_rotSpeed = spd;
		
	}
	
	//set sec ni offset
	
	/**
	 * 
	 * @param	sec 0-1
	 */
	public function setSec(rr:Float,boost:Bool):Void {
		
		_sec = rr % 1;
		if(boost){
			_counter += _rotSpeed * 80;
		}
		/*
		if(_sec==0){
			//na
		}else if( _sec < 30 ){
			_counter -= 0.1;///////counter susumu
		}else {
			_counter += 0.1;//////counter tomaru
		}*/		
		
		_vx += 20 * ( Math.random() - 0.5 );
		_vy += 20 * ( Math.random() - 0.5 );
		_vz += 20 * ( Math.random() - 0.5 );		
		
	}
	
	public function addSec(rr:Float, boost:Bool):Void {
		
		_sec += rr;
		_sec = Math.abs(_sec) % 1;
		if(boost){
			_counter += _rotSpeed * 160;
		}		
		
		_vx += 20 * ( Math.random() - 0.5 );
		_vy += 20 * ( Math.random() - 0.5 );
		_vz += 20 * ( Math.random() - 0.5 );
		
		
	}
	
	/**
	 * 
	 * @param	sec 0-59.999
	 */
	public function update(speed:Float):Void {

		/*
		this.rotation.x += _vx;// 0.012;
		this.rotation.y += _vy;// 0.015;
		this.rotation.z += _vz;// 0.018;
		*/
		
		_vx *= 0.93;
		_vy *= 0.93;
		_vz *= 0.93;
		
		
		var rr:Float = _sec*2;//0-1
		
		//0.5を頂点にする
		if (rr > 1) {
			rr = 1 - rr / 2;
			_speed = -0.001;
		}else {
			rr = rr / 2;
			_speed = 0.001;
			
		}
		
		_counter += _rotSpeed;
		
		
		for (i in 0..._strokes.length) {
		
			var s:Stroke = _strokes[i];
			var dots:Array<ExVector3> = _dots[i];
			
			//stroke1
			var cnt:Int = 0;// = false;
			for (j in 0...dots.length) {
								
				var dotLen:Int = 0;
				var maxNum:Int = 0;
				dotLen = Math.floor( dots.length * rr );//比率を使っている
				maxNum = Math.floor( dots.length * 1 );
			
				
				//mm
				var mm:ExVector3 = dots[j];
				var ratio:Float = 0;
				if(j<dotLen && dotLen!=0){
					//var ratio:Float = j / dotLen + rr + _counter;
					var nn:Int = (_renzoku) ? maxNum : dotLen;
					 ratio = j / nn + rr + _counter;
					 mm.enabled = true;
				}else{
					 ratio = 1 + rr + _counter;
					if(_renzoku){
						ratio = 0 + rr + _counter;
					}
					
					if(cnt++<2){
						mm.enabled = true;
					}else {
						mm.enabled = false;
					}
				}

				var spd2:Float = speed == 1 ? 1 : speed * 3;
				mm.r += (ratio - mm.r) / (spd2);
				
				//base no ichi
				//var pp:Vector2 = s.getPosition(mm.r % 1);
				var pp:Vector2 = hq ? s.getPosition(mm.r % 1) : s.getPositionHS(mm.r % 1);
				
					//pp.x local
					var v:Vector3 = new Vector3(pp.x * 2, -pp.y * 2, 0);
					//v.applyQuaternion( this.quaternion );
					
					var tx:Float = v.x + this.position.x + this.parent.position.x; 
					var ty:Float = v.y + this.position.y + this.parent.position.y;
					
					mm.x = tx;// + mm.ox;//////
					mm.y = ty;// + mm.oy;//////
					mm.z = 0 + v.z;
					//mm.ox *= 0.95;
					//mm.oy *= 0.95;
					
					//test
					//mm.update();
					
					//mm.enabled = true;
					
			}
			
		}
		
		
		//////////////line no koushin
		//_updateLine();
		if(_isLine){
			DotDigitLine.update(_dots);
		}else if (_random) {
			DotDigitLine.update(_dots,true);			
		}
		
	}
	
	/**
	 * reset
	 */
	public function reset():Void {
		
		for ( i in 0..._dots.length) {
			for (j in 0..._dots[i].length) {
				_dots[i][j].z = Z_MAX;
				_dots[i][j].enabled = false;
			}
		}
		
	}
	
	public function setVisible(b:Bool):Void
	{
		//lines.visible = b;
		this.visible = b;
	}

	public function getSec():Float {
		return _sec;
	}
	
	public function getMoji():String {
		return _moji;
	}
	
	
}