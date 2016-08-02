package objects;
import data.DataManager;
import haxe.Timer;
import sound.MyAudio;
import three.BoxGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneGeometry;
import tween.TweenMax;

/**
 * ...
 * @author watanabe
 */
class Cat extends Object3D
{

	
	
	public var index:Int = 0;
	private var ground:Mesh;
	private var _dataManager:DataManager;
	
	private var _cat:Object3D;
	private var _body:CatBody;
	private var _hip:Object3D;
	
	private var _limit:Float = 600+200*Math.random();
	private var _rotSpeed:Float = Math.random() * Math.PI / 42;
	
	private var _showing:Bool = true;
	var _callback:Cat->Void;
	var _removeCallback:Cat->Void;
	
	
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 */
	public function init(value:Float):Void {
		
		_rotSpeed = Math.pow(value,2);
		
		_dataManager = DataManager.getInstance();
		
		_cat = _dataManager.cats.head.mesh.clone();
		add(_cat);
		
		_body = new CatBody();
		_body.scale.set(100, 0.001, 100);
		_body.init();
		_body.position.y = -0.63743 * 100;
		add( _body );
		
		_hip = _dataManager.cats.hip.mesh.clone();
		add(_hip);
		_showing = true;
	}
	
	
	//audio wo watasu
	public function update(audio:MyAudio):Void {
		
		_cat.position.y+=2;
		this.rotation.y += _rotSpeed;
		var headPos:Float = _cat.position.y - 0.63743 * 100;
		
		if(_showing){
			_body.setStart(headPos);
		}else {
			_body.position.y = headPos;
			_hip.position.y = headPos - _body.scale.y;
			
		}
		
		//_body.rotation
	}
	
	public function getPosY():Float {
		return _cat.position.y;
	}
	
	/**
	 * 
	 * @param	callback
	 * @param	removeCallback
	 */
	public function hide(callback:Cat->Void):Void
	{
		if(_showing){
			_showing = false;
			_callback = callback;
			Timer.delay(_onHide, 800);
		}
	}
	
	private function _onHide():Void
	{
		_callback(this); 
	}
	
	
	
}