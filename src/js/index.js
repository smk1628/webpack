/**
 * 注意：
 *      该index.js不同于学习模块时，用于汇总js的文件
 *      模块化技术的index.js只用于汇总各个js模块
 *      该index.js是webpack的【入口文件】
 *      该文件可以用于汇总：js、css、json、图片、音频、视频
 */



//import '@babel/polyfill'    //没有按需转换新语法，导致js文件过大 借助按需引入core-js按需引入
import {sum} from './module1'
import {sub} from './module2'
import moudle3 from './module3'
import a from '../json/test.json' //引用json类文件直接拿变量去接
//在入口文件中引入样式，不用变量接不用写from
import '../css/index.less'  
import '../css/iconfont.css'

console.log(sum(1,2))
console.log(sub(3,4))
console.log(moudle3.mul(5,10))
console.log(moudle3.div(5,10))
console.log(a,typeof a)
//webpack只管翻译es6的模块语法变为浏览器认识的，不会处理其他新语法
setTimeout(()=>{
    console.log('报告营长：意大利炮准备完毕！')
},1000)

let x = 6
console.log(x)

let myPromise = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve('Promise return success')
    },2000)
})

myPromise.then(
    res => console.log(res)
)

//myPromise()