### webpack 4.0 实战

#### 核心概念
  在webpack当中主要有如下几个核心的概念：
   * 入口(entry)——入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
   * 出口(output)——output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。你可以通过在配置中指定一个 output 字段，来配置这些处理过程。也就是webpack打包处理后将要输出的代码。
   * 模块(Modules)——在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为模块。每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。 精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。
   * Loader（模块加载器）——loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
   * 插件(plugins)——插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。可以通过在插件中加入加入你自己的处理逻辑来改变得到的结果和处理过程。
#### 项目初始化
   mkdir webpack-demo
   cd webpack-demo
   npm init
   以上就是创建一个webpack-demo文件夹，然后在里面初始化项目将会得到以结构：

   ![image](./material/proinit.jpg)

#### webpack 安装
   通过npm install webpack webpack-cli -D，这里不同的是，在webpack4.0当中将多安装一个webpack-cli。
####  配置入口(entry)
   * 在开始配置之前将会在package.json的同级目录创建一个webpack.config.js,里面主要就是写webpack的相关配置，大体如下：
   ```javascript
    module.exports={

    }
   ```
   * 开始配置入口 entry ，入口就是项目打包开始构建的起点，webpack在打包过程中将会通过入口文件逐一去查找对应的依赖模块，并加载进来。可以是一个或者多个，一个的情况下为一个字符串，多个情况下为一个object，配置的方法如下：
   ```javascript
      //一个的配置方法
       entry:'./src/index.js',
       //多个的配置方法
       entry:{
         index:'./src/index.js',
         main:'./src/main.js',
       },
   ```

#### 配置出口(output)
    output 属性主要是告诉 webpack 在哪里输出它所打包后的文件，以及打包后的文件叫什么，配置如下：
    ```javascript
        output:{
            path:path.resolve(__dirname,'dist'),
            filename:'index.js'
         }
    ```
   这里需要注意的是:
   * filename项相关的配置，当是一个入口的时候可以写死叫什么文件名，但是多个入口的时候这里一定要写成filename:'[name].js',不然多个模块最终的输出为同一个文件名肯定是会报错的，这里有一个比较实用的功能就是给文件名添加hash值，这是常用来做文件缓存管理的方式，添加hash值的方式为filename:'[name].[hash:5].js';这里hash后面的：5主要是保留的hash值的长度限制。
   * path一定要是个绝对路径。这里主要借助了node当中的path模块来得到一个绝对路径，[了解node的path模块](http://nodejs.cn/api/path.html)

#### plugins（插件）
   插件配置如下：
   ```javascript
   plugins:[

       ]
   ```
   其实plugins就是一个数组，里面放所有的plugin的实例。

   这里为了后面我们的所有操作都能够看到效果，我这里就先讲一个插件，就是自动生成html文件的插件HtmlWebpackPlugin
 * HtmlWebpackPlugin
    1. 安装npm install --save-dev html-webpack-plugin
    2. 使用如下：

    ```javascript
        plugins:[
            new HtmlWebpackPlugin({
                template: 'index.html',//指定生成HTML的模板
                filename: `index.html`,//生成的HTML文件名
                title: 'webpack4.0 小试牛刀',//html页面头部的title内容
            })
        ]
    ```
   讲一下这里面常用的一个配置。title，这里配置主要是设置生成html页面的title内容，但是这里要注意的是，这里设置了title，在模板文件里面一定要将title写为：
        <title><%=htmlWebpackPlugin.options.title%></title>
   关于HtmlWebpackPlugin有很多的配置项，这里就不做一一解释了[点我了解HtmlWebpackPlugin配置项目](https://github.com/jantimon/html-webpack-plugin#configuration)
 * clean-webpack-plugin
   1. 安装方法 npm i clean-webpack-plugin --save-dev
   2. 使用方法：
   ```javascrip
        plugins:[
            new CleanWebpackPlugin(path.resolve(__dirname,'dist'))
        ]
   ```
   该插件主要作用是清除文件夹内容的作用[【点我了解clean-webpack-plugin】](https://www.npmjs.com/package/clean-webpack-plugin)

#### Loader（模块加载器）
   loader就是webpack里面的重头戏了，loader担任着将原文件转换成webpack能够识别内容的重要角色，要是没有loader，webpack将不能识别css、img、font文件等等。

  1. 处理css文件
    * 需要loader:[【style-loader】](https://www.webpackjs.com/loaders/style-loader/),[【css-loader】](https://www.webpackjs.com/loaders/css-loader/)
    * 使用方法,里面有很多的配置项，这里就不一一解释了，主要配置了一些比较实用的。

    ```javascript
        module:{
            rules:[
                {
                    test:/\.css/,
                    use:[
                        {
                            loader:'style-loader'，
                            options:{
                                sourceMap:true//添加映射，能能够看到样式来自哪个模块
                            }
                        },
                        {
                            loader:'css-loader',
                            options:{
                                sourceMap:true//添加映射，能能够看到样式来自哪个模块
                            }
                        }
                    ]
                }
            ]
        },
    ```
   运行结果如下：

   ![img](./material/css01.png)
   很显然，样式加载在style标签里面根本不是我们不想要的，这样要是上线，那岂不是显得太不专业了，那么请交给[ExtractTextWebpackPlugin](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)