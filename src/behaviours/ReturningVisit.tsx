import React from 'react'
import ReactDOM from 'react-dom'

export const ReturningVisit = () => {
  return (
    <div className='behaviour-returning-visit'>
      <h2>Returning Visit</h2>
      <p>
        When a visitor returns to the site, this behaviour will be triggered.
      </p>
    </div>
  )
}

// Method to invoke this behaviour:
export const invokeReturningVisit = () => {
  console.log('Returning Visit invoked')
  return ReactDOM.createPortal(<ReturningVisit />, document.body)
}
