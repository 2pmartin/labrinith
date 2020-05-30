// utility.js
function makehole(px, py, pz, holemat) {
  let i = holes.length;







  // var holemat = new THREE.MeshBasicMaterial({
// comment
  //   color: 0x000000,
  //   specular: 0x006666,
  //   shininess: 0.5,
  //   side: THREE.DoubleSide,
  //   wireframe: false
  // });
  var geo = new THREE.CircleBufferGeometry(1.5, 32);
  var hole = new THREE.Mesh(geo, holemat);
  holes.push(hole);
  holes[i].position.set(px, py + .01, pz); //top of cyl at table top
  holes[i].rotation.x = -Math.PI / 2;
  holegroup.add(holes[i]);

} //end of makehole




function makerail(w, h, d, px, py, pz) {

  let i = rails.length;

  var mat = new THREE.MeshPhongMaterial({
    color: 0xFFFF00,
    specular: 0x006666,
    shininess: 0.5,
    wireframe: false
  });

  var geo = new THREE.BoxBufferGeometry(w, h, d);
  var rail = new THREE.Mesh(geo, mat);

  rails.push(rail);
  objects.push(rail);

  if (px >= 0) px = px - w / 2;
  if (px < 0) px = px + w / 2;
  if (pz >= 0) pz = pz - d / 2;
  if (pz < 0) pz = pz + d / 2;

  rails[i].position.set(px, py + h / 2, pz);
  railgroup.add(rails[i]);




  //name = ('rail['+i+']');

  // addLabel( name,i, px,py,pz);

}

function addLabel(name, i, px, py, pz) {
  var textGeo = new THREE.TextBufferGeometry(name, {
    font: font,
    size: 20,
    height: 2,
    curveSegments: 1
  });
  var textMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000
  });
  var textMesh = new THREE.Mesh(textGeo, textMaterial);

  //   labels.push(textMesh);
  //  // scene.add(labels[i]);
  //   labels[i].position.set( px, py+3, pz );
  //   labelgroup.add(labels[i]);
}

function checkposhole() {
  holecheck = false;
  for (let i = 0; i < holes.length; i++) {
    center.copy(holes[i].position);
    holespheres[i] = new THREE.Sphere().set(center, .5);
  //   console.log('Hole', i);
    if (sphere.intersectsSphere(holespheres[i])) {
      holenumber = i+1;
      holecheck = true;
      break;
    }
    
    // }else {
    // check = false;}   
  }
  // return check;
}

function checkposrail() { //??????????
  
  for (let i = 0; i < rails.length; i++) {
    // index = [];
    boxes[i] = new THREE.Box3().setFromObject(rails[i]);
    if (sphere.intersectsBox(boxes[i])) {
    //  console.log("Intersects box =  --------------------------------- " + i);
     
     if (pos.z <= boxes[i].max.z && pos.z >= boxes[i].min.z) {
        minx = Math.abs(boxes[i].min.x - sphere.center.x);
        maxx = Math.abs(boxes[i].max.x - sphere.center.x);
        min_z = boxes[i].min.z;
        max_z = boxes[i].max.z;

        if (maxx < minx) {
          pos.x = boxes[i].max.x + 1.09;
          flagmaxx = true;
          if (i === 1) {
            box1 = true;
          }
        } else {
          pos.x = boxes[i].min.x - 1.09;
          flagminx = true;
          if (i === 0) {
            box0 = true;
          }
        }
      }

      if (pos.x <= boxes[i].max.x && pos.x >= boxes[i].min.x) {
        minz = Math.abs(boxes[i].min.z - sphere.center.z);
        maxz = Math.abs(boxes[i].max.z - sphere.center.z);
        min_x = boxes[i].min.x;
        max_x = boxes[i].max.x;

        if (maxz < minz) {
          flagmaxz = true;
          if (i === 3) {
            box3 = true;
          }
          pos.z = boxes[i].max.z + 1.09;
        } else {
          flagminz = true;
          if (i === 4) {
            box4 = true;
          }
          pos.z = boxes[i].min.z - 1.09;
        }
      }

    }
  }
}







// if(pos.x <= boxes[i].max.x && pos.x >= boxes[i].min.x){
//    if(vel.x<0){
//     pos.z = boxes[i].max.z + 0.999;
//    }else{
//     pos.z = boxes[i].min.z - 0.999;  
//    }
// } 






//  console.log('minx= ' + minx);
//    console.log('maxx= ' + maxx);
//   console.log("vel.x=    "+vel.x);
//   console.log('minz= ' + minz);
//  console.log('maxz= ' + maxz);









// if (sphere.intersectsBox(boxes[i])){

// index.push(i); 
//   console.log( "Intersects box =   "+ i);
//  console.log("sphere.center.x = " + sphere.center.x + "     sphere.center.z = " + sphere.center.z);

//  console.log( "boxes[i].max.x=  "+ boxes[i].max.x+"    boxes[i].min.x=  "+boxes[i].min.x);
// console.log( "boxes[i].max.z=  "+ boxes[i].max.z+"    boxes[i].min.z=  "+boxes[i].min.z);
//  let dmax_x = Math.abs(boxes[i].max.x-sphere.center.x);
//let dmin_x = Math.abs(boxes[i].min.x-sphere.center.x);
//   console.log( "dmax_x=  "+ dmax_x+"   dmin_x=  "+ dmin_x);

// console.log( "boxes[i].max.z=  "+ boxes[i].max.z+"    boxes[i].min.z=  "+boxes[i].min.z);
//let dmax_z = Math.abs(boxes[i].max.z-sphere.center.z);
//let dmin_z = Math.abs(boxes[i].min.z-sphere.center.z);
//  console.log( "dmax_z=  "+ dmax_z+"   dmin_z=  "+ dmin_z);



//
// if(pos.z <= boxes[i].max.x && pos.z >= boxes[i].min.x ){
//   tempvel.setZ =0;
// // iflagz = true; 
// var k =vel.z;
// tempvel.z = -1*k;  //iflagy
// } 

//  }






// let temp1 = Math.abs(spherebox.max.x - boxes[i].min.x);
// if(temp1 < .06){pos.x = (boxes[i].min.x-1);    //vel.x
//   if(vel.x <= 0){pos.x = pos.x + vel.x;}
// }
// if(i==0){console.log(i, 'temp1', temp1);}
// let temp2 = Math.abs(spherebox.min.x - boxes[i].max.x);
// if(temp2 < 0.06){pos.x = (boxes[i].max.x+1);
//   if(vel.x > 0){pos.x = pos.x + vel.x;}
//   }
// let temp3 = Math.abs(spherebox.max.z - boxes[i].min.z);
// if(temp3 < .06){pos.z = boxes[i].min.z -1;
//  if(vel.z < 0){pos.z = pos.z + vel.z;}
//   }
// let temp4 = Math.abs(spherebox.min.z - boxes[i].max.z);
// if(temp4 < .02){pos.z = boxes[i].max.z +1;
//   if(vel.z > 0){pos.z = pos.z + vel.x;} 
// }









// console.log(boxes[0].min);
// console.log (boxes[0].max);
// console.log(spherebox.min);
// console.log (spherebox.max);

//    // if(Math.abs((spherebox.min.x - boxes[i].max.x)< .2)){flag2=true;}

// //     if(Math.abs((spherebox.max.z - boxes[i].min.z)< .2)){flag3=true;}
// //     if(Math.abs((spherebox.min.z - boxes[i].max.z)< .2)){flag4=true;}
// //     console.log(Math.abs(spherebox.max.x - boxes[i].min.x));
//      console.log('flag1 ' + flag1);
// //     console.log(Math.abs(spherebox.min.x - boxes[i].max.x));
//      console.log('flag2 ' + flag2);
// //     console.log(Math.abs(spherebox.max.z - boxes[i].min.z));
//      console.log('flag3 ' + flag3);
// //     console.log(Math.abs(spherebox.min.z - boxes[i].max.z));
//      console.log('flag4 ' + flag4);




//      minx =boxes[i].min.x - sphere.center.x;
//      maxx =boxes[i].max.x - sphere.center.x;
//      minz =boxes[i].min.z - sphere.center.z;
//      maxz =boxes[i].max.z - sphere.center.z;

//     if(minx < 0){minx = minx * -1;}
//     if(maxx < 0){maxx = maxx * -1;}
//     if(minz < 0){minz = minz * -1;}
//     if(maxz < 0){maxz = maxz * -1;}

//     if (minx <= 1){                     //} && maxx <= 1.01){
//        let temp = boxes[i].min.x;
//        pos.x=(temp-1);          
//       console.log('HERE');}
//     let b = 1;
//     if (maxx <= 1){
//       temp = boxes[i].max.x;
//       pos.x=(temp+1);}

//     if (minz <= 1){ 
//       temp = boxes[i].min.z
//       pos.z=(temp-1);
//     }

//     if (maxz <= 1) {
//       temp = boxes[i].max.z;
//       pos.z=(temp+1);
//     }
//     // console.log('mx = '+ (boxes[i].min.x));
//     // console.log('posx= ' +pos.x);
//     console.log('minx= ' + minx);
//     console.log('maxx= ' + maxx);
//     console.log('minz= ' + minz);
//     console.log('maxz= ' + maxz);


// function checkvel(){

// 	for (let i = 0; i < rails.length; i++) {
//     boxes[i] = new THREE.Box3().setFromObject(rails[i]);
//     if (sphere.intersectsBox(boxes[i])) {

//        minx =boxes[i].min.x - sphere.center.x;
//        maxx =boxes[i].max.x - sphere.center.x;
//        minz =boxes[i].min.z - sphere.center.z;
//        maxz =boxes[i].max.z - sphere.center.z;


//       if (minx >= 0.97 && minx <= 1.01){
//          let temp = boxes[i].min.x;
//        console.log('temp= ' + temp);
//        console.log(temp-1);
//       vel.setX(0);

//         console.log('HERE');}

//       if (maxx >= 0.97 && maxx <= 1.01){ pos.setX(boxes[i].max.x)+1;}

//       if (minz >= 0.97 && minz <= 1.01){ pos.setZ(boxes[i].min.z)-1;}

//       if (maxz >= 0.97 && maxz <= 1.01) {pos.setZ(boxes[i].max.z)+1;}
//       // console.log('mx = '+ (boxes[i].min.x));
//       // console.log('posx= ' +pos.x);
//       // console.log('minx= ' + minx);
//       // console.log('maxx= ' + maxx);
//       // console.log('minz= ' + minz);
//       // console.log('maxz= ' + maxz);
//     }

//   }

// }