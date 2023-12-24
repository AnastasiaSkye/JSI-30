//  Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
    console.log(`I output only external context: ${this.item}`);
}
const obj = { item: 'some value' };

logger.call(obj);
logger.apply(obj);
(logger.bind(obj))();

//////////////////////////////////

// Требуется создать функцию createCache, которая возвращает объект для кэширования результатов выполнения других функций. Кэш должен хранить значения, которые были возвращены функцией при определенных входных параметрах.

// Функция createCache должна иметь два метода:

// cache(fn): принимает функцию fn и возвращает новую функцию, которая кэширует результаты выполнения fn. Если кэш уже содержит результат для данного набора входных параметров, то новая функция должна возвращать сохраненное значение, не вызывая fn.
// clear(): очищает весь кэш.

function createCache() {
    let cacheObj = {}
    let constructor = function() {}
    constructor.cache = (fn) => {
        return (...args) => {
            let key = JSON.stringify(args)
            if (!(key in cacheObj)) {
                cacheObj[key] = fn(args)
                console.log('Выполнил: ' + cacheObj[key])
                return cacheObj[key]

            }
            console.log('Выполнил: ' + cacheObj[key] + ' (значение взято из кэша)')
            return cacheObj[key]
        }
    }
    constructor.clear = () => {
        cacheObj = {}
        console.log('Кэш отчищен')
    }
    return constructor
}

var myCache = createCache();

function multiplyByTwo(x) {
    return x * 2;
}

var cachedMultiplyByTwo = myCache.cache(multiplyByTwo);

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10 (значение взято из кэша)

console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6
console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6 (значение взято из кэша)

myCache.clear(); // Вывод : Кэш отчищен

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10

//////////////////////////////////////////

// Бонус
// Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()

// Код здесь
if (!Function.prototype.bind) {
    Function.prototype.bind = (obj, ...args) => {
        let func = this;
        return function (...newArgs) {
            func.apply(obj, [...args, ...newArgs]);
        };
    }
}
//