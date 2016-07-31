package logo;
import three.Color;
import three.MeshBasicMaterial;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class LogoData
{

	public var x:Float = 0;
	public var y:Float = 0;
	public var w:Float = 0;
	public var h:Float = 0;
	
	public var filename:String;
	public var texture:Texture;
	public var mate1:MeshBasicMaterial;
	public var mate2:MeshBasicMaterial;
	
	public var color1:Int = 0;
	public var color2:Int = 0;
	
	
	public function new(o:Dynamic) 
	{
		
		this.x = o.frame.x;
		this.y = o.frame.y;
		this.w = o.frame.w;
		this.h = o.frame.h;
		this.filename = o.filename;// ramename;
		
		/*
		"frame": {"x":0,"y":0,"w":88,"h":169},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":88,"h":169},
		"sourceSize": {"w":88,"h":169}
		*/

		/*
		"filename": "hoge0007",
		"frame": {"x":232,"y":223,"w":204,"h":64},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":314,"h":83},
		"sourceSize": { "w":314, "h":83 }
		*/
		
	}
	
	public function setWhite(b:Bool):Void {
		
		if (b) {
			//mate1.color.setHex(color2);
			mate2.color = new Color(0x9999ff); 
		}else {
			//mate1.color.setHex(color1);
			mate2.color = new Color(color2); 			
		}
		
	}
	
	
}