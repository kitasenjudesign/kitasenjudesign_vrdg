package faces;
import sound.MyAudio;
import three.Color;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.LineSegments;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class MaeLines extends Object3D
{

	private var _line:LineSegments;
	private var _faces:Array<MaeFace>;
	private var _lineIdx:Int=0;
	
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 * @param	faces
	 */
	public function init(faces:Array<MaeFace>):Void {
		
		var geo:Geometry = new Geometry();
		_faces = faces;
		
		//teki touni line wo tsukuru
		for ( i in 0..._faces.length) {
			for( j in 0...5){
				geo.vertices.push(_faces[i].position.clone());
				geo.vertices.push(new Vector3(j * 10, -100, 0));
				geo.colors.push(new Color(0xff0000));
				geo.colors.push(new Color(0x00ff00));
			}
		}
		
		_line = new LineSegments(
			geo,
			new LineBasicMaterial( { color:0xffffff, vertexColors: Three.VertexColors } )
		);
		add(_line);
		
	}
	
	
	/**
	 * update 
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
		
		_resetLine();
		_line.geometry.verticesNeedUpdate = true;		
		_line.geometry.colorsNeedUpdate = true;
		
		var offY:Float = -120;
		
		for (i in 0..._faces.length) {
			
			//閾値を超えた時
			if ( audio.freqByteDataAry[ _faces[i].randomIndex[0] ] > 15 && _faces[i].visible ) {
				
				_faces[i].addForce(1);
				_connectLine(
					_faces[i].position, 
					new Vector3(100*(Math.random()-0.5), offY, 0),
					Math.random()
				);
				
			}
		}
		
	}
	
	private function _resetLine():Void {
		
		_lineIdx = 0;
		for (i in 0..._line.geometry.vertices.length) {
			_line.geometry.vertices[i].set(0, 0, 0);
		}
		
	}
	
	/**
	 * _connectLine
	 * @param	start
	 * @param	end
	 */
	private function _connectLine(ss:Vector3, ee:Vector3,col:Float):Void {
		
		var ox:Float = -15;
		var oy:Float = -15;
		
		_line.geometry.vertices[_lineIdx].set(ss.x+ox, ss.y+oy, ss.z);
		_line.geometry.vertices[_lineIdx + 1].set(ee.x, ee.y, ee.z);
		
		_line.geometry.colors[_lineIdx].setRGB(col, col, col);
		_line.geometry.colors[_lineIdx+ 1].setRGB(col, col, col);
		
		_lineIdx += 2;
	
	}
	
	
}