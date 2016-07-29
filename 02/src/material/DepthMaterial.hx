package material;

/**
 * ...
 * @author watanabe
 */
class DepthMaterial
{

	private var _vertex:String="
	  varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
	";
	
	private var _fragment:String = "
	  #include <packing>

      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform sampler2D tDepth;
      uniform float cameraNear;
      uniform float cameraFar;
      uniform float range;

      float readDepth (sampler2D depthSampler, vec2 coord) {
        float fragCoordZ = texture2D(depthSampler, coord).x;
        float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
        return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
      }

      void main() {
        vec3 diffuse = texture2D(tDiffuse, vUv).rgb;
        float depth0 = readDepth(tDepth, vUv);
        float depth = floor( depth0 * range );
        depth = mod(depth, 2.0);

        if(depth0>=0.99){
          gl_FragColor.rgb = vec3(1.0);
        }else{
          gl_FragColor.rgb = vec3(depth,depth,depth);
        }
        gl_FragColor.a = 1.0;
      }
	  
    ";	
	
	public function new() 
	{
		
	}
	
	/**
	 * update
	 */
	public function update():Void {
		
	}
	
	
}