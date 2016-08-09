package fbo;
import js.html.Float32Array;
import objects.shaders.CurlNoise;
import sound.MyAudio;
import three.DataTexture;
import three.Mapping;
import three.ShaderMaterial;
import three.Texture;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class SimulationShaderMat extends ShaderMaterial
{

	
/////////////////////////////////////		
	private var _vertex:String  = "
		varying vec2 vUv;
		varying float vLife;
		attribute float life;
		//varying float fragDepth;
		void main() {
			vLife = life;
			vUv = vec2(uv.x, uv.y);
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}	
	";
	
	
	
	
/////////////////////////////////////	
	private var _fragment:String = CurlNoise.glsl+ "

// simulation

varying vec2 vUv;
varying float vLife;
uniform sampler2D texture;
uniform float timer;
uniform float frequency;
uniform float amplitude;
uniform float maxDistance;
uniform float freqByteData[32];
uniform float strength;
uniform vec3 freqs;
uniform vec3 start;
void main() {

    vec3 pos = texture2D( texture, vUv ).xyz;
	
    //vec3 tar = pos + curl( pos.x * frequency, pos.y * frequency, pos.z * frequency ) * amplitude;
    //float d = length( pos-tar ) / maxDistance;
    //pos = mix( pos, tar, pow( d, 5. ) );
	
	float rr = 0.2 * sin(timer * 0.1);
	vec3 vv = curlNoise(pos * rr);/////koko
	vv.x *= freqs.x / 255.0 * 10.0 * strength;
	vv.y *= freqs.y / 255.0 * 10.0 * strength;
	vv.z *= freqs.z / 255.0 * 10.0 * strength;
	
    //pos = pos + vv * 2.5;
	pos = pos + vv;// * freqByteData[3] / 255.0 * 10.0;
	
    //pos.y += hoge.y * 2.1;
    //pos.z += hoge.z * 2.1;
	float nn = fract( timer + vLife );
	
	
	if ( nn > 0.95 ) {
		//if (length(pos) > 500.0) {
		pos = start + curlNoise( vec3(vLife*10.0,vLife*11.1,vLife*13.3) ) * 10.0;// * 0.01;
	}
	
    gl_FragColor = vec4( pos, 1. );//pos wo hozon

}	
	";
	
	
	private var _idx1:Int = 0;
	private var _idx2:Int = 1;
	private var _idx3:Int = 2;
	var _rad:Float =0;
	
	
	public function new(ww:Int, hh:Int) 
	{
		var width:Int = ww;
		var height:Int = hh;
		
//var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat, THREE.FloatType, THREE.DEFAULT_MAPPING, THREE.RepeatWrapping, THREE.RepeatWrapping );
		
		var data:Float32Array = getSphere( width * height, 250 );
        var texture:DataTexture = new DataTexture( 
			data, 
			width,
			height, 
			untyped __js__("THREE.RGBFormat"), 
			untyped __js__("THREE.FloatType"), 
			untyped __js__("THREE.DEFAULT_MAPPING"), 
			untyped __js__("THREE.RepeatWrapping"), 
			untyped __js__("THREE.RepeatWrapping")
		);
        texture.needsUpdate = true;

       super({
                uniforms: {
                    texture: { type: "t", value: texture },
                    //texture2: { type: "t", value: texture },
                    timer: { type: "f", value: 0},
                    frequency: { type: "f", value: 0.01 },
                    amplitude: { type: "f", value: 96 },
                    maxDistance: { type: "f", value: 48 },
					freqByteData:{type:"fv1",	value:MyAudio.a.freqByteDataAry},//Uint8Array
					freqs: { type: "v3", value: new Vector3( 0, 1, 2 ) },
					start: { type: "v3", value: new Vector3( 0, 1, 2 ) },
					strength: { type: "f", value: 1 }
                },
                vertexShader: _vertex,
                fragmentShader:  _fragment
        });		
		
	}
	
	public function next():Void {
		
		_idx1 = Math.floor( 12 * Math.random() );
		_idx2 = Math.floor( 12 * Math.random() );
		_idx3 = Math.floor( 12 * Math.random() );
		
	}
	
	/**
	 * 
	 * @param	a
	 */
	public function update(a:MyAudio):Void {
		
		uniforms.timer.value += 0.001;
		uniforms.freqByteData.value = a.freqByteDataAry;
		uniforms.freqs.value.x = a.freqByteDataAry[_idx1];
		uniforms.freqs.value.y = a.freqByteDataAry[_idx2];
		uniforms.freqs.value.z = a.freqByteDataAry[_idx3];
		
		var amp:Float = Math.pow( a.freqByteDataAry[10] / 255, 2) * 300;
		_rad += 0.01;
		
		uniforms.start.value.x = amp * Math.sin( _rad*0.86 );
		uniforms.start.value.y = amp * Math.cos( _rad*0.79 );
		uniforms.start.value.z = amp * Math.sin( _rad * 0.90 );
		
	}
	
	
	/**
	 * 
	 * @param	count
	 * @param	size
	 * @return
	 */
	private function getSphere( count:Int, size:Float ):Float32Array{

            var len:Int = count * 3;
            var data = new Float32Array( len );
            var p:Vector3 = new Vector3();
			
			var i:Int = 0;
            for( j in 0...len )
            {
                getPoint( p, size );
                data[ i     ] = p.x;
                data[ i + 1 ] = p.y;
                data[ i + 2 ] = p.z;
				i += 3;
            }
            return data;
    }
	
	
	private function getPoint(v:Vector3, size:Float ):Vector3
    {
            //the 'discard' method, not the most efficient
            v.x = Math.random() * 2 - 1 ;
            v.y = Math.random() * 2 - 1 ;
            v.z = Math.random() * 2 - 1 ;
            if(v.length()>1)return getPoint(v,size);
            return v.normalize().multiplyScalar(size);

            //exact but slow-ish
            /*
            var phi = Math.random() * 2 * Math.PI;
            var costheta = Math.random() * 2 -1;
            var u = Math.random();

            var theta = Math.acos( costheta );
            var r = size * Math.cbrt( u );

            v.x = r * Math.sin( theta) * Math.cos( phi );
            v.y = r * Math.sin( theta) * Math.sin( phi );
            v.z = r * Math.cos( theta );
            return v;
            //*/
    }
	
}