import React from 'react'
const Send = () => {
  const prevent=(e)=>{
    e.preventDefault()
  }
  return (
    <div className='send'>
        <form className='form' onSubmit={prevent}>
            <input type="text" placeholder='Enter the Text' className="text" />
            
        </form>
        <input type="button" className="bsend" />
    </div>
  )
}

export default Send