package objects ;
import camera.ExCamera;
import common.Dat;
import js.Browser;
import sound.MyAudio;
import three.CubeCamera;
import three.Geometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshDepthMaterial;
import three.MeshPhongMaterial;
import three.Object3D;
import three.Vector3;
import tween.easing.Cubic;
import tween.easing.Power0;
import tween.TweenMax;
/**
 * ...
 * @author nab
 */
class MyFaceSingle extends Object3D
{
	
	
	
	public var dae:Mesh;// Object3D;
	//public var dae2:Mesh;
	
	private var _base:Array<Vector3>;
	private var _count:Float = 0;
	
	private var _speed:Float = 0.01;
	private var _sphere:Float = 0.1;
	private var _nejireX:Float = 0.5;
	private var _nejireY:Float = 0;
	private var _noise:Float = 0.8;
	private var _noiseSpeed:Float = 0.1;
	private var _yokoRatio:Float = 0;
	private var _yokoSpeed:Float = 0;
	private var _zengoRatio:Float = 0;
	
	private var _scale:Float = 1;
	public var _audio:MyAudio;
	
	public var vr:Float=0;
	public var gui:Dynamic;
	private var music:String = "";
	
	private var _idxNejireX:Int = 0;
	private var _idxNejireY:Int = 0;
	private var _idxNejireNoise:Int = 0;
	private var _idxSphereNoise:Int = 0;
	private var _idxSpeedNoise:Int = 0;
	
	private var _idxNoiseSpeed:Int = 0;
	
	private var _bottom:Bool = false;
	
	public var border:Float = 0;
	public var borderHeight:Float = 0;
	public var isSplit	:Bool = false;
	public var isActive	:Bool = true;
	public var index:Int = 0;
	
	private var _mode:String = "";
	var _daeLoader:MyDAELoader;
	
	public function new(idx:Int) 
	{
		index = idx;
		super();
	}

	
	
	public function init(d:MyDAELoader,cubecam:CubeCamera):Void {
	
		if (Dat.bg) return;
		
		_daeLoader = d;
		_idxNejireX = Math.floor(Math.random() * 20 );
		_idxNejireY = Math.floor(Math.random() * 20 );
		_idxNejireNoise = Math.floor(Math.random() * 20 );
		_idxSphereNoise = Math.floor(Math.random() * 20 );
		_idxNoiseSpeed = Math.floor(Math.random() * 20 );
		_idxSpeedNoise = Math.floor(Math.random() * 20 );

		//d.material.envMap = untyped cubecam.renderTarget;		
		//dae = new Mesh( d.geometry.clone(), d.material);
		dae = new Mesh( _daeLoader.geometry.clone(), new MeshDepthMaterial());
		
		dae.rotation.y = Math.PI / 2;
		if (index == 0) {
			dae.castShadow = true;
		}
		dae.scale.set(170, 170, 170);
		add(dae);
		
		_base = d.baseGeo;

		//this.rotation.z = Math.PI / 2;
		vr = (Math.random()-0.5) * Math.PI / 140;
	}
	

	public function updateMaterial(matMode:Int):Void {
		
		if (Dat.bg) return;
		
		switch( matMode ) {
			case MyFace.MAT_DEFAULT:
				dae.material = cast _daeLoader.material;
				
			case MyFace.MAT_DEPTH:
				dae.material = cast new MeshDepthMaterial();
			
		}
		
	}
	
	
	
	private function _getNoise(xx:Float,yy:Float,zz:Float):Float
	{
		var f = untyped __js__("noise.perlin3");
		var n:Float = f(xx, yy, zz);
		return n;
	}
	
	
	public function updateSingle(audio:MyAudio):Void {
		
		if (Dat.bg) return;
		if (dae == null) return;
		
		_audio = audio;
		var g:Geometry = untyped dae.geometry;
		
		g.verticesNeedUpdate = true;
		_count += _speed;
		
		//dae.rotation.y += _vr;
		//dae.position.y = 20 * Math.sin(_count * 0.81);
		
		//_vr *= 0.95;
		
		if (_audio!=null && _audio.isStart) {
			_audio.update();
			
			if(_audio.freqByteData.length>19){
			
				/*
				_nejireX = Math.pow(_audio.freqByteData[_idxNejireX] / 255, 3.5) * 10;
				_nejireY = Math.pow(_audio.freqByteData[_idxNejireY] / 255, 5) * Math.PI * 2;// * 0.5;
				
				_noise = Math.pow(_audio.freqByteData[_idxNejireNoise] / 255,3) * 4.5;
				_speed = 0.01+ Math.pow( _audio.freqByteData[_idxSpeedNoise] / 255, 4) * 0.5;
				_sphere = Math.pow( _audio.freqByteData[_idxSphereNoise]/255, 15);
				_noiseSpeed = 0.1 + Math.pow( _audio.freqByteData[_idxNoiseSpeed] / 255, 15) * 0.05;
				_scale = 1 + Math.pow(_audio.freqByteData[1] / 255, 5) * 0.4;
				*/
				
				_nejireX = Math.pow(_audio.freqByteData[16] / 255, 1.5) * 10;
				_nejireY = Math.pow(_audio.freqByteData[18] / 255, 2) * Math.PI * 2;// * 0.5;
				
				_noise = Math.pow(_audio.freqByteData[12] / 255,1) * 4.5;
				_speed = Math.pow( _audio.freqByteData[8] / 255, 2) * 0.5;
				_sphere = Math.pow( _audio.freqByteData[4]/255, 5);
				_noiseSpeed = 0.1 + Math.pow( _audio.freqByteData[19] / 255, 4) * 0.05;
				_scale = 1 + Math.pow(_audio.freqByteData[1] / 255, 3) * 0.4;				
				
				_yokoRatio =  Math.pow(_audio.freqByteData[5] / 255, 2);
				_yokoSpeed =  Math.pow(_audio.freqByteData[13] / 255, 2) * 4;
				_zengoRatio =  Math.pow(_audio.freqByteData[19] / 255, 2);
				
			}
		}else {
			return;
		}
		
		//cam.
		
		
		for (i in 0...g.vertices.length) {
			
			var vv:Vector3 = _base[i];

			var a:Float = Math.sqrt( vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);
			var radX:Float = -Math.atan2(vv.z, vv.x) + vv.y * Math.sin(_count) * _nejireX;//横方向の角度
			var radY:Float = Math.asin(vv.y / a);// + _nejireY;// * Math.sin(_count * 0.8);//縦方向の角度

			var amp:Float = (1-_sphere) * a + (_sphere) * 1;
			amp += Math.sin(_count * 0.7) * _getNoise(vv.x, vv.y + _count * _noiseSpeed, vv.z) * _noise;

			//amp *= _scale;
			//amp *= audio.timeData[ Math.floor( Math.abs(vv.y) * MyAudio.FFTSIZE * 0.6 ) ] / 255;
			
			//yyに対してAMPを　いじる
			
			var yoko:Float = Math.sin( 0.5*( vv.y * 2 * Math.PI ) + _count * _yokoSpeed ) * _yokoRatio;
			var zengo:Float = Math.cos( 0.5*( vv.y * 2 * Math.PI ) + _count * 3 ) * 0.2 * _zengoRatio;
			
			var tgtX:Float = amp * Math.sin( radX ) * Math.cos(radY) + zengo;//横
			var tgtY:Float = amp * Math.sin( radY );//縦
			var tgtZ:Float = amp * Math.cos( radX ) * Math.cos(radY) + yoko;//横	
			
			g.vertices[i].x += ( tgtX - g.vertices[i].x) / 2; 
			g.vertices[i].y += ( tgtY - g.vertices[i].y) / 2;
			g.vertices[i].z += ( tgtZ - g.vertices[i].z) / 2;

			if( isSplit ){
				_splitSpirit(g.vertices[i], tgtX, tgtY, tgtZ);
			}
			
			//g.faces[i].vertexColors
		}
		
		if(_audio!=null && _audio.freqByteData.length>15){
			//cam.up.set(Math.pow( _audio.freqByteData[14]/255,4), 1, Math.pow( _audio.freqByteData[8]/255,4));
		}
		
		//g.colorsNeedUpdate = true;
		//dae2.geometry.computeVertexNormals();
		
		
	}
	
	//いち0-1、空間の大きさ0
	private function _splitSpirit(vv:Vector3,tgtX:Float,tgtY:Float,tgtZ:Float):Void {
		
			var border1:Float = border + borderHeight/2;
			var border2:Float  = border - borderHeight/2;
		
			if (tgtY > border1) {
				//border1以上は消す。
				_splitSpirit2(border1, vv, tgtX, tgtY, tgtZ);
				
			}else if (tgtY < border2) {
				//border2以下は消す。
				_splitSpirit2(border2, vv, tgtX, tgtY, tgtZ);
				
			}
			
	}
	
	private function _splitSpirit2(th:Float,vv:Vector3,tgtX:Float,tgtY:Float,tgtZ:Float):Void {
		
			var dy:Float = tgtY - (th);
			var dist:Float = Math.abs( dy );
			var ratio:Float = dist / 0.4;
					
			if (ratio > 1) ratio = 1;
			
			ratio = 1 - ratio;
			ratio = Math.pow(ratio, 0.1);
			vv.x = tgtX * ratio;
			vv.z = tgtZ * ratio;
			vv.y = th - dy /100;
		
	}
	
	/**
	 * 
	 * @param	mode
	 */
	public function setMode(mode:String):Void {
	
		_mode = mode;
		//_daeLoader.changeMap();
		
		switch(_mode) {
			case MyWorld.MODE_SINGLE:
				isSplit = false;
				
			case MyWorld.MODE_SPLIT:
				isSplit = true;
			
			case MyWorld.MODE_SPLIT2:
				isSplit = true;
			
		}
		
	}
	
}