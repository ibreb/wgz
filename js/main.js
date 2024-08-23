function update() {
    if(eMode) return;
    disp();
    if(gameover) {
        if(!showresult) {
            playSound("game-end.webm");
            document.getElementById('gameOverModal').style.display = 'block';
            // setTimeout(function() {alert(o?"后手胜":"先手胜");}, 200);
            document.getElementById('result').innerText = o?"后手胜":"先手胜"
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
                    if(!valid(a,b,c,d)) {
                        playSound("illegal.webm");
                        continue;
                    }
                    move(a,b,c,d);
                    disp();
                    if(!gameover) {
                        if(mode==1) setTimeout(A6Move,300);
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

function drawGame() {
    playSound("game-end.webm");
    document.getElementById('gameOverModal').style.display = 'block';
    document.getElementById('result').innerText = "平局";
    showresult=true;
}

function init(fl=true) {
    lineid=0;
    var table = document.getElementById("movesTable").getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    newLine();
    mx=my=0;
    choi=choj=-1;
    mv=dispMove=0;
    theend=false;
    gameover=false;
    showresult=false;
    xx0=xy0=xx1=xy1=xz0=xz1=-1;
    o=0;//是否先手走
    cro=false;
    j0=j1=2;
    din=0;
    hd=true;
    gameString = "";
    croMv0=croMv1=-1;
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
    draw=false;
    if(autoShowBar) updateBar(50,"eval1");
    if(fl&&randint(1,2)==1) {
        if(mode==1) setTimeout(A6Move,75);
        if(mode==2) setTimeout(A2Move,75);
        if(mode==3) setTimeout(mctsMove,75);
        if(mode==4) {
            let seed = randint(1,100);
            if(seed<=60) setTimeout(()=>load(["21","31","42","44"][randint(0,3)]),75);
            else if(seed<=76) setTimeout(()=>load(["25","37","38","48"][randint(0,3)]),75);
            else if(seed<=92) setTimeout(()=>load(["26","37","41","43"][randint(0,3)]),75);
            else setTimeout(()=>load(["20","22","39","54","24","30","47","58"][randint(0,7)]),75);
            // setTimeout(B1Move,200);
        }
    }
    if(mode==512) {
        setTimeout(()=>load(""),30);
        setTimeout(selfPlayC,50);
    }
    if(mode==513) {
        setTimeout(()=>load("212743"),30);
        mode=4;
    }
}
function load(S) {
    let temp = autoShowBar;
    autoShowBar = false;
    for(let i=0; i<S.length; i+=2) {
        let x=parseInt(S[i]+S[i+1],10);
        if(x<72) {
            [a,b,c,d]=unpackE[x];
            move(a,b,c,d);
        }
        else {
            let t=x-72;
            let b=t%5,a=(t-b)/5;
            cross(a,b);
        }
    }
    autoShowBar = temp;
}
function start() {
    dm = dispMove;
    gs = gameString;
    init(false);
    if(autoShowBar) showBar();
    for(let i = 0; i < dm * 2; i += 2) {
        load(gs[i]+gs[i+1]);
        if(parseInt(gs[i]+gs[i+1],10)>72) dm++;
    }
}
window.onload=() => {
    CA=document.getElementById('wgzcanvas');
    CC=CA.getContext('2d');
    dfn=0;
    fps=30;
    n=5;//行、列
    initUI();
    berzudflag=false;
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
    autoShowBar = false;
    mode=getQueryVariable("mode");
    if(mode==1024) {
        autoShowBar = true;
        var button = document.createElement('button');
        button.textContent = '显示';
        button.addEventListener('click', showMove);
        document.body.appendChild(button);
        button = document.createElement('button');
        button.textContent = '隐藏';
        function hide() {
            berzudflag=false;
        }
        button.addEventListener('click', hide);
        document.body.appendChild(button);
        // button = document.createElement('button');
        // button.textContent = '走棋';
        // button.addEventListener('click', B1Move);
        // document.body.appendChild(button);
        // button = document.createElement('button');
        // button.textContent = '开始';
        // button.addEventListener('click', init);
        // document.body.appendChild(button);
        // button = document.createElement('button');
        // button.textContent = '重开';
        // button.addEventListener('click', start);
        // document.body.appendChild(button);
    }
    init();
    setInterval(update,1000/fps);
    document.addEventListener('keydown',ckey);
    CA.addEventListener('click',ccli);
}