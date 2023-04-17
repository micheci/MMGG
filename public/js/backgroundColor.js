

let backgroundColor=document.getElementById('backgroundColor').innerHTML
let backgroundColorResult=document.getElementById('backgroundColorResult').innerHTML
//console.log(backgroundColor)
//console.log(backgroundColorResult)

let backgroundColor2=document.getElementById('backgroundColor').innerHTML
let backgroundColorResult2=document.getElementById('backgroundColorResult').innerHTML

if(backgroundColor==='false'){
    console.log('false')
    document.getElementById('backgroundColorResult').style.backgroundColor="#FF6C81";
    //document.getElementById('backgroundColorResult').style.backgroundColor="#4171D6";

     // specify the image path here

}else{
    console.log('true')
}
if(backgroundColor2==='false'){
document.getElementById('backgroundColorResult2').style.backgroundColor="rgb(255, 108, 129,.5)";
     // specify the image path here

}else{    document.getElementById('backgroundColorResult2').style.backgroundColor="#4171D6";

   

}



// document.getElementById('backgroundColor').style.backgroundColor="blue"; // specify the image path here
