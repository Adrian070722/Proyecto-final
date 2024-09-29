

const fulImgBox = document.getElementById("fulImgBox"),
fulImg = document.getElementById("fulImg");

function openFulImg(reference){
    fulImgBox.style.display = "flex";
    fulImg.src = reference
}
function closeImg(){
    fulImgBox.style.display = "none";
};

var estado = 0;
function playVideo (e, btn){
   var video = document.getElementById('video'+ e);
   console.log(btn);
    if (estado == 0){
        btn.style.opacity = "0"
    video.play();
    estado +=1;
}

else{
    video.pause();
    estado -= 1;
    btn.style.opacity = "1"
}

}