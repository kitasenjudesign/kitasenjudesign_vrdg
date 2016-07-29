package planes;
import createjs.easeljs.Point;
import data.TextureData;
import js.Browser;
import planes.rtt.RTTTexture;
import planes.rtt.RTTTextures;
import sound.MyAudio;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneGeometry;
import three.Texture;
import three.Vector2;
import three.Vector3;
import three.WebGLRenderer;
import three.WebGLRenderTarget;

/**
 * ...
 * @author nabe
 */
class RTTPlane extends PlaneBase
{

	private var _mate:MeshBasicMaterial;
	private var _geo:PlaneGeometry;
	private var _mesh:Mesh;
	//private var _renderTarget:WebGLRenderTarget;
	private var _pos:Vector2;
	
	private var _vx:Float = 0;
	private var _vy:Float = 0;
	private var _vz:Float = 0;
	private var _count:Int = 0;
	private var _vr:Float = 0;
	private var _rttTexture:RTTTexture;
	private var _oldPos:Vector2;
	private var _oldRad:Float = 0;
	
	private var _moveRad:Float = 2*Math.PI*Math.random();
	private var _moveSpd:Float = 4*Math.random()+0.3;
	var _speedRad:Float=0;
	var _life:Int=0;
	var _lifePower:Float=1;
	var _minAmpRatio:Float = 0;
	var _boost:Float = 1;
	
	public function new() 
	{super();	
	}
	
	
	/**
	 * init
	 * @param	callback
	 */
	override public function init(callback:PlaneBase->Void):Void {
		_callback = callback;
		_pos = new Vector2();
		_oldPos = new Vector2();
		_oldRad = 0;
		_geo = new PlaneGeometry(RTTTexture.width, RTTTexture.height, 1, 1);	
		_life = Math.floor( 30 + 60 * Math.random() );
		_lifePower = 0.5 + 2 * Math.random();		
		_rttTexture = RTTTextures.getNext();
		_rttTexture.start(10, _life);
		
//_rttTexture.setIconIndex( 10 );
// Math.floor( Math.random() * 100 ));
//_mate = new MeshBasicMaterial( { /*map:texture,*/ color:Math.floor(0xffffff*Math.random()),side:Three.DoubleSide,transparent:true,opacity:0.9 } );

		_mate = new MeshBasicMaterial( { map:_rttTexture.getRenderTarget(), side:Three.DoubleSide, transparent:true, depthTest:false } );
		_mate.needsUpdate = true;
		_mate.transparent = true;
		
		_mesh = new Mesh(_geo, _mate); add(_mesh);
		_vx = 0.5 + 12 * (Math.random() - 0.5 );
		_vy = 0.5 + 12 * (Math.random() - 0.5 );
		//_vz = 0.5 + 12 * (Math.random() - 0.5);
		_vr = (Math.random() - 0.5) * 1;
		
		position.z = 10 * (Math.random() - 0.5);
		//Browser.window.alert("len = "+_geo.vertices.length);

		_minAmpRatio = Math.random() * 0.3;
		_moveSpd = 15 * Math.pow(Math.random(), 3) + 0.3;

		_geo.vertices[2].x = 0;
		_geo.vertices[2].y = 0;
		_geo.vertices[3].x = 0;
		_geo.vertices[3].y = 0;
	
		_geo.vertices[0].x =0;
		_geo.vertices[0].y = 0;
		_geo.vertices[1].x = 0;
		_geo.vertices[1].y = 0;		
		
		
		this.visible = false;

		
		
	}
	

	override public function setIcon(idx:Int):Void {
		//shader.setIconIndex( idx );
		//selectIndex = idx;
		if(_rttTexture!=null)_rttTexture.setIconIndex( idx );
	}	
	
	
	
	/**
	 * 
	 */
	override public function update(audio:MyAudio):Void {		
		
		if (_count == 0) {
			
			_boost = 1 + Math.pow( audio.subFreqByteData[3]/255, 7) * 2;
			
		}
		_count++;
		
		if (_count >= _life) {	_callback(this);	}
		
		
		var ratio:Float = Math.pow(Math.sin( _count / _life * Math.PI ), _lifePower);
		
		if ( audio.subFreqByteData[4]/255 > 0.2) {
			_speedRad += audio.subFreqByteData[5] * 0.002;
			//_speedRad += 2 * Math.PI * (Math.random() - 0.5) / 200;
		}
			
		_speedRad *= 0.97;
		_moveRad += _speedRad;
		// (Math.random() - 0.5) * 2 * Math.PI / 120;
		_moveSpd += Math.pow(audio.freqByteData[4]/255, 5);
		_moveSpd *= 0.95;
		_vx = _moveSpd * Math.cos(_moveRad);
		_vy = _moveSpd * Math.sin(_moveRad);
	
		_pos.x += _vx;
		_pos.y += _vy;
		
		var dx:Float = _pos.x - _oldPos.x;
		var dy:Float = _pos.y - _oldPos.y;	
		var rad:Float = Math.atan2(dy, dx);
		_geo.verticesNeedUpdate = true;
		
		
		var react:Float = Math.pow( audio.freqByteData[5] / 255, 1);
		var amp:Float = _boost * react * RTTTexture.width / 4 * Math.sin(_count * audio.freqByteData[0] / 255 * 0.01) + RTTTexture.width * _minAmpRatio;
		amp *= ratio;
		_geo.vertices[2].x = _geo.vertices[0].x;
		_geo.vertices[2].y = _geo.vertices[0].y;
		_geo.vertices[3].x = _geo.vertices[1].x;
		_geo.vertices[3].y = _geo.vertices[1].y;
	
		_geo.vertices[0].x = _pos.x + amp * Math.cos(rad - Math.PI / 2);
		_geo.vertices[0].y = _pos.y + amp * Math.sin(rad - Math.PI / 2);
		_geo.vertices[1].x = _pos.x + amp * Math.cos(rad + Math.PI / 2);
		_geo.vertices[1].y = _pos.y + amp * Math.sin(rad + Math.PI / 2);
		
		_oldPos.x = _pos.x;
		_oldPos.y = _pos.y;
		_oldRad = rad;
		this.visible = true;
		
		/*var v:Vector3 = new Vector3(_vx, _vy, _vz);//_vyに応じて高さを変更する_mesh.scale.y = ( v.length() / (RTTTexture.height) )*1.5;//_rttTexture.setSize(_vy);_vx *= 0.99;_vy *= 0.99;_vz *= 0.99;if ( audio != null && audio.isStart ) {	this.scale.x += ( 0.2+ audio.freqByteData[0] / 255 - scale.x) / 4;	//this.scale.x *= 1 - _count / 200;}this.rotation.z += _vr / 30;this.position.x += _vx;this.position.y += _vy;//this.position.z += _vz;*/
	}
	
	override public function kill():Void {
	
	}
	
}