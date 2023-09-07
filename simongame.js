let gameseq=[];
let userseq=[];

let btns=["yellow","red","green","purple"];
let started=false;
let level=0;
let highscore=0;

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started==false)
    {
        console.log("game is started");
        started=true;

        levelUp();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp()
{
    userseq=[];
    level++;
    if (level>highscore){
        highscore=level;
        h3.innerText=`High Score:${highscore}`;
    }
    h2.innerText=`Level ${level}`;

    let randidx=Math.floor(Math.random()*3);
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    // console.log(randidx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameseq.push(randcolor);
    console.log(gameseq);
    btnflash(randbtn);
}

function checkAns(idx){
    //console.log("curr level :",level);
    

    if (userseq[idx]==gameseq[idx])
    {
        if (userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="white";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="black";
        }, 150);
        reset();
    }
}

function btnpress() {
    let btn=this;
    userflash(btn);

    usercolor=btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset() {
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}