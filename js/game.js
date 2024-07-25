function J(x,y) {
    return x*n+y;
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
                JL[ste].push([a,b,c,d]);
                chk=false;
                continue;
            }
            break;
        }
    }
    V[u]=false;
}
function findAllChecks() {//检测将军
    for(var i=0;i<JL.length;i++) {
        JL[i]=[];
    }
    for(var i=0;i<n;i++) for(var j=0;j<n;j++) {
        for(var d=0;d<4;d++)
        if(!T0[J(i,j)][d]&&!T1[J(i,j)][d]) {
            edx=i+dx[d];
            edy=j+dy[d];
            ste=EID[J(i,j)][d];
            chk=false;
            if(edx<0||edx>=n||edy<0||edy>=n) continue;
            if(J(i,j)==xz0||J(i,j)==xz1||J(edx,edy)==xz0||J(edx,edy)==xz1) continue;
            edc=fi((o?C1:C0),J(edx,edy));
            edd=d+4;
            cnt=0;
            var t=Math.min(i,edx)*4+Math.min(j,edy);
            if(d%2==1) B[t]=true;
            fly((o?T1:T0),(o?C1:C0),i,j,d+4);
            if(d%2==1) B[t]=false;
        }
    }
}
function valid(a,b,c,d) {
    let u=J(a,b),v=J(c,d),di=b-d+c-a+1;
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
        if(dispMove > 0) {
            var table = document.getElementById("movesTable").getElementsByTagName('tbody')[0];
            table.rows[Math.floor((dispMove-1) / 2)].cells[(dispMove-1) % 2 + 1].classList.remove('highlight');
        }
        dispMove = mv;
        playSound("move-self.webm");
        // if(!o) newLine();
        addText("abcde"[a]+(5-b)+"abcde"[c]+(5-d)+" ");
        // addText("("+(a+1)+","+(b+1)+")-("+(c+1)+","+(d+1)+")    ");
        let e=EID[u][di];
        if(e<10) gameString+='0';
        gameString+=e;
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
    findAllChecks();
    if(autoShowBar) showBar();
    if(!theend&&checkDraw()) drawGame();
}
function cross(x,y) {
    if(!o) xx0=x,xy0=y,xz0=J(x,y),!eMode&&(croMv0=mv);
    else xx1=x,xy1=y,xz1=J(x,y),!eMode&&(croMv1=mv);
    if(!eMode) {
        // addText("X("+x+","+y+") ");
        addText("x"+"abcde"[x]+(5-y)+" ");
        gameString+=J(x,y)+72;
    }
    findAllChecks();
    for(var i=JN.length-1;i>=0;i--) {
        if(J(JN[i][0],JN[i][1])==xz0||J(JN[i][0],JN[i][1])==xz1
        ||J(JN[i][2],JN[i][3])==xz0||J(JN[i][2],JN[i][3])==xz1) JN.splice(i,1);
    }
    if(!theend&&checkDraw()) drawGame();
}
function checkDraw() {
    if(gameString.length<10) return false;
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)) return false;
        }
    }
    return true;
}