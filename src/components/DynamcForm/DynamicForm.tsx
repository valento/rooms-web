import { useEffect, useState } from 'react'

interface SchemaProperty {
  type: string
  maxLength?: number
  minimum?: number
  maximum?: number
  enum?: string[]
  items?: {
    type: string
  }
  const?: string
  properties?: Record<string, SchemaProperty>
}
interface Schema {
  type: string
  properties: Record<string, SchemaProperty>}

interface UIElement {
  field: string
  widget: string
  placeholder?: string
  rows?: number
  min?: number
  max?: number
}

interface UISchema {
  elements: UIElement[]
}

interface ContentWithSchemas {
  id: number
  title: string
  body: string
  metadata: Record<string, SchemaProperty>
  data_schema: Schema
  ui_schema: UISchema
}

function DynamicForm({contentId}: {contentId?: number}) {
  const [content, setContent] = useState<ContentWithSchemas | null>(null)
  const [formData, setFormData] = useState<Record<string, string | string | string[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8000/content/${contentId}`)
      .then(result => result.json())
      .then((data: ContentWithSchemas) => {
        setContent(data)
        setLoading(false)
      })
      .catch( err => {
        console.log('Faild to load data', err);
        setLoading(false)
      })
    
  } ,[contentId])

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function getNestedValue(obj: Record<string, string | string | string[]>, path: string): string | number | string[] | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = path.split('.').reduce((acc: any, part) => acc?.[part], obj)
    return value as string | number | string[] | undefined
  }

  function renderField(element: { field: string; widget: string; placeholder?: string; rows?: number }) {
    if(!content) return null

    const fieldSchema = content.data_schema.properties[element.field]
    const value = getNestedValue(formData, element.field)//formData[element.field] || ''

    switch (element.widget) {
      case 'input':
        return (
          <input
            type="text"
            value={value}
            placeholder={element.placeholder}
            onChange={e => handleChange(element.field, e.target.value)}
          />
        )
      case 'select':
        {const selectValue = value as string || ''
        return (
          <select
            value={selectValue}
            onChange={e => handleChange(element.field, e.target.value)}
          >
            <option value="">-- select --</option>
            {fieldSchema?.enum?.map((opt: string) =>
              <option key={opt} value={opt}>{opt}</option>
            )}
          </select>
        )}
      case 'textarea':
        return (
          <textarea
            value={value} 
            rows={element.rows || 4}
            placeholder={element.placeholder}
            onChange={e => handleChange(element.field, e.target.value)}
          />
        )
      default:
        return <p>Unknown widget: {element.widget}</p>
    }
  }

  if (loading) return <div>Loading...</div>
  if (!content) return <div>Content not found</div>

  return (
    <form className='json-form' onSubmit={e => {
      e.preventDefault()
      console.log('Form data:', formData)
    }}>
      {content.ui_schema.elements.map(el => (
        <div key={el.field}>
          {/* <label>{el.field}</label> */}
          {renderField(el)}
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  )
}

export default DynamicForm