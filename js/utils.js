function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function cpy(arr) {
    if(!Array.isArray(arr)) {
        return arr;
    }
    return arr.map(item => cpy(item));
}

function dist(a,b,x,y) {
    return Math.sqrt((a-x)*(a-x)+(b-y)*(b-y));
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


function exportCanvasAsImage(fileName) {
    const img = new Image();
    img.src = CA.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = img.src;
    link.download = fileName+'.png';
    link.click();
}

function addText(text) {
    if(hd) {
        var table = document.getElementById("movesTable").getElementsByTagName('tbody')[0];
        var row = table.insertRow();
        row.insertCell(0);
        row.insertCell(1);
        row.insertCell(2);
        row.cells[0].innerHTML = ++lineid;
        hd=false;
    }
    var table = document.getElementById("movesTable").getElementsByTagName('tbody')[0];
    var row = table.rows[table.rows.length-1];
    row.cells[o+1].innerHTML = row.cells[o+1].innerHTML + text;
}
function newLine() {
    hd = true;
}
function playSound(path) {
    var audio = new Audio("sounds/"+path);
    audio.play();
}

function toggleExportDropdown() {
    const exportDropdown = document.getElementById("exportDropdown");
    exportDropdown.style.display = (exportDropdown.style.display === "block") ? "none" : "block";
}
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('编码串已成功复制到剪贴板');
    })
    .catch(err => {
      alert('无法复制文本到剪贴板', err);
    });
}

function showImportTextbox() {
    const importTextbox = document.getElementById("importTextbox");
    importTextbox.style.display = "block";
}

function confirmImport() {
    const importTextbox = document.getElementById("importTextbox");
    importTextbox.style.display = "none";
    const importInput = document.getElementById("importInput").value;
    let len = importInput.length;
    if(len == 0) {
        return;
    }
    if(len % 2) {
        alert("编码串错误");
        return;
    }
    H = new Array(97).fill(0);
    for(let i=0; i<len; i+=2) {
        let x=parseInt(importInput[i]+importInput[i+1],10);
        if(!(0<=x&&x<97) || H[x]) {
            alert("编码串错误");
            return;
        }
        H[x]=1;
    }
    // alert("你输入的文字是: " + importInput);
    init(false);
    load(importInput);
}

function exportText(option) {
    switch (option) {
        case 'option1':
            exportCanvasAsImage("img");
            break;
        case 'option2':
            copyToClipboard(gameString);
            break;
        default:
            console.log("Invalid option");
    }
    toggleExportDropdown();
}


function updateBar(evaluation,id) {
    document.getElementById("bar1").style.display = 'block';
    const progressElement = document.getElementById(id);
    let value = evaluation;
    value = Math.min(Math.max(value, 0), 100);
    progressElement.style.width = value + '%';
}

function closeModal() {
    document.getElementById('gameOverModal').style.display = 'none';
}


function showMove() {
    const e = Module.ccall('getPi', 'string', ['string'], [gameString]);
    colors=new Array(97);
    for(let i=0;i<97;++i) colors[i]=(e.charCodeAt(i));
    berzudflag=true;
    // updateBar(o?100-e.charCodeAt(97):e.charCodeAt(97),"eval1");
    // updateBar(o?100-e.charCodeAt(98):e.charCodeAt(98),"eval2");
    disp();
}
function showBar() {
    if(theend) return;
    const e = Module.ccall('getPi', 'string', ['string'], [gameString]);
    updateBar(o?100-e.charCodeAt(97):e.charCodeAt(97),"eval1");
    // console.log(e.charCodeAt(98));
    // updateBar(o?100-e.charCodeAt(98):e.charCodeAt(98),"eval2");
}