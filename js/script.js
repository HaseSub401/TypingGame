const textList = [
    'novak dokovic',
    'roger federer',
    "rafael nadal",
    "andy murray",
    "nisikori kei",
    "osaka naomi",
    "serena williams"
];

const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const clock = document.getElementById("clock");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const remainingTime = 25000;

//初期設定
let typed = "";
let untyped = "Startを押してください";
let TIME = remainingTime;
let count = 0;
let intervalId = null;

//問題文を再び表示する関数
function updateTextField() {
    typedField.textContent = typed;
    untypedField.textContent = untyped;
}

//残り時間を表示する関数
function updateTime() {
    const ms = TIME % 1000;
    const s = Math.floor(TIME / 1000) % 60;
    const m = Math.floor(TIME / 1000 / 60) % 60;
    
    const msStr = ms.toString().padStart(3, "0");
    const sStr = s.toString().padStart(2, "0");
    const mStr = m.toString().padStart(1, "0");
    
    clock.textContent = `${mStr}:${sStr}.${msStr}`;
}

//初期化する関数
function nextText() {
    const random = Math.floor(Math.random() * textList.length);
    
    typed = "";
    untyped = textList[random];
    updateTextField();
}

//タイピング機能
function keydownGame(e){
    if(e.key !== untyped.substring(0, 1)){
        return;
    } else {
        typed += untyped.substring(0, 1);
        untyped = untyped.substring(1);
        updateTextField();
    }
    
    //初期化する関数
    if(untyped === ""){
        count++;
        nextText();
    }
}

//startボタンでタイピングを開始する関数
start.addEventListener("click", function(e){
    if(intervalId !== null){
        return;
    } else if(TIME === 0){
        return;
    } else {
        nextText();
        gameStart();
    }
});

function gameStart() {
    //タイピングするごとに文字に色をつけていく
    document.addEventListener("keydown", keydownGame);

    let pre = new Date();
    intervalId = setInterval(function(){
        const now = new Date();
        TIME -= now - pre;
        pre = now;
        updateTime();
        
        if(TIME <= 0){
            result();
        }
    }, 10);
}

// //結果表示する関数
const result = () => {
    document.removeEventListener("keydown", keydownGame);
    clearInterval(intervalId);
    intervalId = null;
    TIME = 0;
    updateTime();
    typedField.textContent = "";
    untypedField.textContent = "正解数は" + count + "個でした！";
};

//resetボタンで初期化する関数
reset.addEventListener("click", function(e){
    document.removeEventListener("keydown", keydownGame);
    clearInterval(intervalId);
    intervalId = null;
    TIME = remainingTime;
    count = 0;
    updateTime();
    typed = "";
    untyped = "Startを押してください";
    updateTextField();
})

//最初から表示させるもの
updateTime();
updateTextField();

