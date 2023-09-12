"use client"

import { useEffect } from "react"
import AdminFormFieldLongText from "../../form-field/AdminFormFieldLongText"
import AdminFormFieldText from "../../form-field/AdminFormFieldText"
import { GroupQuestionOptionsState, QuestionState } from "../PassageFormField"
import QuestionFormField from "../QuestionFormField"
import { v4 } from "uuid"

const SummaryFormField = ({
  data, updateData, options, setOptions, beforeCount
}: {
  data: QuestionState[]
  updateData: (data: QuestionState[]) => void,
  options: GroupQuestionOptionsState,
  setOptions: (data: {options: GroupQuestionOptionsState, questions?: QuestionState[]}) => void,
  beforeCount: number
}) => {

  const handelChangeOptions = (value: string, type: 'title' | 'content') => {
    const newOptions = options ? {
      ...options,
      [type == "title" ? 'summaryTitle' : 'summaryContent']: value
    } : {
      summaryTitle: type == "title" ? value : '',
      summaryContent: type == "content" ? value : '',
      suggestions: []
    }

    setOptions({options: newOptions})
  }

  const handelUpdateOptions = (value: string, id: string) => {
    const newSuggestions = (options?.suggestions || []).map(v => {
      if (v.id == id) {
        return {
          ...v,
          title: value
        }
      }
      return v
    })

    const newData = options ? {...options, suggestions: newSuggestions} : {
      summaryTitle: '',
      summaryContent: '',
      suggestions: newSuggestions
    }

    setOptions({options: newData})
  }

  const handelUpdateSuggestions = (newSuggestions: any[]) => {
    const newData = options ? {...options, suggestions: newSuggestions} : {
      summaryTitle: '',
      summaryContent: '',
      suggestions: newSuggestions
    }

    setOptions({options: newData})
  }

  const handelUpdate = (value: string, id: string) => {
    const newData: QuestionState[] = data.map(v => {
      if (v.id == id) {
        return {
          ...v,
          answer: v.answer ? {
            ...v.answer,
            answerName: value
          } : { id: v4(), answerName: value }
        }
      }
      return v
    })

    updateData(newData)
  }

  const changeQuestion = (longText: string) => {
    let newSuggestions: any[] = (options?.suggestions || [])
    let newData = data
    let count = (longText.split("__") || []).length - 1
    
    if (count > data.length) {
      let temp: QuestionState[] = new Array(count - data.length).fill(0).map(v => ({
        id: v4(),
        answer: {
          id: v4(),
          answerName: '',
        },
        questionName: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
      }))

      newData = [...data, ...temp]
      if (newData.length > (options?.suggestions || []).length) {
        let temp = new Array(newData.length - (options?.suggestions || []).length).fill({id: v4(), title: ''})
        newSuggestions = [...(options?.suggestions || []), ...temp]
      }
    }
    else if (count < data.length) {
      newData = data.filter((v,i) => i < count)
    }

    const newOptions = options ? {...options, suggestions: newSuggestions} : {
      summaryTitle: '',
      summaryContent: '',
      suggestions: newSuggestions
    }

    setOptions({options: newOptions, questions: newData})
  }

  useEffect(() => {
    if (options?.summaryContent != undefined) {
      changeQuestion(options.summaryContent)
    }
  }, [options?.summaryContent])

  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full lg:w-1/2 px-2 mb-4">
        <AdminFormFieldText value={options?.summaryTitle} onChange={(v) => handelChangeOptions(v, 'title')} label="Summary title" placeholder="Studies on digital screen use" />
        <div className="mt-4">
          <AdminFormFieldLongText value={options?.summaryContent} onChange={(v) => handelChangeOptions(v, 'content')} label="content"/>
        </div>
        <p className="mt-2 text-xs">Use the __ symbol for the answer position.</p>
      </div>

      <div className="w-full lg:w-1/2 px-2 mb-4">
        <div className="flex flex-wrap -mx-2">
          <QuestionFormField 
            label="Nhóm câu gợi ý" className="w-full lg:w-1/2 px-2 mb-4" 
            data={options?.suggestions || []} defaultDataCreate={{title: ''}}
            questionTitle="Câu gợi ý"
            updateData={handelUpdateSuggestions} renderItem={(suggestion) =>
            <>
              <p className="text-xs font-semibold mb-1.5 capitalize">
                suggestion <span className="text-red-600">*</span>
              </p>
              <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
                <input type="text" value={suggestion.title} onChange={(e) => handelUpdateOptions(e.target.value, suggestion.id)} className="w-full px-4 py-2" placeholder="suggestion" required />
              </div>
            </>
          } />

          <QuestionFormField label="Nhóm câu trả lời" className="w-full lg:w-1/2 px-2 mb-4" 
            isAdd={false} isDel={false} data={data} updateData={updateData} 
            beforeCount={beforeCount}
            renderItem={(question) =>
            <>
              <p className="text-xs font-semibold mb-1.5 capitalize">
                answer <span className="text-red-600">*</span>
              </p>
              <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
                <input type="text" value={question.answer?.answerName} onChange={(e) => handelUpdate(e.target.value, question.id)} className="w-full px-4 py-2" placeholder="canal" required />
              </div>
            </>
          } />
        </div>
      </div>

    </div>
  )
}

export default SummaryFormField