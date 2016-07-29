package data;
import planes.rtt.RTTTextures;
import three.WebGLRenderer;

/**
 * ...
 * @author nabe
 */
class DataManager1
{

	//texture を管理する
	
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

    public static function getInstance():DataManager1{
        if(DataManager1.instance==null){
            internallyCalled = true;
            instance = new DataManager1();
        }
        return instance;		
    }
	/*******************************************************/	
	
	
	public var renderer:WebGLRenderer;
	public var rttTextures:RTTTextures;
	
	
	public function init(callback:Void->Void):Void {
	rttTextures = new RTTTextures();rttTextures.init();
	}
	
	
	
	
}