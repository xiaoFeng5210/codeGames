const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    // resolveLoader: {
    //     modulesDirectories: [
    //         './node_modules'
    //     ]
    // },
    devServer: {
        static: {
            directory: path.join(__dirname, './src'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.[jt]s?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript', '@babel/preset-env']
                    }
                }
            }
        ]
    }
}