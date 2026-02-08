import './App.css'
import Brand from './components/widgets/Brand'

import SearchWidget from './components/widgets/SearchWidget'

function App() {
  return (
    <>
      <div className="page-grid">

{/* ======== Left ================================================================================ */}
        <div className="column">
          <div className="brick">
            <div className='widget number'>
              <div className='timestamp'>services | Oct 01, 2025</div>
            </div>
            <div className='widget number'>
              <div className='timestamp dark'>tech | Nov 21, 2025</div>
            </div>
          </div>
          <div className="brick">
            <div className='widget number'>
              <div className='timestamp'>services | Oct 01, 2025</div>
            </div>
          </div>
          <div className="brick">
            <div className='widget'>
              <div className='timestamp dark'>services | Oct 01, 2025</div>
              <div className="header">
                Lorem Ipsum
                <div className="subheader">by Julian Langestraat, Global Brand Ambassador</div>
              </div>
              
              <div className='body short'>There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour, or...
              </div>
            </div>
            <div className='widget'>
              <div className='timestamp'>services | Oct 01, 2025</div>
              <div className="header">Title</div>
              <div className='body short'>Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled
              </div>
            </div>
          </div>
          <div className="brick">
            <div className='widget'>
              <div className='timestamp'>services | Oct 01, 2025</div>
              <div className="header">Title</div>
              <div className='body short'>Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled
              </div>
            </div>
            <div className='widget'>
              <div className='timestamp dark'>services | Oct 01, 2025</div>
              <div className="header">
                Lorem Ipsum
                <div className="subheader">by Julian Langestraat, Global Brand Ambassador</div>
              </div>
              
              <div className='body short'>There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour, or...
              </div>
            </div>
          </div>

        </div>

{/* ======== Middle ================================================================================ */}
        <div className="column center">
          <div className="brick"><div className='brand'><Brand /></div></div>
          <div className="brick">
            <div className='widget'><SearchWidget /></div>
          </div>
          <div className="brick">
            <div className='widget number'>
              <div className='timestamp dark'>services | Oct 01, 2025</div>
              <div className="header">
                Lorem Ipsum
                <div className="subheader">by Julian Langestraat, Global Brand Ambassador</div>
              </div>
              
              <div className='body short'>There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour, or...
              </div>
            </div>
            <div className='widget number'>
              <div className='timestamp'>services | Oct 01, 2025</div>
            </div>
          </div>
        </div>

{/* ======== Right ================================================================================ */}
        <div className="column">
          <div className="brick">
            <div className="widget number">
              <div className='timestamp'>services | Oct 01, 2025</div>
            </div>
            <div className="widget number">
              <div className='timestamp'>services | Oct 01, 2025</div>
            </div>
          </div>
          <div className="brick">
            <div className="widget number">
              <div className='timestamp dark'>services | Oct 01, 2025</div>
              <div className="header">
                Lorem Ipsum
                <div className="subheader">by Julian Langestraat, Global Brand Ambassador</div>
              </div>
              
              <div className='body short'>There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour, or...
              </div>
            </div>
          </div>
          <div className="brick">
            <div className="widget number">
              <div className='timestamp dark'>services | Oct 01, 2025</div>
              <div className="header">
                Lorem Ipsum
                <div className="subheader">by Julian Langestraat, Global Brand Ambassador</div>
              </div>
              
              <div className='body short'>There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour, or...
              </div>
            </div>
          </div>
          <div className="brick">
            <div className="widget number">
              <div className='timestamp'>services | Oct 01, 2025</div>
              <div className="header">
                Lorem Ipsum
                <div className="subheader">by Julian Langestraat, Global Brand Ambassador</div>
              </div>
              
              <div className='body short'>There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour, or...
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
