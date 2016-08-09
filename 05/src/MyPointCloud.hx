package;
import clock.DotDigit;
import common.Dat;
import common.ExVector3;
import three.Geometry;
import three.LineBasicMaterial;
import three.LineSegments;
import three.Object3D;
import three.PointCloud;
import three.PointCloudMaterial;
import three.Vector3;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author watanabe
 */
class MyPointCloud extends Object3D
{
	
	public static inline var GEO_MAX:Int = 15000;//100*

	private var _count:Int = 0;
	private var _countL:Int = 0;
	private var _mat:PointCloudMaterial;
	private var _isRandom:Bool = false;
	private var _lineMat:LineBasicMaterial;
	var _twn:TweenMaxHaxe;
	
	public var _cloud:PointCloud;
	public var _line:LineSegments;
	public var _offsetIndex:Int = 0;
	public static var cloud:MyPointCloud;
	
	
	public function new() 
	{
		super();
	}
	
	public function init():Void {
		
		cloud = this;
		
		_mat = new PointCloudMaterial(
			//{ /*transparent:true,*/ color:0xffffff, size:15, map:ImageUtils.loadTexture("dotA.png") }
			{ /*transparent:true,*/ color:0xffffff, size:15}
		);
		_mat.size = Dat.bg ? 10 : 15;
		
		//_mat.blending = Three.AdditiveBlending;
		_mat.depthTest = false;
		//_mat.vertexColors = true;// Three.VertexColors;
		
		var g1:Geometry = new Geometry();
		for(i in 0...GEO_MAX){
			var v:ExVector3 = new ExVector3(0, 0, 0);
			v.rIndex = Math.floor(i+100 * Math.random()) % GEO_MAX;
			v.r = 1;
			v.z = DotDigit.Z_MAX;
			g1.vertices.push(v);
			//g1.colors.push(new Color(Math.floor(Math.random()*0xffffff)));
		}
		
		var g2:Geometry = new Geometry();
		for (i in 0...GEO_MAX * 2) {
			g2.vertices.push(new Vector3());
			//g2.colors.push(new Color(Math.floor(Math.random()*0xffffff)));
		}
		
		_count = -1;
		_countL = -2;
		
		_cloud = new PointCloud(g1, _mat);
		_cloud.renderOrder = 10;
		add(_cloud);

		_lineMat = new LineBasicMaterial( { 
			color:0xffffff, //transparent:true, opacity:0.9//, vertexColors: Three.VertexColors
		} );
		_lineMat.linewidth = 1;
		
		_line = new LineSegments(g2,_lineMat );
		_line.frustumCulled = false;
		_cloud.renderOrder = 9;
		_line.position.z = 0.5;
		add(_line);
		
		//_line = new Line(g, new LineBasicMaterial({color:0xff0000}));
		//add(_line);
		
		//_cloud.position.z = -100;
		
		Dat.gui.add(this, "_offsetIndex", 0, 10000).listen();
		Dat.gui.add(this, "changeOffsetIndex");
		
	}
	
	
	
	public function getNextPoint():ExVector3 {
		_count++;
		return cast _cloud.geometry.vertices[_count%GEO_MAX];		
	}
	
	/**
	 * 
	 * @return
	 */
	public function getNextLine():Array<Vector3> {
		_countL += 2;
		return [
			_line.geometry.vertices[ _countL % (GEO_MAX * 2) ],
			_line.geometry.vertices[ (_countL+1) % (GEO_MAX * 2) ],
		];
		
	}

		
	
	/*
	public function randomV():Void {
		for (i in 0..._cloud.geometry.vertices.length) {
			//_cloud.geometry.vertices[i].y = -Main.H;
			var v:ExVector3 = cast _cloud.geometry.vertices[i];
			v.vx = 30 * (Math.random() - 0.5);
			v.vy = 30 * (Math.random() - 0.5);
		}
	}*/
	
	/**
	 * update
	 */
	public function update():Void
	{
		//reset();
		_mat.color = MyColor.getColor();// new Color(Math.floor(Math.random() * 0xffffff));		
		reset();
	}

	
	public function reset():Void {
		
		_count = -1;
		_countL = -2;
		_cloud.geometry.verticesNeedUpdate = true;	
		_line.geometry.verticesNeedUpdate = true;
		var len1:Int = _cloud.geometry.vertices.length;
		var len2:Int = _line.geometry.vertices.length;
		
		for (i in 0...len1) {
			var v:ExVector3 = cast _cloud.geometry.vertices[i];
			
			v.z = DotDigit.Z_MAX;
			v.enabled = false;
		}
		for (i in 0...len2) {
			var v:ExVector3 = cast _line.geometry.vertices[i];
			v.z = DotDigit.Z_MAX;
			//v.enabled = false;
			//v.enabled = false;
		}
		
	}	
	
	
	public function setRandom(b:Bool):Void {
		_isRandom = b;
		if (_isRandom) {
			_lineMat.opacity = 1;// 0.9;
			_lineMat.transparent = true;			
		}else {
			_lineMat.opacity = 1;
			_lineMat.transparent = false;
		}
		
		_offsetIndex = 50;// 2;// GEO_MAX;// Math.floor( 1000 * Math.random() );
		
		/*
		TweenMax.to(this, 1, {
			ease:Cubic.easeOut,
			_offsetIndex:2
		});*/
		
	}
	
	//
	public function changeOffsetIndex():Void {
		
		_offsetIndex = Math.floor( 1000 * Math.random() );
		
	}
	
	
	
	/**
	 * _isRandom=trueだとこれが炸裂する
	 */
	public function connectRandomLine():Void {
		
		if (!_isRandom) return;
		
		var len1:Int = _cloud.geometry.vertices.length;
		var okDots:Array<ExVector3> = [];
		for (i in 0...len1) {
			var v:ExVector3 = cast _cloud.geometry.vertices[i];
			v.connect = false;
			if (v.enabled) {
				okDots.push(v);
			}
		}
		
		var index2:Int = Math.floor(Math.random() * 6000);
		for (i in 0...okDots.length) {
			var lines:Array<Vector3> = getNextLine();
			
			var cnt:Int = 0;
			while(true){
				var dot1:ExVector3 = okDots[ i ];
				//var dot2:ExVector3 = okDots[ Math.floor(okDots.length*Math.random()) ];
				var dot2:ExVector3 = okDots[ (i+(cnt+1))%okDots.length ];
				
				// okDots[ okDots[i].rIndex % okDots.length ];
				var nn:Float = dot1.distanceTo(dot2);
				if (!dot1.connect && !dot2.connect && nn < 600 && nn>100) {
					dot1.connect = true;
					dot2.connect = true;
					lines[0].copy( dot1 );
					lines[1].copy( dot2 );
					break;
				}
				
				if (cnt++ > 8) break;
			}
			
			
			/*
			var vv:ExVector3 = cast _cloud.geometry.vertices[ okDots[i].rIndex ];
			
			if (vv.enabled) {
				lines[0].copy( okDots[i] );
				//lines[0].z = 0;
				lines[1].copy( vv );
				//lines[1].z = 0;			
			}else {
				
				lines[0].copy( okDots[i] );//okDots[(i+33)%okDots.length] );
				//lines[0].z = 0;
				lines[1].copy( okDots[(i+Math.floor(_offsetIndex))%okDots.length] );
				//lines[1].z = 0;
				
			}*/
			
		}
		
	}
	
}