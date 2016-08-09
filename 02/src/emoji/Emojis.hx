package emoji;
import camera.ExCamera;
import canvas.CanvasSrc;
import canvas.primitives.data.EffectData;
import common.Dat;
import data.TextureData;
import js.Browser;
import sound.MyAudio;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.Object3D;
import three.PointCloud;
import three.Scene;
import three.Vector2;
import three.Vector3;
import three.Vertex;
import tween.easing.Cubic;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author nabe
 */
class Emojis extends Object3D
{
	
	private var _w		:Int;
	private var _h		:Int;
	private var _scale	:Int = 1;
	private var _maxW:Int;
	private var _maxH:Int;
	public var particles:PointCloud;
	public var shader:EmojiShader;
	private var geometry:Geometry;
	public var space:Float = 4;
	//private var counter:Float = 0;
	private var _pos:EmojiSpritePos;
	private var _canvas:CanvasSrc;
	public var pScale:Float = 1;
	//public var scale:Float = 1;
	public var isActive:Bool = true;
	private var _tween:TweenMaxHaxe;
	private var _depth:Float = 0;
	private var _camera:ExCamera;
	private var _mode:Int = 0;
	
	//
	//private var _isSphere		:Bool = false;
	private var _isBlackPixel	:Bool = true;
	private var _isDepth		:Bool = false;// false;
	private var _isRotate		:Bool = false;
	private var _isCurl:Bool = false;
	private var _depthDir:Float = 1;
	
	
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 * @param	scene
	 */
	public function init(scene:Scene,camera:ExCamera, maxW:Int, maxH:Int):Void {
		
		_camera = camera;
		
		_canvas = new CanvasSrc();
		_canvas.init();
		
		_pos = new EmojiSpritePos(TextureData.emo2048b);
		_pos.init();
		
		_maxW = maxW;
		_maxH = maxH;
		
		shader = new EmojiShader();
		shader.init();
		
		geometry = new Geometry();
		
		for ( j in 0...maxH) {
			 for (i in 0...maxW) {	
				var vertex:Vector3 = new Vector3();
				vertex.x = i * space - (maxW - 1) * space / 2;
				vertex.y = - (j * space - (maxH - 1) * space / 2 );
				geometry.vertices.push(vertex);
			}
        }
        
		particles = new PointCloud(geometry, shader.shaderMaterial);
        particles.sortParticles = true;
		
		//particles.scale.set(5, 5, 5);
		
        scene.add(particles);

		//解像度はここで。
		_twnWide();
		//Browser.window.alert( "hoge" );
		
		
		Browser.document.addEventListener("keydown", _onDown);
	}
		
	private function _onDown(e):Void {
	
		
		if ( !isActive ) return;
		
		var keyCode:Int = Std.parseInt( e.keyCode );
		
		if ( keyCode == Dat.I) {
			
			_pos.setCounterIndex(Math.random());
			
		}else if ( keyCode == Dat.N) {
			_isCurl = !_isCurl;// Math.random() < 0.5 ? true : false;
			
		}else if ( keyCode == Dat.RIGHT ) {
		
			_isCurl = Math.random() < 0.2 ? true : false;
			
			var data:EffectData = _canvas.next(false);//random
			
			//
			_pos.setRandomIndex( Math.random() < 0.5 ? true : false);
			_pos.setRange(
				Math.random(),
				Math.pow(Math.random(),2)
			);
			
			_isBlackPixel = data.getIsBlackPixel();// (Math.random() < 0.5) ? true : false;
			
			//Browser.window.alert("isBlack " + _isBlackPixel);
			_depthDir = 1;// Math.random() < 0.2 ? -1 : 1;
			//_depthDir = Math.random() < 0.2 ? -1 : 1;
			//_camera.radX = 0;
			
		}else if ( keyCode == Dat.LEFT ) {
			//_twnZoom();
			_tweenZoom(true);
			
		}else if(keyCode==Dat.UP){
			//_twnWide();
			_tweenZoom(false);
			
		}else if (keyCode == Dat.DOWN) {
			//さげる
			_tweenWide();			
		}else if ( keyCode == Dat.P ) {
			
			_isDepth = !_isDepth;
			
			}else if (keyCode == Dat.R) {
			_isRotate = !_isRotate;
			if(_isRotate){
				_isDepth = true;
			}
		}
		
		//sara ni normal demo depth
		
	}
	
	
	//
	private function _tweenZoom(loop:Bool=false):Void {
		var ary:Array<Float> = [
			0.1,0.2
		];
		if (_tween != null)_tween.kill();
		
		_tween = TweenMax.to(this, 1.5, {
			_scale:ary[Math.floor(Math.random()*ary.length)],//+0.4*Math.random(),
			ease:Cubic.easeInOut,
			onComplete:loop ? _tweenWide : null
		});
	}
	
	//
	private function _tweenWide():Void {
		var ary:Array<Float> = [
			1,1,1,0.6+0.4*Math.random()
		];
		if (_tween != null)_tween.kill();		
		
		_tween = TweenMax.to(this, 1.5, {
			_scale:ary[Math.floor(Math.random()*ary.length)],
			ease:Cubic.easeInOut
		});	
		
	}
	
	
	//////////////////////tween
	function _twnWide() 
	{
		var ary:Array<Float> = [
			1,0.5,0.5+0.5*Math.random()
		];
		if (_tween != null) {
			_tween.kill();
		}
		_tween = TweenMax.to(this, 2, {
			_scale:ary[Math.floor(Math.random()*ary.length)],
			ease:Cubic.easeInOut
		});
	}
	
	function _twnZoom() 
	{
		var ary:Array<Float> = [
			0.04,0.02,0.1,0.2
		];
		if (_tween != null) {
			_tween.kill();
		}
		_tween = TweenMax.to(this, 2, {
			_scale:ary[Math.floor(Math.random()*ary.length)],//+0.4*Math.random(),
			ease:Cubic.easeInOut
		});
	}
	
	
	
	
	
	public function update(audio:MyAudio):Void {
		

		_rotate();
		
		_pos.update(audio);
		
		var tgtW:Int = Math.floor( _scale * CanvasSrc.W );
		var tgtH:Int = Math.floor( _scale * CanvasSrc.H );
		
		this.space = 1 / _scale * 10;
		this.pScale = 1 / _scale * 0.5;
		
		_canvas.update(audio);
			
		if(audio.freqByteData!=null && audio.freqByteData.length>10){
			_depth = _depthDir * (Math.pow(audio.freqByteData[3] / 255, 2) * 2 + 1);
		}
		
		//}
		_w = tgtW;// Main.W;
		_h = tgtH;// Math.H;
		
		shader.uniforms.scale.value = pScale;
		
		//
		var tgtSt:Float = Math.pow(audio.freqByteData[6] / 255, 2) * 300;
		if (!_isCurl) {
			tgtSt = 0;
		}
		shader.uniforms.strength.value += (tgtSt - shader.uniforms.strength.value) / 8;
		//
		var tgtSd:Float = Math.pow(audio.freqByteData[2] / 255, 3) * 1;		
		shader.uniforms.seed.value += (tgtSd - shader.uniforms.seed.value) / 8;
		//
		shader.uniforms.counter.value += 0.02;
		
		
		_setPixels();
		
		//
		_reposition(tgtW, tgtH, _canvas);
		
		
    }	
	
	private function _rotate():Void
	{
		//////////////kaiten toka, seirisuru
		if(_isRotate){
			_camera.radX += Math.PI / 300;
			_camera.radY = Math.PI / 4;
			_camera.amp = 1000;
						
		}else{
			_camera.radX = 0;// -_camera.radX) / 2;
			_camera.radY = Math.PI / 2 * 0.99;
			_camera.amp = 1000;
		}		
	}

	
	private function _setPixels():Void {
		
		var index:Int = 0;
		for(i in 0..._w*_h){
	
			var xx:Int = i % _w;
			var yy:Int = Math.floor(i / _w);			
			var light:Float 
			= _canvas.getPixel(Math.floor(xx/_w*_maxW), Math.floor((yy/_h*_maxH)));
			
			//kurowo egakanai
			if(_isBlackPixel){
				if(light >= 2){
					shader.attributes.aOffset.value[i] = _pos.getIconPos(light);
				}else {
					shader.attributes.aOffset.value[i] = new Vector2(0, 0);
				}
			}else{
				shader.attributes.aOffset.value[i] = _pos.getIconPos(light);
			}
			
		}		
		
	}
	

	
	//_w,_hを並べ替える
	private function _reposition(ww:Int,hh:Int,src:CanvasSrc):Void {
	
		var index:Int = 0;
		
		particles.geometry.verticesNeedUpdate = true;
		var len:Int = ww * hh;
		
		//counter++;
		
		var maxY:Int = 0;
		for (i in 0...len) {
			
			var vertex:Vertex = particles.geometry.vertices[i];
			var xx:Int = i % ww;
			var yy:Int = Math.floor(i / ww);

			maxY = cast Math.max(maxY, yy);
			//if(vertex != null){
				vertex.x = xx * space - (ww - 1) * space / 2;	
				vertex.z = - (yy * space) + (hh - 1) * space / 2;
				
				var tgtY:Float = _depth * ( src.getPixel(Math.floor(xx / _w * _maxW), Math.floor(yy / _h * _maxH)) );
				
				if (_isDepth) {
					vertex.y += (tgtY - vertex.y) / 2;
				}else{
					vertex.y += (0 - vertex.y) / 2;
				}
				// - vertex.y) / 1.2;// 2;  //_depth * ( src.getPixel(Math.floor(xx / _w * _maxW), Math.floor(yy / _h * _maxH)) );
				
			//}				
		}
        
		//それいがい
		for ( i in len..._maxW * _maxH) {
			
			var vertex:Vertex = particles.geometry.vertices[ i ];
			vertex.z = -8000;
			
		}
		
		
	}
	
	
	
	
	
	
	
	
}