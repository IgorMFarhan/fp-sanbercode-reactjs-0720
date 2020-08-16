import React, { Component } from 'react'
import { CFooter } from '@coreui/react'

class TheFooter extends Component {
  render() {
    return (
      <CFooter fixed={true}>
        <div>
          <span className="ml-1">Igor M Farhan &copy; 2020. All right reserved</span>
        </div>
        <div className="mfs-auto">
          <span className="mr-1">Powered by</span>
          <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
        </div>
      </CFooter>
    )
  }
}

export default React.memo(TheFooter)
