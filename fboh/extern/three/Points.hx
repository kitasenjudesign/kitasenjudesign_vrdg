package three;

@:native("THREE.Points")
extern class Points extends Object3D {
	var geometry : Geometry;
	var material : Material;
	var frustrumCulled : Bool;
	var sortParticles : Bool;
	function new( geometry : Geometry, ?material : Material ) : Void;
	override function clone() : PointCloud;
}
