// Проверяем себя, если не понимаем почему так а не иначе пишем в чат или в ЛС, желательно объяснять почему то или иное решение

// Типы данных

console.log([1, 2, 3] + ' is the answer.'); // '1,2,3 is the answer.'
console.log(false || true * 2); // true * 2 = 2 (|| выполняют boolean тест для первого операнд, если false значение второго операнда)
console.log({ valueOf: () => 42 } * 2); // 84 (Вызывает для объекта valueOf())
console.log(parseInt('7.5') + parseFloat('2.5')); // 7 + 2.5 = 9.5
console.log(!!'Hello' - 1); // true - 1 = 0
console.log(new String('hello') instanceof Object); // true (Конструкторы приметивов создают объекты)
console.log((true ^ false) === (false ^ true)); // 1 === 1 = true (Побитовое исключающее «ИЛИ»)
console.log(true && '5' + 5); // '55' (&& выполняют boolean тест для первого операнд, если true значение второго операнда)
console.log({ valueOf: () => '10', toString: () => '20' } + 5); // '10'+ 5 = '105' (Вызывает для объекта valueOf())
console.log((5).toString() === '5'); // true (Явное преобразование)
console.log(null || false || undefined); // false || undefined = undefined (|| выполняют boolean тест для первого операнд, если false значение второго операнда)
console.log(0 || 2 || NaN); // 2 || NaN = 2 (|| выполняют boolean тест для первого операнда, если true значение первого операнд)
console.log(1 && null && 2); // null && 2 = null (&& выполняют boolean тест для первого операнд, если true значение второго операнда, если false значение первого операнд)

//

function xy() {}

console.log(typeof xy); // function
console.log(xy instanceof Object); // true ('подтип' объекта)

var str1 = String(123);
var str2 = new String(123);

console.log(typeof str1 === typeof str2); // 'string' === 'object' = false
console.log(str1 === str2); // false (сравнение без приведения типа)
console.log(str1 === String(123)); // true
console.log(str2 === new String(123)); // false (ссылочный тип данных с разными ссылками)
console.log(str1 === 123); // false (сравнение без приведения типа)
console.log(str1 === '123'); // true
console.log(str1 == str2); // true (сравнение с приведением типов)
console.log(str1 == 123); // true
console.log(str1 == '123'); // true

var arr = [];
console.log(typeof arr); // object

var str3 = '123';
str3[0] = '2';
console.log(str3); // '123' (string неизменим)

var p = 1 + 2 + 3 + ''; // 6 + '' = '6'
var z = '' + 1 + 2 + 3; // '1' + 2 + 3 = '123'

console.log(p, typeof p); // '6' string
console.log(z, typeof z); // '123' string

var o = '123x';
console.log(Number(o)); // NaN (неудачное преобразовывает в число)
console.log(parseInt(o, 10)); // 123 (преобразовывает в число до первого не числового символа в соответствии с указанной системой счисления)
console.log(+o); // NaN (неудачное преобразовывает в число)
console.log(typeof +o); // typeof NaN = number
console.log(Boolean(String(false))); // true (Не пустой string = true)

var h = [];
console.log(h ? 1 : 2); // 1 (любой объект = true)

// Переменные

let a = a + 1;
console.log(a); // a is not defined

//

var b = b + 1;
console.log(b); // NaN (var b поднимается внутри области видимости и равно undefined)

//

function foo(c) { // c = 15
    if (c > 0) {
        var c = c + 10;
        return c;
    }
    return c;
}
console.log(foo(15)); // 25 (оно игнорирует повторное объявление переменной потому что она уже была объявлена?)

//

function foo() {
    console.log(d2); // '2'
    let d1 = '1';
    return function () {
        console.log(d1); // '1' замыкание
        console.log(d2); // '2'
    };
}

const d2 = '2';
const x = foo();

x();

//

function giveMeX(showX) {
    if (showX) {
        let x = 5;
    }
    return x;
}

console.log(giveMeX(false)); // x is not defined (let имеет блочную область видимости)
console.log(giveMeX(true)); // x is not defined

//

console.log(x); // x is not defined

var y = 1;

console.log(y); // 1

function car() {
    if (false) {
        var y = 2; // var поднимается
    }
    console.log(y);
}

car(); // undefined
console.log(y); // 1

//

var i = 1;
var j = {};

(function () {
    i++;
    j.j = 1;
})();
console.log(i, j); // 2 {j: 1} IIFE (Immediately Invoked Function Expression)

(function (i, j) {
    i++;
    j.k = 1;
})(i, j);
console.log(i, j); // 2 {j: 1, k: 1} (i передается по значению,а j по ссылке)

//

// Бонус

// Создать объект всеми возможными способами

const obj1 = {};
const obj2 = Object.create(obj1)
const obj3 = Object.assign({}, obj1);
const obj4 = JSON.parse(JSON.stringify(obj1));
const obj5 = new Object();

function MyObject() {}

const obj6 = new MyObject();

//

// Написать функцию глубокого сравнения двух объектов:
// объекты могут быть любыми, и иметь любой уровень вложенности

const firstObj = { here: { is: 'on', other: '3' }, object: 'any' };
const secondObj = { here: { is: 'on', other: '2' }, object: 'any' };

const deepEqual = (firstObj, secondObj) => {
    if (Object.keys(firstObj).length === Object.keys(secondObj).length) {
        const firstVal = Object.values(firstObj)
        const secondVal = Object.values(secondObj)
        for (let i in firstVal) {
            if (firstVal[i] instanceof Object && secondVal[i] instanceof Object) {
                if (!deepEqual(firstVal[i], secondVal[i])) {
                    return false
                }
            }
            else if (firstVal[i] !== secondVal[i]) {
                return false
            }
        }
        return true
    }
    return false
};

console.log(deepEqual(firstObj, secondObj)); // false