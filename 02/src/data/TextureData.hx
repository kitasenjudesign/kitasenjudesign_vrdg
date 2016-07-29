package data;
import three.ImageUtils;
import three.Texture;

/**
 * テクスチャを一元管理する
 * @author nabe
 */
class TextureData
{
	
	public static var emo2048:TextureData = new TextureData("emo2048.png", 2048, 2048);
	public static var emo128:TextureData = new TextureData("emo128.png", 2048, 2048);
	
	//public static var img2:TextureData;// = new TextureData("128/b.png", 512, 512);
	//public static var img3:TextureData;// = new TextureData("128/c.png", 512, 512);
	//public static var img4:TextureData;// = new TextureData("128/d.png", 256, 512);
	//public static var img5:TextureData;// = new TextureData("128/e.png", 256, 512);
	//public static var img6:TextureData;// = new TextureData("128/f.png", 512, 512);
	
	//public static var textures:Array<TextureData> = [img1, img2, img3, img4, img5, img6];
	
	public var url		:String = "";
	public var width	:Float = 0;
	public var height	:Float = 0;
	public var texture	:Texture;
	
	public function new(u:String,w:Float,h:Float) 
	{
		this.url = u;
		this.width = w;
		this.height = h;
		this.texture = ImageUtils.loadTexture(this.url);
		this.texture.minFilter = Three.NearestFilter;
		this.texture.magFilter = Three.NearestFilter;
		
	}
	
	/*
	static public function getRandom():TextureData
	{return textures[Math.floor(textures.length * Math.random())];
	}
	*/
	
}