package canvas.primitives;
import canvas.primitives.Chochin;
import canvas.primitives.Chochins;
import canvas.primitives.Cubes;
import canvas.primitives.data.EffectData;
import canvas.primitives.Hachigatsu;
import canvas.primitives.Ices;
import canvas.primitives.Katori;
import canvas.primitives.Katoris;
import canvas.primitives.Octa;
import canvas.primitives.PrimitiveBase;
import canvas.primitives.Two;
import canvas.primitives.VideoPlane;
import canvas.primitives.VideoPlaneFire;
import canvas.primitives.VideoPlaneWalker;
import canvas.primitives.VideoPlaneWalker;
import sound.MyAudio;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class Primitives extends Object3D
{
	
	private var _addV:Vector3;
	private var _minV:Vector3;
	
	
	private var _count:Int = -1;
	
	private var _cube		:Cube;
	private var _sphere		:Sphere;
	private var _torus		:Torus;
	private var _logo		:VrdgLogo;
	private var _mouse		:DeDeLogo;
	
	private var _primitives:Array<PrimitiveBase>;
	private var _tgtScale:Float = 1;

	private var _octa:Octa;
	private var _cubes:Cubes;
	private var _spheres:Spheres;
	private var _two:Two;
	private var _ice:Ice;
	private var _walker:VideoPlane;
	
	var _current:PrimitiveBase;
	var _katori:Katori;
	var _hachi:Hachigatsu;
	var _chochin:Chochin;
	var _ices:Ices;
	var _chochins:Chochins;
	var _katoris:Katoris;
	var _fireworks:VideoPlaneFire;
	
	public function new() 
	{
		super();
	}
	
	//tetrahedron
	//octahedron　正八面体
	//TorusGeometryドーナツ
	//TorusKnotGeometry結び目
	
	public function init():Void {
		_primitives = [];
		
		_minV = new Vector3();
		_addV = new Vector3();
		
		//pixelType = o.pixelType;
		//dynamicScale = o.dynamicScale;
		//isDepth = o.isDepth;
		
		_katori = new Katori();
		_katori.init(null);
		
		_ice = new Ice();
		_ice.init(null);
		
		//_cube = new Cube();
		//_cube.init({isDepth:false});
		
		_cubes = new Cubes();
		_cubes.init(null);
		
		_sphere = new Sphere();
		_sphere.init({pixelType:EffectData.BLACK_TRUE,dynamicScale:true,isDepth:false});
		
		_spheres = new Spheres();
		_spheres.init(null);
					
		_torus = new Torus();
		_torus.init(null);
		
		_logo = new VrdgLogo();
		_logo.init(null);
		
		_octa = new Octa();//tetra
		_octa.init(null);
		
		//_knot = new Knot();
		//_knot.init(null);
		
		_mouse = new DeDeLogo();
		_mouse.init({pixelType:EffectData.BLACK_TRUE,dynamicScale:false,isDepth:false});
		add(_mouse);
		
		_walker = new VideoPlaneWalker();
		_walker.init( { pixelType:EffectData.BLACK_TRUE, dynamicScale:false, isDepth:false } );
		
		_fireworks = new VideoPlaneFire();
		_fireworks.init( { pixelType:EffectData.BLACK_TRUE, dynamicScale:false, isDepth:false } );
		
		//_beyond = new BeyondCode();
		//_beyond.init();
		//add(_beyond);
		
		_two = new Two();
		_two.init(null);
		
		
		/*
		_primitives = [
			_logo,
			//_mouse,
			//_face
		];*/
		
		_hachi = new Hachigatsu();
		_hachi.init(null);
		
		_chochin = new Chochin();
		_chochin.init({pixelType:EffectData.BLACK_TRUE, isDepth:false});
		
		_chochins = new Chochins();
		_chochins.init({isDepth:false});
				
		
		_ices = new Ices();
		_ices.init(null);
		
		_katoris = new Katoris();
		_katoris.init({dynamicScale:false});
		
		_primitives = [

			_chochin,
			_hachi,
			_katoris,//
			_two,
			_ices,//
			_walker,
			_chochins,//
			_sphere,
			_katori,
			_fireworks,
			_ice,
			_mouse,
			_spheres,//
			_torus,
			_octa,
			_logo
		];
		for (i in 0..._primitives.length) {
			//add(_primitives[i]);
		}
		
		
	//	next(false);
		//Dat.gui.add(this, "next");
		//Browser.document.addEventListener("keydown", _goNext);
	}
	/*
	private function _goNext(e):Void {
	
		if ( Std.parseInt(e.keyCode) == Dat.RIGHT) {
			next();
			
		}
	}*/
	
	/**
	 * next();
	 * @param	isRandom
	 * @return
	 */
	public function next(isRandom:Bool):EffectData {
	
		if (isRandom) {
			_count = Math.floor(Math.random() *  _primitives.length);
		}else{
			_count++;
		}
		setVisible(false);
		
		if ( _count == _primitives.length - 1) {
			//Browser.window.alert("hoge");
		}
		_current = _primitives[_count % _primitives.length];
		_current.visible = true;
		_current.start();
		add(_current );
		
		_setParam();
		
		return _current.data;
		
		
	}
	
	
	private function _setParam():Void {
	
	}
	
	private function setVisible(b:Bool):Void {
	
		for (i in 0..._primitives.length) {
			_primitives[i].visible = b;
			_primitives[i].stop();
			remove( _primitives[i] );
		}
		
	}
	
	/**
	 * 
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
			
		if(audio.subFreqByteData[3]/255>0.1){
			_addV.x += Math.pow( audio.freqByteData[2],2) / 255 * 0.2;
			_addV.y += Math.pow( audio.freqByteData[3],2) / 255 * 0.2;
			_addV.z += Math.pow( audio.freqByteData[4],2) / 255 * 0.2;
		}
		
		_addV.x *= 0.99;
		_addV.y *= 0.99;
		_addV.z *= 0.99;
		
		
		//scale
		
		_tgtScale = 0.8 + Math.pow( audio.freqByteData[8] / 255, 2 );
			
		if (_current != null) {
			if ( _current.data.dynamicScale == false ) {
				_tgtScale = 1;
			}
		}
			scale.x = _tgtScale;
			scale.y = _tgtScale;
			scale.z = _tgtScale;
		
		
		
		
		//スピードが45度を超えないように抑える
		if (_addV.length() > Math.PI / 20) {
			_addV = _addV.normalize();
			_addV = _addV.multiplyScalar(Math.PI / 20);
		}else if ( _addV.length() < Math.PI / 300) {
			_addV = _addV.normalize();
			_addV = _addV.multiplyScalar(Math.PI / 300);
			
		}
		
		
		//rotation.x += _addV.x;
		//rotation.y += _addV.y;
		//rotation.z += _addV.z;
		
		for (i in 0..._primitives.length) {
			if ( _primitives[i].visible ) {
				_primitives[i].update(audio,_addV);
			}
		}		
		
		
		/*
		if ( rotation.length() < Math.PI / 200) {
			rotation.x = Math.PI / 200 * Math.random();
			rotation.y = Math.PI / 200 * Math.random();
			rotation.z = Math.PI / 200 * Math.random();
		}*/
		
	}
	
}