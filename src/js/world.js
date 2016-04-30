export default class World {
	constructor() {
		var scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 2, 100000 ),
            renderer = new THREE.WebGLRenderer(),
			self = this,
            sunGeom = new THREE.OctahedronGeometry( 3, 0),
            material = new THREE.MeshBasicMaterial( {color: 0xffffff, opacity: 0.9, transparent: true} ),
            cube = new THREE.Mesh(sunGeom, material ),
            light = new THREE.PointLight(0xffffff, 1.1, 300000 ),
            panelMat = new THREE.MeshLambertMaterial({ color: 0xe1e1e1 }),
            cellGeometry = new THREE.CylinderGeometry(192, 192, 128, 6),
            cell = null,
            x = 0,
            y = 0,
            r = 4000;

            renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			renderer.domElement.setAttribute("id", "viewport");

			this.three = {
				scene: scene,
				camera: camera,
				renderer: renderer
			};

			window.three = this.three;
            scene.add(light);
			light.position.set(0, 60000, 0);
			renderer.setClearColor(0x202020);
			scene.add(cube);
			camera.position.z = 15;
			this.skybox = null;

			function render (last) {
				var sys = app,
					camera = three.camera,
					delta = ((Date.now() - last) / 10000),
					time = (Date.now() / 4600);

				if (!! sys.userInput) {
					sys.userInput.update(delta);
				//backgroundParticles(delta);
				}

				sys.sendUpdatePacket = !sys.sendUpdatePacket;
				if (sys.sendUpdatePacket && sys.mode == "vr") {
					socket.emit('user update','{"user":"'+sys.username+'","position": {"x":'+camera.position.x+',"y":'+camera.position.y+',"z":'+camera.position.z+'},'
						+'"quaternion":{"x":'+camera.quaternion.x+',"y":'+camera.quaternion.y+',"z":'+camera.quaternion.z+',"w":'+camera.quaternion.w+'}}');
				}

				cube.rotation.x += 0.0025;
				cube.rotation.y += 0.005;

				sys.world.skybox.position.set(camera.position.x, camera.position.y, camera.position.z);

				renderer.render(scene, camera);
				last = Date.now();
				requestAnimationFrame( function () { render(last); } );
			};

			var skyTexture = THREE.ImageUtils.loadTexture("/images/data-sky-4.jpg", null, function () {
				var skybox = new THREE.Object3D(), // used to use larger jpeg version sunset-5.jpg
				    skyboxFace = null,
				    skyboxSideMat = new THREE.MeshBasicMaterial({
				        map: skyTexture,
						side: 1,
						fog: false,
                        color: 0xffffff // too dark.. not dark enough? 0x60daff//  0x80faff too green
				    }),
					skyboxFrontMat = new THREE.MeshBasicMaterial({
						color: 0x43c0c0,
						fog: false
					}),
					skyboxTopMat = new THREE.MeshBasicMaterial(),
					x = 0;
				while (x < 4) {

						skyboxFace = new THREE.Mesh(new THREE.PlaneGeometry(60000, 60000, 1, 1), skyboxSideMat);

					skyboxFace.position.set(Math.sin(x*(Math.PI / 2))*30000, 0, Math.cos(x*(Math.PI / 2))*30000 );
					skyboxFace.rotation.y = x*(Math.PI / 2);
					skybox.add(skyboxFace);
					x++;
				}
//				skyboxFace = new THREE.Mesh(new THREE.PlaneGeometry(60000, 60000, 1, 1), new THREE.MeshBasicMaterial({fog: false, map: skyTexture}));
//				skyboxFace.position.set(0, 30000, 0);
//				skyboxFace.rotation.x = (Math.PI / 2);
//				skybox.add(skyboxFace);
				skyboxFace = new THREE.Mesh(new THREE.PlaneGeometry(60000, 60000, 1, 1), new THREE.MeshBasicMaterial({fog: false, color: 0x2b2b2b}));
				skyboxFace.position.set(0, -30000, 0);
				skyboxFace.rotation.x = (-Math.PI / 2);
				skybox.add(skyboxFace);

				self.skybox = skybox;
				three.scene.add(skybox);
				skybox.position.set(three.camera.position.x, 0, three.camera.position.z);
				skyTexture.needsUpdate = true;

				render(0);
			});

//				var platformGeom = new THREE.CylinderGeometry(3000, 3000, 300, 6),
//					platformMat = new THREE.MeshLambertMaterial({
//                        color: 0xffffff
//				    }),
//					platform = new THREE.Mesh(platformGeom, platformMat);
//					scene.add(platform);
//					platform.position.set(0, -1500, -750);
//                    platform.rotation.set(0, Math.PI / 6, 0);


			while (x < 12) {
				while (y < 12) {
//					if (Math.random() < 0.25) {
//						cell = new THREE.Mesh(cellGeometry, panelMat);
//						three.scene.add(cell);
//						cell.position.set(-24000 + (x*r), -2000 + Math.floor(Math.random()*4)*256, -24000 + ((y*r)+((x%2)*0.5*r)));
//					}
					y++;
				}
				y = 0;
				x++;
			}

//			var groundGeom = new THREE.PlaneGeometry(100000, 100000, 12, 12);
//			var groundMat = new THREE.MeshBasicMaterial({color: 0xf0f0f0});
//			var ground = new THREE.Mesh(groundGeom, groundMat);
//			ground.rotateX(Math.PI / 2);
//			three.scene.add(ground);




    }

};

