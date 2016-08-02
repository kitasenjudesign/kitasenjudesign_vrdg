package typo;
import camera.ExCamera;
import common.Dat;
import common.Key;
import js.Browser;
import sound.MyAudio;
import three.BoxGeometry;
import three.Geometry;
import three.Line;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vector3;
import tween.TweenMax;
import typo.data.CutData;
import typo.data.CutParams;

/**
 * ...
 * @author nab
 */
class Dots extends Object3D
{
	
	public var dots	:Array<Dot>;
	private var distance:Array<Float>;

	private var _w:Float = 0;
	private var _h:Float = 0;
	private var _d:Float = 0;
	
	private var number_of_points:Int = 180;
	public var targetObj:CamTarget;
	public var _cutName:String = "";
	
	private var _limA:Float = 60;
	private var _limB:Float = 90;
	private var _limC:Float = 120;
	private var _forceA:Float = 1 / 200;
	private var _forceB:Float = 1 / 200;
	private var _forceC:Float = 1 / 200;
	
	private var _line:Line;
	
	private var _limV:Float = 20;
	
	private var _activeNum:Int = 0;
	private var _tgtSpeed:Float = 10;
	
	private var _currentData:CutData;
	
	private var _count:Int = 0;
	private var _cube:Cube;
	private var _balance:Mesh;
	
	private var _gene:Bool = false;
	private var _camType:String = "";
	public var camera:ExCamera;
	
	public function new() 
	{
		super();
	}

	public function init(w:Float,h:Float):Void {
		
		_cube = new Cube();
		_cube.init();
		//add(_cube);		
		
		_balance=new Mesh(
			new BoxGeometry(4, 4, 4),
			new MeshBasicMaterial( { color:0xffffff } )
		);
		add(_balance);
		
		var g:Geometry = new Geometry();
		g.vertices.push(new Vector3(0, 0, 0));
		g.vertices.push(new Vector3(0, 0, 0));
		_line = new Line(g,new MeshBasicMaterial({color:0xffffff}));
		//add(_line);
		
		
		CutParams.init();
		_activeNum = number_of_points;
		targetObj = new CamTarget();
		//new Mesh(new BoxGeometry(10,10,10),new MeshBasicMaterial({color:0xff0000}));
		add(targetObj);
		
		dots = new Array();		
		for (i in 0 ... number_of_points) {
			
			var dot:Dot = new Dot();
			//dot.init(null);
			dot.position.x = 2000 * (Math.random() - 0.5);
			dot.position.y = 2000 * (Math.random() - 0.5);
			dot.position.z = 2000 * (Math.random() - 0.5);//h * (Math.random() - 0.5) * 2;
			//dot.rotation.x = Math.PI * 2 * Math.random();
			add(dot);
			dots.push(dot);
			
		}
		
		distance = new Array();// number_of_points * number_of_points);
	
		//gui
		Dat.gui.add(this, "_gene").listen();
		Dat.gui.add(this, "_camType").listen();	
		
		Dat.gui.add(this, "_limA", 10, 1500).listen();
		Dat.gui.add(this, "_limB", 10, 1500).listen();
		Dat.gui.add(this, "_limC", 10, 1500).listen();

		Dat.gui.add(this, "_forceA", 1 / 400, 2).listen();
		Dat.gui.add(this, "_forceB", 1 / 400, 2).listen();
		Dat.gui.add(this, "_forceC", 1 / 400, 2).listen();
		
		
		Dat.gui.add(this, "_limV", 0, 100).listen();
		Dat.gui.add(this, "_tgtSpeed", 0, 100);// .step(0.01);
		Dat.gui.add(this, "removeParams");
		Dat.gui.add(this, "reset");
		Dat.gui.add(this, "change");
		
		Dat.gui.add(this, "_cutName").listen();
		
		
		Dat.gui.close();
		
		
		//setNum(0.2);
		var d:CutData = CutParams.getNextData();
		d.init( this );
		initParams(d);
		calcMotion();
		
		//param1();
		Key.board.addEventListener("keydown", _onKeyDown);

	}
	
	
	public function change():Void {
		//for (i in 0...dots.length) {
		//	dots[i].changeMat();
		//}
	}
	
	private function _onKeyDown(e):Void {
	
		trace("keydown");
		switch(Std.parseInt(e.keyCode)) {
			
			case Dat.RIGHT:
				
				var d:CutData = CutParams.getNextData();
				d.init( this );
				
				initParams(d);
				
				d.nextcCam();
				d.tween();
				
				_gene = d.getGene();
				_camType = d.camPosMode;
				
				reset();
				_doRot();
				
			case Dat.F:
				_currentData.addForce();
				
		}
		
	}	
	
	private function _doRot():Void
	{
		camera.amp = 2800;// 1000 + 3000 * Math.random();
		if (Math.random() < 0.08) {
			camera.amp = 6000;
		}
		TweenMax.to(camera,0.8,{
			radX:camera.radX + Math.PI * 2
		});
		
	}
	
	public function reset():Void {
		
		//reset
		if (_currentData != null) {
			_currentData.reset();
		}
		
	}
	
	public function removeParams():Void {
		
		_currentData = null;
		
	}
	
	/**
	 * 新しいデータが来て切り替え
	 * @param	d
	 */
	public function initParams(d:CutData):Void {
	
		if (_currentData != null) {
			_currentData.kill();
		}
		_currentData = d;
		
		//d.init();
		
		for (i in 0...dots.length) {
			dots[i].init(_currentData);
		}
		_cube.setScale( _currentData.size );
		_cutName = _currentData.name;
			
		_w = _currentData.size.x;
		_h = _currentData.size.y;
		_d = _currentData.size.z;		
		
		//limit wo
		targetObj.init(_currentData);
	}
	
	
	/**
	 * 
	 * @param	audio
	 */
	public function update(audio:MyAudio,cam:ExCamera):Void {
		
		camera = cam;
		
		if (_currentData != null) {
			
			_currentData.update(audio);
			_limA 	= _currentData.limA;
			_limB 	= _currentData.limB;
			_limC 	= _currentData.limC;
			_forceA = _currentData.forceA;
			_forceB = _currentData.forceB;
			_forceC = _currentData.forceC;		
			_limV = _currentData.limV;
			
			cam.posMode = _currentData.camPosMode;
			
			//fuyaseba??
			_activeNum = Math.floor( _currentData.numRatio * number_of_points);
			
		}		
		
		calcDistance();
		calcMotion();
		targetObj.update();
		
	}
	
	public function calcMotion():Void 
	{

		_balance.position.set(0, 0, 0);
		
		var count:Int = 0;
		for (i in 0...number_of_points)
		{
			//tっていうのがターゲット
			var t:Dot   =   dots[i];
			if (i < _activeNum) {
				t.setActive(true);//visible wo kirikaeteru
			}else {
				t.setActive(false);//visible wo kirikaeteru
			}
			
			//  距離が近すぎるものから逃げる
			var b:Int   =   i * number_of_points;
			var acp:Vector3    =   new Vector3();    //  逃げる加速度
			var ac:Int  =   0;                  //  後で平均値を取る為のカウンター
			var atp:Vector3	=	new Vector3();
			var at:Int	=	0;
			var vp:Vector3    =   new Vector3();    //  並走方向
			var vc:Int=0;  //  後で平均値を取る為のカウンター:並走
			
			for ( j in 0...number_of_points)
			{
				var dis:Float  =   distance[b + j];
				
				//近すぎなので離れる
				var tb:Dot;
				var dx:Float = 0;
				var dy:Float = 0;
				var dz:Float = 0;
				if (i == j) continue;
				
				if (   dis < _limA )   
				{
					//  距離がぶつかっちゃってる
					tb  =   dots[j];
					dx = t.position.x - tb.position.x;
					dy = t.position.y - tb.position.y;
					dz = t.position.z - tb.position.z;
					//d.normalize(1.0);
					
					acp.x   += dx * _forceA;
					acp.y   += dy * _forceA;
					acp.z	+= dz * _forceA;
					ac++;
				}else if ( dis < _limB) {
					//ほどほど
					tb  =   dots[j];
					dx = tb.vx;
					dy = tb.vy;
					dz = tb.vz;
					vp.x += dx * _forceB;
					vp.y += dy * _forceB;
					vp.z += dz * _forceB;

					vc++;
					
				}else if( dis < _limC ){
					
					//遠いので中心へ
					tb  =   dots[j];
					dx = t.position.x - tb.position.x;
					dy = t.position.y - tb.position.y;
					dz = t.position.z - tb.position.z;
					atp.x += dx * _forceC;
					atp.y += dy * _forceC;
					atp.z += dz * _forceC;
					at++;
					
				}
				
			}
			if (    ac>0  )
			{
				t.vx   +=  acp.x / ac;
				t.vy   +=  acp.y / ac;
				t.vz +=   acp.z / ac;
			}
			
			if (at > 0) {
				t.vx -= atp.x / at;
				t.vy -= atp.y / at;
				t.vz -= atp.z / at;

			}
			if (vc > 0) {
				t.vx += vp.x / vc;
				t.vy += vp.y / vc;				
				t.vz += vp.z / vc;				
			}
			
			//clearline
			
			
			
			//  速度の上限を3にする
			if (    t.getAbsV() > _limV ) {
				t.normalizeV(_limV);
			}

			
			//  ｖの方向に進み端跳ね返る
			var nx:Float	=	t.position.x + t.vx;
			var ny:Float	=	t.position.y + t.vy;
			var nz:Float	=	t.position.z + t.vz;
			
			//_w = 2000;
			//_h = 2000;
			//_d = 2000;
			t.look();
			
			if (_currentData.limitLoop) {
				if ( nx < -_w ) { nx = _w; t.position.x = nx; }
				else if ( nx > _w ){   nx = -_w; t.position.x = nx;}				
				if ( ny < -_h ){   ny = _h; t.position.y = ny;}
				else if ( ny > _h ){   ny = -_h; t.position.y = ny;}				
				if ( nz < -_d ){   nz = _d; t.position.z = nz;}
				else if ( nz > _d ){   nz = -_d; t.position.z = nz;}
				
			}else{
				if ( nx < -_w ){ nx = -_w; t.vx *= -1; }
				if ( nx > _w ){   nx = _w; t.vx *= -1; }
				if ( ny < -_h ){   ny = -_h;t.vy*=-1; }
				if ( ny > _h ){   ny = _h;t.vy*=-1; }
				if ( nz < -_d ){   nz = -_d;t.vz*=-1; }
				if ( nz > _d ){   nz = _d; t.vz*=-1; }
			}
			
			calcTarget(t);
			
			t.position.x += (nx-t.position.x)/4;
			t.position.y += (ny-t.position.y)/4;
			t.position.z += (nz-t.position.z)/4;
			
			t.update(targetObj.position);
			
			count++;
			_balance.position.x += t.position.x;
			_balance.position.y += t.position.y;
			_balance.position.z += t.position.z;
		}
		
		_balance.position.x = _balance.position.x / count;
		_balance.position.y = _balance.position.y / count;
		_balance.position.z = _balance.position.z / count;
		
		_line.geometry.verticesNeedUpdate = true;
		_line.geometry.vertices[0].x = _balance.position.x;
		_line.geometry.vertices[0].y = _balance.position.y;
		_line.geometry.vertices[0].z = _balance.position.z;
		_line.geometry.vertices[1].x = targetObj.position.x;
		_line.geometry.vertices[1].y = targetObj.position.y;
		_line.geometry.vertices[1].z = targetObj.position.z;
		
		
	}
	
	/**
	 * setNum
	 * @param	ratio
	 */
	private function setNum(ratio:Float):Void {
			
		var len:Int = dots.length;
		var num:Int = Math.floor( len * ratio );
		
		for (i in 0...len) {
			if (i < num) {
				dots[i].setActive(true);// = true;
			}else {
				dots[i].setActive(false);
			}
		}
		
	}
	
	
	private function calcTarget(t:Dot):Void {
		/*
		var vx:Float = _target.position.x - t.position.x;
		var vy:Float = _target.position.y - t.position.y;
		var vz:Float = _target.position.z - t.position.z;
		
		var vv:Vector3 = new Vector3(vx,vy,vz);
		if(vv.length()>_tgtSpeed/100){
			vv.normalize();
			vv.multiplyScalar(_tgtSpeed / 100);
		}
		
		t.vx += vv.x;// * _tgtSpeed / 1000;
		t.vy += vv.y;// * _tgtSpeed / 1000;
		t.vz += vv.z;// * _tgtSpeed / 1000;
		*/
	}
	
	
	public function resize(w:Float, h:Float) 
	{
		_w = w;
		_h = h;
	}
	
	public function setWhite(b:Bool) 
	{
		_cube.setWhite(b);	
		for ( i in 0...dots.length) {
			dots[i].changeMat(b);
		}
		
	}
	
	private function calcDistance():Void 
	{
		
		for ( a in 0...number_of_points)
		{
			var ta:Dot  =   dots[a];
			for (b in a + 1 ... number_of_points)
			{
				
				var tb:Dot  =   dots[b];
				var dx:Float = ta.position.x - tb.position.x;
				var dy:Float = ta.position.y - tb.position.y;
				var dz:Float = ta.position.z - tb.position.z;
				var d:Float    =   Math.sqrt(dx * dx + dy * dy + dz*dz);
				distance[a + b * number_of_points]  =   d;
				distance[a * number_of_points + b]  =   d;
				
			}
		}
		
	}
	
	public function getActiveNum():Int {
		return _activeNum;
	}
	
	
	
	
	
}