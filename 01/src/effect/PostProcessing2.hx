package effect;
import effect.pass.ColorMapPass;
import effect.pass.DisplacementPass;
import effect.pass.XLoopPass;
import effect.shaders.CopyShader;
import objects.data.EffectData;
import sound.MyAudio;
import three.PerspectiveCamera;
import three.postprocessing.EffectComposer;
import three.postprocessing.RenderPass;
import three.postprocessing.ShaderPass;
import three.Scene;
import three.WebGLRenderer;

/**
 * ...
 * @author nabe
 */
class PostProcessing2
{

	public static inline var MODE_NORMAL			:String = "MODE_NORMAL";
	public static inline var MODE_DISPLACEMENT_A	:String = "MODE_DISPLACEMENT_A";
	public static inline var MODE_DISPLACEMENT_B	:String = "MODE_DISPLACEMENT_B";
	public static inline var MODE_COLOR				:String = "MODE_COLOR";
	
	private var _modeList:Array<String> = [
		MODE_NORMAL,
		MODE_DISPLACEMENT_A,
		MODE_DISPLACEMENT_B,
		MODE_COLOR
	];
	
	private var _mode:Int = 0;
	private var _renderPass:RenderPass;
	private var _composer:EffectComposer;
	
	private var _xLoopPass		:XLoopPass;
	private var _displacePass	:DisplacementPass;
	private var _colorPass		:ColorMapPass;
	
	private var _scene	:Scene;
	private var _camera	:PerspectiveCamera;
	private var _copyPass:ShaderPass;
	private var _rad:Float=0;
	private var _renderer:WebGLRenderer;
	
	//private var _textures:Array<Texture>;
	//private var _currentTexture:Texture;
	private var _callback:Void->Void;
	private var strength:Float=0;
	
	public function new() 
	{
		
	}

	public function init(scene:Scene,camera:PerspectiveCamera,renderer:WebGLRenderer,callback:Void->Void):Void {
		
		_callback = callback;
		_scene = scene;
		_camera = camera;
		_renderer = renderer;
		
		_renderPass = new RenderPass( scene, camera );
		//_renderPass
		_copyPass = new ShaderPass( CopyShader.getObject() );
		
		_composer = new EffectComposer( renderer );
		_composer.addPass( _renderPass );
		
		//
		_displacePass = new DisplacementPass();
		_displacePass.enabled = false;
		_composer.addPass( _displacePass );
		
		//passes
		_xLoopPass = new XLoopPass();
		_xLoopPass.enabled = true;
		_composer.addPass(_xLoopPass);
		
		//color
		_colorPass = new ColorMapPass();
		_colorPass.enabled = false;
		_composer.addPass( _colorPass );
		
		
		_composer.addPass( _copyPass );
		_copyPass.clear = true;
		_copyPass.renderToScreen = true;
		
		if (_callback != null) {
			_callback();
		}
		
	}
	
	
	//color 
	//displace1
	//displace2
	public function changeDisplace(data:EffectData):Void {
		
		switch ( data.displaceType ) {
			case EffectData.DISPLACE_NONE:
				
				_xLoopPass.enabled = false;
				_displacePass.enabled = false;
				
			case EffectData.DISPLACE_X:

				_xLoopPass.enabled = true;
				_xLoopPass.setTexture(false, true);
				_displacePass.enabled = false;
				
			case EffectData.DISPLACE_MAP:
				
				_xLoopPass.enabled = false;
				_displacePass.enabled = true;
				_displacePass.setTexture(false, true);
				
		}
		
	}
	
	public function nextTexture():Void {
		
		_displacePass.setTexture(false, true);
		
	}
	
	public function changeColor(data:EffectData):Void{
		
		switch ( data.colorType ) {
			case EffectData.COLOR_NONE:
				_colorPass.enabled = false;
			case EffectData.COLOR_MONO:
				_colorPass.enabled = true;
				_colorPass.setMono(true);
				_colorPass.setTexture();
			case EffectData.COLOR_GRADE:
				_colorPass.enabled = true;
				_colorPass.setMono(false);				
				_colorPass.setTexture();
		}
		
	}
	
	//changeMode 
	/*
	public function changeMode():Void {
		
		var s:String = _modeList[_mode % _modeList.length];
		switch(s) {
			case MODE_NORMAL:
				trace("a");
			case MODE_DISPLACEMENT_A:
				trace("b");
			case MODE_DISPLACEMENT_B:
				trace("c");				
			case MODE_COLOR:
				trace("d");			
		}
		
		_mode++;
	}*/
	
	
	public function update(audio:MyAudio) 
	{
		_xLoopPass.update(audio);
		_displacePass.update(audio);
		_colorPass.update(audio);
		
		_composer.render();
		
		/*
		tilt.uniforms.v.value = 2 / 512 + 1 / 512 * Math.sin(_rad);
		_rad += Math.PI / 100;
		
		if (audio!=null && audio.isStart) {
			vig.uniforms.darkness.value = 1.1-Math.pow(audio.freqByteData[10] / 255, 4.5)*0.1;
		}*/
	}
	
	public function resize(w:Int, h:Int) 
	{
		_composer.setSize(w, h);
	}
	
	
}