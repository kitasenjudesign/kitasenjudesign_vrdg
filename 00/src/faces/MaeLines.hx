package faces;
import camera.ExCamera;
import common.Dat;
import sound.MyAudio;
import three.BoxGeometry;
import three.Color;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.LineSegments;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class MaeLines extends Object3D
{

	private var _line:LineSegments;
	private var _faces:Array<MaeFace>;
	private var _lineIdx:Int = 0;
	private var _hMesh:Mesh;
	private var _tgtPlane:Mesh;
	//public var startY:Float = -150;
	public var posY:Float = -34;
	
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 * @param	faces
	 */
	public function init(faces:Array<MaeFace>):Void {
		
		_hMesh = new Mesh(new BoxGeometry(100, 1, 1), new MeshBasicMaterial( { color:0xffffff } ));
		//add(_hMesh);
		
		var geo:Geometry = new Geometry();
		_faces = faces;
		
		//teki touni line wo tsukuru
		for ( i in 0..._faces.length) {
			var f:MaeFace = _faces[i];
			
			for ( j in 0...5) {
				
				var v1:Vector3 = new Vector3();//_faces[i].position.clone();
				var v2:Vector3 = new Vector3();//new Vector3(j * 10, -100, 0);
				geo.vertices.push(v1);
				geo.vertices.push(v2);
				//geo.colors.push(new Color(0xff0000));
				//geo.colors.push(new Color(0x00ff00));
				
				f.addLineVertex(v1, v2);
				
			}
			
		}
		
		_line = new LineSegments(
			geo,
			new LineBasicMaterial( { color:0xffffff, transparent:true, opacity:0.5/*, vertexColors: Three.VertexColors*/ } )
		);
		add(_line);
		
		Dat.gui.add(this, "posY",-500,500).listen();
		
		#if debug
		//_tgtPlane = new Mesh(untyped new PlaneBufferGeometry(100, 100, 1, 1), new MeshBasicMaterial( { color:0xff0000, wireframe:true } ));
		//add(_tgtPlane);
		#end
	}
	
	
	/**
	 * update 
	 * @param	audio
	 */
	public function update(audio:MyAudio,cam:ExCamera):Void {
		
		
		//
		/*
		var pos:Vector3 = new Vector3(0,0,-400);
		pos.applyQuaternion(cam.quaternion);		
		pos.x = pos.x + cam.position.x;
		pos.y = pos.y + cam.position.y;
		pos.z = pos.z + cam.position.z;
		_tgtPlane.position.copy(pos);
		_tgtPlane.lookAt(cam.position);
		*/
		//obj3d.position = pos;

		
		
		_resetLine();//resetLine;
		
		_line.geometry.verticesNeedUpdate = true;		
		_line.geometry.colorsNeedUpdate = true;
		
		//var offY:Float = startY;// -150;
		
		var scaleX:Float = audio.freqByteData[5] / 255 * 2;
		if (scaleX < 0) scaleX = 0;
		
		_hMesh.scale.x = scaleX;
		_hMesh.position.z = -100;
		_hMesh.position.y = 0;
		
		
		
		for (i in 0..._faces.length) {
			var face:MaeFace = _faces[i];
			
			var idx0:Int = face.randomIndex[0];
			var idx1:Int = face.randomIndex[1];
			var idx2:Int = face.randomIndex[2];
			
			//閾値を超えた時
			var freq0:Float = audio.freqByteDataAry[ idx0 ] / 255;
			var freq1:Float = audio.freqByteDataAry[ idx1 ] / 255;
			var freq2:Float = audio.freqByteDataAry[ idx2 ] / 255;
			
			var freqs:Array<Float> = [freq0, freq1, freq2];
			var idxs:Array<Int> = [idx0, idx1, idx2];
			for(j in 0...3){
				if ( freqs[j] > 0.2 && face.visible ) {
					
					face.addForce(j,freqs[j]);
					
					var pos:Vector3 = new Vector3(scaleX * 100 * (Math.random() - 0.5),posY,-400);
					pos.applyQuaternion(cam.quaternion);
					pos.x = cam.position.x + pos.x;
					pos.y = cam.position.y + pos.y;
					pos.z = cam.position.z + pos.z;
					
					face.connectLine(
						//j, new Vector3(scaleX * 100 * (Math.random() - 0.5), offY, -100),1//start
						j, pos, 1//start
						//j, new Vector3(idxs[j]*10, offY, -100),1//start
					);
					//face.updateGauge(j, freqs[j]);
					
					/*
					 * 
					_connectLine(
						_faces[i].position, 
						new Vector3(scaleX*100*(Math.random()-0.5), offY, -100),
						1//Math.random()
					);*/
					
				}else {
					//face.updateGauge(j, freqs[j]);
				}
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
		var oy:Float = -18;
		
		_line.geometry.vertices[_lineIdx].set(ss.x+ox, ss.y+oy, ss.z);
		_line.geometry.vertices[_lineIdx + 1].set(ee.x, ee.y, ee.z);
		
		_line.geometry.colors[_lineIdx].setRGB(col, col, col);
		_line.geometry.colors[_lineIdx+ 1].setRGB(col, col, col);
		
		_lineIdx += 2;
	
	}
	
	
}