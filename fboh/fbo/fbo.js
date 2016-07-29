var FBO = function( exports ){

    var scene, orthoCamera, rtt, rtt2, simuMat;
    var flag = true;
    exports.init = function( width, height, renderer, simulationMaterial, renderMaterial ){


        //3 rtt setup
        scene = new THREE.Scene();
        orthoCamera = new THREE.OrthographicCamera(-1,1,1,-1,1/Math.pow( 2, 53 ),1 );

        //4 create a target texture
        var options = {
            minFilter: THREE.NearestFilter,//important as we want to sample square pixels
            magFilter: THREE.NearestFilter,//
            format: THREE.RGBFormat,//could be RGBAFormat
            type:THREE.FloatType//important as we need precise coordinates (not ints)
        };
        rtt = new THREE.WebGLRenderTarget( width,height, options);
        rtt2 = rtt.clone();//もう一個用意

        //5 the simulation:
        //create a bi-unit quadrilateral and uses the simulation material to update the Float Texture
        var geom = new THREE.BufferGeometry();
        geom.addAttribute( 'position', new THREE.BufferAttribute( 
		new Float32Array([   -1,-1,0, 1,-1,0, 1,1,0, -1,-1, 0, 1, 1, 0, -1,1,0 ]), 3 ) );
        geom.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array([   0,1, 1,1, 1,0,     0,1, 1,0, 0,0 ]), 2 ) );
        scene.add( new THREE.Mesh( geom, simulationMaterial ) );
        exports.simuMat = simulationMaterial;

        //6 the particles:
        //create a vertex buffer of size width * height with normalized coordinates
        var l = (width * height );
        var vertices = new Float32Array( l * 3 );
        for ( var i = 0; i < l; i++ ) {

            var i3 = i * 3;
            vertices[ i3 ] = ( i % width ) / width ;
            vertices[ i3 + 1 ] = ( i / width ) / height;
        }

        //create the particles geometry
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position',  new BufferAttribute( vertices, 3 ) );

        //the rendermaterial is used to render the particles
        exports.particles = new THREE.Points( geometry, renderMaterial );
        exports.renderer = renderer;

    };

    //7 update loop
    exports.update = function(){

        //フレームごとにrtt,rtt2を入れ替え
        if(exports.flag){
			exports.simuMat.uniforms.texture.value = rtt2;//rtt2
            exports.renderer.render( scene, orthoCamera, rtt, true );//rtt render
			
            exports.particles.material.uniforms.positions.value = rtt;//rtt
        }else{
			
			exports.simuMat.uniforms.texture.value = rtt;//rtt 
            exports.renderer.render( scene, orthoCamera, rtt2, true );//rtt2
			
            exports.particles.material.uniforms.positions.value = rtt2;//rtt2
        }
        exports.flag = !exports.flag;

    };
    return exports;
}({});
