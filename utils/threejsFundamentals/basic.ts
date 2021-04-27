const canvas: any = document.getElementById('c');
        
// 입력 데이터를 canvas에 3차원으로 그리기 위해 WebGLRenderer 사용
const renderer = new THREE.WebGLRenderer({canvas});

// PerspectiveCamera(원근 카메라)
// fov : field of view(시야각), 원근카메라만 radians(호도)가 아닌 degrees(도)를 인자로 받음
const fov = 75;
// canvas 가로 세로 비율
const aspect = 2;
// near, far : 카메라 앞에 렌더링 되는 공간 범위 지정
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// -Z 방향을 바라봄, 절두체는 카메라 앞 0.1칸(near)에서 5칸(far)까지 차지
camera.position.z = 2;    

// Scene Graph 가장 상단에 위치한 요소. 렌더링하려면 Scene에 먼저 추가
const scene = new THREE.Scene();

// 정육면체 생성하기 위해 BoxGeometry 사용
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// Material 색 지정
// const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

// Geometry와 Material을 사용해 Mesh 생성
// Mesh : Geometry, Materail, 위치, 방향, 크기 등
// const cube = new THREE.Mesh(geometry, material);

// scene.add(cube);

// renderer.render(scene, camera);

// 애니메이션 구현, requestAnimationFrame
function render(time){
    time *= 0.001;

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    })
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 그림자 추가, DirectionalLight
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1,2,4);
scene.add(light);

// 큐브 생성 함수
function makeInstance(geometry, color, x){
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];
