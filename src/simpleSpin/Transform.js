import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Stats from 'stats.js';

import OBJLoader from 'three-obj-loader'
OBJLoader(THREE);
import MTLLoader from 'three-mtl-loader'
import TrackballControls from '../trackball';
import MouseInput from '../inputs/MouseInput';
import HouseCube from './HouseCube';


class Transform extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 500, 1000),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
      hovering: false,
      dragging: false,
    };

    // this.cameraPosition = new THREE.Vector3(0, 500, 1000);
    this.lookAt = new THREE.Vector3(0, 200, 0)
    this.lightPosition = new THREE.Vector3(1, 1, 1)
    THREE.ImageUtils.crossOrigin = ''; //moved from render()
    this.object;

    this.groundPosition = new THREE.Vector3(0, -25, 0);
    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0);
    this.groundRepeat = new THREE.Vector2(25, 25);

  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  componentDidMount(){

    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    const {
      container,
      camera,
    } = this.refs;

    container.appendChild(this.stats.domElement);

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;
    this.controls.addEventListener('change', this._onTrackballChange);

  }

  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };


 _onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      // mouseInput.restrictIntersections(this.cubes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({
        mouseInput,
      });
    }

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }

    this.stats.update();
    this.controls.update();
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      cameraPosition,
      cameraRotation,

      mouseInput,
      camera,

      hovering,
      dragging,
    } = this.state;

    const style = {};

    var grassLoader = new THREE.TextureLoader();
    grassLoader.crossOrigin = '*'; // Use as needed
    var grassTexture = grassLoader.load('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg');

    return (
    <div
      ref="container"
      style={style}
    >
      <React3
        mainCamera="camera" // this points to the perspectiveCamera below
        width={width}
        height={height}
        antialias
        sortObjects={false}
        onAnimate={this._onAnimate}
        shadowMapEnabled
        shadowMapType={THREE.PCFShadowMap}
        clearColor={0x7EC0EE}

        ref="react3"
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <scene ref="scene">
          <perspectiveCamera
            name="camera"
            fov={70}
            aspect={width / height}
            near={1}
            far={3000}
            ref="camera"
            position={cameraPosition}
            lookAt={this.lookAt}
          />
          <ambientLight
            color={new THREE.Color("white")}
          />
          <gridHelper size={1000} divisions={10} />
          <directionalLight color={0xffffff} intensity={5} position={new THREE.Vector3(1, 1, 1)} />

          <mesh>
              <boxGeometry
                width={100}
                height={100}
                depth={100}
              />
              <meshBasicMaterial
                color={new THREE.Color( this.props.color )}
                map= {THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg')}
              />
          </mesh>
          <HouseCube />
          <mesh
            position={this.groundPosition}
            rotation={this.groundRotation}
            receiveShadow
          >
              <planeBufferGeometry
                width={20000}
                height={20000}
              />
              <meshPhongMaterial
                color={0xffffff}
                specular={0x111111}
              >
                <texture
                  url={'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg'}
                  crossOrigin="*"
                  wrapS={THREE.RepeatWrapping}
                  wrapT={THREE.RepeatWrapping}
                  repeat={this.groundRepeat}
                  anisotropy={16}
                />
              </meshPhongMaterial>
          </mesh>
        </scene>
      </React3>
    </div>);
  }
}
export default Transform;