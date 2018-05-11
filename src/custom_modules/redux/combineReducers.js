

function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(key => {
        const reducer = reducers[key];
        const initialState = reducer(undefined, { type: '@@redux/INIT' })
        if (typeof initialState === 'undefined') {
            throw new Error(
                `Reducer "${key}" return undefined during initiallization.`
            )
        }
    })
}

export default function combineReducers(reducers) {
    // 第一步,对reducers进行过滤，非function的reducer都将被过滤掉
    const finalReducers = Object.keys(reducers).reduce(
        (finalReducers, key) => {
            if (typeof reducers[key] === 'function') {
                finalReducers[key] = reducers[key]
            }
            return finalReducers;
        }, {}
    )

    // 第二步，初始化检查每个子reducer是否传入默认的initialState。
    let shapeAssertionError;
    try {
        assertReducerShape(finalReducers)
    } catch (e) {
        shapeAssertionError = e;
    }

    // 第三步，返回总reducer
    return (state = {}, action) => {
        if (shapeAssertionError) {
            throw shapeAssertionError;
        }
        return Object.keys(finalReducers).reduce((nextState, key) => {
            const nextStateForKey = finalReducers[key](state[key], action)
            if (typeof nextStateForKey === 'undefined') {
                throw new Error(`Reducer "${key}" return undefined.`)
            }
            nextState[key] = nextStateForKey;
            return nextState
        }, {})
    }

}

/*
  
    通过对该源码的学习，可得知当使用复合型reducers时，每个子reducer必须传递默认值，
以此来通过初始化检查。若同时在createStore中传递initialState参数,则初始化时使用
后者，否则使用内部默认的{}，从而使用每个子reducer的默认值。
    当使用单个reducer时，需要在reducer的默认值或者createStore的initialState参数
中选传一个，否则同样报错。当两者都传时，createStore的initialState参数优先级更高。

*/

// 下面是一个测试demo
// const aReducer = (state = { a: 0 }, action) => {
//     switch (action.type) {
//         case 'add':
//             return state.a + 1;
//         default:
//             return state;
//     }
// }
// const bReducer = (state = { b: 0 }, action) => {
//     switch (action.type) {
//         case 'add':
//             return state.b + 1;
//         default:
//             return state;
//     }
// }

// const reducer = combineReducers({ aState: aReducer, bState: bReducer })

// const initialState = {
//     aState: {
//         a: 4
//     },
//     bState: {
//         b: 5
//     }
// }
// console.log(reducer(initialState, { type: 'add' }))
