package fbo;
import js.html.Float32Array;
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
		//varying float fragDepth;
		void main() {
			vUv = vec2(uv.x, uv.y);
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}	
	";
	
	
	
	
/////////////////////////////////////	
	private var _fragment:String = "

// simulation

varying vec2 vUv;
uniform sampler2D texture;
uniform float timer;
uniform float frequency;
uniform float amplitude;
uniform float maxDistance;

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float noise(vec2 v)
{
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    // Other corners
    vec2 i1;
    //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
    //i1.y = 1.0 - i1.x;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    // x0 = x0 - 0.0 + 0.0 * C.xx ;
    // x1 = x0 - i1 + 1.0 * C.xx ;
    // x2 = x0 - 1.0 + 2.0 * C.xx ;
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec3 curl(float	x,	float	y,	float	z)
{

    float	eps	= 1., eps2 = 2. * eps;
    float	n1,	n2,	a,	b;

    x += timer * .05;
    y += timer * .05;
    z += timer * .05;

    vec3	curl = vec3(0.);

    n1	=	noise(vec2( x,	y	+	eps ));
    n2	=	noise(vec2( x,	y	-	eps ));
    a	=	(n1	-	n2)/eps2;

    n1	=	noise(vec2( x,	z	+	eps));
    n2	=	noise(vec2( x,	z	-	eps));
    b	=	(n1	-	n2)/eps2;

    curl.x	=	a	-	b;

    n1	=	noise(vec2( y,	z	+	eps));
    n2	=	noise(vec2( y,	z	-	eps));
    a	=	(n1	-	n2)/eps2;

    n1	=	noise(vec2( x	+	eps,	z));
    n2	=	noise(vec2( x	+	eps,	z));
    b	=	(n1	-	n2)/eps2;

    curl.y	=	a	-	b;

    n1	=	noise(vec2( x	+	eps,	y));
    n2	=	noise(vec2( x	-	eps,	y));
    a	=	(n1	-	n2)/eps2;

    n1	=	noise(vec2(  y	+	eps,	z));
    n2	=	noise(vec2(  y	-	eps,	z));
    b	=	(n1	-	n2)/eps2;

    curl.z	=	a	-	b;

    return	curl;
}



void main() {

    vec3 pos = texture2D( texture, vUv ).xyz;

    //vec3 tar = pos + curl( pos.x * frequency, pos.y * frequency, pos.z * frequency ) * amplitude;
    //float d = length( pos-tar ) / maxDistance;
    //pos = mix( pos, tar, pow( d, 5. ) );
	float rr = 0.01;
	vec3 vv = curl(pos.x * rr, pos.y * rr, pos.z * rr);
	float spd = length(vv);
	if ( spd < 1.0 ) {
		vv.x = vv.x / spd;
		vv.y = vv.y / spd;
		vv.z = vv.z / spd;
	}
    pos = pos + vv * 13.5;
    //pos.y += hoge.y * 2.1;
    //pos.z += hoge.z * 2.1;
       
	if ( length(pos) > 500.0 ) {
		pos = curl(pos.x, pos.y, pos.z) * 100.0;
	}
	
    gl_FragColor = vec4( pos, 1. );//pos wo hozon

}	
	";
	
	
	
	
	public function new(ww:Int, hh:Int) 
	{
		var width:Int = ww;
		var height:Int = hh;
		
//var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat, THREE.FloatType, THREE.DEFAULT_MAPPING, THREE.RepeatWrapping, THREE.RepeatWrapping );
		
		var data:Float32Array = getSphere( width * height, 128 );
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
                    texture2: { type: "t", value: texture },
                    timer: { type: "f", value: 0},
                    frequency: { type: "f", value: 0.01 },
                    amplitude: { type: "f", value: 96 },
                    maxDistance: { type: "f", value: 48 }
                },
                vertexShader: _vertex,
                fragmentShader:  _fragment
        });		
		
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