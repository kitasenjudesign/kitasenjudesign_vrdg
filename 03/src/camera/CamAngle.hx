package camera;

import common.Dat;
import js.Browser;
import sound.MyAudio;

/**
 * ...
 * @author nabe
 */
class CamAngle
{


	private var _camera:ExCamera;
	private var _count:Int = 0;
	
	private	var _tgtAmp		:Float = 0;// d.amp;
	private	var _tgtRadX	:Float = 0;// d.radX;
	private	var _tgtRadY 	:Float = 0;// d.radY;	
		
	private	var _addAmp		:Float = 0;// d.amp;
	private	var _addRadX	:Float = 0;// d.radX;
	private	var _addRadY 	:Float = 0;// d.radY;	
	
	
	
	public function new(cam:ExCamera) 
	{
		_camera = cam;
		
		Browser.document.addEventListener("keydown", _onKeyDown);
	}
	
	private function _onKeyDown(e):Void 
	{
		switch( Std.parseInt(e.keyCode)) {
			case Dat.RIGHT:
				//setCam( CamData.cams[_count % CamData.cams.length] );
			
		}
	}
	
	
	
	/**
	 * update
	 * @param	a
	 */
	public function update(audio:MyAudio):Void {
	
		if (audio != null && audio.isStart) {
			
			//if( audio.subFreqByteData[4] > 30){
		
				_count++;
				
				//_addAmp *= 0.97
				_addRadX = Math.sin( _count/20 ) * 0.3;
				_addRadY = Math.cos( _count/20 ) * 0.3;
				
				//setCam( CamData.cams[_count % CamData.cams.length] );
				//_tgtRadX += ();
				//_tgtRadY += 
				
			//}
			
			/*
				_addAmp *= 0.97;
				_addRadX *= 0.97;
				_addRadY *= 0.97;
			*/
			
				//_camera.amp +=  (_tgtAmp+_addAmp - _camera.amp) / 4;
			//	_camera.radX += (_tgtRadX+_addRadX - _camera.radX) / 4;
			//	_camera.radY += (_tgtRadY+_addRadY - _camera.radY) / 4;
				//_tgtRadX += 
				//_tgtRadY += 
				
			
		}
		
	}
	
	/**
	 * 
	 * @param	cam
	 */
	public function setCam(d:CamData):Void {
	
		//Browser.window.alert("setCam");
		_camera.amp 	=  d.amp;
		_camera.radX 	=  d.radX;
		_camera.radY 	=  d.radY;
		
		_tgtAmp 	= d.amp;
		_tgtRadX 	= d.radX;
		_tgtRadY 	= d.radY;
		
		_camera.setPolar(d.amp, d.radX, d.radY);
	}
	
	
	
}