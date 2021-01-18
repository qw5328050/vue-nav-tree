<template>
    <div class="sign-root">
        <div class="sign-wrap">
            <div class="btn-wrap">
                <div class="btn sure" id="exportBtn">确&nbsp;&nbsp;定</div>
                <div class="btn clear" id="clearBtn">重&nbsp;&nbsp;签</div>
            </div>
            <div class="board">
                <div class="canvas">
                    <canvas id="signCanvas" width="300" height="600"></canvas>
                </div>        
            </div>        
        </div>
        <canvas id="exportImgCanvas" width="600" height="300"></canvas>
    </div>
</template>

<style>
.sign-root{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #fff;
    overflow: auto;
}
.sign-wrap{
    width: 360px;
    height: 640px;
    display: flex;
}    
.sign-wrap .btn-wrap{
    position: relative;
    width: 50px;
    height: 100%;
    padding: 10px 0;
}
.sign-wrap .board{
    width: 310px;
    height: 100%;
    padding: 19px 4px;                
}
.sign-wrap .canvas{
    width: 302px;
    height: 602px;
    border: solid 1px;
    overflow: hidden;
}
.sign-wrap .btn{
    position: absolute;
    top: 50%;
    left: 50%;
    background: #2ad181;
    font-size: 18px;
    color: #fff;
    padding: 2px 0;
    border-radius: 5px;
    text-align: center;
    width: 120px;
    line-height: 36px;    
    transform-origin: 0 0;   
}
.sign-wrap .btn.sure{
    transform: rotate(90deg) translate(-150%, -50%);
}
.sign-wrap .btn.clear{
    transform: rotate(90deg) translate(50%, -50%);
}
#exportImgCanvas{
    display: none;
}
</style>


<script type="text/javascript">
var signCanvas;
var drawCxt;
var exportBtn;
var clearBtn;
var vueObj;
var confirmCallback = null;

function getById(id){
    return document.getElementById(id)
}

function init(vm){
    vueObj = vm;
    
    signCanvas = getById('signCanvas');
    drawCxt = signCanvas.getContext('2d');
    drawCxt.strokeStyle = '#000000';
    drawCxt.lineWidth = 5;
    drawCxt.lineCap = 'round';

    exportBtn = getById('exportBtn');
    clearBtn = getById('clearBtn');

    exportBtn.onclick = function(){
        exportSignature()
    }
    clearBtn.onclick = function(){
        drawCxt.clearRect(0,0,1000,1000)
    }

    signCanvas.addEventListener('touchstart',touchStartHandler,true);
    signCanvas.addEventListener('touchmove',touchMoveHandler,true);
    signCanvas.addEventListener('touchend',touchEndHandler,true);
}

function getInPageXY(el){//取元素
        var x=0, y=0;
        do{
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent;
        }while(el!=document.body&&el!==null);//fixed定位的元素不会上溯到body
        return {x:x,y:y}
    }
var canvasPosition;
var startPoint={x:0,y:0}
var drawing;
function touchStartHandler(e){
    drawing=true;
    e.preventDefault();
    e= e.touches[0];
    canvasPosition = getInPageXY(signCanvas);
    startPoint.x=e.clientX-canvasPosition.x;
    startPoint.y=e.clientY-canvasPosition.y;//记录点击位置相对于画布左上角坐标
    drawCxt.beginPath();
    drawCxt.moveTo(startPoint.x,startPoint.y);
    console.info('start:',startPoint);
}
function touchMoveHandler(e){//手指滑动画线
    if(!drawing){return}
    e.preventDefault();e.stopPropagation();
    e=e.changedTouches[0];
    var x=e.clientX-canvasPosition.x, y=e.clientY-canvasPosition.y;
    drawCxt.lineTo(x,y);
    drawCxt.stroke(); 
}
function touchEndHandler(){
    drawCxt.closePath();    
    drawing=false
}

function exportSignature(){
    var s = getWriteArea();
    if(s < 0.02){//笔触面积过小 todo;
        vueObj.$toast({text:'未检测到有效的的签名'})
        return
    }

    var exportImg = getById('exportImgCanvas');
    var exportCxt = exportImg.getContext('2d');
    
    exportCxt.save();
    exportCxt.rotate(-90*Math.PI/180);
    exportCxt.translate(-300,0);    
    exportCxt.drawImage(signCanvas,0,0,300,640);
    exportCxt.restore();

    if(confirmCallback){
        exportImg.toBlob(function(blob){
            var tmpFile;
            tmpFile = new File([blob], 'sign.png', {type:'image/png'});
            confirmCallback(tmpFile);
        });        
    }    
    console.log('手写导出完成');
    document.body.removeChild(vueObj.$el);
    vueObj.$destroy();    
}

function getWriteArea(){//面积计算
    var imageData=drawCxt.getImageData(0,0,300,600).data;
    for(var i=0,j= 0,n=imageData.length;i<n;i+=4){
        if (imageData[i + 3] > 0) {j++}
    }
    return j/(300*600);
}

export default {
        methods: {
            msg:function(){
                console.log(this)
            }           
        },
        setCallback: function(callback){
            confirmCallback = callback
        },
        mounted: function(){
            document.body.appendChild(this.$el);
            init(this);
        }
    }
</script>