

let backgroundColor=document.getElementById('backgroundColor').innerHTML
let backgroundColorResult=document.getElementById('backgroundColorResult').innerHTML
//console.log(backgroundColor)
//console.log(backgroundColorResult)

let backgroundColor2=document.getElementById('backgroundColor').innerHTML
let backgroundColorResult2=document.getElementById('backgroundColorResult').innerHTML

if(backgroundColor==='false'){
    console.log('false')
    document.getElementById('backgroundColorResult').style.backgroundColor="rgb(255, 108, 129,.5)";

     // specify the image path here

}else{
    document.getElementById('backgroundColorResult').style.backgroundColor="rgb(65, 113, 214,.5)";

}
if(backgroundColor2==='false'){
document.getElementById('backgroundColorResult2').style.backgroundColor="rgb(255, 108, 129,.5)";
     // specify the image path here

}else{        document.getElementById('backgroundColorResult').style.backgroundColor="rgb(65, 113, 214,.5)";


   

}



// document.getElementById('backgroundColor').style.backgroundColor="blue"; // specify the image path here
