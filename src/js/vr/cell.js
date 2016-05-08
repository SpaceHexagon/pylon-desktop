export default class Cell {
	constructor(coords, mobile, data) {
			var golden = 1.61803398875,
					geometry = new THREE.CylinderGeometry(1600, 1600, 1600, 6),
					material = new THREE.MeshBasicMaterial(),
			size = 2666.667,
			mesh = new THREE.Mesh(geometry, material);

			mesh.position.set((coords[0]*size*1.1)+ (coords[2] % 2==0 ? 0 : size / 1.618), (coords[1]*size) / golden, coords[2]*size);

		 return {
			cell: coords,
			data: data,
			mesh: mesh,
			geometry: geometry
		 }
	}
}
