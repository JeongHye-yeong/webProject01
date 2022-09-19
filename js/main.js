//main.js
window.addEventListener('load',()=>{

//top버튼
const bntTop =document.querySelector('a.btn_top');

window.addEventListener('scroll', () => {
    let scroll = document.querySelector('html').scrollTop;
    console.log(scroll);
    if(scroll <= 0){
        bntTop.classList.remove("on","ab");
    }else if(scroll >2700){
        bntTop.classList.add("ab");
        bntTop.classList.add("on");
    
    }else{
        bntTop.classList.remove("ab");
        bntTop.classList.add("on");
    }
});

bntTop.addEventListener('click', e => {
    e.preventDefault();
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

/* 주메뉴 */
var gnbMenu = document.querySelectorAll('.gnb>ul>li');
var headerWrap = document.querySelector(".header_wrap");

for(var i=0; i<gnbMenu.length;i++){
    gnbMenu[i].addEventListener('mouseover',(e) => {
        e.currentTarget.classList.add('on');
        var ht = e.currentTarget.children[1].offsetHeight;
        headerWrap.style.height = 70 + ht + 'px';

    });
    gnbMenu[i].addEventListener('mouseout', (e) => {
        e.currentTarget.classList.remove('on');
        headerWrap.style.height = '70px';
    });

    gnbMenu[i].children[0].addEventListener('focus',(e) => { //li>a
        e.currentTarget.parentElement.classList.add('on');
        var ht = e.currentTarget.nextElementSibling.offsetHeight; //il>div
        headerWrap.style.height = 70 + ht + 'px';
    });
    gnbMenu[i].children[0].addEventListener('blur', (e) =>{
        e.currentTarget.parentElement.classList.remove('on');
        headerWrap.style.height = '70px';
    });
}

// 검색박스
const srchWrap = document.querySelector(".srch_wrap");
const btnSrch = document.querySelector(".btn_srch")
const btnSrchClose = document.querySelector(".btn_srch_close")

btnSrch.addEventListener("click",(e)=>{
    e.preventDefault();
    srchWrap.classList.add("on");
})

btnSrchClose.addEventListener("click", (e) =>{
    e.preventDefault();
    srchWrap.classList.remove("on");
})


const btnNext = document.querySelector('a.btn_next');
const btnPrev = document.querySelector('a.btn_prev');
const slide = document.querySelectorAll('li.slide');//0,1,2
const slideRoll = document.querySelectorAll('.slide_roll li');
const btnPlay = document.querySelector('.btn_play');

let bnnNum=0;
let lastNum = document.querySelectorAll('.slide_wrap > li').length - 1;//2

//next버튼
btnNext.addEventListener('click',e =>{
    e.preventDefault();
    bnnNum++;
    if(bnnNum>lastNum)bnnNum=0;

    activation(bnnNum,slide);
    activation(bnnNum,slideRoll);

/*
    slide.forEach(item => {
        item.classList.remove('active');
    });
    slide[bnnNum].classList.add('active');

    slideRoll.forEach(idx => {
        idx.classList.remove('on');
    });
    slideRoll[bnnNum].classList.add('on');
*/
});

//prev버튼
btnPrev.addEventListener('click',function(){
    bnnNum--;
    if(bnnNum<0)bnnNum=lastNum;/*하나만있을때는 중괄호 생략 가능 */

    activation(bnnNum,slide);
    activation(bnnNum,slideRoll);
/*
    slide.forEach(item => {
        item.classList.remove('active');
    });
    slide[bnnNum].classList.add('active');

    slideRoll.forEach(idx => {
        idx.classList.remove('on');
    });
    slideRoll[bnnNum].classList.add('on');
*/
});

//오토배너
function autoBanner(){
    //next 버튼 눌렀을 때
    bnnNum++;
    if(bnnNum>lastNum) bnnNum=0;

    activation(bnnNum,slide);
    activation(bnnNum,slideRoll);
    autoBnn = setTimeout(autoBanner,5000);//재귀함수

}
let autoBnn = setTimeout(autoBanner,5000);//최초호출

/*
    slide.forEach(item => {
        item.classList.remove('active');
    });
    slide[bnnNum].classList.add('active');

    slideRoll.forEach(idx => {
        idx.classList.remove('on');
    });
    slideRoll[bnnNum].classList.add('on');

}
let autoBnn = setInterval(autoBanner,5000)
*/
//배너 재생 멈춤 버튼
let flag = true;

btnPlay.addEventListener('click', () => {
    if(flag){//멈춤
        btnPlay.classList.add('on');
        clearTimeout(autoBnn);
        flag = false;
    }else{//재생
        btnPlay.classList.remove('on');
        autoBnn = setTimeout(autoBanner,5000);
        flag = true;
    }
});

//롤링버튼클릭
for(let i=0; i<slideRoll.length;i++) {
    slideRoll[i].addEventListener('click', e =>{
        e.preventDefault();
        activation(i,slide);
        activation(i,slideRoll);
    });
};

function activation(index, list){
    for(let el of list){
        el.classList.remove("on", "active");
    }
    list[index].classList.add("on","active");
}
/*
slideRoll.forEach(item => {
    item.addEventListener('click', rollAction);
});

function rollAction(item){
    
    curRoll = item.currentTarget;//클릭이벤트가 전달된 엘리먼트
    parentRoll = curRoll.parentElement;//연결된 엘리먼트의 부모
    childRoll = parentRoll.children;//부모 엘리먼트의 자식 엘리먼트들
    curIdx = Array.from(childRoll).indexOf(curRoll);//연결된 엘리먼트의 인덱스

    slide.forEach(function(item){
        item.classList.remove('active');
    });
    slide[curIdx].classList.add('active');

    slideRoll.forEach(function(idx){
        idx.classList.remove('on');
    });
    slideRoll[curIdx].classList.add('on');

}
*/
});
