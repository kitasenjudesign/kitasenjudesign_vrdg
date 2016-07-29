package common;
import js.Browser;

/**
 * ...
 * @author watanabe
 */
class WSocket
{

	private var _socket:Dynamic;
	private var _callback:Dynamic->Void;
	
	public function new() 
	{
		
	}
	
	/**
	 * hash ga aruka naika de handan
	 */
	public function init():Void {
		
		var win:Dynamic = Browser.window;
		if(win.io != null){
		
			_socket = untyped __js__("io.connect(window.host)");
			_socket.on("server_to_client", _onRecieve);
		
		}else {
			
			
			
		}
	}
	
	
	public function send(key:Int):Void {
		//Tracer.log("msg " + msg);
		if (_socket != null) {
			_socket.emit("client_to_server", { value:key } );
		}
		//socket.broadcast.emit
		//_socket.broadcast.emit("client_to_server", { value : msg } );
	}
	
	public function addCallback(callback:Dynamic->Void):Void 
	{
		_callback = callback;	
	}
	
	
	private function _onRecieve(data:Dynamic):Void {
		
		//Browser.window.alert( data.value +" " + data.keyCode );
		data.keyCode = data.value;
		if (_callback != null) {
			_callback(data);
		}
	}
	
}