package data;
import objects.CatsLoader;
import three.MeshBasicMaterial;

/**
 * ...
 * @author nabe
 */
class DataManager
{

	/*******************************************************/
	private static var instance=null;
    private static var internallyCalled:Bool = false;
	
    public function new() {
        if(internallyCalled){
            internallyCalled=false;
        }else{
            throw "Singleton.getInstance()で生成してね。";
        }
    }

    public static function getInstance():DataManager{
        if(DataManager.instance==null){
            internallyCalled = true;
            instance = new DataManager();
        }
        return instance;		
    }
	/*******************************************************/
	
	private var _callback:Void->Void;
	public var cats:CatsLoader;
	
	
	public function load(callback:Void->Void):Void {	
		_callback = callback;
		
		cats = new CatsLoader();
		cats.load(_onLoad );
	}
	
	function _onLoad() 
	{
		trace("==onLoad==");
		
		if (_callback != null) {
			_callback();
		}
	}
	
	
	
}