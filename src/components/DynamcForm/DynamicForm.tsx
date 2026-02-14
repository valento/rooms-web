import { useState } from 'react'
import dataSchema from './read.data.json'
import uiSchema from './read.ui.json'

function DynamicForm() {
  const [formData, setFormData] = useState<Record<string, string>>({})

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function renderField(element: { field: string; widget: string; placeholder?: string; rows?: number }) {
    const fieldSchema = dataSchema.properties[element.field as keyof typeof dataSchema.properties]
    const value = formData[element.field] || ''

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
        return (
          <select
            value={value}
            onChange={e => handleChange(element.field, e.target.value)}
          >
            <option value="">-- select --</option>
            {'enum' in fieldSchema && fieldSchema.enum?.map((opt: string) =>
              <option key={opt} value={opt}>{opt}</option>
            )}
          </select>
        )
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

  return (
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
      <button type="submit">Save</button>
    </form>
  )
}

export default DynamicForm