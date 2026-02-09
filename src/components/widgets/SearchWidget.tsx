import type React from 'react'
import SearchResult from './SearchResult'
import { useRef, useState } from 'react'
import type { SearchResultItem } from '@/types'
import { searchContent } from '@/services/api'

// import type { SearchResultItem } from '@/types'

export default function SearchWidget () {
  const [results, setResults] = useState<SearchResultItem[]>([])
  const timeerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value

    if (timeerRef.current) clearTimeout(timeerRef.current)

    if (value.length < 2) {
      setResults([])
      return
    }

    timeerRef.current = setTimeout(async () => {
      console.log('Query these...', value)
      try {
        const data = await searchContent(value)
        setResults(data)
        
      } catch (err) {
        console.log(err)
      }
    }, 300)
  }

  return (
    <div className='search'>
      <h1 className='title'>Ask anything... we might know <span style={{marginLeft: '28px', fontSize: '14px'}}>٩(◕‿◕)۶</span></h1>
      <input onChange={search} className='form' type="text" />
      <div>
        {
          results.map( item => <SearchResult key={item.id} {...item} /> )
        }
      </div>
      <div className='text-sm border-t-2 border-orange-100'>we answer only what we know about...</div>

    </div>
  )
}