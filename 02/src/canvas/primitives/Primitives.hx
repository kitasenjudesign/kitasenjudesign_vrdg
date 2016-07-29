package canvas.primitives;
import canvas.primitives.Cubes;
import canvas.primitives.Knot;
import canvas.primitives.Octa;
import canvas.primitives.RoppongiLogo;
import canvas.primitives.Two;
import common.Dat;
import data.LogoPaths;
import js.Browser;
import sound.MyAudio;
import three.Face;
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
	
	
	private var _count:Int = 0;
	
	private var _cube		:Cube;
	private var _sphere		:Sphere;
	private var _torus		:Torus;
	private var _logo		:VrdgLogo;
	private var _mouse		:DeDeLogo;
	private var _primitives:Array<PrimitiveBase>;
	private var _tgtScale:Float = 1;
	private var _octa:Octa;
	private var _knot:Knot;
	private var _kitasen:Kitasenju;
	private var _cubes:Cubes;
	private var _spheres:Spheres;
	private var _two:Two;
	private var _face:DeDeFace;
	
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
		
		_cube = new Cube();
		_cube.init();
		add(_cube);

		_cubes = new Cubes();
		_cubes.init();
		add(_cubes);
		
		
		_sphere = new Sphere();
		_sphere.init();
		add(_sphere);
		
		_spheres = new Spheres();
		_spheres.init();
		add(_spheres);
				
		
		_torus = new Torus();
		_torus.init();
		add(_torus);
		
		_logo = new VrdgLogo();
		_logo.init();
		add(_logo);
		
		_octa = new Octa();
		_octa.init();
		add(_octa);
		
		_knot = new Knot();
		_knot.init();
		add(_knot);
		
		_kitasen = new Kitasenju();
		_kitasen.init();
		add(_kitasen);
		
		_face = new DeDeFace();
		_face.init();
		add(_face);

		_mouse = new DeDeLogo();
		_mouse.init();
		add(_mouse);
		
		
		//_beyond = new BeyondCode();
		//_beyond.init();
		//add(_beyond);
		
		_two = new Two();
		_two.init();
		add(_two);
		/*
		_primitives = [
			_logo,
			//_mouse,
			//_face
		];*/
		
		_primitives = [
			_cube,
			_two,
			_cubes,
			_sphere,
			_spheres,
			_torus,
			
			_octa,
			_knot,
			_kitasen,
			_face,
			_mouse,
			_logo
		];
		
		
		next(true);
		//Dat.gui.add(this, "next");
		//Browser.document.addEventListener("keydown", _goNext);
	}
	/*
	private function _goNext(e):Void {
	
		if ( Std.parseInt(e.keyCode) == Dat.RIGHT) {
			next();
			
		}
	}*/
	
	public function next(isRandom:Bool):Void {
	
		
		if (isRandom) {
			_count = Math.floor(Math.random() *  _primitives.length);
		}else{
			_count++;
		}
		setVisible(false);
		
		if ( _count == _primitives.length - 1) {
			//Browser.window.alert("hoge");
		}
		_primitives[_count % _primitives.length].visible = true;
		_primitives[_count % _primitives.length].start();
		add( _primitives[_count % _primitives.length] );
		
		_setParam();
		
	}
	
	
	private function _setParam():Void {
	
	}
	
	private function setVisible(b:Bool):Void {
	
		for (i in 0..._primitives.length) {
			_primitives[i].visible = b;
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
		
		
		
			_tgtScale = 0.8 + Math.pow( audio.freqByteData[8] / 255, 2 );
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