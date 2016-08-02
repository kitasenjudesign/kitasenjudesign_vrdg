snoise = """
   //-----------------------------------------------------------------------------
   // https://github.com/ashima/webgl-noise/blob/master/src/noise3D.glsl
   vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
   vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
   vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
   vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

   float snoise(vec3 v) {
     const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
     const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

     vec3 i  = floor(v + dot(v, C.yyy) );
     vec3 x0 =   v - i + dot(i, C.xxx) ;

     vec3 g = step(x0.yzx, x0.xyz);
     vec3 l = 1.0 - g;
     vec3 i1 = min( g.xyz, l.zxy );
     vec3 i2 = max( g.xyz, l.zxy );

     vec3 x1 = x0 - i1 + C.xxx;
     vec3 x2 = x0 - i2 + C.yyy;
     vec3 x3 = x0 - D.yyy;

     i = mod289(i);
     vec4 p = permute( permute( permute(
     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
     + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
     + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

     float n_ = 0.142857142857;
     vec3  ns = n_ * D.wyz - D.xzx;

     vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

     vec4 x_ = floor(j * ns.z);
     vec4 y_ = floor(j - 7.0 * x_ );

     vec4 x = x_ *ns.x + ns.yyyy;
     vec4 y = y_ *ns.x + ns.yyyy;
     vec4 h = 1.0 - abs(x) - abs(y);

     vec4 b0 = vec4( x.xy, y.xy );
     vec4 b1 = vec4( x.zw, y.zw );

     vec4 s0 = floor(b0)*2.0 + 1.0;
     vec4 s1 = floor(b1)*2.0 + 1.0;
     vec4 sh = -step(h, vec4(0.0));

     vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
     vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

     vec3 p0 = vec3(a0.xy,h.x);
     vec3 p1 = vec3(a0.zw,h.y);
     vec3 p2 = vec3(a1.xy,h.z);
     vec3 p3 = vec3(a1.zw,h.w);

     vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
     p0 *= norm.x;
     p1 *= norm.y;
     p2 *= norm.z;
     p3 *= norm.w;

     vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
     m = m * m;
     return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
   }
  """


class App


  constructor: ->
    @initScene()
    @initObjects()
    @animate()


  initScene: =>
    @renderer = new THREE.WebGLRenderer(antialias: false)
    if not @renderer.supportsFloatTextures() or not @renderer.supportsVertexTextures()
      console.log 'float texture:', @renderer.supportsFloatTextures()
      console.log 'vertex texture:', @renderer.supportsVertexTextures()
      Detector.addGetWebGLMessage()
      return

    @renderer.setSize(window.innerWidth, window.innerHeight)

    @camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, 1, 1000)
    @camera.position.z = 500

    @scene = new THREE.Scene()

    container = document.getElementById('container')
    container.appendChild(@renderer.domElement)

    @stats = new Stats()
    container.appendChild(@stats.domElement)

    window.addEventListener 'resize', =>
      @camera.left = 0
      @camera.right = window.innerWidth
      @camera.top = 0
      @camera.bottom = window.innerHeight
      @camera.updateProjectionMatrix()
      @renderer.setSize(window.innerWidth, window.innerHeight)
      @updater.passes[0].uniforms.size.value.set(window.innerWidth, window.innerHeight)

    window.addEventListener 'mousemove', (e) =>
      @updater.passes[0].uniforms.mouse.value.set(e.clientX, e.clientY)

    window.addEventListener 'mousedown', =>
      @updater.passes[0].uniforms.reset.value = Math.random()

    window.addEventListener 'deviceorientation', (e) =>
      g = @updater.passes[0].uniforms.gravity.value
      g.x += (e.gamma / 30 - g.x) * .1
      g.y += (e.beta / 30 - g.y) * .1


  initObjects: ->
    width = 64
    height = 64
    options =
      magFilter: THREE.NearestFilter
      minFilter: THREE.NearestFilter
      format: THREE.RGBAFormat
      type: THREE.FloatType
      depthBuffer: false
      stencilBuffer: false
      generateMipmaps: false
    target = new THREE.WebGLRenderTarget(width, height, options)
    @updater = new THREE.EffectComposer(@renderer, target)

    data = new Float32Array(4 * width * height)
    for i in [0...width * height]
      data[i * 4] = Math.random() * window.innerWidth
      data[i * 4 + 1] = Math.random() * window.innerHeight
      data[i * 4 + 2] = Math.random() * 3 - 1.5
      data[i * 4 + 3] = Math.random() * 3 - 1.5
    initPosition = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType)
    initPosition.minFilter = THREE.NearestFilter
    initPosition.magFilter = THREE.NearestFilter
    initPosition.needsUpdate = true


    @updater.addPass(new THREE.ShaderPass(
      uniforms:
        reset: type: 'f', value: 1
        size: type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        mouse: type: 'v2', value: new THREE.Vector2()
        gravity: type: 'v2', value: new THREE.Vector2()
        tDiffuse: type: 't', value: null
        tInitial: type: 't', value: null
      vertexShader: """
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          vUv = uv;
        }
        """
      fragmentShader: """
        #{snoise}
        uniform float reset;
        uniform vec2 size;
        uniform vec2 mouse;
        uniform vec2 gravity;
        uniform sampler2D tDiffuse;
        uniform sampler2D tInitial;

        varying vec2 vUv;

        void main() {
          vec4 p;
          if (reset > 0.) {
            p = texture2D(tInitial, vUv);
          } else {
            p = texture2D(tDiffuse, vUv);
            vec2 f = gravity;

            for (int y = 0; y < 64; ++y) {
              for (int x = 0; x < 64; ++x) {
                vec4 node = texture2D(tDiffuse, vec2(x, y) / 64.);
                vec2 d = node.xy - p.xy;
                float dist = length(d);
                if (50. < dist && dist < 200.) {
                  f += d / pow(dist, 3.) * 30.;
                } else if (1. < dist) {
                  f -= d / pow(dist, 3.) * 40.;
                }
                if (1. < dist) {
                  float rad = atan(node.w, node.z);
                  f.x += cos(rad) / dist / dist;
                  f.y += sin(rad) / dist / dist;
                }
              }
            }

            vec2 mf = mouse - p.xy;
            float mdistsq = mf.x * mf.x + mf.y * mf.y;
            float mrad = atan(mf.y, mf.x);
            if (mdistsq > 1.) {
              f.x -= cos(mrad) / mdistsq * 10000.;
              f.y -= sin(mrad) / mdistsq * 10000.;
            }

            if (length(f) > 1.) {
              f = normalize(f);
            }

            f.x += snoise(p.xyz) * .2;
            f.y += snoise(p.zxw) * .2;

            p.zw = p.zw * .9 + f;
            p.xy += p.zw;

            if (p.x < 0.) {
              p.x = -p.x;
              p.z *= -1.;
            } else if (p.x > size.x) {
              p.x = size.x - (p.x - size.x);
              p.z *= -1.;
            }
            if (p.y < 0.) {
              p.y = -p.y;
              p.w *= -1.;
            } else if (p.y > size.y) {
              p.y = size.y - (p.y - size.y);
              p.w *= -1.;
            }
          }
          gl_FragColor = p;
        }
        """
    ))
    @updater.passes[0].uniforms.tInitial.value = initPosition

    geometry = new THREE.Geometry()
    for y in [0...height]
      for x in [0...width]
        geometry.vertices.push(new THREE.Vector3(x, y, 0))
    material = new THREE.ShaderMaterial
      depthTest: false
      depthWrite: false
      transparent: true
      blending: THREE.AdditiveBlending
      uniforms:
        data: type: 't', value: null
        map: type: 't', value: @generateNodeTex()
      vertexShader: """
        uniform sampler2D data;
        void main() {
          vec4 p = texture2D(data, position.xy / 64.);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p.x, p.y, 0., 1.);
          gl_PointSize = 8.;
        }
        """
      fragmentShader: """
        uniform sampler2D map;
        void main() {
          gl_FragColor = texture2D(map, gl_PointCoord);
          gl_FragColor.a = 0.5;
        }
        """
    @particles = new THREE.ParticleSystem(geometry, material)
    @scene.add(@particles)

    #@scene.add(new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial(map: @generateNodeTex(), side: THREE.DoubleSide)))


  generateNodeTex: ->
    canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    #document.body.appendChild(canvas)
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 16, 16)
    ctx.beginPath()
    ctx.arc(8, 8, 5, 0, Math.PI * 2, false)
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()
    tex = new THREE.Texture(canvas)
    tex.needsUpdate = true
    return tex


  animate: =>
    requestAnimationFrame(@animate)

    @updater.render()
    @particles.material.uniforms.data.value = @updater.renderTarget1
    tmp = @updater.renderTarget1
    @updater.renderTarget1 = @updater.renderTarget2
    @updater.renderTarget2 = tmp

    @renderer.render(@scene, @camera)

    @updater.passes[0].uniforms.reset.value = 0

    @stats.update()


if Detector.webgl
  new App()
else
  Detector.addGetWebGLMessage()
