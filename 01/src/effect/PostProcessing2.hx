package effect;
import effect.pass.DisplacementPass;
import effect.shaders.CopyShader;
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

	private var _renderPass:RenderPass;
	private var _composer:EffectComposer;
	
	//public var vig		:ShaderPass;
	//public var tilt		:ShaderPass;
	public var dhiza	:ShaderPass;
	public var color	:DisplacementPass;
	
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
		
		
		color = new DisplacementPass(); //new ShaderPass(DisplaceShader.getObject(_textures[0]));
		_composer.addPass(color);
		//_composer.addPass(tilt);
		//_composer.addPass(vig);
		
		//_composer.addPass(dhiza);
		_composer.addPass( _copyPass );
		
		//color.renderToScreen = true;
		
		_copyPass.clear = true;
		_copyPass.renderToScreen = true;
		
		if (_callback != null) {
			_callback();
		}
		
	}
	
	public function change(isColor:Bool,isDisplace:Bool):Void {
		
		color.setTexture(isColor,isDisplace);
		
	}
	
	//public function flash():Void {
		
	//	change();
		
	//}
	
	public function render():Void {
		
		
		//color.uniforms.counter.value = counter;
		//_digital.uniforms.seed_x.value = Math.random();
		
	//	v.uniforms.offset.value = 1.0;// Math.random();
		//v.uniforms.darkness.value = 1.0;
		
		_composer.render();//render2
		
		
	}
	
	public function update(audio:MyAudio) 
	{
		color.update(audio);
		
		/*
		tilt.uniforms.v.value = 2 / 512 + 1 / 512 * Math.sin(_rad);
		_rad += Math.PI / 100;
		
		if (audio!=null && audio.isStart) {
			vig.uniforms.darkness.value = 1.1-Math.pow(audio.freqByteData[10] / 255, 4.5)*0.1;
		}*/
	}
	
	
}