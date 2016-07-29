package emoji;
import canvas.CanvasSrc;
import haxe.Timer;
import js.html.ImageData;
import three.BoxGeometry;
import three.Clock;
import three.Geometry;
import three.ImageUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PointCloud;
import three.PointCloudMaterial;
import three.Scene;
import three.ShaderMaterial;
import three.Vector2;
import three.Vector3;
import three.Vertex;
import utils.MyBitmapData;

/**
 * ...
 * @author nabe
 */
class Emojis //extends Object3D
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
	private var counter:Float = 0;
	private var _pos:EmojiSpritePos;
	public var pScale:Float = 1;
	public var scale:Float = 0.5;
	private var src:CanvasSrc;// = new CanvasSrc();//_canvas.init();

	
	public function new() 
	{//super();
	}
	
	/**
	 * 
	 * @param	scene
	 */
	public function init(scene:Scene,maxW:Int, maxH:Int):Void {src = new CanvasSrc();src.init();_pos = new EmojiSpritePos();_pos.init();_maxW = maxW;_maxH = maxH;shader = new EmojiShader();shader.init();geometry = new Geometry();for ( j in 0...maxH) {	 for (i in 0...maxW) {			var vertex:Vector3 = new Vector3();		vertex.x = i * space - (maxW - 1) * space / 2;		vertex.y = - (j * space - (maxH - 1) * space / 2 );		geometry.vertices.push(vertex);	}
        }
        particles = new PointCloud(geometry, shader.shaderMaterial);
        particles.sortParticles = true;
        scene.add(particles);
	}
	public function update():Void {_w = Math.floor( scale * CanvasSrc.W );_h = Math.floor( scale * CanvasSrc.H );shader.uniforms.scale.value = pScale;
counter++;//counter=95;		//アイコンアップデートvar index:Int = 0;//trace( shader.attributes.aOffset.value.length);for(i in 0..._w*_h){		var xx:Int = i % _w;	var yy:Int = Math.floor(i / _w);		var light:Float = src.getPixel(Math.floor(xx/_w*_maxW), Math.floor((1-yy/_h)*_maxH));	if(light != 0){		shader.attributes.aOffset.value[i] = _pos.getIconPos(light);	}else {		shader.attributes.aOffset.value[i] = new Vector2(0, 0);	}}_reposition(_w, _h);
    }	
	
	//_w,_hを並べ替える
	private function _reposition(ww:Int,hh:Int):Void {
	var index:Int = 0;particles.geometry.verticesNeedUpdate = true;var len:Int = ww * hh;counter++;var maxY:Int = 0;for (i in 0...len) {		var vertex:Vertex = particles.geometry.vertices[i];	var xx:Int = i % ww;	var yy:Int = Math.floor(i / ww);
	maxY = cast Math.max(maxY, yy);	//if(vertex != null){		vertex.x = xx * space - (ww - 1) * space / 2;		vertex.y = - (yy * space) + (hh - 1) * space / 2;		vertex.z = 0;// src.getPixel(Math.floor(xx / _w * _maxW), Math.floor(yy / _h * _maxH)) - 128;	//}				}
        //それいがいfor ( i in len..._maxW * _maxH) {		var vertex:Vertex = particles.geometry.vertices[ i ];	vertex.z = -5000;	}
	}
	
	

	
	
	
	
	
	
	
	
}