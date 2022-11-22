import * as THREE from './three.module.js';

(function(){

    /////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////

    ///////////// UTILS /////////////

    function isMobileTablet(){
        let check = false;
        (function(a){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
                check = true;
        })(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
    const isMT = isMobileTablet()

    function windowXYgreater(){
        let greaterSide = window.innerWidth
        if(window.innerWidth<window.innerHeight){
            greaterSide = window.innerHeight
        }
        return greaterSide
    }

    function resizeRendererToDisplaySize(renderer) {
    	const canvas = renderer.domElement;
    	const pixelRatio = window.devicePixelRatio;
    	const width  = canvas.clientWidth  * pixelRatio | 0;
    	const height = canvas.clientHeight * pixelRatio | 0;
    	const needResize = canvas.width !== width || canvas.height !== height;
    	if (needResize) {
    		renderer.setSize(width, height, false);
    	}
    	return needResize;
    }

    ///////////// MICRO-ANIMATION /////////////

    function animIntro(){
        const tl = gsap.timeline();

        tl.to("#c", 2, {opacity:1, ease: "power1.in"});
        tl.to(menuTxt1,1,{opacity:1, cursor:"default", ease:"power2.out"}, "-=0.5");
        tl.to(menuBtn1,1,{opacity:1, cursor:"default", ease:"power2.out"},"-=1");
        tl.to(".logo", 1,{opacity:1, ease: "power2.out"}, "-=1");
        tl.to(".cont", 1,{opacity:1}, "-=0.5");
    }

    function onMouseMove(e) {
        gsap.to(triangle.position, 1.5, {x: decale-30-(e.clientX-windowHalfX)*0.15, y: 10-(e.clientY-windowHalfY)*0.1, z:0, ease:"power2.out"})
        gsap.to(triangle2.position, 1.5, {x: decale+40+(e.clientX-windowHalfX)*0.25, y: -25+(e.clientY-windowHalfY)*0.15, z:0, ease:"power2.out"})
    }
    ///////////// MENU /////////////

    function menuOn(){
        document.body.getElementsByClassName("menu_wrapper")[0].style.display = "flex";
        decale = 45;

        if(!isMT){
            coef = 20;

            triangle.rotation.set(2.55, 2.355, 0)
            scale = Math.round((windowXYgreater()/20)*2.82) //*2 --> radius/diametre .82 --> hypothenuse (1.41-1)*2
            gsap.to(menuBtn1, 1, {scale: scale, cursor:"default", ease:"power3.in"});
            gsap.to(menuBtn2, 1, {delay:0.5, opacity:1, top:"40px", cursor:"pointer", ease:"power3.out"});
            gsap.set(menuTxt1,{delay:0.5, display:"none"});
            gsap.to(menuTxt2, 1, {delay:0.6, top: "38px", opacity:1, display:"inline"});
            gsap.to(".logo", 1,{delay:0.5, color:"#000"});
            gsap.to(".menu_wrapper", 1,{delay:0.5, opacity:1});
            gsap.set("#c", {zIndex: 4});
            gsap.set(document.body, {delay: 0.8, backgroundColor: "#ffffc8"});
            // change color            
            startColor = new THREE.Color(0xffffc8);
            endColor = new THREE.Color(0x000000);
            gsap.to(startColor, 1, {delay: 1.2, r: endColor.r, g: endColor.g, b: endColor.b, onUpdate: function(){triangle.material.color = startColor;}})

            menuOpen = true;
        }
        else{
            scale = Math.round((windowXYgreater()/20)*2.82); //*2 --> radius/diametre .82 --> hypothenuse (1.41-1)*2
            size = 20*scale;
            // can't use scale cause of pixelisation on some mobile devices
            gsap.to(menuBtn1, 1, {top:-size/2, right: -size/2,height: size, width: size, cursor:"default", ease:"power2.in"});
            gsap.to(menuBtn2, 1, {delay:0.5, opacity:1, top:"40px", cursor:"pointer", ease:"power2.out"});
            gsap.set(menuTxt1,{delay:0.5, display:"none"});
            gsap.to(menuTxt2, 1, {delay:0.6, top: "38px", opacity:1, display:"inline"});
            gsap.to(".logo", 1,{delay:0.5, color:"#000000"});
            gsap.to(".menu_wrapper", 1,{delay:0.5, opacity:1});
            gsap.set("#c", {zIndex: 4});
            gsap.set(document.body, {delay: 0.8, backgroundColor: "#ffffc8"});

            menuOpen = true;
        }
    }

    function menuOff(){
        document.body.getElementsByClassName("menu_wrapper")[0].style.display = "none";
        decale = 45;

        if(!isMT){
            coef = 10;
            document.body.style.backgroundColor = "#000";

            gsap.to(menuBtn2, 1, {opacity:0, cursor:"default", ease:"power3.out"});
            gsap.to(menuBtn1, 1, {scale: 1, cursor:"pointer", ease:"power3.out"});
            gsap.set(menuTxt1,{display:"inline"});
            gsap.to(menuTxt2, 1, {opacity:0});
            gsap.to(".logo", 1,{color:"#ffffc8"});
            gsap.to(".menu_wrapper", 1,{opacity:0});
            gsap.set(menuBtn2, {delay:1, top:"60px"});
            gsap.set("#c", {delay:1, zIndex: 1});
            gsap.set(menuTxt2, {delay:1, display: "none", top:"60px"});
            // change color 
            startColor = new THREE.Color(0x000000);
            endColor = new THREE.Color(0xffffc8);
            gsap.to(startColor, 1, {r: endColor.r, g: endColor.g, b: endColor.b, onUpdate: function(){triangle.material.color = startColor;}})
            

            menuOpen = false;
        }
        else{
            document.body.style.backgroundColor = "#000000";
            
            gsap.to(menuBtn2, 1, {opacity:0, cursor:"default", ease:"power3.out"});
            gsap.to(menuBtn1, 1, {height:"20px", width:"20px", top:"40px", right:"40px", cursor:"pointer", ease:"power3.out"});
            gsap.set(menuTxt1,{display:"inline"});
            gsap.to(menuTxt2, 1, {opacity:0});
            gsap.to(".logo", 1,{color:"#ffffc8"});
            gsap.to(".menu_wrapper", 1,{opacity:0});
            gsap.set(menuBtn2, {delay:1, top:"60px"});
            gsap.set("#c", {delay:1, zIndex: 1});
            gsap.set(menuTxt2, {delay:1, display: "none", top:"60px"});
            
            menuOpen = false;
        }
    }

    /////////////////////////////////////////// CORE ///////////////////////////////////////////
    
    ///////////// INIT VARIABLES /////////////

    // DOM
    const menuBtn1 = document.getElementsByClassName("menu_btn1")[0];
    const menuBtn2 = document.getElementsByClassName("menu_btn2")[0];
    const menuTxt1 = document.getElementsByClassName("menu_txt1")[0];
    const menuTxt2 = document.getElementsByClassName("menu_txt2")[0];
    
    const canvas = document.getElementById("c");
    //
    let scale, size, startColor, endColor, triangle, triangle2, coef;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let menuOpen = false;
    let decale = 45;
    if(!isMT){
        ///////////// 3D /////////////
        // SETUP
        const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true, antialias: true});
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        if(!isMT){
            camera.position.set(0,0,100);
        }else{
            camera.position.set(0,0,200);
        }

        const scene = new THREE.Scene();


        // OBJECTS
        // triangle
        const triangleGeometry = new THREE.TetrahedronGeometry(50,0);
        const triangleWireframe = new THREE.WireframeGeometry(triangleGeometry);
        const triangleMaterial = new THREE.LineBasicMaterial({color: 0xffffc8, linewidth: 10});

        triangle = new THREE.LineSegments(triangleWireframe, triangleMaterial);
        triangle.rotation.set(2.55,2.355,0);
        triangle.position.set(-30,10,0);
        triangle.scale.set(0.5,0.5,0.5);
        scene.add(triangle);

        triangle2 = new THREE.LineSegments(triangleWireframe, triangleMaterial);
        triangle2.rotation.set(2.55,2.355,0);
        triangle2.position.set(40,-25,0);
        triangle2.scale.set(0.25,0.25,0.25);
        scene.add(triangle2);


        ///////////// RENDER LOOP /////////////
        let t = 0;
        coef = 10;
        function render() {
        	if (resizeRendererToDisplaySize(renderer)) {
        		const canvas = renderer.domElement;
        		camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
                if(!isMT){
                    windowHalfX = window.innerWidth / 2;
                    windowHalfY = window.innerHeight / 2;
                }
            }

            t = t + 0.02;

            triangle.position.z =  Math.sin(t)*coef;
            triangle2.position.z =  -Math.sin(t)*coef;
            if(isMT){
                triangle.rotation.y = 2.355+Math.sin(t*0.2)*Math.PI;
            }else{
                triangle.rotation.z = t;
                triangle2.rotation.z = 2+t*-0.8;
                if(menuOpen){
                    triangle.rotation.y = 2.355+Math.sin(t*0.5)*Math.PI;
                }
            }

            renderer.render(scene, camera);
        	requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }
    
    ///////////// LAUCH ANIM - TIMELINE /////////////
    // INTRO //
    setTimeout(animIntro, 50);

    // EVENT LISTENERS //
    menuBtn1.addEventListener("click", menuOn);
    menuBtn2.addEventListener("click", menuOff);
    menuTxt1.addEventListener("click", menuOn);
    menuTxt2.addEventListener("click", menuOff);
    let currentLink = document.body.getElementsByClassName('active')[0];
    currentLink.addEventListener('click', menuOff);
    
    if(!isMT){
        window.addEventListener('mousemove', onMouseMove, false );

        //menu links
        let links = document.body.getElementsByClassName('menu_elem');
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            link.addEventListener('mouseenter', ()=>{
                if(!(currentLink===link)){
                    link.classList.add('active');
                    currentLink.classList.remove('active');
                }
            });
            link.addEventListener('mouseleave', ()=>{
                if(!(currentLink===link)){
                    currentLink.classList.add('active');
                    link.classList.remove('active');
                }
            });
        }
    }

})();