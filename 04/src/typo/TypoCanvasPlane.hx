package typo;
import createjs.easeljs.Graphics;
import createjs.easeljs.Shape;
import createjs.easeljs.Stage;
import createjs.easeljs.Text;
import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import logo.LogoData;
import logo.Logos;
import three.BoxGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshLambertMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import three.PlaneGeometry;
import three.Texture;
import three.Vector3;
import three.Vertex;

/**
 * ...
 * @author nab
 */
class TypoCanvasPlane extends Object3D
{

	
	//public var MAX:Int = 10;
	public var SEG_X:Int = 16;
	public var SEG_Y:Int = 1;
	
	private var _spaceX:Float = 0;
	private var _texture:Texture;
	private var _context:CanvasRenderingContext2D;
	private var _stage:Stage;
	private var _positions	:Array<Array<Vector3>>;
	private var _distance	:Array<Array<Float>>;
	private var _plane:Mesh;
	private var _cubes:Array<Mesh>;
	private var _count:Int = 0;
	
	private var _v0:Vector3;
	private var _v1:Vector3;
	var geo:PlaneBufferGeometry;
	var _geoPos:Array<Float>;
	var _plane2:Mesh;
	var _index:Int = 0;
	var _scale:Float = 1.5;
	
	public function new() 
	{
		super();
	}
	
	public function init():Void {
		
		_v0 = new Vector3();
		_v1 = new Vector3();
		
		_positions = [];
		_distance = [[],[]];
		_cubes = [];
		
		_index = Math.floor( Logos.getLength() * Math.random() );
		
		
		var data:LogoData = Logos.getRandom();//getTexture(_index);
		//_scale = 2;// +1.5 * Math.random();
		_spaceX = data.w * _scale / SEG_X;//
		
		//生成したvideo textureをmapに指定し、overdrawをtureにしてマテリアルを生成
		geo = new PlaneBufferGeometry(data.w*_scale, data.h*_scale, SEG_X, SEG_Y);
		_geoPos = geo.attributes.position.array;

		_plane = new Mesh(cast geo, data.mate1 );
		add(_plane);
		
		_plane2 = new Mesh(cast geo, data.mate2 );
		add(_plane2);
		
		
	}

	public function changeMat(isWhite:Bool):Void {
		
		var data:LogoData = Logos.getRandom();//Logos.getTexture(_index);
		//_scale = 2;// +1.5 * Math.random();
		_spaceX = data.w * _scale / SEG_X;//
		
		data.setWhite(isWhite);
		
		_plane.material = data.mate1;
		_plane2.material = data.mate2;
		
	}
	
	
	public function setScale(s:Float):Void {
		
		this.scale.set(s, s, s);
		
	}
	
	public function update():Void {
		
		var pos:Array<Vector3> = [];
		pos[0] = _getVertex(0, 0).clone();
		pos[1] = _getVertex(0, 1).clone();
		_positions.unshift(pos);
		
		if (_positions.length > SEG_X + 1 ) {
			_positions.pop();
		}
		
		_updateSin();
		
	}
	
	private function _updateSin():Void {
		
		//１距離をはかる、
		//_plane.geometry.verticesNeedUpdate = true;
		geo.attributes.position.needsUpdate = true;
		
		var p0:Vector3 = _plane.worldToLocal( _positions[0][0].clone() );/////0番目の点
		var p1:Vector3 = _plane.worldToLocal( _positions[0][1].clone() );
		_setVertex( _getVertexIndex(0, 0), p0.x, p0.y, p0.z);
		_setVertex( _getVertexIndex(0, 1), p1.x, p1.y, p1.z);
		
		var pB0:Vector3 = p0.clone();// _plane.worldToLocal( _positions[i - 1][0].clone() );
		var pB1:Vector3 = p1.clone();// _plane.worldToLocal( _positions[i - 1][1].clone() );
		
		for (i in 1..._positions.length) {

				var pA0:Vector3 = _plane.worldToLocal( _positions[i][0].clone() );
				var pA1:Vector3 = _plane.worldToLocal( _positions[i][1].clone() );
				
				var v0:Vector3 = new Vector3(pA0.x - pB0.x, pA0.y - pB0.y, pA0.z - pB0.z);
				var v1:Vector3 = new Vector3(pA1.x - pB1.x, pA1.y - pB1.y, pA1.z - pB1.z);
				
				v0.normalize();
				v0.multiplyScalar(_spaceX);//spaceX掛け算
				v1.normalize();
				v1.multiplyScalar(_spaceX);//spaceX掛け算
				
				p0.add(v0);//local
				p1.add(v1);
				
				_setVertex( _getVertexIndex(i, 0),p0.x, p0.y, p0.z );
				_setVertex( _getVertexIndex(i, 1),p1.x, p1.y, p1.z );
				
				pB0 = pA0;
				pB1 = pA1;
				
		}
			
	}
	
	
	private function _setVertex(idx:Int, xx:Float, yy:Float, zz:Float):Void {
		
		_geoPos[idx * 3] = xx;
		_geoPos[idx * 3+1] = yy;
		_geoPos[idx * 3 + 2] = zz;
		
	}
	private function _getVertex(i:Int, j:Int):Vertex {
		/*
		var vv:Vector3 = cast _plane.geometry.vertices[_getVertexIndex(i, j)];
		return _plane.localToWorld(vv.clone());
		*/
		var index:Int = _getVertexIndex(i, j);
		var vv:Vector3 = new Vector3(
			_geoPos[index*3], //---新たに加える頂点のx座標
			_geoPos[index*3+1], //---新たに加える頂点のy座標
			_geoPos[index*3+2] //---新たに加える頂点のz座標		
		);
		return _plane.localToWorld(vv.clone());
		
	}
	
	private function _getVertexIndex(i:Int, j:Int):Int {
		return j * (SEG_X + 1) + i % (SEG_X + 1);
	}
	
}