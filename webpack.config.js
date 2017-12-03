var path=require("path")

var htmlwp=require("html-webpack-plugin")
module.exports={
    entry:"./src/main.js",
    output:{
        path:path.join(__dirname,"/dist"),
        filename:"build.js"
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:"style-loader!css-loader"
            },
            {
                test:/\.less$/,
                loader:"style-loader!css-loader!less-loader"
            },
            {
                test:/\.scss$/,
                loader:"style-loader!css-loader!sass-loader"
            },
            {
                test:/\.(png|jpg|gif|ttf|woff)$/,
                loader:"url-loader?limit=10240"
            },
            {
                test:/\.vue$/,
                loader:"vue-loader"
            }
        ]
    },
    plugins:[
        new htmlwp({
            filename:'index.html',
            template:"index1.html"
        })
    ]
}

