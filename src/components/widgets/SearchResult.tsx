import type { SearchResultItem } from '@/types'

export default function SearchResult (props: SearchResultItem) {
  return (
    <div>{props.title}</div>
  )
}