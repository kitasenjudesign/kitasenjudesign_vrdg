package sound;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class DummyBars extends Object3D
{

	
	private var _lines:Array<Line>;
	private var _lines2:Array<Line>;
	
	public function new() 
	{
		super();
	}
	
	public function init():Void {
	
		
		_lines = [];
		_lines2 = [];
		
		var m:LineBasicMaterial = new LineBasicMaterial( { color:0xff0000 } );
		var m2:LineBasicMaterial = new LineBasicMaterial( { color:0xffffff } );

		for ( i in 0...MyAudio.FFTSIZE) {
		
			var g:Geometry = new Geometry();
			g.vertices.push(new Vector3(0, 0, 0));
			g.vertices.push(new Vector3(100, 0, 0));
			var line:Line = new Line(g, m);
			line.position.y = (i-MyAudio.FFTSIZE/2) * 3;//
			line.position.z = 0;
			add(line);
			
			_lines.push(line);
		}

		for ( i in 0...MyAudio.FFTSIZE) {
		
			var g:Geometry = new Geometry();
			g.vertices.push(new Vector3(0, 0, 0));
			g.vertices.push(new Vector3(100, 0, 0));
			var line:Line = new Line(g, m2);
			line.position.y = (i-MyAudio.FFTSIZE/2) * 3+1;//
			line.position.z = 0;
			add(line);
			
			_lines2.push(line);
		}		
		
	}
	
	public function update(audio:MyAudio):Void {
	
		
		//
		if (audio!=null && audio.isStart) {
		
			for (i in 0..._lines.length) {
				
				_lines[i].scale.set(audio.freqByteData[i]/255*2, 1, 1);
				_lines2[i].scale.set(audio.subFreqByteData[i]/255*2, 1, 1);
				
			}
		
		}
	}
	
}