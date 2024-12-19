import react from 'react'
import styled from 'styled-components'

import { Worker } from '@react-pdf-viewer/core';



import Routes from './Routes'
import {UseGeneralContext} from './mainIndex'

function App() {
  const {isDarkMode} = UseGeneralContext()      

  return (
    <Wrapper>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className='app' data-theme={UseGeneralContext()?.isDarkMode ? "dark" : ''}>
          <Routes />
        </div>
      </Worker>
    
    </Wrapper>)
}

const Wrapper = styled.div`
.app {
  }
`

export default App
