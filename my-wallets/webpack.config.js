module.exports = {
    entry: './src/main.ts',
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