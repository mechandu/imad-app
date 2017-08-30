console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML='Chandhu Chandrika';
var img=document.getElemntById('madi');
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function()
{
    var interval=setInterval(moveRight, 50);
    img.style.marginLeft='100px';
};