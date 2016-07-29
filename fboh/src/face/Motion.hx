package face;
import three.Matrix4;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneGeometry;
import three.Quaternion;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class Motion extends Object3D
{

	public var v:Vector3;
	private var _plane:Mesh;
	private var _old:Vector3;
	private var _rad:Float;
	
	public function new() 
	{
		super();
	}
	
	public function init():Void {
		
		_rad = 0;
		_old = new Vector3();
		v = new Vector3();
		_plane = new Mesh(
			new PlaneGeometry(50, 50, 1, 1), 
			new MeshBasicMaterial({color:0xff0000,wireframe:true})
		);
		add(_plane);
	}
	
	public function update():Void {

		
		_rad += Math.PI / 100;
		this.position.x = 300 * Math.cos( _rad*0.2 );
		this.position.y = 300 * Math.sin( _rad );
		this.position.z = 300 * Math.cos( _rad*0.9 );

		// 1. 回転させたいObjectのQuaternionを取得する
		var qq:Quaternion = _plane.quaternion;

		// 2. 回転を加えるためのQuaternionを作成する
		var target:Quaternion = new Quaternion();
		var axis:Vector3 = v.normalize();
		target.setFromAxisAngle(axis, 0);// Math.PI / 2);//soutai
		
		// 3. 回転させる
		//qq.multiply(target);
		_plane.rotation.setFromQuaternion(target);
		
		/*
		 *            
		 var normalAxis = new THREE.Vector3(+xInp.value, +yInp.value, +zInp.value).normalize();
            var dir = new THREE.Vector3();

            dir.crossVectors(up, normalAxis).normalize();
            var dot = up.dot(normalAxis);// / (up.length() * normalAxis.length());
            var rad = Math.acos(dot);
            //(cnt++ % 10 === 0) ? console.log(rad * 180 / Math.PI) : '';
            q.setFromAxisAngle(dir, rad);
            mesh.rotation.setFromQuaternion(q);

            var from = normalAxis.clone();
            var to = normalAxis.clone();
            from.multiplyScalar(25);
            to.multiplyScalar(-25);
            normal.geometry.vertices[0] = from;
            normal.geometry.vertices[1] = to;
            normal.geometry.verticesNeedUpdate = true;
   */
		
		v.x = this.position.x - _old.x;
		v.y = this.position.y - _old.y;
		v.z = this.position.z - _old.z;
				
		_old.copy(this.position);

	}
	
}