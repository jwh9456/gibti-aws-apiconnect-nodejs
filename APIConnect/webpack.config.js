import * as path from 'path';

export default {
    mode:'development',
    entry:{
        main:'./main.js'
    },
    output:{
        path: path.resolve('./dist'),
        filename:'[name].js'
    },
    // target:"node",
    resolve:{
        fallback:{
            "fs": false,
            "child_process":false
        }
    }
}