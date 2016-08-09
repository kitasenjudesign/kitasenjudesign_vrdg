package dede;
import common.StageRef;
import sound.MyAudio;
import three.Geometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.PlaneBufferGeometry;
import tween.easing.Power0;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author watanabe
 */
class BlinkPlane extends Mesh
{

	private var _geo:PlaneBufferGeometry;
	private var _mat:MeshBasicMaterial;
	private var _light:Float = 0;
	private var _twn:TweenMaxHaxe;
	public function new() 
	{
		
		_geo = new PlaneBufferGeometry(StageRef.stageWidth, StageRef.stageHeight, 1, 1);
		_mat = new MeshBasicMaterial( { color:0x000000 } );
		super(cast _geo, _mat);
		
	}
	
	public function setLight(a:MyAudio):Void {
		
		if (!visible) return;
		
		var ff:Float = a.subFreqByteData[9];
		if (ff < 0) ff = 0;
		
		if (ff > 10) ff = 10;
		ff = ff / 10;
		
		_mat.color.setRGB(ff, ff, ff);
		
	}
	
	public function flash():Void {
		
		if (_twn != null) {
			_twn.kill();
		}
		
		_light = 1;
		_twn = TweenMax.to(this, 0.5, {
			_light:0,
			ease:Power0.easeInOut,
			onUpdate:_onUpdate
		});
		
	}
	
	private function _onUpdate():Void
	{
		_mat.color.setRGB(_light, _light, _light);
	}
	
}