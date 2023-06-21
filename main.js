/*
Code by Berbi G
*/
function no8(x) {
    // console.log(x);
}
function getQueryVariable(v) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == v){return pair[1];}
    }
    return 0;
}
function addText(text) {
    if(hd) text = ++lineid + ". "+ text;
    hd=false;
    var outputArea = document.getElementById("textArea");
    outputArea.innerHTML += text;
}
function newLine() {
    var outputArea = document.getElementById("textArea");
    outputArea.innerText += "\n";
    hd=true;
}
function playSound(path) {
    var audio = new Audio(path);
    audio.play();
}
function I(x) {
    return st+x*sp;
}
function J(x,y) {
    return x*n+y;
}
function rec(x,y,a,b,co) {
    CC.fillStyle=co;
    CC.fillRect(x,y,a,b);
}
function cir(x,y,r=ra,co='black') {
    CC.fillStyle=co;
    CC.beginPath();
    CC.arc(x,y,r,0,2*Math.PI);
    CC.fill();
    CC.closePath();
}
function line(a,b,x,y,co,w=8) {
    CC.strokeStyle=co;
    CC.lineWidth=w;
    CC.beginPath();
    CC.moveTo(a,b);
    CC.lineTo(x,y);
    CC.stroke();
    CC.closePath();
}
function dash(a,b,x,y,co,w=8) {
    CC.setLineDash([5,15]);
    line(a,b,x,y,co,w);
    CC.setLineDash([]);
}
function disp() {
    rec(0,0,640,640,'#B0F0B0');
//    line(I(1),I(2),I(2),I(3),co0);
//    line(I(1),I(3),I(2),I(2),co0);
    if(choi>=0) {
        cir(I(choi),I(choj),ra*2,'lime');
    }
    var c=0;
    for(var i=0;i<mv;i++) {
        //no8(mvs[i]);
        var co=co0;
        if(c==1) co=co1;
        c=1-c;
//        if(i==mv-1) line(I(mvs[i][0]),I(mvs[i][1]),I(mvs[i][2]),I(mvs[i][3]),'yellow',17);
        line(I(mvs[i][0]),I(mvs[i][1]),I(mvs[i][2]),I(mvs[i][3]),co);
    }
    if(theend) co=o?co1:co0;
    if(!gameover) {
        for(var i=0;i<JN.length;i++) {
            // no8("hello!");
            // no8(JN[i]);
            // debugger;
            dash(I(JN[i][0]),I(JN[i][1]),I(JN[i][2]),I(JN[i][3]),co);
        }
    }
    for(var i=0;i<n;i++) for(var j=0;j<n;j++) cir(I(i),I(j));
    if(xx0>=0) {
        line(I(xx0)-12,I(xy0)-12,I(xx0)+12,I(xy0)+12,co0,5);
        line(I(xx0)+12,I(xy0)-12,I(xx0)-12,I(xy0)+12,co0,5);
    }
    if(xx1>=0) {
        line(I(xx1)-12,I(xy1)-12,I(xx1)+12,I(xy1)+12,co1,5);
        line(I(xx1)+12,I(xy1)-12,I(xx1)-12,I(xy1)+12,co1,5);
    }
    CC.font='25px Arial';
    var st="【先手】剩余连将次数:"+j0.toString()/*+"  CROSS:"+(xz0<0?"1":"0")*/;
    CC.fillText(st,sz-300,45);
    st="【后手】剩余连将次数:"+j1.toString()/*+"  CROSS:"+(xz1<0?"1":"0")*/;
    CC.fillText(st,sz-300,sz-20);
}
function fi(C,u) {
    return u==C[u]?u:(C[u]=fi(C,C[u]));
}
function uni(C,x,y) {
    x=fi(C,x),y=fi(C,y);
    if(x!=y) C[x]=y;
}
function EQ(a,b,c,d,e,f,g,h) {
    return (a==e&&b==f&&c==g&&d==h)||(a==g&&b==h&&c==e&&d==f);
}
function fly(T,C,a,b,ld,f=false) {//搜索
    var u=J(a,b);
    if(V[u]) return;
    if(++dfn==50000) {
        debugger;
    }
    if(a==edx&&b==edy) {
        if(cnt+(edd!=ld)>3) {
            chk=true;
            if(o==0) {
                var en=din+1;//边数
                if(banShape==1&&en===4&&DIs[0]%2!==DIs[1]%2) chk=false;//平四
                if(banShape==2&&en===4&&DIs[0]%2===0&&DIs[1]%2===0) chk=false;//小正方
                if(banShape==3&&en===4&&DIs[0]%2===1&&DIs[1]%2===1) chk=false;//大正方
                if(banShape==-1&&en===bann) {
                    DIs[din]=edd;
                    for(var r=0;r<en;r++) {
                        var f=true;
                        for(var i=0;i<din;i++)
                        if(DIs[i]!=banDI[(i+r)%en]) {
                            f=false;
                            break;
                        }
                        if(f) {
                            chk=false;
                            break;
                        }
                    }
                    for(var r=0;r<en;r++) {
                        var f=true;
                        for(var i=0;i<din;i++)
                        if(DIs[i]!=banDI[(r-i+en)%en]) {
                            f=false;
                            break;
                        }
                        if(f) {
                            chk=false;
                            break;
                        }
                    }
                }
            }
        }
    }
    // no8("f"+a+" "+b);
    V[u]=true;
    for(var di=0;di<8;di++) {
        let c=a+dx[di],d=b+dy[di],o2=false,wf=f;
        if(T[u][di]) o2=true;
        else if(!f&&c>=0&&c<n&&d>=0&&d<n&&!T0[u][di]&&!T1[u][di]&&fi(C,J(c,d))==edc) o2=true,wf=true;
        if(o2&&f!=wf&&(u==xz0||J(c,d)==xz0||u==xz1||J(c,d)==xz1)) o2=false;
        if(o2&&f!=wf) {
            for(var k=0;k<JL[ste].length;k++) {
                if(EQ(JL[ste][k][0],JL[ste][k][1],JL[ste][k][2],JL[ste][k][3],a,b,c,d)) {
                    o2=false;
                    break;
                }
            }
        }
        if(!o2) continue;
        let t=Math.min(a,c)*4+Math.min(b,d);
        if(di%2==1) {
            if(B[t]) continue;
            B[t]=true;
        }
        // if (wf!=f) no8(edc+" ,"+fi(C0,J(c,d)));
        if(di!=ld) cnt++;
        DIs[din++]=di;
        fly(T,C,c,d,di,wf);
        --din;
        if(di!=ld) cnt--;
        if(di%2==1) {
            B[t]=false;
        }
        if(chk) {
            if(wf!=f) {
                no8("this is check:"+a+" "+b+"->"+c+" "+d);
                // if(JL[ste].length>0) {
                //     if(JL[0]==[a,b,c,d]) debugger;

                // }
                JL[ste].push([a,b,c,d]);
                chk=false;
                continue;
            }
            break;
        }
    }
    V[u]=false;
}
function dist(a,b,x,y) {
    return Math.sqrt((a-x)*(a-x)+(b-y)*(b-y));
}
function fiachx() {//检测将军
    for(var i=0;i<JL.length;i++) {
        JL[i]=[];
    }
    for(var i=0;i<n;i++) for(var j=0;j<n;j++) {
        for(var d=0;d<4;d++)
        if(!T0[J(i,j)][d]&&!T1[J(i,j)][d]) {
//           if(d!=2||i>1||j>1) continue;
             // if(i==0&&j==1){

             // }
             // else continue;
            edx=i+dx[d];
            edy=j+dy[d];
            ste=EID[J(i,j)][d];
            chk=false;
            if(edx<0||edx>=n||edy<0||edy>=n) continue;
            if(J(i,j)==xz0||J(i,j)==xz1||J(edx,edy)==xz0||J(edx,edy)==xz1) continue;
            edc=fi((o?C1:C0),J(edx,edy));
            edd=d+4;
            cnt=0;
            // no8("--------------");
            // no8(i+" "+j+" "+edx+" "+edy);
            var t=Math.min(i,edx)*4+Math.min(j,edy);
            if(d%2==1) B[t]=true;
            fly((o?T1:T0),(o?C1:C0),i,j,d+4);
            if(d%2==1) B[t]=false;
        }
    }
}
function update() {
    disp();
    if(gameover) {
        if(!showresult) {
            playSound("game-end.webm");
            alert(o?"后手胜":"先手胜");
            showresult=true;
        }
        return;
    }
    if(cro) {
        if(!o) {
            if(choi>=0&&xx0==-1&&J(choi,choj)!=xz1) {
                xx0=choi,xy0=choj;
                addText("X("+choi+","+choj+") ");
                //playSound(".mep4");
                xz0=J(xx0,xy0);
                choi=choj=-1;
                fiachx();
                for(var i=JN.length-1;i>=0;i--) {
                    if(J(JN[i][0],JN[i][1])==xz0||J(JN[i][0],JN[i][1])==xz1
                    ||J(JN[i][2],JN[i][3])==xz0||J(JN[i][2],JN[i][3])==xz1) JN.splice(i,1);
                }
            }
        }
        else {
            if(choi>=0&&xx1==-1&&J(choi,choj)!=xz0) {
                xx1=choi,xy1=choj;
                addText("X("+choi+","+choj+") ");
                xz1=J(xx1,xy1);
                choi=choj=-1;
                fiachx();
                for(var i=JN.length-1;i>=0;i--) {
                    if(J(JN[i][0],JN[i][1])==xz0||J(JN[i][0],JN[i][1])==xz1
                    ||J(JN[i][2],JN[i][3])==xz0||J(JN[i][2],JN[i][3])==xz1) JN.splice(i,1);
                }
            }
        }
        cro=false;
    }
    if(mx!=0) {
        for(var i=0;i<n;i++) for(var j=0;j<n;j++)
        if(dist(I(i),I(j),mx,my)<40) {
            if(choi>=0) {
                var a=choi,b=choj,c=i,d=j,t;
                if(a>c||a==c&&b>d) t=c,c=a,a=t,t=d,d=b,b=t;
                if(a==c&&b==d) choi=choj=-1;
                else if(Math.abs(c-a)<=1&&Math.abs(d-b)<=1) {
                    di=b-d+c-a+1;
                    var u=J(a,b),v=J(c,d);
                    // no8(J(a,b));
                    if(T0[u][di]||T1[u][di]) continue;
                    if((u==xz0||v==xz0)||(u==xz1||v==xz1)||(JL[EID[u][di]].length>0&&!theend&&(o&&j1==0||!o&&j0==0))) continue;
                    if(theend) {
                        let ok=false;
                        for(var k=0;k<JN.length;k++) {
                            if(
                                a==JN[k][0]&&b==JN[k][1]&&c==JN[k][2]&&d==JN[k][3]||
                                a==JN[k][2]&&b==JN[k][3]&&c==JN[k][0]&&d==JN[k][1]
                            ) {ok=true; break;}
                        }
                        if(!ok) continue;
                    }
                    no8("moved"+(o)+di);
                    if(o) T1[u][di]=T1[J(c,d)][di+4]=true,uni(C1,u,v);
                    else T0[u][di]=T0[J(c,d)][di+4]=true,uni(C0,u,v);
                    // no8(C0);
                    choi=choj=-1;
                    mvs[mv++]=[a,b,c,d];
                    playSound("move-self.webm");
                    // if(!o) addText((mv+1)/2+".    ");
                    addText("("+a+","+b+")-("+c+","+d+")    ");
                    if(o) newLine();
                    if(theend) {
                        gameover=true;
                        disp();
                        return;
                    }
                    if(JN.length>1||JN.length==1&&!(
                        a==JN[0][0]&&b==JN[0][1]&&c==JN[0][2]&&d==JN[0][3]||
                        a==JN[0][2]&&b==JN[0][3]&&c==JN[0][0]&&d==JN[0][1]
                        )) {
                            theend=true;
                            for(var k=JN.length-1;k>=0;k--) {
                                if(
                                    a==JN[k][0]&&b==JN[k][1]&&c==JN[k][2]&&d==JN[k][3]||
                                    a==JN[k][2]&&b==JN[k][3]&&c==JN[k][0]&&d==JN[k][1]) JN.splice(k,1);
                            }
                        if(JN.length==0) debugger;
                    }
                    else {
                        JN=JL[EID[u][di]].concat();
                        if(JN.length>0) {
                            if(o) --j1; else --j0;
                        }
                        else {
                            if(o) j1=2; else j0=2;
                        }
                    }
                    o=1-o;
                    fiachx();
                }
                else choi=i,choj=j;
            }
            else choi=i,choj=j;
        }
        mx=my=0;
    }
}
function ccli(e) {
    mx=e.offsetX;
    my=e.offsetY;
}
function ckey(e) {
    //no8(e.keyCode);
    if(e.keyCode==88) {
        cro=true;
    }
}
function clicked() {
    cro=true;
}
function init() {
    var outputArea = document.getElementById("textArea");
    outputArea.innerHTML = '';
    mx=my=0;
    choi=choj=-1;
    mv=0;
    theend=false;
    gameover=false;
    showresult=false;
    xx0=xy0=xx1=xy1=xz0=xz1=-1;
    o=0;//是否先手走
    cro=false;
    j0=j1=2;
    din=0;
    lineid=0;
    hd=true;
    for(var i=0;i<C0.length;i++) C0[i]=C1[i]=i;
    T0=Array.from(Array(25),()=>new Array(8).fill(false));
    T1=Array.from(Array(25),()=>new Array(8).fill(false));
    JL=Array.from(Array(72),()=>new Array);
    JN=[];
    V=new Array(25).fill(false);
    B=new Array(16).fill(false);
    mvs=new Array(80);
    DIs=new Array(80);
    banShape=getQueryVariable("ban");
    no8(banShape);
}
window.onload=() => {
    CA=document.getElementById('wgzcanvas');
    CC=CA.getContext('2d');
    dfn=0;
    fps=30;
    n=5;//行、列
    sz=640;//总像素
    sp=sz/6;//点间距
    ra=sz/80;//点半径
    st=sz/2-sp*((n-1)/2);//起始坐标
    co0='#E05050',co1='#5050E0',co2='#885088';//先后手颜色
    dx=[0,1,1,1,0,-1,-1,-1];
    dy=[1,1,0,-1,-1,-1,0,1];
    EID=Array.from(Array(25),()=>new Array(8));
    var e=0;
    for(var i=0;i<n;i++) for(var j=0;j<n;j++) {
        for(var d=0;d<4;d++) {
            var x=i+dx[d];
            var y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            EID[J(i,j)][d]=EID[J(x,y)][d]=e++;
        }
    }
    C0=new Array(25);
    C1=new Array(25);
    init();
    setInterval(update,1000/fps);
    document.addEventListener('keydown',ckey);
    CA.addEventListener('click',ccli);
}
/*
TODO:

*/