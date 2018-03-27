const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    //一个的配置方法
    entry:'./src/index.js',
    //多个的配置方法
    // entry:{
    //     index:'./src/index.js',
    //     main:'./src/main.js',
    // },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index[hash:8].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html',//生成HTML的模板
            filename: `index.html`,//生成的HTML文件名
            title: 'webpack4.0 小试牛刀',//html页面头部的title内容，需要在模板html里面设置title为<title><%=htmlWebpackPlugin.options.title%></title>

        })
    ]
}