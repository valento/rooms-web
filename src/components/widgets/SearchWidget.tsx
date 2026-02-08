import type React from 'react'
import SearchResult from './SearchResult'

function SearchWidget () {

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value 
  }
  return (
    <div className='search'>
      <h1 className='title'>Ask anything... we might know <span style={{marginLeft: '28px', fontSize: '14px'}}>٩(◕‿◕)۶</span></h1>
      <input onChange={search} className='form' type="text" />
      <div>
        {/* <SearchResult /> */}
      </div>
      <div className='text-sm border-t-2 border-orange-100'>we answer only what we know about...</div>

    </div>
  )
}

export default SearchWidget