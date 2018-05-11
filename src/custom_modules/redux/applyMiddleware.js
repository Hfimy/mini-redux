import compose from './compose';

export default function applyMiddleware(...middlewares) {
  // enhancer
  return createStore => (...args) => {
    // 思考：为何此处使用...arguments报错？
    const store = createStore(...args);
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };

    // 上面的middlewareApi里调用的dispatch是在下面定义的，可以理解为类似运行时绑定，这里先传递，后赋值
    // let dispatch = middleware(middlewareAPI)(store.dispatch); //只传入一个中间件时可以这样写

    const middlewareChain = middlewares.map(middleware =>
      middleware(middlewareAPI)
    );
    /*
     dispatch形式为a(b(c(store.dispatch)))的组合函数执行结果
     a的原有形式为next=>action=>{...}
    因此 dispatch=action=>{ if(...){dispatch(action)}; b(c(store.dispatch))(action)}
    next为a传入的组合函数参数，同理，最里面一层的中间件next为原生的store.dispatch函数
    因此实现了从左至右，action在中间件管道内逐层传递
    */
    let dispatch = compose(...middlewareChain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}
