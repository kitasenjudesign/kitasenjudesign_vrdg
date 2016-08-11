package objects;
import common.Config;
import common.Dat;
import common.Path;
import sound.MyAudio;
import three.Geometry;
import three.ImageUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Sphere;
import three.SphereGeometry;
import three.Texture;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class MySphere extends Object3D
{
	
	private var _base:Array<Vector3>;
	private var mesh:Mesh;
	private var _count:Float = 0;
	private var _nejireX:Float = 0;
	private var _nejireY:Float = 0;
	private var _audio:MyAudio;
	private var _noise:Float=0;
	private var _sphere:Float=0;
	private var _noiseSpeed:Float=0;
	private var _scale:Float=0;
	private var _speed:Float=0;
	private var _vr:Float=0;

	private var _tateScaleY:Float = 1;
	private var _tateScaleXZ:Float = 1;
	
	private var _textures:Array<Texture>;
	private var mate:MeshBasicMaterial;
	private var _yokoRatio:Float = 0;
	private var _baseAmp:Array<Float>;
	public var power:Float = 1;

	private var _texIndex:Int = 0;
	
	
	public function new() 
	{
		
		super();
	
		if (!Dat.bg) return;
		
		var texture:Texture = ImageUtils.loadTexture( Path.assets + 'bg/m01.jpg' );

		_textures = [
			texture,
			ImageUtils.loadTexture( Path.assets + 'bg/m02.jpg' ),
			ImageUtils.loadTexture( Path.assets + 'bg/00.jpg' ),
			ImageUtils.loadTexture( Path.assets + 'bg/01.jpg' ),
			//ImageUtils.loadTexture( Path.assets + 'bg/02.jpg' ),			
			ImageUtils.loadTexture( Path.assets + 'bg/03.jpg' )
		];
		
		
		mate = new MeshBasicMaterial( { map: texture/*,side:Three.DoubleSide*/ } );
		mate.color.setRGB(Config.bgLight, Config.bgLight, Config.bgLight);
		
		var g:SphereGeometry = new SphereGeometry(1000, 60, 30 );
		
		mesh = new Mesh( g,mate);
		//mesh.frustumCulled = false;
		mesh.position.z = 0;
		mesh.scale.x = -1;
		mesh.rotation.y = Math.PI / 2;
		mesh.receiveShadow = true;
		

		mesh.geometry.verticesNeedUpdate = true;
		_base = [];
		_baseAmp = [];
		
		for (i in 0...g.vertices.length) {
			var vv:Vector3 = g.vertices[i].clone();
			_base.push(vv);
			_baseAmp.push( vv.length() );
		}
		
		
		add( mesh );
	}
	
	//
	public function changeBg():Bool {
	
		if (!Dat.bg) return false;
		
		mate.map = _textures[_texIndex%_textures.length];
		_texIndex++;
		
		/*
		var idx:Int = Math.floor( Math.random() * (_textures.length - 1));
		if ( Math.random() < 0.05 ) {

			mate.map = _textures[_textures.length - 1];
			mate.wireframe = true;
			return true;
		}else {
			mate.wireframe = false;
			mate.map = _textures[ idx ];
		}		
		*/
		
		return false;
	}
	
	
	
	public function update(audio:MyAudio):Void {
		
		if (!Dat.bg) return;
		
		_audio = audio;
		
		//power = 0.1;
		
		var g:Geometry = mesh.geometry;
		g.verticesNeedUpdate = true;
		_count += _speed;
		_vr *= 0.9;

		if ( Math.abs(_vr) < 0.001) {
			if (_vr == 0) {
				_vr = 0.001;
			}
			_vr = 0.001 * _vr / Math.abs(_vr);
			
		}
		
		this.rotation.y += _vr;
		
		if (_audio!=null && _audio.isStart) {
			_audio.update();
			
			//trace( _audio.freqByteData[14]);
			var pp:Float = (Math.pow( _audio.freqByteData[18] / 255 , 6) ) * 0.1 * power;
			_vr += pp;
		
			if( _audio.freqByteData[19] / 255 > 0.5){
			//	mate.map = _textures[ Math.floor( Math.random() * _textures.length ) ];
			}
			
			_nejireX = Math.pow(_audio.freqByteData[19] / 255, 1.5) * 0.02* power;
			_nejireY = Math.pow(_audio.freqByteData[11] / 255, 2.5)* power;
			
			_noise = Math.pow(_audio.freqByteData[13] / 255, 2) * 0.8* power;
			_speed =  Math.pow( _audio.freqByteData[8] / 255, 2) * 0.2* power;
			_sphere =  0;// Math.pow( _audio.freqByteData[4] / 255, 15);
			_noiseSpeed = 0.01 + Math.pow( _audio.freqByteData[19] / 255, 1.5) * 0.1;
			_scale = 1 + Math.pow(_audio.freqByteData[1] / 255, 1) * 1* power;
			
			_tateScaleY = 1 + Math.pow(_audio.freqByteData[6] / 255, 5) * 0.7* power;
			_tateScaleXZ = 1 + Math.pow(_audio.freqByteData[7] / 255, 5) * 1.5* power;
			
			_yokoRatio = Math.pow(_audio.freqByteData[3] / 255, 1)* power;
			
		}
		
		
		//
		var len:Int = g.vertices.length;
		for (i in 0...len) {
			
			var vv:Vector3 = _base[i];
			var a:Float = _baseAmp[i];// Math.sqrt( vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);
			var radX:Float = -Math.atan2(vv.z, vv.x) + vv.y * Math.sin(_count+vv.y/ (500*_scale) ) * _nejireX;//横方向の角度
			var radY:Float = Math.asin(vv.y / a);// + _nejireY;//縦方向の角度

			var amp:Float = (1-_sphere) * a + (_sphere) * 1;
			amp += Math.sin(_count * 0.7) * _getNoise(vv.x, vv.y + _count * _noiseSpeed, vv.z) * _noise;

			//amp *= _scale;
			
			
			var yoko:Float = Math.sin( 0.01*( vv.y * 2 * Math.PI ) + _count * 3 ) * _yokoRatio * 200;
			
			
			
			var tgtX:Float = amp * Math.sin( radX ) * Math.cos(radY);//横
			var tgtY:Float = amp * Math.sin( radY ) + 600 * _nejireY * Math.sin(Math.atan2(vv.z, vv.x) * 2 + _count * 0.3);
			var tgtZ:Float = amp * Math.cos( radX ) * Math.cos(radY) + yoko;//横
			
			
			
			g.vertices[i].x = tgtX;
			g.vertices[i].y = tgtY;			
			g.vertices[i].z = tgtZ;	
			
			
			//g.faces[i].vertexColors
		}
		
		this.scale.set(_tateScaleXZ, _tateScaleY, _tateScaleXZ);
		
		
	}
		
		
	private function _getNoise(xx:Float,yy:Float,zz:Float):Float
	{
		
		
		var f = untyped __js__("noise.perlin3");
		var n:Float = f(xx, yy, zz);
		return n;
	}
	
	
	
	
	
	
	
	
	
}