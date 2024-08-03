/** @type {import('next').NextConfig} */
// const path = require("path");
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
//   entry: "./pages/_app.js",
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename: 'bundle.js'
//     },
//   module:{
//     rules:[{
//         test: /\.js|\.jsx$/,
//         exclude: /node_modules/
//     }]
// },
//   devServer: {
//     contentBase: path.join(__dirname, 'public')
//  },
  webpack: (config) => {
    return config
  },
}
