    function MyPromise(fn) {
        var res = null,
　　　　　　　callback = null,
              nextResolve = null;
        function resolve(val) {

            if(typeof(callback) === 'function'){
                res = callback(val);
            }
            if(res && res instanceof MyPromise){
                var  newThen =  res.then
                newThen.call(res,nextResolve);
                return;
            }

            if(typeof(nextResolve) === 'function'){
                nextResolve(res);
            }
        }

        function reject(val){
            if(typeof(callback) === 'function'){
                res = callback(val);
            }
            nextResolve
        }
        
        this.then = function (cb) {
            callback = cb;
                return new MyPromise(function(resolve,reject){
                    nextResolve = resolve;
                })
        };

        fn(resolve,reject);
    }

    function http(url){
        return new MyPromise(function(resolve,reject){
            setTimeout(function(){
                resolve(url);
            },1000)
        })
    }
    
    http('www.123.com').then(function(res){
        console.log(res)
        return http('www.456.com');
    }).then(function(res){
        console.log(res)
     })