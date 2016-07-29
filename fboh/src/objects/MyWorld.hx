package objects;
import data.MyColors;
import sound.MyAudio;
import three.Object3D;
import three.Sphere;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author nabe
 */
class MyWorld extends Object3D
{
	var _tween:TweenMaxHaxe;

	public var sphere	:MySphere;
	public var face		:MyFace;
	public var lines	:Lines;//
	public var no		:CanvasPlane;
	
	public function new() 
	{
		super();
	}
	
	//
	public function init(dae:MyDAELoader):Void {
	
		//sphere = new MySphere();
		//add(sphere);
		
		face = new MyFace();
		face.init(dae);
		face.position.y = 70;
		add(face);
		
		var ww:Float = 600;
		var noWidth:Float = 200;
		var lineWidth:Float = ww - noWidth;
		
		no = new CanvasPlane();
		no.init(noWidth);
		no.position.x = -ww/2 ;
		no.position.y = -430 + face.position.y;
		add(no);

		
		lines = new Lines();
		lines.init(lineWidth);
		lines.position.x = -ww/2 + noWidth;
		lines.position.y = -430 + face.position.y;
		add(lines);
		
	}
	
	public function setMode(mode:Int,ran:Float):Void {
		face.setMode( mode,ran );
 	}
	
	public function setColor(col:Int,ran:Float):Void {
	
		face.setColor(col, ran);
		
		if (col == MyColors.ORANGE) {
			no.setColor(0x333333);
			lines.setColor(0x333333);						
		}else if(col==0){
			no.setColor(0xffffff);
			lines.setColor(0xffffff);			
		}else {
			no.setColor(MyColors.BLUE);
			lines.setColor(MyColors.BLUE);						
		}
	}
	
	/**
	 * 
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
	
		
		if (face != null) {
			face.update(audio, lines);
			
			if (audio != null && audio.isStart) {
				//trace(audio.freqByteData[0]);
				if ( audio.freqByteData[0] > 200 ) {
					
					face.forceRot(
						1 * (Math.random() - 0.5),
						1 * (Math.random() - 0.5),
						1 * (Math.random() - 0.5)
					);
					
				}			
			}

		}

		
	}
	
	public function updateText():Void
	{
		no.updateText();
	}
	
	public function hide(t:Float) 
	{
		_tween = TweenMax.to(this.scale, t, {
			x:0,y:0,z:0
		});
	}
	
	public function reset() 
	{
		this.scale.set(1, 1, 1);
		face.setParams();
		if (_tween != null)_tween.kill();
		updateText();
		
	}
	
}