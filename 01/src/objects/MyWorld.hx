package objects;
import camera.ExCamera;
import common.Dat;
import common.Key;
import effect.PostProcessing2;
import js.Browser;
import objects.data.EffectData;
import sound.MyAudio;
import three.CubeCamera;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshLambertMaterial;
import three.Object3D;
import three.Sphere;
import three.SphereGeometry;

/**
 * ...
 * @author nabe
 */
class MyWorld extends Object3D
{

	private var _mode:String = "single";

	public static inline var MODE_SINGLE:String = "single";
	public static inline var MODE_SPLIT:String = "split";
	public static inline var MODE_SPLIT2:String = "split2";
	public static inline var MODE_SPLIT3:String = "split3";
	
	public var effectName:String = "";
	public var sphere	:MySphere;
	public var border	:Float = 0;
	public var faces:Array<MyFace> = [];
	private var _counter:Float = 0;
	private var _dae:MyDAELoader;
	
	public var death:Mesh;
	
	public function new() 
	{
		super();
	}
	
	//モードを三つ作る。
	
	
	//
	public function init(dae:MyDAELoader,cubeCam:CubeCamera,cam:ExCamera,pp:PostProcessing2):Void {
		
		_pp = pp;
		
		_camera = cam;
		_dae = dae;
		
		death = new Mesh(new SphereGeometry(15, 10, 10), new MeshBasicMaterial( { color:0x000000 } ));
		//add(death);
		
		
		sphere = new MySphere();
		if (Dat.bg) {
			add(sphere);
		}
		
		for(i in 0...5){
			var face:MyFace = new MyFace(i);
			face.init(dae, cubeCam);
			face.border =  MyDAELoader.getPosY(i * 	1/4);
			face.borderHeight = 2.5 / 5;
			//face.position.y = -(i - 2) * 50;
			//face.position.x = 1100 * (Math.random() - 0.5);
			//face1.position.x = 150;
			add(face);
			faces.push(face);
		}
		
		
		Key.board.addEventListener("keydown" , _KeyDownFunc);
		//e.keyCode

		//Dat.gui.add(this, "changeMode1");
		//Dat.gui.add(this, "changeMode2");
		//Dat.gui.add(this, "changeMode3");
		
		Dat.gui.add(this, "effectName").listen();
		Dat.gui.add(this, "_changeIndex");
		//Dat.gui.add(this, "_idx").listen();
		
		
		changeMode1();
		_nextEffect();
		
	}
	
	private var _idx:Int = 0;
	private function _changeIndex():Void {
		
		for (i in 0...faces.length) {
			
			faces[i].changeIndex(_idx);
			
		}
		_idx++;
		
	}
	
	
	private function _KeyDownFunc(e):Void 
	{
		
		switch( Std.parseInt( e.keyCode ) ) {
			
			case Dat.Q:
				_nextSingle();
				
			case Dat.W:
				changeMode2();			
				sphere.changeBg();
				sphere.power = 0.5 + 0.3 * Math.random();
				_impulese();
				
			case Dat.E:
				changeMode3();		
				sphere.power = 0.4 + 0.2 * Math.random();
				sphere.changeBg();
				_impulese();
				
			case Dat.UP:
				_showColor();
				
			case Dat.L://line
				_isWire = !_isWire;
				_showColor();
				
			case Dat.DOWN:
				_hideColor();
				
			case Dat.RIGHT:	
				_nextEffect();///////////////////////////////
				
			case Dat.LEFT:	
				_resetEffect();///////////////////////////////
					
			case Dat.N:
				_nextTexture();//next_texture

		}
		
	}
	
	private function _nextTexture():Void
	{
		_pp.nextTexture();
	}
	
	
	
	public function _showColor():Void {
		
		var data:EffectData = EffectData.EFFECT_COLOR_WIRE;
		var rr:Float = 0;
		for ( i in 0...faces.length) {
			faces[i].rotateZ( rr );
			faces[i].updateMaterial(MyFace.MAT_DEPTH,_isWire);
			faces[i].s = data.strength;
		}
		
		//Browser.window.alert(data.name);
		effectName = data.name;
		_pp.changeColor(data);		
		
	}
	
	
	public function _hideColor():Void {
		
		var data:EffectData = EffectData.EFFECT_NORMAL;
		var rr:Float = 0;
		for ( i in 0...faces.length) {
			faces[i].rotateZ( rr );
			faces[i].updateMaterial(MyFace.MAT_DEFAULT,false);
			faces[i].s = data.strength;
		}
		
		//Browser.window.alert(data.name);
		effectName = data.name;
		_pp.changeColor(data);		
		
	}
		
	
	
	
	
	/**
	 * _nextEffect
	 */
	public function _nextEffect():Void {
		
		//koko
		var data:EffectData = EffectData.getNext();		
		//Browser.window.alert(data.name);
		effectName = data.name;
		_pp.changeDisplace(data);// isColor, isDisplace);

		var mat:Int = 0;
		if (data.colorType==EffectData.COLOR_MONO || data.colorType==EffectData.COLOR_GRADE) {
			mat = MyFace.MAT_DEPTH;
		}else {
			mat = MyFace.MAT_DEFAULT;
		}
		
		var rr:Float = 0;
		if(data.displaceType == EffectData.DISPLACE_X){
			if (Math.random() < 0.3) {
				rr = Math.random() < 0.5 ? Math.PI / 2 : -Math.PI / 2;
			}
		}
		
		for ( i in 0...faces.length) {
			faces[i].rotateZ( rr );
			faces[i].updateMaterial(mat);
			faces[i].s = data.strength;
		}
		
	}
	
	public function _resetEffect():Void {
		
		var data:EffectData = EffectData.EFFECT_NORMAL;
		var rr:Float = 0;
		for ( i in 0...faces.length) {
			faces[i].rotateZ( rr );
			faces[i].updateMaterial(MyFace.MAT_DEFAULT,false);
			faces[i].s = data.strength;
		}
		
		//Browser.window.alert(data.name);
		effectName = data.name;
		_pp.changeDisplace(data);		
		
		_impulese();	
		
		
	}
	
	private function _nextSingle():Void {
			
		changeMode1();
		_dae.changeMap( sphere.changeBg() );
		sphere.power = 0.7 + 0.3 * Math.random();
		_impulese();		
		
	}
	
	
	private function _impulese():Void {
		
		_camera.radX = Math.PI / 10 * ( Math.random() - 0.5);
		//_camera.radY = Math.PI / 10 * (Math.random() - 0.5);
		_camera.amp = 650 + 500 * Math.random();
		
		if (Math.random() < 0.1) {
			_camera.amp = 300;
		}
		
		if (_audio!=null) _audio.setImpulse();
	}
	
	/**
	 * 
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
	
		//this.rotation.z += 0.01;
		
		_audio = audio;
		if (_audio == null || !_audio.isStart) {
			return;	
		}
		
		_counter += 0.01;// * audio.subFreqByteData[3] / 255;
		position.y = Math.cos( _counter * Math.PI ) * 5;
		
		
		if (sphere != null) {
			sphere.update(audio);
		}
		
		for ( i in 0...faces.length) {
			if( faces[i].isActive ) {
				faces[i].update(audio);
			}
		}
		
		//ここにアップデートを描く。
		//borderの
		
		switch(_mode) {
			case MODE_SPLIT:
				_updateSplit1(audio);
			case MODE_SPLIT2:
				_updateSplit2(audio);
		}
		
	}
	
	
	private var _tgtBorder:Float = 0;
	private var _audio:MyAudio;
	var _camera:ExCamera;
	var _pp:PostProcessing2;
	var _isWire:Bool=false;
	
	
	/**
	 * 
	 * @param	audio
	 */
	private function _updateSplit1(audio:MyAudio):Void {
		
		if ( audio.freqByteData[4] / 255 > 0.2 ) {
			_tgtBorder = 0.25 + 0.5 * Math.random();
			border += (_tgtBorder - border) / 4; 
		}
		var r:Float = 0.3;
		
		border = border % 1;
		faces[0].border = MyDAELoader.getPosY( 1 );
		faces[1].border = MyDAELoader.getPosY( 0 );
	
		faces[0].borderHeight = MyDAELoader.getHeight( border *2 - r );
		faces[1].borderHeight = MyDAELoader.getHeight( (1-border)*2 - r );
		
		
		
		if ( audio.subFreqByteData[9]/255 > 0.2 ) {
			
			//death.position.y = 20 * (Math.random() - 0.5);
			
			faces[0].rotation.y = 2 * Math.random() * Math.PI; 
			faces[1].rotation.y = 2 * Math.random() * Math.PI; 
			
			faces[0].rotation.y = 2 * Math.random() * Math.PI; 
			faces[1].rotation.y = 2 * Math.random() * Math.PI; 
			
			faces[0].position.y = 50 * (Math.random() - 0.5); 
			faces[1].position.y = 50 * (Math.random() - 0.5); 
			
			faces[1].position.x = 300 * (Math.random() - 0.5);
			//faces[1].position.z = 1000 * (Math.random() - 0.5);
			
		}
		
		
	}
	
	/**
	 * 
	 * @param	audio
	 */
	private function _updateSplit2(audio:MyAudio):Void {
		
		if ( audio.subFreqByteData[0] /255 > 0.4 ) {
			for (i in 0...faces.length) {
				faces[i].vr += audio.subFreqByteData[i] / 10;
			}
		}

		if ( audio.subFreqByteData[7] /255 > 0.4 ) {
			for (i in 0...faces.length) {
				faces[i].vr += audio.subFreqByteData[i] / 10;
			}
		}		
		
		for (i in 0...faces.length) {
			
			var nn:Float = i * 	1 / 5 + _counter;
			nn = nn % 1;
			//faces[i].position.y = faces[i].baseY * (audio.freqByteData[4] / 255 + 0.5);
			faces[i].border =  MyDAELoader.getPosY(nn);
			faces[i].borderHeight = 2.5 /8;// * audio.freqByteData[5] / 255 + 0.01;
		}
		
		
	}
	
	
	
	public function faceVisible(b:Bool) 
	{
		for ( i in 0...faces.length) {
			faces[i].visible = b;
		}
	}
	
	/**
	 * changeMode
	 * @param	mode
	 */
	public function changeMode1():Void {
		_mode = MODE_SINGLE;
		add(faces[0]);
		faces[0].isActive = true;
		faces[0].setMode( MODE_SINGLE );
		faces[0].position.set(0, 0, 0);
		for (i in 1...faces.length) {
			remove(faces[i]);
			faces[i].isActive = false;
		}
	
	}

	
	//split2
	public function changeMode2():Void {
		_mode = MODE_SPLIT;
	
		add(faces[0]);
		add(faces[1]);
		
		faces[0].isActive = true;
		faces[1].isActive = true;
		faces[0].setMode( MODE_SPLIT );
		faces[1].setMode( MODE_SPLIT );

		for (i in 2...faces.length) {
			remove(faces[i]);
			faces[i].isActive = false;
		}
	
	}
	
	
	public function changeMode3():Void {
		_mode = MODE_SPLIT2;
	
		for (i in 0...faces.length) {
			
			add(faces[i]);
			faces[i].isActive = true;
			faces[i].setMode( MODE_SPLIT2 );
			
			faces[i].border =  MyDAELoader.getPosY(i * 	1/5);
			faces[i].borderHeight = 2.5 / 10;
			
			faces[i].baseY = 0;// -(i - 2) * 40;
			faces[i].rotation.y = 0;
			faces[i].position.y = 0;// faces[i].baseY;
			//faces[i].position.y = (i - 2) * 40;
		}
	
	}
	
	
	public function changeMode4():Void {
		_mode = MODE_SPLIT3;
		add(faces[0]);
		faces[0].isActive = true;
		faces[0].setMode( MODE_SINGLE );
		faces[0].position.set(0, 0, 0);
		for (i in 1...faces.length) {
			add(faces[i]);
			faces[i].isActive = true;
		}
	}	
	
	
	
	
}