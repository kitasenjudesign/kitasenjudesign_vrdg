package logo;
import logo.LogoData;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshLambertMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class LogoMaterialMaker
{

	
	
	//private var _materials:Array<MeshBasicMaterial>;
	private var _datalist:Array<LogoData>;
	
	public function new() 
	{
	//	super();
	}

	/**
	 * 
	 * @param	ary
	 * @param	texture
	 * @param	ww
	 * @param	hh
	 */
	public function init(ary:Array<Dynamic>,texture:Texture,ww:Float,hh:Float):Void {
		
		
		//var ww:Float = 256;
		//var hh:Float = 512;
		_datalist = [];
		//_materials = [];
		for(i in 0...ary.length){
			
			var data:LogoData = new LogoData(ary[i]);

			//trace(data.x, data.y, data.w, data.h);
			
			var tt:Texture = texture.clone();
				tt.needsUpdate = true;				
				tt.offset.x = data.x / ww;
				tt.offset.y = 1 - (data.y+data.h)/hh;// 1 - data.y / hh;
				tt.repeat.x = data.w / ww;
				tt.repeat.y = data.h / hh;
				tt.minFilter = Three.NearestFilter;
				tt.magFilter = Three.NearestFilter;
				//tt.generateMipmaps = false;
				
			var lumi:Int = 255;// Math.floor( 240 + 25 * Math.random());
			var lumi2:Int = 210;// Math.floor( 200 + 25 * Math.random());
			
			var rgbA:Int = (lumi << 16 | lumi << 8 | lumi);
			var rgbB:Int = (lumi2 << 16 | lumi2 << 8 | lumi2);
		
			var mate1:MeshBasicMaterial = new MeshBasicMaterial(
				{map: tt, side:Three.FrontSide,	transparent:true, color:rgbA, alphaTest:0.9 }
			);
			var mate2:MeshBasicMaterial = new MeshBasicMaterial(
				{map: tt, side:Three.BackSide,	transparent:true, color:rgbB, alphaTest:0.9 }
			);
			
			data.texture = tt; 
			
			data.mate1 = mate1;
			data.mate2 = mate2;
			
			data.color1 = rgbA;
			data.color2 = rgbB;
			
			_datalist[i] = data;
			
		}
		
	}
	
	//
	public function getData(index:Int):LogoData {
		return _datalist[index];
	}
	
	
	
}