import { useParams } from 'react-router-dom'

function ContentPage() {
  const { contentType, category, id } = useParams<{
    contentType: string
    category: string
    id: string
  }>()

  return (
    <div>
      <p>{contentType}/ {category} / {id}</p>
    </div>
  )
}

export default ContentPage