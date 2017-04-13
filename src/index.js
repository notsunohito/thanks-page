import React from 'react'
import {render} from 'react-dom'
import {createStore, Provider} from 'orex'


const initialState = { images: ['0.jpg','1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'], index: 0, opacity: 1, isDone: false}
const store = createStore(initialState)
const action = store.getAction()
action.def('increment', async (_, action, state)=> {
    action.opacity.set(0)
    await sleep(1000)
    action.index.set(({images, index})=>images.length -1 > index ? index+1 : index)
    action.opacity.set(1)
    if(state.images.length -1 === state.index) action.isDone.set(true)
})

const Thanks = ({state, action})=> (
  <div id="thanks" onClick={()=> action.increment()}>
      { state.isDone
          ? <EndPage />
          : <ImageShowPage state={state} />}
  </div>
)

const ImageShowPage = ({state})=> (
    <div>
        <ImageShow state={state} />
        <ImageBox state={state} />
    </div>
)

const ImageShow = ({state})=> (
  <div>
    <div id="image_show_bg"></div>
    <div id="image_show" style={{opacity: state.opacity}}>
      <img src={`./images/${state.images[state.index]}`} />
    </div>
  </div>
)

const EndPage = ()=> (
    <div id="end_page">
        <img className="kansya" src="./images/kansya.jpg" />
        <img className="owari" src="./images/owari.gif" />
    </div>
)


const ImageBox = ({state})=> (
    <div id="image_box" style={{backgroundImage: `url("./images/${state.images[state.index]}")`}}>
    </div>
)

render(
  <Provider store={store}>
    <Thanks />
  </Provider>,
  document.querySelector('#app')
)

function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms))
}
