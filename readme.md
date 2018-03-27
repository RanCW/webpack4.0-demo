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
   ![image](./material/proinit)

#### webpack 安装
   通过npm install webpack webpack-cli -D，这里不同的是，在webpack4.0当中将多安装一个webpack-cli。

####  配置入口(entry)
   入口就是项目打包开始构建的起点，webpack在打包过程中将会通过入口文件逐一去查找对应的依赖模块，并加载进来。配置的方法如下：
   ```javascript
        //多个配置如下：
        entry: {
                index:'./src/index.js',
                main:'./src/main.js',
            },
   ```
