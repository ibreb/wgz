function initUI() {
    sz=640;//总像素
    sp=sz/6;//点间距
    ra=sz/80;//点半径
    st=sz/2-sp*((n-1)/2);//起始坐标
    blindfolded=false;
    colorblind=false;
    co0='#E05050',co1='#5050E0',co2='#885088';//先后手颜色
    if(colorblind) co0=co1='#606060';
}

function I(x) {
    return st+x*sp;
}

function rec(x,y,a,b,co) {
    CC.fillStyle=co;
    CC.fillRect(x,y,a,b);
}
function cir(x,y,r=ra,co='black',sh=false) {
    CC.fillStyle=co;
    if(sh) {
        CC.shadowColor=co;
        CC.shadowBlur=20;
    }
    CC.beginPath();
    CC.arc(x,y,r,0,2*Math.PI);
    CC.fill();
    CC.closePath();
    CC.shadowColor='transparent';
    CC.shadowBlur=0;
}
function line(a,b,x,y,co,w=8) {
    CC.strokeStyle=co;
    CC.lineWidth=w;
    CC.shadowColor=co;
    CC.shadowBlur=10;
    CC.beginPath();
    CC.moveTo(a,b);
    CC.lineTo(x,y);
    CC.stroke();
    CC.closePath();
    CC.shadowColor='transparent';
    CC.shadowBlur=0;
}
function dash(a,b,x,y,co,w=8) {
    CC.setLineDash([5,15]);
    line(a,b,x,y,co,w);
    CC.setLineDash([]);
}
function disp() {
    rec(0,0,640,640,'#E0E0E0');
    // rec(0,0,640,640,'#dcdcdc');


    // for(var i=0;i<n;i++) for(var j=0;j<n;j++) {
    //     for(var d=0;d<4;d++) {
    //         var x=i+dx[d];
    //         var y=j+dy[d];
    //         if(x<0||x>=n||y<0||y>=n) continue;
    //         line(I(i),I(j),I(x),I(y),'#606060');
    //     }
    // }
        
    if(choi>=0) {
        cir(I(choi),I(choj),ra*2,'lime',true);
    }
    var c=0;
    for(var i=0;i<dispMove;i++) {
        var co=co0;
        if(c==1) co=co1;
        c=1-c;
        if(!blindfolded||i==dispMove-1) line(I(mvs[i][0]),I(mvs[i][1]),I(mvs[i][2]),I(mvs[i][3]),co);
    }

    if(dispMove > 0) {
        var table = document.getElementById("movesTable").getElementsByTagName('tbody')[0];
        table.rows[Math.floor((dispMove-1) / 2)].cells[(dispMove-1) % 2 + 1].classList.add('highlight');
    }

    if(berzudflag) {
        for(let i=0;i<72;++i) {
            let co='rgb(255,' + (255-colors[i]*2).toString() + ',255)';
            [a,b,c,d]=unpackE[i];
            line(I(a),I(b),I(c),I(d),co);
        }
    }
    if(theend) co=o?co1:co0;
    if(!gameover&&!blindfolded&&mv==dispMove) {
        for(var i=0;i<JN.length;i++) {
            dash(I(JN[i][0]),I(JN[i][1]),I(JN[i][2]),I(JN[i][3]),co);
        }
    }
    for(var i=0;i<n;i++) for(var j=0;j<n;j++) cir(I(i),I(j));
    if(xx0>=0&&(mv==dispMove||dispMove>croMv0)) {
        line(I(xx0)-12,I(xy0)-12,I(xx0)+12,I(xy0)+12,co0,5);
        line(I(xx0)+12,I(xy0)-12,I(xx0)-12,I(xy0)+12,co0,5);
    }
    if(xx1>=0&&(mv==dispMove||dispMove>croMv1)) {
        line(I(xx1)-12,I(xy1)-12,I(xx1)+12,I(xy1)+12,co1,5);
        line(I(xx1)+12,I(xy1)-12,I(xx1)-12,I(xy1)+12,co1,5);
    }
    if(!gameover) {
        CC.font='25px Arial';
        var st="【先手】剩余连将次数:"+j0.toString();
        CC.fillStyle=co0;
        CC.fillText(st,sz-300,45);
        st="【后手】剩余连将次数:"+j1.toString();
        CC.fillStyle=co1;
        CC.fillText(st,sz-300,sz-20);
    }
}

function ccli(e) {
    mx=e.offsetX;
    my=e.offsetY;
}
function leftKey() {
    if(dispMove > 0) {
        var table = document.getElementById("movesTable").getElementsByTagName('tbody')[0];
        table.rows[Math.floor((dispMove-1) / 2)].cells[(dispMove-1) % 2 + 1].classList.remove('highlight');
    }
    dispMove--;
    if(dispMove < 0) dispMove = 0;
}
function rightKey() {
    if(dispMove > 0) {
        var table = document.getElementById("movesTable").getElementsByTagName('tbody')[0];
        table.rows[Math.floor((dispMove-1) / 2)].cells[(dispMove-1) % 2 + 1].classList.remove('highlight');
    }
    dispMove++;
    if(dispMove > mv) dispMove = mv;
}
function ckey(e) {
    if(e.keyCode==88) {
        cro=true;
    }
    if(e.keyCode==37) {
        leftKey();
    }
    if(e.keyCode==39) {
        rightKey();
    }
}
function clicked() {
    cro=true;
}