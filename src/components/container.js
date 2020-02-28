import React, { Component } from 'react';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


import floorTexture1 from "../assets/textures/hardwood2_diffuse.jpg"
import floorTexture2 from "../assets/textures/hardwood2_bump.jpg"
import floorTexture3 from "../assets/textures/hardwood2_roughness.jpg"
import cubeTexture1 from "../assets/textures/brick_diffuse.jpg"
import cubeTexture2 from "../assets/textures/brick_bump.jpg"
import ballTexture1 from "../assets/textures/earth_atmos_2048.jpg"
import ballTexture2 from "../assets/textures/earth_specular_2048.jpg"

class Container extends Component {

  constructor(props) {
    super(props);
    this.hemiLuminousIrradiances = {
      "0.0001 lx (Moonless Night)": 0.0001,
      "0.002 lx (Night Airglow)": 0.002,
      "0.5 lx (Full Moon)": 0.5,
      "3.4 lx (City Twilight)": 3.4,
      "50 lx (Living Room)": 50,
      "100 lx (Very Overcast)": 100,
      "350 lx (Office Room)": 350,
      "400 lx (Sunrise/Sunset)": 400,
      "1000 lx (Overcast)": 1000,
      "18000 lx (Daylight)": 18000,
      "50000 lx (Direct Sun)": 50000
    };
    this.bulbLuminousPowers = {
      "110000 lm (1000W)": 110000,
      "3500 lm (300W)": 3500,
      "1700 lm (100W)": 1700,
      "800 lm (60W)": 800,
      "400 lm (40W)": 400,
      "180 lm (25W)": 180,
      "20 lm (4W)": 20,
      "Off": 0
    };


    this.width = 1300 //1049 //window.innerWidth
    this.height = 1300 // 987 //window.innerHeight


    var params = {
      shadows: true,
      exposure: 0.68,
      bulbPower: Object.keys(this.bulbLuminousPowers)[4],
      hemiIrradiance: Object.keys(this.hemiLuminousIrradiances)[0]
    };

    // add stats
    var stats = new Stats();

    // add scene
    var scene = new THREE.Scene()


    // add hemi light
    var hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
    scene.add(hemiLight);


    // add bulb
    var bulbGeometry = new THREE.SphereBufferGeometry(0.02, 16, 8);
    var bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);

    var bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000
    });
    var bulbMesh = new THREE.Mesh(bulbGeometry, bulbMat)
    bulbLight.add(bulbMesh);
    scene.add(bulbLight);





    // add floor material
    var floorMat = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.0005
    });
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load(floorTexture1, (map) => {

      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(10, 24);
      map.encoding = THREE.sRGBEncoding;
      floorMat.map = map;
      floorMat.needsUpdate = true;

    });
    textureLoader.load(floorTexture2, (map) => {

      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(10, 24);
      floorMat.bumpMap = map;
      floorMat.needsUpdate = true;

    });
    textureLoader.load(floorTexture3, (map) => {

      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(10, 24);
      floorMat.roughnessMap = map;
      floorMat.needsUpdate = true;

    });

    // add cube material
    var cubeMat = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      color: 0xffffff,
      bumpScale: 0.002,
      metalness: 0.2
    });
    textureLoader.load(cubeTexture1, (map) => {

      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(1, 1);
      map.encoding = THREE.sRGBEncoding;
      cubeMat.map = map;
      cubeMat.needsUpdate = true;

    });
    textureLoader.load(cubeTexture2, (map) => {

      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(1, 1);
      cubeMat.bumpMap = map;
      cubeMat.needsUpdate = true;

    });

    // add ball material
    var ballMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 1.0
    });
    textureLoader.load(ballTexture1, (map) => {

      map.anisotropy = 4;
      map.encoding = THREE.sRGBEncoding;
      ballMat.map = map;
      ballMat.needsUpdate = true;

    });
    textureLoader.load(ballTexture2, (map) => {

      map.anisotropy = 4;
      map.encoding = THREE.sRGBEncoding;
      ballMat.metalnessMap = map;
      ballMat.needsUpdate = true;

    });





    // floor geometry
    var floorGeometry = new THREE.PlaneBufferGeometry(20, 20);

    // cube geometry
    var cubeGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);

    // ball geometry
    var ballGeometry = new THREE.SphereBufferGeometry(0.25, 32, 32);


    // floor mesh
    var floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = - Math.PI / 2.0;
    scene.add(floorMesh);

    // cube mesh
    var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMat);
    cubeMesh.position.set(- 0.5, 0.25, - 1);
    cubeMesh.castShadow = true;
    scene.add(cubeMesh);

    // ball mesh
    var ballMesh = new THREE.Mesh(ballGeometry, ballMat);
    ballMesh.position.set(1, 0.25, 1);
    ballMesh.rotation.y = Math.PI;
    ballMesh.castShadow = true;
    scene.add(ballMesh);


    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setPixelRatio(window.devicePixelRatio);




    // gui
    var gui = new GUI();

    gui.add(params, 'hemiIrradiance', Object.keys(this.hemiLuminousIrradiances));
    gui.add(params, 'bulbPower', Object.keys(this.bulbLuminousPowers));
    gui.add(params, 'exposure', 0, 1);
    gui.add(params, 'shadows');
    gui.open();



    // assign to this props
    this.params = params
    this.stats = stats
    this.scene = scene
    this.hemiLight = hemiLight
    this.bulbLight = bulbLight
    this.bulbMat = bulbMat
    this.floorMat = floorMat
    this.renderer = renderer


  }
  componentDidMount() {

    // // update w h
    // this.width = window.innerWidth
    // this.height = window.innerHeight

    // const from mount
    const width = this.width
    const height = this.height

    var bulbLight = this.bulbLight
    var renderer = this.renderer



    this.mount.appendChild(this.stats.dom);

    // add camera
    var camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    // this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.x = 0;
    camera.position.z = 4;
    camera.position.y = 2;


    bulbLight.position.set(0, 1, 0);
    bulbLight.castShadow = true;


    renderer.setSize(width, height);
    this.mount.appendChild(renderer.domElement)

    // window.addEventListener( 'resize', this.onWindowResize, false );


    // controls
    var controls = new OrbitControls(camera, renderer.domElement);


    // window.addEventListener('resize', () => { this.onWindowResize(camera, renderer) }, false);


    // assign to this props
    this.camera = camera


    this.start()

  }

  // onWindowResize(camera, renderer) {

  //   // update w h
  //   var ratio = this.mount.innerWidth / this.width
  //   this.width = this.width * ratio // this.mount.innerWidth
  //   this.height = this.height * ratio // this.mount.innerHeight


  //   camera.aspect = this.width / this.width;
  //   camera.updateProjectionMatrix();

  //   renderer.setSize(this.width, this.height);

  // }
  componentWillUnmount() {
    // window.removeEventListener(
    //   'resize',
    //   () => { this.onWindowResize(this.camera, this.renderer) },
    //   false);
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  animate = () => {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {

    this.renderer.toneMappingExposure = Math.pow(this.params.exposure, 5.0); // to allow for very bright scenes.
    this.renderer.shadowMap.enabled = this.params.shadows;
    this.bulbLight.castShadow = this.params.shadows;


    var previousShadowMap = false; // testing


    if (this.params.shadows !== previousShadowMap) {

      this.floorMat.needsUpdate = true;
      previousShadowMap = this.params.shadows;

    }
    this.bulbLight.power = this.bulbLuminousPowers[this.params.bulbPower];
    this.bulbMat.emissiveIntensity = this.bulbLight.intensity / Math.pow(0.02, 2.0); // convert from intensity to irradiance at bulb surface

    this.hemiLight.intensity = this.hemiLuminousIrradiances[this.params.hemiIrradiance];
    // var time = Date.now() * 0.0005;

    // this.bulbLight.position.y = Math.cos(time) * 0.75 + 1.25;


    this.renderer.render(this.scene, this.camera)

    this.stats.update();
  }

  render() {


    var  divStyle = {
        width: this.width,
        height: this.height

      };
    

    return (
      <div
        style={divStyle}
        ref={(mount) => { this.mount = mount }}
      />)

  }
}

export default Container