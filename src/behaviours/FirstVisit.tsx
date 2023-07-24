import React from 'react'
import ReactDOM from 'react-dom'

export const FirstVisit = () => {
  return (
    <div className='behaviour-first-visit'>
      <h2>First Visit</h2>
      <p>
        When a visitor first visits the site, this behaviour will be triggered.
      </p>
    </div>
  )
}

// Method to invoke this behaviour:
export const invokeFirstVisit = () => {
  console.log('First Visit invoked')
  return ReactDOM.createPortal(<FirstVisit />, document.body)
}
