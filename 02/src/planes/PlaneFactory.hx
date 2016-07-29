package planes;
import common.Dat;
import common.StageRef;
import emoji.EmojiSingleShader;
import js.Browser;
import js.html.Uint8Array;
import planes.rtt.RTTTexture;
import planes.rtt.RTTTextures;
import sound.MyAudio;
import three.BoxGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneGeometry;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class PlaneFactory extends Object3D
{

	public static var _rttTextures:RTTTextures;
	
	private var _planes:Array<PlaneBase>;
	private var _textures:RTTTexture;

	//private var _rttPlane:RTTPlane;
	private var _count:Int = 0;
	private var _num:Int = 0;

	private var _gen:IconGenerator;
	
	public var isActive:Bool = false;
	
	
	public function new() 
	{
		super();
	}

	public function init():Void {
		
		_planes = [];
		
		RTTTextures.init();
		
		
		//試す
		_gen = new IconGenerator();
		_gen.init();
		_gen.reset();
		add(_gen);
		
		/*
		for (i in 0...5) {
			var shader:EmojiSingleShader = new EmojiSingleShader();
			shader.init();
			
			var testPlane:Mesh = new Mesh(
				new PlaneGeometry(30, 30, 1, 1),  
				//new MeshBasicMaterial( { color:0xff00ff } )
				shader.shaderMaterial
			);
			testPlane.position.x = 100 * (Math.random() - 0.5);
			testPlane.position.z = -10-10*Math.random();
			add(testPlane);
		
		}*/
		
		Browser.document.addEventListener("keydown", onKeyDown);
	}
	
	private function onKeyDown(e):Void 
	{
		if (!isActive) return;
		
		switch( Std.parseInt( e.keyCode )) {
			case Dat.RIGHT:
				_reset();
		}
		
		
	}
	
	//初期化。。
	
	
	/**
	 * 
	 * update
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
		
		if (_gen == null) return;
		
		//_rttTextures.update();		
		RTTTextures.update();
		
		var sub:Array<Int> = audio.subFreqByteData;
		
		if (sub != null) {
			
			//if (sub[0] > 60) {
			//	_reset();
			//}
			
			for (i in 0...sub.length) {
				
				if ( (sub[i] > 24 || Math.pow(audio.freqByteData[3]/255,4)>0.3) && children.length<=20) {
					
					
					var g:ImgPlane = _gen.getRandom();
					if(g!=null){
						
						_num++;
						
						var plane:RTTPlane = new RTTPlane();
						plane.init(this.removePiece);
						//var plane:PlaneBase = (Math.random()<0.5) ? new ImgPlane() : new RTTPlane();
						
						plane.position.x = g.position.x;// * (Math.random() - 0.5);//(_num++ % 10)/10 * 2000 - 1000;//StageRef.w * (Math.random()-0.5); 
						plane.position.y = g.position.y;// StageRef.h * (Math.random() - 0.5);
						plane.setIcon(g.selectIndex);
						
						add(plane);
						_planes.push( plane );
					
					}
				}
				
			}
		
		}
			
		//update
		for (i in 0..._planes.length) {
			if (_planes[i] != null) {
				_planes[i].update(audio);
			}
		}
		
		_count++;
		
	}
	
	function _reset():Void
	{
		
		Mosaic.forceClear = true;
		for (i in 0..._planes.length) {
			_planes[i].kill();
			remove(_planes[i]);
		}
		_planes = [];
		_gen.reset();
				
	}
	
	
	
	
	/**
	 * remove!!!
	 * @param	tgt
	 */
	public function removePiece(plane:PlaneBase):Void {
		
		var idx:Int = _planes.indexOf(plane);
		remove( plane );

		if(idx>=0){
			_planes.splice(idx, 1);
		}
		
		trace( "削除" + _planes.length +"/"+children.length );
		
	}
	
	
}