import './App.css'

import SearchWidget from './components/widgets/SearchWidget'

function App() {
  return (
    <>
      <div className="page-grid">
        <div className="column">
          <div className="brick">
            <div className='widget'>Widget1</div>
            <div className='widget'>Widget11</div>
          </div>
          <div className="brick">
            <div className='widget'>Widget2</div>
          </div>
          <div className="brick">
            <div className='widget'>S Brick 333</div>
            <div className='widget'>S Brick 333</div>
          </div>
        </div>

        <div className="column center">
          <div className="brick">
            <div className='widget'><SearchWidget /></div>
          </div>
          <div className="brick">
            <div className='widget featured'>MainBrick</div>
            <div className='widget'>MainBrick2</div>
          </div>
        </div>
        
        <div className="column">
          <div className="brick">
            <div className="widget">Side brick 4</div>
            <div className="widget">Side brick 41</div>
          </div>
          <div className="brick">
            <div className="widget">Side brick 5</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
