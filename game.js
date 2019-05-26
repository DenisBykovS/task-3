//повесил обработчик события на кнопку старт ,которая запускает игру
let startButton = document.querySelector('.start');
startButton.addEventListener('click',timeGame);
//переменная для остановки setInterval
let timerId;
//функция запуска игры
function timeGame (){
//переменные для отсчета времени setInterval
    let h = 0;
    let m = 0;
    let s = 0;
//setInterval запуск каждую секунду
timerId = setInterval(function(){
    //получил доступ к содержимому тегов 
        let second = document.querySelector('.second');
        let minut = document.querySelector('.minut');
        let hour = document.querySelector('.hour');
        if(s == 59){
            s = 0;
            m += 1
        }
        if(m == 59){
            m = 0;
            h += 1;
        }
        if(hour == 24){
            alert('может пора остановится');
        }
        s++;
        //обновляю содержимое тегов
        second.innerText=s;
        minut.innerText=m;
        hour.innerText=h;
    },1000)
//запускаю функцию onClick
    onClick();
}
//массив для дальнейшего определения цвета клеток
let arrColor = ['red', 'black', 'orange', 'yellow', 'green', 'blue', 'purple', 'aqua',
    'red', 'black', 'orange', 'yellow', 'green', 'blue', 'purple', 'aqua'];
//массив trueArr по достижению длины 8 останавливает игру и таймер
let trueArr = [];
//массив color для сравнения 2х клеток на совпадение цвета
let color = [] ;
//массив number для заполнения случайными числами
let number = [];
//переменая numColor нужна для заполнения массива number
let numColor = '';
//randomNumber при каждом вызове переопределяет переменую numColor (числами от 0 до 15)
function randomNumber (){
    numColor=Math.round(Math.random() * (15 - 0) + 0);
}
//получаем доступ к полю с классом field
let field = document.querySelector('.field');
//функция draw для отрисовки 16ти клеток
function draw (){
    let div = '';
    let i = 0;
    while(i < 16){
            div += `<div class="cell"></div>`;
        i++;
    }
    field.innerHTML=div;
};
draw ();
//функция noNumber заполняет массив number 16-ю случайными разными числами(от 0 до 15)
function noNumber(){
    let arrCell = document.querySelectorAll('.cell');
    while(number.length < 16){
        randomNumber();
    if(number.indexOf(numColor) == -1){
        number.push(numColor);
        }
    }
//перебераю все клетки на странице и задаю им id с помощью массивов arrColor и number
    for(let i = 0; i <= arrCell.length; i++){
        arrCell[i].setAttribute('id',arrColor[number[i]]);
    }
}
//onClick делает все клетки на странице кликабельными
function onClick (){
    let arrCell = document.querySelectorAll('.cell');
    for(let i = 0; i <= arrCell.length; i++){
        arrCell[i].addEventListener('click',clickCell);
    }
}

noNumber();
//функция для определения по какой клетки кликнули и проверки на совпадение цветов 2х клеток
function clickCell (){
    let thisEl = this;
    let thisId = this.id;
    thisEl.classList.add('x');
    thisEl.style.background = thisId;
    if(thisEl.classList.contains('x')){
        thisEl.removeEventListener('click',clickCell);
        color.push(thisId);
    }
    if(color.length == 2){
        for(let j = 0; j < color.length; j++){
            if(color[0] != color[1]){
                let arrX = document.querySelectorAll('.x');
                for(let i = 0; i < arrX.length; i++){
                arrX[i].addEventListener('click',clickCell);
                arrX[i].style.background = 'white';
                arrX[i].classList.remove('x');
                color.splice(0,2);
                }
            }else{
                let arrX = document.querySelectorAll('.x');
                for(let i = 0; i < arrX.length; i++){
                arrX[i].removeEventListener('click',clickCell);
                arrX[i].classList.remove('x');
                }
                trueArr.push(1);
                color.splice(0,2);
                if(trueArr.length == 8){
                clearInterval(timerId);
                let second = document.querySelector('.second').innerText;
                let minut = document.querySelector('.minut').innerText;
                let hour = document.querySelector('.hour').innerText;
                alert('Вы выиграли ! \n Затраченное время :'+hour+': '+minut+': '+second);

                }
            }
        }
    }
}