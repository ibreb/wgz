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
function A6Judge(e) {
    [i,j,x,y]=unpackE[e];
    let s=0;
    let w=JL[e].length;
    if(x<1||x>=n-1) s-=5;
    if(y<1||y>=n-1) s-=5;
    if(i<1||i>=n-1) s-=5;
    if(j<1||j>=n-1) s-=5;
    if(w==1) s+=randint(-50,50);
    if(w>1) s+=randint(-80,50);
    if((j0<=1||j1<=1)&&w>=1) s-=50;
    // if(w>1) s+=w*100;
    s+=3*(deg[J(i,j)]+deg[J(x,y)]);
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
function A6Move() {
    if(randint(1,5)>=2) croIfNecessary();
    let t=0,e=0,ce=-1,f=-100;
    let score=new Array(72).fill(0);
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) {
        for(let d=0;d<4;d++) {
            let x=i+dx[d],y=j+dy[d];
            if(x<0||x>=n||y<0||y>=n) continue;
            if(valid(i,j,x,y)&&!stupid(i,j,x,y)) {
                score[e]=A6Judge(e);
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
        let u=1,fl=1,lvl=0;
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
        }
        ++m; let e=mvlist[u].pop();
        hd.push(0),nt.push(hd[u]),hd[u]=m,E.push(e),T.push(1),W.push(0);
        fa.push(u),fullyExpanded.push(false),mvlist.push(null),end.push(false);
        if(mvlist[u].length==0) fullyExpanded[u]=true;
        if(e<72) {
            [a,b,c,d]=unpackE[e];
            move(a,b,c,d);
        }
        else {
            let t=e-72;
            let b=t%5,a=(t-b)/5;
            cross(a,b);
        }
        draw=false;
        while(!theend&&!draw) A2Move();
        if(o==oo) ++W[m];
        while(u) {
            W[u]+=W[m],++T[u],u=fa[u];
        }
    }
    [o,j0,j1,xx0,xy0,xz0,xx1,xy1,xz1,C0,C1,T0,T1,JN,JL,deg]=[oo,oj0,oj1,oxx0,oxy0,oxz0,oxx1,oxy1,oxz1,cpy(oC0),cpy(oC1),cpy(oT0),cpy(oT1),cpy(oJN),cpy(oJL),cpy(odeg)],theend=false;
    eMode=false;
    let f=-1,g=-1,sf=-1,sg=-1,e=-1,se=-1,v0,v1;
    let foo=[];
    for(let v=hd[1];v;v=nt[v]) {
        if(T[v]>f||T[v]==f&&W[v]>g) f=T[v],g=W[v],e=E[v],v0=v;
        else if(T[v]>sf||T[v]==sf&&W[v]>sg) sf=T[v],sg=W[v],se=E[v],v1=v;
        foo.push(v);        
    }
    foo.sort((a,b)=>T[b]-T[a]);
    let c0=0,c1=0,c2=0;
    for(let u=1;u<=m;++u) {
        if(fa[u]==1) ++c0;
        if(fa[fa[u]]==1) ++c1;
        if(fa[fa[fa[u]]]==1) ++c2;
    }
    // for(let i=0;i<3;i++) {
    //     if(foo.length==i) break;
    //     let v=foo[i];
        // if(E[v]<72) console.log(W[v]+"/"+T[v],unpackE[E[v]]);
        // else console.log(W[v]+"/"+T[v],((E[v]-72)-(E[v]-72)%5)/5,(E[v]-72)%5);
    //     superno8(v);
    // }
    // console.log("C:",c0,c1,c2);
    // for(let u=1;u<=m;++u) {
    //     for(let v=hd[u];v;v=nt[v]) no8(u+"->"+v+" "+unpackE[E[v]]);
    // }
    // if(e>=0) console.log(W[v0]+"/"+T[v0],unpackE[e]);
    // if(se>=0) console.log(W[v1]+"/"+T[v1],unpackE[se]);

    if(e==-1) {
        A0Move();
        return;
    }
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
}
function B1Move() {
    t1=Date.now();
    if(theend) {
        A0Move();
        return;
    }
    const e = Module.ccall('mctsMove', 'number', ['string'], [gameString]);
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
    console.log("time:",Date.now()-t1);
}

function recu() {
    if(gameover) return;
    if(o) {
        B1Move(); disp();
    }
    else {
        B1Move(); disp();
    }
    requestAnimationFrame(recu);
}
function selfPlayC() {
    requestAnimationFrame(recu);
}