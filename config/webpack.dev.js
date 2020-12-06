/* 此文件是webpack的配置文件，用于指定webpack去执行哪些任务 */


const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/js/index.js','./src/index.html'], //入口
    output: {
        path: path.resolve(__dirname, '../dist'), //输出路径
        filename: 'js/index.js', //输出文件名
        publicPath:"/"
    },
    mode: 'development', //配置工作模式 "development" | "production" | "none"
    //target: ['web', 'es5'], //webpack5 新增 target: ['web', 'es5'], 编译后即为es5代码
    module: {
        rules: [
            //解析less，不能生成css文件，不完美 
            //执行npm i less less-loader css-loader style-loader -D 安装所需loader
            {
                test: /\.(less|css)$/, //匹配所有的less、css文件
                use: [
                    'style-loader', //用于在html文档中创建一个style标签，将样式“塞”进去
                    'css-loader', //将less编译后的css转换为CommonJs的一个模块
                    'less-loader' //将less编译为css，但不生成单独css文件，在内存中
                ],
            },
            //js语法检查 检查参数设置在了package.json文件内【eslintConfig】
            //执行npm i eslint-loader eslint -D 安装所需loader
            {
                test: /\.js$/, //匹配所有js文件
                exclude: /node_modules/, //排除node_moudles文件夹
                enforce: "pre", //提前加载eslint-loader使用
                use: {
                    loader: "eslint-loader"
                }
            },
            //js语法转换（es6 -> es5）兼容性
            //执行 npm i babel-loader @babel/core @babel/preset-env -D 安装所需loader
            //执行 npm i core-js @babel/polyfill 安装所需模块
            {
                test: /\.js$/, //匹配所有js文件
                exclude: /node_modules/, //排除node_moudles文件夹
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env',
                                {
                                    useBuiltIns: 'usage', //按需引入需要的polyfill
                                    corejs: {
                                        version: 3 //解决不能找到corejs问题
                                    },
                                    targets: { //指定兼容哪些浏览器
                                        "chrome": "58",
                                        "ie": "9"
                                    }
                                }
                            ]
                        ],
                        cacheDirectory: true //开启babel缓存
                    }
                }
            },
            //打包样式文件中的图片资源
            //执行 npm i file-loader url-loader -D 安装所需loader
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192, //8kb以下的文件会base64处理
                        outputPath: 'images', //决定文件本地输出路径
                        publicPath: '/images', //决定图片的url路径
                        name: '[hash:7].[ext]' //修改文件名称[hash:7] hash值取7位 [ext] 文件扩展名
                    }
                }]
            },
            //打包html中的图片资源
            //执行 npm i html-loader -D 安装所需loader
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'                   
                }
            },
            //使用file-loader处理其他资源
            {
                test:/\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
                loader:'file-loader',
                options:{
                    outputPath:'media',
                    name:'[hash:7].[ext]'
                }
            }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ //打包html文件
            template: './src/index.html' //以当前文件为模板创建新的HTM（结构和原来一样，会自动引入打包）
        })
    ],
    //配置自动化编译
    devServer:{
        open:true,  //自动打开浏览器
        compress:true,  //启动gzip压缩
        contentBase: '../dist',
        hot: true,
        port:3000   //指定服务端口
        
    },
    devtool: 'eval-cheap-module-source-map' //针对于开发环境最优
};