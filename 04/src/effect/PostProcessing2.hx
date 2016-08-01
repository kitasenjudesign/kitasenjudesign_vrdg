package effect;
import effect.shaders.CopyShader;
import effect.shaders.Dhiza;
import effect.shaders.LuminosityShader;
import effect.shaders.MyTiltShiftShader;
import effect.shaders.VignetteShader;
import js.Browser;
import sound.MyAudio;
import three.ImageUtils;
import three.Object3D;
import three.PerspectiveCamera;
import three.postprocessing.BloomPass;
import three.postprocessing.EffectComposer;
import three.postprocessing.RenderPass;
import three.postprocessing.ShaderPass;
import three.Renderer;
import three.Scene;
import three.Texture;
import three.WebGLRenderer;
import typo.Textures;

/**
 * ...
 * @author nabe
 */
class PostProcessing2
{

	private var _renderPass:RenderPass;
	private var _composer:EffectComposer;
	
	public var vig		:ShaderPass;
	public var tilt		:ShaderPass;
	public var dhiza	:ShaderPass;
	public var color	:ShaderPass;
	
	private var _scene	:Scene;
	private var _camera	:PerspectiveCamera;
	private var _copyPass:ShaderPass;
	private var _rad:Float=0;
	private var _renderer:WebGLRenderer;
	
	private var _texture1:Texture;
	private var _texture2:Texture;
	
	private var _callback:Void->Void;
	
	public function new() 
	{
		
	}

	/**
	 * 
	 * @param	scene
	 * @param	camera
	 * @param	renderer
	 * @param	callback
	 */
	public function init(scene:Scene,camera:PerspectiveCamera,renderer:WebGLRenderer,callback:Void->Void=null):Void {
		
		_callback = callback;
		_scene = scene;
		_camera = camera;
		_renderer = renderer;
		
		_renderPass = new RenderPass( scene, camera );
		//_renderPass
		_copyPass = new ShaderPass( CopyShader.getObject() );
		
		_composer = new EffectComposer( renderer );
		_composer.addPass( _renderPass );
		
		tilt = new ShaderPass(MyTiltShiftShader.getObject());
		vig = new ShaderPass( VignetteShader.getObject() );
		
		Textures.init();
		
		_texture1 = Textures.getTexture();
		_texture2 = Textures.getTexture();
		
		color = new ShaderPass(LuminosityShader.getObject(_texture1));
		
		/*
		tilt.clear = false;
		vig.clear = false;
		dhiza.clear = false;
		*/
		
		_composer.addPass(color);
		color.renderToScreen = true;
		//_composer.addPass(tilt);
		//_composer.addPass(vig);
		
		//_composer.addPass(dhiza);
		//_composer.addPass( _copyPass );
		
		//color.renderToScreen = true;
		
		_copyPass.clear = true;
		_copyPass.renderToScreen = true;
	
		
		if (_callback != null) {
			_callback();
		}
	}
	
	public function changeTexture():Void {
		_texture1 = Textures.getTexture();
		_texture2 = Textures.getTexture();
	}
	
	public function setting():Void {
		
	
		//_bokeh.uniforms[ "focus" ].value = effectController.focus;
		//_bokeh.uniforms[ "aperture" ].value = effectController.aperture;
		//_bokeh.uniforms[ "maxblur" ].value = effectController.maxblur;
		
	}
	
	
	public function render():Void {
		
		color.uniforms.texture.value = _texture1;
		color.uniforms.texture2.value = _texture2;
		
		
		//_digital.uniforms.seed_x.value = Math.random();
		
	//	v.uniforms.offset.value = 1.0;// Math.random();
		//v.uniforms.darkness.value = 1.0;
		
		_composer.render();//render2
		
		
	}
	
	public function update(audio:MyAudio) 
	{
		/*
		tilt.uniforms.v.value = 2 / 512 + 1 / 512 * Math.sin(_rad);
		_rad += Math.PI / 100;
		
		if (audio!=null && audio.isStart) {
			vig.uniforms.darkness.value = 1.1-Math.pow(audio.freqByteData[10] / 255, 4.5)*0.1;
		}*/
	}
	
	public function resize(ww:Int, hh:Int):Void
	{
		_composer.setSize(ww, hh);
	}
	
	
}