package dede;
import common.ExVector3;
import three.BoxGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
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
class DeDeDigit extends Object3D
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
	private var _vertexCounter:Int = 0;
	
	private var _dots:Array<Array<ExVector3>>;
	private var _sec:Float = 0;
	
	var _isLine:Bool = true;// line の　visible
	var _random:Bool = false;
	var _renzoku:Bool = false;
	
	public var power:Float = 0;// 0.004;
	public var outline:Object3D;
	var _space:Float = 10;
	var _numDots:Int = 0;
	var _factory:Array<ExVector3>;
	var _moji:String = "";
	var _font:Int;
	public var isRotate:Bool = false;
	private var isFirst:Bool = true;
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
	
		//var m:Mesh = new Mesh(new BoxGeometry(10, 10, 10), new MeshBasicMaterial( { color:0xff0000 } ));
		//add(m);
	}
	
	//nankai yondemo ii
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
		_font = font;
		_space = space;
		
		//trace("==init2");
		_strokes = StrokeUtil.getStrokes(str, scale, _font);

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
		//if (_moji != str) {
			if (outline != null) {
				remove(outline);
			}
			outline = BeyondCodeGeo.getMesh(str,_font);
			outline.position.z = 1;
			
			add(outline);
		//}
		
		_moji = str;
		update(2);
	}
	
	
	
	
	/**
	 * 
	 * @param	tp
	 */
	public function setType(tp:Int,isRot:Bool):Void {
	
		isRotate = isRot;
		
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
	public function setSec(rr:Float,boost:Bool=false):Void {
		
		_sec = rr % 1;
		//_counter = 0;// 0.1;
		
		var len:Int = _factory.length;
		for (i in 0...len) {
			//_factory[i].r = 0;
		}
		if (boost) {
			if (_sec > 0.5) {
				_counter += _rotSpeed * 100;
			}else {
				_counter -= _rotSpeed * 100;	
			}
		}			
		
		//_vx = 0;
		//_vy = 0;
		//_vz = 0;
		/*
		if(boost){
			_counter += _rotSpeed * 140;
		}
		
		_vx += 1 * ( Math.random() - 0.5 );
		_vy += 1 * ( Math.random() - 0.5 );
		_vz += 1 * ( Math.random() - 0.5 );		
		*/
		//isRotate = Math.random() < 0.5 ? true : false;
		
	}
	
	public function addSec(rr:Float, boost:Bool):Void {
		
		_sec += rr;
		_sec = Math.abs(_sec) % 1;
		if (boost) {
			if (_sec > 0.5) {
				_counter += _rotSpeed * 100;				
			}else{
				_counter -= _rotSpeed * 100;
			}
		}		
		
		_vx += 1 * ( Math.random() - 0.5 );
		_vy += 1 * ( Math.random() - 0.5 );
		_vz += 1 * ( Math.random() - 0.5 );
		
	}
	
	public function setRotate(b:Bool):Void {
		isRotate = b;
	}
	
	/**
	 * 
	 * @param	sec 0-59.999
	 */
	public function update(speed:Float):Void {

		if( isRotate ){
			
			this.rotation.x += _vx;// 0.012;
			this.rotation.y += _vy;// 0.015;
			this.rotation.z += _vz;// 0.018;
			this.rotation.x = this.rotation.x % (Math.PI * 2);
			this.rotation.y = this.rotation.y % (Math.PI * 2);
			this.rotation.z = this.rotation.z % (Math.PI * 2);
			
			
		}else {
			
			this.rotation.x += ( 0 -this.rotation.x) / 6;
			this.rotation.y += ( 0 -this.rotation.y) / 6;
			this.rotation.z += ( 0 -this.rotation.z) / 6;			
			
		}
			_vx *= 0.93;
			_vy *= 0.93;
			_vz *= 0.93;

			
		var rr:Float = _sec*2;//0-1
		
		//0.5を頂点にする
		var d:Float = 1;
		if (rr > 1) {
			rr = 1 - rr / 2;
			d = 1;
		}else{
			rr = rr / 2;
			d = -1;			
		}
		_counter += _rotSpeed * d;
		
		
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
				
					//local
					var v:Vector3 = new Vector3(pp.x * 2, -pp.y * 2, 0);
					var isMtx:Bool = false;
					
					if ( isMtx ) {
						
						var gp:Vector3 = this.localToWorld(v);
						mm.x = gp.x;
						mm.y = gp.y;
						mm.z = gp.z;
						
					}else{
						v.applyQuaternion( this.quaternion );
						
						//global
						var tx:Float = v.x + this.position.x + this.parent.position.x; 
						var ty:Float = v.y + this.position.y + this.parent.position.y;
						
						mm.x = tx;
						mm.y = ty;
						mm.z = 0 + v.z;
						
					}
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
			DeDeDigitLine.update(_dots);
		}else if (_random) {
			DeDeDigitLine.update(_dots,true);			
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