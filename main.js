/*
Code by Berbi G
*/
function no8(x) {
    console.log(x);
}
function assert(x,info) {
    if(!x) {
        no8("assert failed");
        no8(info);
        debugger;
    }
}
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    if(choi>=0) {
        cir(I(choi),I(choj),ra*2,'lime',true);
    }
    var c=0;
    for(var i=0;i<mv;i++) {
        var co=co0;
        if(c==1) co=co1;
        c=1-c;
//        if(i==mv-1) line(I(mvs[i][0]),I(mvs[i][1]),I(mvs[i][2]),I(mvs[i][3]),'yellow',17);
        if(!blindfolded||i==mv-1) line(I(mvs[i][0]),I(mvs[i][1]),I(mvs[i][2]),I(mvs[i][3]),co);
    }
    if(theend) co=o?co1:co0;
    if(!gameover&&!blindfolded) {
        for(var i=0;i<JN.length;i++) {
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
    ++dfn;
    // if(++dfn==5000000) {
    //     debugger;
    // }
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
                // console.log("this is check:"+a+" "+b+"->"+c+" "+d);
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
function valid(a,b,c,d) {
    let u=J(a,b),v=J(c,d),di=b-d+c-a+1;;
    if(T0[u][di]||T1[u][di]) return false;
    if(u==xz0||v==xz0||u==xz1||v==xz1||(JL[EID[u][di]].length>0&&!theend&&(o&&j1==0||!o&&j0==0))) return false;
    if(theend) {//可取胜必取胜
        let ok=false;
        for(let k=0;k<JN.length;k++) {
            if(
                a==JN[k][0]&&b==JN[k][1]&&c==JN[k][2]&&d==JN[k][3]||
                a==JN[k][2]&&b==JN[k][3]&&c==JN[k][0]&&d==JN[k][1]
            ) {ok=true; break;}
        }
        if(!ok) return false;
    }
    return true;
}
function stupid(a,b,c,d) {
    let u=J(a,b),v=J(c,d),di=b-d+c-a+1;
    if(JN.length>1||JN.length==1&&!(
        a==JN[0][0]&&b==JN[0][1]&&c==JN[0][2]&&d==JN[0][3]||
        a==JN[0][2]&&b==JN[0][3]&&c==JN[0][0]&&d==JN[0][1]
        )) {
            return true;
    }
    return false;
}
function move(a,b,c,d) {
    let u=J(a,b),v=J(c,d),di=b-d+c-a+1;
    if(!valid(a,b,c,d)) return;
    if(o) T1[u][di]=T1[J(c,d)][di+4]=true,uni(C1,u,v);
    else T0[u][di]=T0[J(c,d)][di+4]=true,uni(C0,u,v);
    if(!eMode) {
        mvs[mv++]=[a,b,c,d];
        playSound("move-self.webm");
        addText("("+a+","+b+")-("+c+","+d+")    ");
        if(o) newLine();
    }
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
            for(let k=JN.length-1;k>=0;k--) {
                if(
                    a==JN[k][0]&&b==JN[k][1]&&c==JN[k][2]&&d==JN[k][3]||
                    a==JN[k][2]&&b==JN[k][3]&&c==JN[k][0]&&d==JN[k][1]) JN.splice(k,1);
            }
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
    ++deg[u],++deg[v];
    fiachx();
    // console.log(a,b,c,d);
}
function cross(x,y) {
    assert(x>=0&&x<n&&y>=0&&y<n);
    if(!o) xx0=x,xy0=y,xz0=J(x,y);
    else xx1=x,xy1=y,xz1=J(x,y);
    if(!eMode) {
        addText("X("+x+","+y+") ");
        //playSound(".mep4");
    }
    fiachx();
    for(var i=JN.length-1;i>=0;i--) {
        if(J(JN[i][0],JN[i][1])==xz0||J(JN[i][0],JN[i][1])==xz1
        ||J(JN[i][2],JN[i][3])==xz0||J(JN[i][2],JN[i][3])==xz1) JN.splice(i,1);
    }
}
function update() {
    if(eMode) return;
    disp();
    if(gameover) {
        if(!showresult) {
            playSound("game-end.webm");
            setTimeout(function() {alert(o?"后手胜":"先手胜");}, 200);
            showresult=true;
        }
        return;
    }
    if(cro) {
        if(!o) {
            if(choi>=0&&xx0==-1&&J(choi,choj)!=xz1) {
                cross(choi,choj);
                choi=choj=-1;
            }
        }
        else {
            if(choi>=0&&xx1==-1&&J(choi,choj)!=xz0) {
                cross(choi,choj);
                choi=choj=-1;
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
                    choi=choj=-1;
                    if(!valid(a,b,c,d)) continue;
                    move(a,b,c,d);
                    disp();
                    if(!gameover) {
                        if(mode==1) setTimeout((randint(0,2)>0?A1Move:A0Move),300);
                        if(mode==2) setTimeout(A2Move,300);
                        if(mode==3) setTimeout(mctsMove,30);
                        if(mode==4) setTimeout(B1Move,30);
                    }
                }
                else choi=i,choj=j;
            }
            else choi=i,choj=j;
        }
        mx=my=0;
    }
}
function A0Move() {
    let t=0;
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)) ++t;
        }
    }
    if(t==0) {
        draw=true;
        return;
    }
    let c=randint(1,t);
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)&&--c==0) {
                move(i,j,x,y);
                break;
            }
        }
    }
}
function croIfNecessary() {
    if(!theend&&JN.length>1&&(!o&&xz0==-1||o&&xz1==-1)) {
        let cnt=new Array(25).fill(0),s=-1,a,b,x;
        for(let i=0;i<JN.length;i++) {
            if(++cnt[x=J(JN[i][0],JN[i][1])]>s) s=cnt[x],a=JN[i][0],b=JN[i][1];
            if(++cnt[x=J(JN[i][2],JN[i][3])]>s) s=cnt[x],a=JN[i][2],b=JN[i][3];
        }
        cross(a,b);
    }
}
function A0Judge(e) {
    [i,j,x,y]=unpackE[e];
    let s=0;
    let w=JL[e].length;
    // if(x<1||x>=n-1) s-=5;
    // if(y<1||y>=n-1) s-=5;
    // if(i<1||i>=n-1) s-=5;
    // if(j<1||j>=n-1) s-=5;
    if(w==1) s+=50;
    if(w>1) s+=w*100;
    s+=7*(deg[J(i,j)]+deg[J(x,y)]);
    s+=randint(0,100);
    return s;
}
function A1Move() {//挑将军多的走
    croIfNecessary();
    let t=0,e=0,ce=-1,f=-1;
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)&&!stupid(i,j,x,y)&&JL[e].length>f) f=JL[e].length;
            ++e;
        }
    }
    e=0;
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)&&!stupid(i,j,x,y)&&JL[e].length==f) {
                ++t;
                if(randint(1,t)==1) ce=e;
            }
            ++e;
        }
    }
    if(ce==-1) {
        A0Move();
        return;
    }
    [a,b,c,d]=unpackE[ce];
    move(a,b,c,d);
}
function A2Move() {//一层估价
    croIfNecessary();
    let t=0,e=0,ce=-1,f=-100;
    let score=new Array(72).fill(0);
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)&&!stupid(i,j,x,y)) {
                score[e]=A0Judge(e);
            }
            ++e;
        }
    }
    e=0;
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)&&!stupid(i,j,x,y)&&score[e]>f) {
                ce=e,f=score[e];
            }
            ++e;
        }
    }
    if(ce==-1) {
        A0Move();
        return;
    }
    [a,b,c,d]=unpackE[ce];
    move(a,b,c,d);
}
function cpy(arr) {
    if(!Array.isArray(arr)) {
        return arr;
    }
    return arr.map(item => cpy(item));
}
function mctsMove() {
    if(theend) {
        A0Move();
        return;
    }
    eMode=true;
    let m=1,C=1.4;
    let W=[0,0],T=[0,0];
    let hd=[0,0],nt=[0,0],E=[0,0],fa=[0,0];
    let fullyExpanded=[false,false];
    let end=[false,false];
    [oo,oj0,oj1,oxx0,oxy0,oxz0,oxx1,oxy1,oxz1,oC0,oC1,oT0,oT1,oJN,oJL,odeg]=[o,j0,j1,xx0,xy0,xz0,xx1,xy1,xz1,C0,C1,T0,T1,JN,JL,deg];
    let TT=700;//*60;
    let optA=true;
    let mvlist=[null,null];
    function superno8(w,c=0) {
        if(c>1) return;
        s="";
        for(let i=0;i<c;++i) s+="----";
        if(E[w]<72) console.log(s+W[w]+"/"+T[w],unpackE[E[w]],w);
        else console.log(s+W[w]+"/"+T[w],((E[w]-72)-(E[w]-72)%5)/5,(E[w]-72)%5,w);
        for(let v=hd[w];v;v=nt[v]) {
            superno8(v,c+1);
        }
    }
    for(let _=0;_<TT;++_) {
        // no8(_+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        let u=1,fl=1,lvl=0;
        // reset();
        [o,j0,j1,xx0,xy0,xz0,xx1,xy1,xz1,C0,C1,T0,T1,JN,JL,deg]=[oo,oj0,oj1,oxx0,oxy0,oxz0,oxx1,oxy1,oxz1,cpy(oC0),cpy(oC1),cpy(oT0),cpy(oT1),cpy(oJN),cpy(oJL),cpy(odeg)],theend=false;
        while(fullyExpanded[u]) {
            let w=0,x;
            if(fl) {
                for(let v=hd[u];v;v=nt[v]) {
                    let f=W[v]/T[v]+C*Math.sqrt(Math.log(T[u])/T[v]);
                    if(v==hd[u]||f>=x) w=v,x=f;
                }
            }
            else {
                for(let v=hd[u];v;v=nt[v]) {
                    let f=(T[v]-W[v])/T[v]+C*Math.sqrt(Math.log(T[u])/T[v]);
                    if(v==hd[u]||f>=x) w=v,x=f;
                }
            }
            if(E[w]<72) {
                [a,b,c,d]=unpackE[E[w]];
                move(a,b,c,d);
                fl^=1;
            }
            else {
                let t=E[w]-72;
                let b=t%5,a=(t-b)/5;
                cross(a,b);
            }
            ++lvl,u=w;
            if(w==0) break;
        }
        if(u==0) break;
        if(end[u]) {
            let w=Number(o!=oo);
            ++T[u],W[u]+=w;
            let v=fa[u];
            while(v) {
                W[v]+=w,++T[v],v=fa[v];
            }
            continue;
        }
        if(!hd[u]) {
            let e=0;
            let es=[];
            let okCro=new Array(25).fill(false);
            let sc=new Array(72).fill(0);
            for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
                for(let d=0;d<4;d++) {
                    let x=i+dx[d],y=j+dy[d];
                    if(x<0||x>=n||y<0||y>=n) continue;
                    if(valid(i,j,x,y)&&!stupid(i,j,x,y)) es.push(e),sc[e]=A0Judge(e);
                    if((!o&&xz0==-1||o&&xz1==-1)) {
                        if(JL[e].length>2) okCro[J(i,j)]=okCro[J(x,y)]=true;
                    }
                    ++e;
                }
            }
            if(!o&&xz0==-1||o&&xz1==-1) {
                for(let i=0;i<JN.length;i++) {
                    okCro[J(JN[i][0],JN[i][1])]=true;
                    okCro[J(JN[i][2],JN[i][3])]=true;
                }
            }
            if(xz0!=-1) okCro[xz0]=false;
            if(xz1!=-1) okCro[xz1]=false;
            if(optA) es.sort((a,b)=>sc[a]-sc[b]);
            // for(let i=0;i<es.length;i++) no8(sc[es[i]]);
                // debugger;
            let t=es.length;
            if(optA) {
                if(lvl==0&&t>40) t=40;
                if(lvl==1&&t>10) t=10;
                if(lvl>1&&t>2) t=2;
            }
            let A=[];
            for(let i=0;i<25;++i) if(okCro[i]) A.push(i+72);
            for(let k=es.length-t;k<es.length;k++) A.push(es[k]);
            if(A.length==0) {
                let w;
                T[u]++,w=Number(o!=oo),W[u]+=w,end[u]=true;
                let v=fa[u];
                while(v) {
                    W[v]+=w,++T[v],v=fa[v];
                }
                continue;
            }
            mvlist[u]=A;
            // if(u==127) {
            //     no8(A);
            //     debugger;
            // }
        }
        assert(mvlist[u].length>0);
        ++m; let e=mvlist[u].pop();
        hd.push(0),nt.push(hd[u]),hd[u]=m,E.push(e),T.push(1),W.push(0);
        fa.push(u),fullyExpanded.push(false),mvlist.push(null),end.push(false);
        // no8("E:"+E[m]);
        if(mvlist[u].length==0) fullyExpanded[u]=true;
        if(e<72) {
            [a,b,c,d]=unpackE[e];
            move(a,b,c,d);
        }
        else {
            let t=e-72;
            assert(t<25&&t>=0);
            let b=t%5,a=(t-b)/5;
            cross(a,b);
        }
        draw=false;
        while(!theend&&!draw) A2Move();
        if(o==oo) ++W[m];
        while(u) {
            W[u]+=W[m],++T[u],u=fa[u];
        }
        // disp();
    }
    // if(W[1]==0) alert("resign");
    [o,j0,j1,xx0,xy0,xz0,xx1,xy1,xz1,C0,C1,T0,T1,JN,JL,deg]=[oo,oj0,oj1,oxx0,oxy0,oxz0,oxx1,oxy1,oxz1,cpy(oC0),cpy(oC1),cpy(oT0),cpy(oT1),cpy(oJN),cpy(oJL),cpy(odeg)],theend=false;
    eMode=false;
    let f=-1,g=-1,sf=-1,sg=-1,e=-1,se=-1,v0,v1;
    let foo=[];
    for(let v=hd[1];v;v=nt[v]) {
        if(T[v]>f||T[v]==f&&W[v]>g) f=T[v],g=W[v],e=E[v],v0=v;
        else if(T[v]>sf||T[v]==sf&&W[v]>sg) sf=T[v],sg=W[v],se=E[v],v1=v;
        foo.push(v);
        // if(T[v]>=40) 
        
    }
    foo.sort((a,b)=>T[b]-T[a]);
    let c0=0,c1=0,c2=0;
    for(let u=1;u<=m;++u) {
        if(fa[u]==1) ++c0;
        if(fa[fa[u]]==1) ++c1;
        if(fa[fa[fa[u]]]==1) ++c2;
        // no8(u+":"+W[u]+" "+T[u]);
    }
    for(let i=0;i<3;i++) {
        if(foo.length==i) break;
        let v=foo[i];
        // if(E[v]<72) console.log(W[v]+"/"+T[v],unpackE[E[v]]);
        // else console.log(W[v]+"/"+T[v],((E[v]-72)-(E[v]-72)%5)/5,(E[v]-72)%5);
        superno8(v);
    }
    console.log("C:",c0,c1,c2);
    // for(let u=1;u<=m;++u) {
    //     for(let v=hd[u];v;v=nt[v]) no8(u+"->"+v+" "+unpackE[E[v]]);
    // }
    // if(e>=0) console.log(W[v0]+"/"+T[v0],unpackE[e]);
    // if(se>=0) console.log(W[v1]+"/"+T[v1],unpackE[se]);

    if(e==-1) {
        A0Move();
        return;
    }
    // no8(e+" "+f+" "+unpackE[e]);
    if(e<72) {
        [a,b,c,d]=unpackE[e];
        move(a,b,c,d);
    }
    else {
        let t=e-72;
        let b=t%5,a=(t-b)/5;
        cross(a,b);
        mctsMove();
    }
    // no8(dfn);
}
function B1Move() {
    t1=Date.now();
    if(theend) {
        A0Move();
        return;
    }
    let A = new Array;
    A.push(o);
    A.push(j0);
    A.push(j1);
    A.push(xx0);
    A.push(xy0);
    A.push(xz0);
    A.push(xx1);
    A.push(xy1);
    A.push(xz1);
    A.push(banShape);
    for(let i=0;i<25;++i) A.push(C0[i]);
    for(let i=0;i<25;++i) A.push(C1[i]);
    for(let i=0;i<25;++i) for(let j=0;j<8;++j) A.push(Number(T0[i][j]));
    for(let i=0;i<25;++i) for(let j=0;j<8;++j) A.push(Number(T1[i][j]));
    A.push(JN.length);
    for(let i=0;i<JN.length;++i) {
        // for(let j=0;j<4;++j) if(JN[i][0]+dx[j]==JN[i][2]&&JN[i][1]+dy[j]==JN[i][3]) A.push(EID[J(JN[i][0],JN[i][1])][j]);
        A.push(JN[i][0]);
        A.push(JN[i][1]);
        A.push(JN[i][2]);
        A.push(JN[i][3]);
    }
    // for(let i=0;i<72;++i) {
    //     A.push(JL[i].length);
    //     for(let j=0;j<JL[i].length;++j) {
    //         for(let k=0;k<8;++k)
    //         if(JL[i][j][0]+dx[k]==JL[i][j][2]&&JL[i][j][1]+dy[k]==JL[i][j][3]) {
    //             if(k<4) A.push(EID[J(JL[i][j][0],JL[i][j][1])][k]);
    //             else A.push(EID[J(JL[i][j][2],JL[i][j][3])][k-4]);
    //             break;
    //         }
    //         // A.push(JL[i][j][0]);
    //         // A.push(JL[i][j][1]);
    //         // A.push(JL[i][j][2]);
    //         // A.push(JL[i][j][3]);
    //     }
    // }
    for(let i=0;i<25;++i) A.push(deg[i]);
    arr=new Int8Array(A.length);
    for(let i=0;i<A.length;++i) arr[i]=A[i];
    // console.log(arr);
    const e = Module.ccall('mctsMove', 'number', ['array'], [arr]);
    if(e<72) {
        [a,b,c,d]=unpackE[e];
        move(a,b,c,d);
    }
    else {
        let t=e-72;
        let b=t%5,a=(t-b)/5;
        cross(a,b);
        B1Move();
    }
    console.log("TI:",Date.now()-t1);
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
    if(e.keyCode==87) {
        w=true;
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
    mode=getQueryVariable("mode");
    draw=false;
    if(randint(1,2)==1) {
        if(mode==1) setTimeout((randint(0,2)>0?A1Move:A0Move),30);
        if(mode==2) setTimeout(A2Move,30);
        if(mode==3) setTimeout(mctsMove,30);
        if(mode==4) setTimeout(B1Move,30);
    }
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
    unpackE=new Array(72);
    var e=0;
    for(var i=0;i<n;i++) for(var j=0;j<n;j++) {
        for(var d=0;d<4;d++) {
            var x=i+dx[d];
            var y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            unpackE[e]=[i,j,x,y];
            EID[J(i,j)][d]=EID[J(x,y)][d]=e++;
        }
    }
    C0=new Array(25);
    C1=new Array(25);
    deg=new Array(25).fill(0);
    eMode=false;
    blindfolded=false;
    init();
    setInterval(update,1000/fps);
    document.addEventListener('keydown',ckey);
    CA.addEventListener('click',ccli);
}
function selfPlay() {
    while(!gameover) {
        disp();
        setTimeout(mctsMove,200);
    }
}
function selfPlayB() {
    setInterval(B1Move,1000);
}
function exportCanvasAsImage(fileName) {
    const img = new Image();
    img.src = CA.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = img.src;
    link.download = fileName+'.png';
    link.click();
}
function test() {
    move(2,3,3,2); move(1,2,2,2);
    move(3,0,4,1); move(2,1,2,2);
    move(3,2,4,1); move(1,1,2,1);
    cross(1,2) ;
    move(2,2,3,1); cross(3,1); move(1,3,2,2); 
    move(4,0,4,1); move(0,2,1,3);
    // move(0,2,1,1); move(0,1,0,2);
    // move(0,1,1,1);
}
// 1. (1,2)-(2,2) (2,2)-(3,1)
// 2. (2,2)-(2,3) (1,3)-(2,2)
// 3. (1,3)-(2,3) (1,2)-(1,3)
// 4. (0,3)-(1,2) X(0,3) (1,2)-(2,1)
// 5. X(2,1) (2,2)-(3,3) (1,1)-(2,2)
// 6. (2,4)-(3,3) (1,3)-(2,4)
// 7. (1,4)-(2,4) (0,1)-(1,0)
function test12() {
    move(1,2,2,2); move(1,3,2,2);
    move(2,1,2,2); move(1,1,2,2);
    move(1,1,1,2); move(1,1,2,1);
    move(1,1,2,0); cross(2,0); move(2,1,3,2);
    move(2,2,3,2);// move(3,2,3,3);
   // move(2,2,3,3);// move(1,2,2,3);
}
function test13() {
    move(2,2,3,1); move(1,2,2,2);
    move(1,1,2,2); move(2,2,2,3);
    move(1,0,2,1); move(1,2,1,3);
    cross(2,3); move(2,0,3,0); /*move(2,2,3,3);
    move(2,1,3,2); move(2,4,3,3);
    move(1,3,2,4);*/
}
function test14() {
    move(1,2,2,2); move(2,2,3,2);
    move(2,1,2,2); move(1,3,2,2);
    move(1,1,2,1); cross(1,1); move(1,3,2,4);
    move(3,3,4,4); move(2,3,3,3);
}
function test15() {
    move(1,2,2,2); move(2,3,3,2);
    move(2,1,2,2); move(1,1,1,2);
    move(1,1,2,1); move(1,2,2,3);
    move(0,2,1,1); cross(1,2); move(1,1,2,2);
    cross(2,3); move(2,2,3,2); move(3,1,3,2);
    // move(2,2,3,1); move(1,0,2,0);
    // move(1,3,2,2); move(0,2,1,3);
    // move(2,0,3,1); move(1,1,2,0);
    // move(2,1,3,1);
}