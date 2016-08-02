package objects;
import camera.CamData;
import camera.ExCamera;
import common.Dat;
import data.MyColors;
import js.Browser;
import sound.MyAudio;
import three.Object3D;
import three.Scene;

/**
 * ...
 * @author nabe
 */
class MyWorlds
{

	public static inline var MODE_V:Int = 0;
	public static inline var MODE_H:Int = 1;
	
	public var mode:Int = MODE_V;
	
	public var spaceX	:Float = 800;
	public var spaceX2	:Float = 900;
	
	public var spaceY	:Float = 1000;
	public var worlds	:Array<MyWorld>;
	
	private var _count:Int = 0;
	var speedY:Float = 4;
	var speedX:Float = 4;
	var _main:Main3d;
	var _camera:ExCamera;
	var _color:Int=0;
	
	
	public function new(main:Main3d)
	{
		//super();
		_main = main;
		
	}
	
	//
	public function init(scene:Scene, dae:MyDAELoader, cam:ExCamera):Void {
		
		_camera = cam;
		worlds = [];
		var numX:Int = 5;
		var numY:Int = 4;
		for (i in 0...numX) {
			for(j in 0...numY){
				var world:MyWorld = new MyWorld();
				world.position.x = spaceX * (i - (numX-1)/2 );
				world.position.y = - spaceY * j +  (numX-1)/2 * spaceY;
				//world.position.z =  spaceX * (i - (numX-1)/2 );
				
				world.init( dae );
				world.visible = true;
				scene.add(world);
				worlds.push(world);
			}
		}
		
		setColor(0, 0);
		_initH();
		//_initV();
		
		Browser.document.addEventListener("keydown", _onKeyDown);
	}
	
	private function _onKeyDown(e):Void {
	
		var random:Float = Math.random();
		switch(Std.parseInt(e.keyCode)) {
			case Dat.RIGHT:
				if (mode == MODE_H) {
					_initV();					
				}else {
					_initH();	
				}
				
				//カメラアングルをランダムに。
				CamData.setRandom(_camera, mode == MODE_V);
				
				var r:Float = Math.random();
				if(r<0.15){
					setColor(MyColors.WHITE,random);
				}else if (r < 0.3) {
					setColor(MyColors.ORANGE,random);
					
				}else{
					setColor(MyColors.BLACK,random);
				}
				
				_setRotMode();

			case Dat.UP:
				if ( _color == 0xffffff) {
					setColor(0,random);
				}else {
					setColor(0xffffff,random);
				}
				
				
		}
		
	}
	

	
	
	private function _setRotMode():Void {
		var ran:Float = Math.random();
		var ranOut:Int = 0;
		if (ran < 0.4) {
			ranOut = 0;
		}else if(ran<0.8){
			ranOut = 1;
		}else {
			ranOut = 2;
		}
		
		
		for ( i in 0...worlds.length) {
			worlds[i].setMode(ranOut,ran);
		}
		
	}
	
	private function _initV():Void {
		
		mode = MODE_V;
		var numX:Int = 5;
		var numY:Int = 4;		
		for ( i in 0...worlds.length) {
			
			var world:MyWorld = worlds[i];
			
			var xx:Int = i % numX;
			var yy:Int = Math.floor( i / numX);
			world.position.x = spaceX * (xx - (numX-1)/2 );
			world.position.y = - spaceY * yy +  (numY-1)/2 * spaceY;
			world.visible = true;
			
		}		
	}
	
	private function _initH():Void {
		
		mode = MODE_H;
		var numX:Int = 6;
		var numY:Int = 3;		
		for ( i in 0...worlds.length) {
			
			var world:MyWorld = worlds[i];
			
			if ( i >= numX * numY ) {
				
				world.visible = false;
				
			}else{
		
				var xx:Int = i % numX;
				var yy:Int = Math.floor( i / numX);
				
				world.position.x = spaceX2 * (xx - (numX-1)/2 );
				world.position.y = - spaceY * yy +  (numY - 1) / 2 * spaceY;
				world.visible = true;
				
			}
		}
		
	}
	
	
	public function setColor(col:Int,ran:Float):Void {
	
		_color = col;
		for(i in 0...worlds.length){
			worlds[i].setColor(col, ran);
		}
		_main.setColor(col);
		
	}
	
	
	public function changeMode():Void {
		

		
	}
	
	/**

	*/
	public function update(audio:MyAudio):Void {
	
		switch( mode ) {
			case MODE_V:
				_updateV(audio);
				
			case MODE_H:
				_updateH(audio);
			
		}
		
	}
	
	
	private function _updateV(a:MyAudio):Void {
		for ( i in 0...worlds.length) {
		
			worlds[i].position.y += speedY;
			if( worlds[i].position.y > spaceY * 2 ){
				
				worlds[i].position.y = -spaceY * 2;
				worlds[i].reset();
			}
			
			worlds[i].update(a);
			
		}
	}
	
	private function _updateH(a:MyAudio):Void {
		for ( i in 0...worlds.length) {
		
			worlds[i].position.x -= speedX;
			if ( worlds[i].position.x < -spaceX2 * 3 ) {
				
				worlds[i].position.x = spaceX2 * 3;
				worlds[i].reset();
				
			}
			
			worlds[i].update(a);
		}
	}
	
	
}