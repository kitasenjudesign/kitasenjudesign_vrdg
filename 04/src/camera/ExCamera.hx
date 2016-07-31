package camera;

import js.Browser;
import js.html.Element;
import three.PerspectiveCamera;
import three.Quaternion;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class ExCamera extends PerspectiveCamera
{

	//public static var DEFAULT_FOV:Int = 
	
	public static inline var POS_NORMAL	:String = "MODE_NORMAL";////
	public static inline var POS_FOLLOW	:String = "MODE_FOLLOW";//////
	
	public var posMode:String;
	
	private var _down:Bool = false;
	private var _downX:Float = 0;
    private var _downY:Float = 0;
    private var _mouseX:Float = 0;
    private var _mouseY:Float = 0;
    private var _width:Float = 0;
    private var _height:Float = 0;
	
    private var _oRadX  :Float = 0;
    private var _oRadY  :Float = 0;
	
	public var pos		:Vector3 = new Vector3();

    public var amp    	:Float = 2800.0;
	public var radX   	:Float = 0.01;// Math.PI / 5;
    public var radY   	:Float = 0.01;// Math.PI / 5;
	
	
	private var _camera:PerspectiveCamera;
    private var isActive:Bool=false;
	var _looking:Vector3;
	var _dom:Element;
	var _isMobile:Bool;

	public var target	:Vector3;
	public var target2	:Vector3;
	
	
	public var tgtOffsetY		:Float = 0;
	
	
	public function new(fov:Float,aspect:Float,near:Float,far:Float) 
	{
		//
		super(fov, aspect, near, far);
		posMode = POS_NORMAL;
	}
	
	public function init(dom:Dynamic=null):Void{
        
		_camera = this;
		target = new Vector3();
		//_isMobile = OsChecker.isMobile();
        //var container:any = document.querySelector('#container');
		if(dom!=null){
		dom.ontouchstart	= this.onMouseDown;
		dom.ontouchend	= this.onMouseUp;
		dom.ontouchmove = this.onMouseMove;
		
		dom.onmousedown 	= this.onMouseDown;
        dom.onmouseup 		= this.onMouseUp;
        dom.onmousemove 	= this.onMouseMove;
        dom.onmousewheel 	= this.onMouseWheel;
        Browser.window.addEventListener('DOMMouseScroll',this.onMouseWheelFF);
		//Browser.window.onresize = _onResize;
		_dom = dom;
		}
    }
	
	private function _onResize():Void
	{
		
	}

	
	private function onMouseWheelFF(e):Void{
        this.amp += e.detail * 1;
        if(this.amp>8000)this.amp=8000;
        if(this.amp<50)this.amp=50;
    }

	private function onMouseWheel(e):Void {
        this.amp += e.wheelDelta * 0.5;
        if(this.amp>8000)this.amp=8000;
        if(this.amp<50)this.amp=50;
    }

    private function onMouseUp(e):Void{
            e.preventDefault();
            this._down = false;
    }

	
	
    private function onMouseDown(e):Void{
        e.preventDefault();
        this._down = true;
		
		if (_isMobile) {
			var touch = e.touches[0];
			if( e.touches.length<=1){
				_downX = touch.pageX;
				_downY = touch.pageY;
			}
		}else{
			_downX = e.clientX;
			_downY = e.clientY;
        }
		
        this._oRadX = this.radX;
        this._oRadY = this.radY;
    }

    private function onMouseMove(e):Void{
        e.preventDefault();
        //console.log( "kiteru " + e.clientX +" " + e.clientY );
        //e.preventDefault();
        //console.log( "kiteru " + e.clientX +" " + e.clientY );
		if (_isMobile) {
			var touch = e.touches[0];
			if( e.touches.length<=1){
				_mouseX = touch.pageX;
				_mouseY = touch.pageY;
			}
		}else{
			_mouseX = e.clientX;
			_mouseY = e.clientY;
		} 
	}

    public function update():Void{

		//if(!this.isActive)return;
        //Browser.window.console.log("kiteru " + this._mouseX+" "+this._mouseY);
        //radX 0~2pi
        //radY 0~2pi

        //downしてるとき
        if(this._down) {
            var dx:Float = -( this._mouseX - this._downX );
            var dy:Float = this._mouseY - this._downY;
            this.radX = this._oRadX + dx/100;
            this.radY = this._oRadY + dy / 100;
			if (this.radY > Math.PI / 2) this.radY = Math.PI / 2;
			if (this.radY < -Math.PI / 2) this.radY = -Math.PI / 2;
        }

        //console.log(this.radX + " " + this.radY + " " + x+" "+y+" "+z);
        if (_camera != null){
			_updatePosition(1/4);
        }

		//this.rotation.x = Math.PI / 4;
		
    }
	
	
	public function setFOV(fov:Float) {
		
		trace("setFOV = " + fov);
		_camera.fov = fov;
		_camera.updateProjectionMatrix();
		
	}

	public function resize():Void {
		
		_width = Browser.window.innerWidth;
		_height = Browser.window.innerHeight;
		_camera.aspect = _width / _height;
		_camera.updateProjectionMatrix();
		
	}
	
	//
	public function reset(target:Vector3=null):Void{
        var p:Vector3 = _camera.position;
        this.amp = Math.sqrt( p.x*p.x + p.y*p.y + p.z*p.z );
        this.radX = Math.atan2(p.x, p.z);
        this.radY = Math.atan2(p.y, p.z);
		_updatePosition();
        
		if (this.radY > Math.PI / 2 * 0.9) this.radY =  Math.PI / 2 * 0.9;
		if (this.radY < -Math.PI / 2 * 0.9) this.radY = -Math.PI / 2 * 0.9;
		
		if(target!=null){
			_camera.lookAt( target );//target
        }
    }
	

	public function setPolar(a:Float, rx:Float, ry:Float):Void
	{
		this.amp = a;
        this.radX = rx;
        this.radY = ry;
		_updatePosition();
	}
	
	public function kill():Void
	{
		_dom.onmousedown 	= null;// this.onMouseDown;
        _dom.onmouseup 		= null;// this.onMouseUp;
        _dom.onmousemove 	= null;//this.onMouseMove;
        _dom.onmousewheel 	= null;// this.onMouseWheel;
        //Browser.window.addEventListener('DOMMouseScroll', this.onMouseWheelFF);
		Browser.window.removeEventListener('DOMMouseScroll', this.onMouseWheelFF);
		
	}
	
	private function _updatePosition(spd:Float=1):Void
	{
		//trace(mode);
		
		if (posMode == POS_NORMAL) {
			var amp1		:Float = this.amp * Math.cos(this.radY);

			var x		:Float = target.x + amp1 * Math.sin( this.radX );//横
			var y		:Float = target.y + this.amp * Math.sin(this.radY);
			var z		:Float = target.z + amp1 * Math.cos( this.radX );//横

			_camera.position.x += (x - _camera.position.x) * spd;
			_camera.position.y += (y - _camera.position.y) * spd;
			_camera.position.z += (z - _camera.position.z) * spd;
		}else {

			//POS_FOLLOW
			
			_camera.position.x += (pos.x - _camera.position.x) * spd;
			_camera.position.y += (pos.y - _camera.position.y) * spd;
			_camera.position.z += (pos.z - _camera.position.z) * spd;
			
			
		}
		var t:Vector3 = target.clone();
		t.y += tgtOffsetY;
		target2 = t;
        _camera.lookAt( t );//target
		
	
		
	}
	
	
	
	//spherecameraをひとつにする
	
	
	/*
        resize = (ww:number, hh:number)=>{
            this._width = ww;
            this._height = hh;
        }
	*/
	
	
	
	
	
	
}