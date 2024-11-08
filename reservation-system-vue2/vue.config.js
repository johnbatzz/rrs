module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                config: {
                    path: __dirname
                }
            }
        }
    },
    devServer: {
        host: "localhost",
        port: "8000"
    },
};