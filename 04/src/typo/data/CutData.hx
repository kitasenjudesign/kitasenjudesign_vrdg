package typo.data;
import camera.ExCamera;
import js.Browser;
import sound.MyAudio;
import three.Vector3;
import tween.TweenMax;
import tween.easing.Power0;
import tween.TweenMaxHaxe;
import typo.Dot;

/**
 * ...
 * @author watanabe
 */
class CutData 
{
	//public static inline var TYPE:String = "";
	//public static inline var TYPE:String = "";
	//public static inline var TYPE:String = "";
	
	private var _dots	:Dots;
	private var _count	:Int = 0;
	private var _frame	:Int = 0;
	private static var _typ	:Int = 0;
	private var _gene	:Bool = false;
	private var _camera	:ExCamera;

	public var maxLife:Int = -1;

	public var camPosMode:String = ExCamera.POS_NORMAL;
	
	public var numRatio:Float = 1;
	public var size:Vector3 = new Vector3(2000, 2000, 2000);
	
	public var limA:Float = 0;
	public var limB:Float = 0;
	public var limC:Float = 0;
	
	public var forceA:Float = 0;
	public var forceB:Float = 0;
	public var forceC:Float = 0;
	public var limV:Float = 60;
	
	public var name:String = "";
	private var offsetV:Float = 0;
	private var _twn:TweenMaxHaxe;
	public var limitLoop:Bool = false;
	
	public var firstTweenTime:Float = 1;
	
	public function new() 
	{
		
	}
	
	public function init(d:Dots):Void {
		
		_dots = d;
		_camera = d.camera;
		
	}
	
	public function tween():Void {
		var tgt:Float = numRatio;
		numRatio = 0;
		if (_twn != null) {
			_twn.kill();
		}
		_twn = TweenMax.to(this, firstTweenTime, {
			numRatio:tgt,
			ease:Power0.easeInOut
		});
	}
	
	public function update(a:MyAudio):Void {
		
		if ( _camera == null) {
			//Tracer.debug("no camera ...");
			return;
		}
		
		//gene
		if(_gene){
			
			//ugokasu
			var spd:Float = Math.pow( a.freqByteData[6] / 255, 1.5);
			_dots.targetObj.setSpeed( 0.01 + spd );
			
			_frame++;
			if(spd>0.05 || _frame>5){
					_frame = 0;
					_count++;
					//var d:Dot = _dots.dots[_count % _dots.dots.length];
					var d:Dot = _dots.dots[_count % _dots.getActiveNum()];
					if(d!=null){
						var pos:Vector3 = _dots.targetObj.sinPos.clone();
						pos.x += 20 * (Math.random() - 0.5);
						pos.y += 20 * (Math.random() - 0.5);
						pos.z += 20 * (Math.random() - 0.5);
						
						d.reset(pos);
					}
				
			}		
			
			if ( camPosMode == ExCamera.POS_FOLLOW ) {
				
				_camera.target.x = _dots.targetObj.position.x;
				_camera.target.y = _dots.targetObj.position.y;
				_camera.target.z = _dots.targetObj.position.z;				
				
			}else {
				_camera.radX += Math.PI / 900;
			}
			
		}else{
			
			
			_camera.radX += Math.PI / 900;
			_camera.target.x = 0;
			_camera.target.y = 0;
			_camera.target.z = 0;				
			
		}
		
	}
	
	private function _getNoise(xx:Float,yy:Float,zz:Float):Float
	{
		var f = untyped __js__("noise.perlin3");
		var n:Float = f(xx, yy, zz);
		return n;
	}	
	
	public function addForce():Void {
		offsetV = 600;
		TweenMax.to(this, 0.5, {
			offsetV:0
		});
		
		/*
		var v:Vector3 = new Vector3(
			Math.sin(_dots.camera.radX),
			0,
			Math.cos(_dots.camera.radX)
		);*/
			
		var dir:Float = Math.random()<0.5 ? 1 : -1;
		
		for (i in 0..._dots.dots.length) {
			
			var vv:Vector3 = _dots.dots[i].position.clone();
			vv.normalize();
		
			var amp:Float = 350 * Math.random();
			_dots.dots[i].vx += dir * vv.x * amp;// +addV.x;
			_dots.dots[i].vy += dir * vv.y * amp;// +addV.x;
			_dots.dots[i].vz += dir * vv.z * amp;// +addV.x;			
			
		}
		
	}
	
	public function reset():Void {
		
		var ran:Float = Math.random();
		
		
		if( ran <0.5 ){
			for (i in 0..._dots.dots.length) {
				_dots.dots[i].position.x = 0;
				_dots.dots[i].position.y = 0;
				_dots.dots[i].position.z = 0;
			}
		}else {
			
			var tgt1:Vector3 = new Vector3(700, 0, 0);
			var tgt2:Vector3 = new Vector3( -700, 0, 0);
			var ran:Float = Math.random();
			if (ran< 0.33) {
				tgt1 = new Vector3(0, 700, 0);
				tgt2 = new Vector3(0, -700, 0);
			}else if(ran<0.66){
				tgt1 = new Vector3(-700, 700, 700);
				tgt2 = new Vector3(700, -700, -700);				
			}
			
			for (i in 0..._dots.dots.length) {
				
				_setPos( _dots.dots[i], Math.random() < 0.5 ? tgt1 : tgt2 );
				
			}			
		}
		
	}
	
	private function _setPos(dot:Dot, tgt:Vector3):Void {

		var radX		:Float = Math.random() * 2 * Math.PI;
		var radY		:Float = Math.random() * 2 * Math.PI;
		var amp			:Float = 300 * Math.random();
		var amp1		:Float = amp * Math.cos(radY);

		var xx		:Float = tgt.x + amp1 * Math.sin( radX );//横
		var yy		:Float = tgt.y + amp * Math.sin(radY);
		var zz		:Float = tgt.z + amp1 * Math.cos( radX );//横
		dot.position.x = xx;
		dot.position.y = yy;
		dot.position.z = zz;
		
	}
	
	///
	public function nextcCam() 
	{
		_typ++;
		if (_typ >= 3) {
			_typ = 0;
		}
		
		//Browser.window.alert(">>"+_typ);
		
		firstTweenTime = 2 + 3 * Math.random();
		if (Math.random() < 0.7) {
			firstTweenTime = 0;
		}
		
		switch(_typ) {
			case 0:
				camPosMode = ExCamera.POS_NORMAL;//target ga zero
				_gene = false;
			case 1:
				camPosMode = ExCamera.POS_NORMAL;//target ga zero
				_gene = true;
			case 2:
				camPosMode = ExCamera.POS_NORMAL;// ExCamera.POS_FOLLOW;//camera ga zero
				_gene = true;
				
		}
		
		
	}
	
	public function getGene():Bool
	{
		return _gene;
	}
	
	public function getTyp() 
	{
		return _typ;
	}
	
	public function kill() 
	{
		if (_twn != null) {
			_twn.kill();
		}
	}
	
}