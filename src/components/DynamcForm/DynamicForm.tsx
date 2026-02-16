import { useEffect, useState } from 'react'

import staticDataSchema from '@/assets/read.data.json' with { type: 'json' }
import staticUiSchema from '@/assets/read.ui.json'

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

function DynamicForm({contentId, mode='edit'}: {contentId?: number; mode: 'edit' | 'read'}) {
  const [content, setContent] = useState<ContentWithSchemas | null>(null)
  const [formData, setFormData] = useState<Record<string, string | number | string[]>>({})

  const dataSchema = staticDataSchema
  const uiSchema = staticUiSchema

  const [loading, setLoading] = useState(mode == 'read'? true : false)

  useEffect(() => {
    if (!contentId) return
    setLoading(true)
    
    fetch(`http://localhost:8000/content/${contentId}`)
      .then(result => result.json())
      .then((data: ContentWithSchemas) => {
        setContent(data)
        setFormData({
          title: data.title,
          body: data.body,
          ...data.metadata
        })
        setLoading(false)
      })
      .catch( err => {
        console.log('Faild to load data', err);
        setLoading(false)
      })
    
  } ,[contentId])

  function handleChange(field: string, value: string | string[] | number) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
// Nested JSONB DB-objects (like metadata)
  function getNestedValue(obj: Record<string, string | number | string[]>, path: string): string | number | string[] | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = path.split('.').reduce((acc: any, part) => acc?.[part], obj)
    return value as string | number | string[] | undefined
  }

// UI-schema Fields
  function renderField(element: { field: string; widget: string; placeholder?: string; rows?: number;  min?: number; max?: number }) {
    if(!content && mode == 'read') return null

    const fieldSchema = (dataSchema.properties as Record<string, any>)[element.field]
    const value = getNestedValue(formData, element.field)// formData[element.field] || ''

    if (mode === 'read') {
      switch (element.widget) {
        case 'input':
          return <span>{value}</span>
        case 'textarea':
          return <div>{value}</div>
        case 'select':
          return <span>{value}</span>
        case 'slider':
          return null
        case 'tag-input':
          {
            const readTags: string[] = Array.isArray(value) ? value : []
            return readTags.length ? (
              <div className="tag-list">
                {readTags.map((tag, i) => <span key={i} className="tag-chip">{tag}</span>)}
              </div>
            ) : null
          }
        default:
          return <span>{value}</span>
      }
   }
    
    switch (element.widget) {
      case 'input':
        return (
          <input
            type="text"
            value={value}
            className={element.field}
            placeholder={element.placeholder}
            onChange={e => handleChange(element.field, e.target.value)}
          />
        )
      case 'select':
        {
          const selectValue = value as string || ''
          return (
            <select
              value={selectValue}
              onChange={e => handleChange(element.field, e.target.value)}
            >
              <option value={value}>-- select --</option>
              {fieldSchema?.enum?.map((opt: string) =>
                <option key={opt} value={opt}>{opt}</option>
              )}
            </select>
        )}
      case 'slider':
        return (
          <div className='slider'>
            <input
              type="range"
              min={element.min || fieldSchema?.minimum || 1}
              max={element.max || fieldSchema?.maximum || 10}
              value={formData[element.field] || element.min || 1}
              onChange={e => handleChange(element.field, Number(e.target.value))}
            />
            <span>{formData[element.field] || element.min || 1}</span>
          </div>
        )
      case 'tag-input':
        {
          const tags: string[] = Array.isArray(value) 
            ? value 
            : typeof value === 'string' && value 
              ? [value] 
              : []
          return (
            <div>
              <div className='tag-list'>
                {tags.map((tag, i) => (
                  <span key={i} className='tag-chip'>
                    
                    <button type="button" onClick={() =>
                      handleChange(element.field, tags.filter((_, idx) => idx !== i))
                    }>{tag} ×</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className='tags'
                placeholder={element.placeholder}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const input = e.target as HTMLInputElement
                    const val = input.value.trim()
                    if (val && !tags.includes(val)) {
                      handleChange(element.field, [...tags, val])
                      input.value = ''
                    }
                  }
                }}
              />
            </div>
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

// Loading...
  if (mode == 'read' && loading) return <div>Loading...</div>
  if (mode == 'read' && !content) return <div>Content not found</div>
  
// Render Content
  return mode == 'edit'? (
    <form className='json-form' onSubmit={e => {
      e.preventDefault()
      console.log('Form data:', formData)
    }}>
      {uiSchema.elements.map(el => (
        <div key={el.field}>
          {/* <label>{el.field}</label> */}
          {renderField(el)}
        </div>
      ))}
      <button className='submit' type="submit">Save</button>
    </form>
  ) : (
    <article className='content-article'>
      {
        uiSchema.elements.map(el => <div key={el.field}>{renderField(el)}</div>)
      }
    </article>
  )
}

export default DynamicForm