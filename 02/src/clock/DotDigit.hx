package clock;
import js.Browser;
import three.BoxGeometry;
import three.Geometry;
import three.ImageUtils;
import three.Line;
import three.LineBasicMaterial;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.ParticleBasicMaterial;
import three.PointCloud;
import three.PointCloudMaterial;
import three.Sprite;
import three.SpriteMaterial;
import three.Vector2;
import three.Vector3;
import typo.Stroke;
/**
 * ...
 * @author nabe
 */
class DotDigit extends Object3D
{

	
	var GEO_MAX:Int = 100 * 3;
	var Z_MAX:Int = 1000;
	
	private var _strokes	:Array<Stroke>;
	private var _clouds	:Array<PointCloud>;
	private static var _mat:PointCloudMaterial;
	var _counter:Float = 100;
	var _counter2:Int = 0;
	var _speed:Float = 0.001;
	var _vertexCounter:Int = 0;
	var _cloud:PointCloud;
	var lines:Array<Line>;
	var _dots:Array<Array<ExVector3>>;
	var _sec:Int = 0;
	
	var _visible:Bool = true;// line の　visible
	var _renzoku:Bool = false;
	
	var outline:Line;
	static var lineMate:LineBasicMaterial;
	
	
	
	public function new() 
	{super();//_visible = Math.random() < 0.5 ? true : false;//var cube:Mesh = new Mesh(new BoxGeometry(10, 10, 10), new MeshBasicMaterial( { color:0xff0000 } ));//add(cube);
	}
	
	/**
	 * 
	 * @param	strokes
	 */
	public function init():Void {
	if (_mat == null) {	_mat = new PointCloudMaterial( { color:0xffffff, size:35, map:ImageUtils.loadTexture("dot.png") } );	_mat.depthTest = false;}else {	} var mat:PointCloudMaterial = _mat; var g:Geometry = new Geometry();for(i in 0...GEO_MAX){	var v:ExVector3 = new ExVector3(0, 0, 0);	v.r = 1;	//v.z = 1000;	g.vertices.push(v);}
_cloud = new PointCloud(g, mat);add(_cloud);
	}
	
	public function init2(strokes:Array<Stroke>,time:String):Void {//trace("==init2");_strokes = strokes;
//分類する_dots = [];for(i in 0..._cloud.geometry.vertices.length){	_cloud.geometry.vertices[i].z = Z_MAX;}var count:Int = 0;for (i in 0..._strokes.length) {	var n:Int = _strokes[i].getNum();		trace("Num=" + n);		_dots[i] = [];		for (j in 0...n) {				var v:ExVector3 = cast _cloud.geometry.vertices[count%GEO_MAX];		v.sr = j / n;		v.r = _counter;		v.enabled = false;		v.z = 0;		count++;		_dots[i].push( v );	}	}if(lines!=null){	for ( i in 0...lines.length) {				var line:Line = lines[i];		line.geometry.dispose();		remove(line);			}}	lines = [];if ( lineMate == null ) {	lineMate = new LineBasicMaterial( { color:0xffffff,linewidth:2 } );}var t:Int = Std.parseInt( time ) % 4;switch(t) {	case 0:		_visible = true;		_renzoku = false;	case 1:		_visible = false;		_renzoku = false;			case 2:		_visible = true;		_renzoku = true;					case 3:		_visible = false;		_renzoku = true;}//_visible = Std.parseInt( time ) % 2 == 0 ? true :false;for ( i in 0..._strokes.length) {		var lineGeo:Geometry = _cloud.geometry.clone();	var line:Line = new Line(lineGeo, lineMate );	line.frustumCulled = false;		if(_visible)add(line);			lines.push(line);}
	}
	
	public function setSec(sec:Int):Void {_sec = sec;if(_sec==0){	//na}else if( _sec < 30 ){	_counter -= 0.1;}else {	_counter += 0.1;			}		
	}
	
	/**
	 * 
	 * @param	sec 0-59.999
	 */
	public function update():Void {var rr:Float = _sec / 60;rr = rr * 2;if (_sec == 0) {	this.visible = false;	_sec = 1;}else {	this.visible = true;}if (rr > 1) {	rr = 1-(rr-1);}_cloud.geometry.verticesNeedUpdate = true;if( _sec < 30 ){	_counter -= 0.002;}else {	_counter += 0.002;			}//trace(rr);//trace("====");for (i in 0..._strokes.length) {//for (i in 0...1) {
		var s:Stroke = _strokes[i];	var dots:Array<ExVector3> = _dots[i];		/*	for ( j in 0...dots.length) {		dots[j].z = Z_MAX;		dots[j].r = 1;	}*/			for (j in 0...dots.length) {								var dotLen:Int = 0;		var maxNum:Int = 0;		if(i!=0){			//外側			dotLen = Math.floor( dots.length * rr );//比率を使っている			maxNum = Math.floor( dots.length * 1 );		}else {			//内側のまるとか			dotLen = _sec;//秒数			if (_sec >= 30) dotLen = 30 - (_sec - 30);			if (dotLen >= dots.length) dotLen = dots.length;						maxNum = dots.length < 30 ? dots.length : 30; 		}								var mm:ExVector3 = dots[j];
		if(j<dotLen && dotLen!=0){			//var ratio:Float = j / dotLen + rr + _counter;			var nn:Int = (_renzoku) ? maxNum : dotLen;			var ratio:Float = j / nn + rr + _counter;						mm.r += (ratio - mm.r) / 4;			var pp:Vector2 = s.getPosition(mm.r % 1);			mm.x += (pp.x * 2 - mm.x) / 2;			mm.y += ( -pp.y * 2 -mm.y) / 2;			mm.z = 0;			mm.enabled = true;					}else{						var ratio:Float = 1 + rr + _counter;			if(_renzoku){				ratio = 0 + rr + _counter;			}						mm.r += (ratio - mm.r) / 4;						var pp:Vector2 = s.getPosition(mm.r % 1);			mm.x += (pp.x * 2 - mm.x) / 2;			mm.y += ( -pp.y * 2 -mm.y) / 2;			mm.z = 0;// Z_MAX;			mm.enabled = true;		}			}	}_updateLine();
	
	}
	
	function _updateLine() 
	{//全部のLineに対して。for( i in 0...lines.length){		var line:Line = lines[i];	line.geometry.verticesNeedUpdate = true;
	var okDots:Array<ExVector3> = [];	var dots:Array<ExVector3> = _dots[i];		for (j in 0...dots.length) {		if( dots[j].enabled ){			okDots.push( dots[j] );		}	}		if(okDots.length>0){		for (j in 0...line.geometry.vertices.length) {						if(j<okDots.length){				line.geometry.vertices[j].copy( okDots[j] );			}else {				line.geometry.vertices[j].copy( okDots[0] );								}					}		line.position.z = 0;	}else {		line.position.z = 0;// Z_MAX;	}	}		
	}
	
	
}