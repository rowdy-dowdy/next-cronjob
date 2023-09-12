"use client"

import { v4 } from "uuid"
import { QuestionState } from "../PassageFormField"
import QuestionFormField from "../QuestionFormField"

const ShortFormField = ({
  data, updateData, beforeCount
}: {
  data: QuestionState[]
  updateData: (data: QuestionState[]) => void, beforeCount: number
}) => {

  const handelUpdate = (value: string, id: string, type: 'questionName' | 'answer') => {
    const newData: QuestionState[] = data.map(v => {
      if (v.id == id) {
        if (type == 'questionName') {
          return {...v, questionName: value}
        }
        
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

  return (
    <QuestionFormField data={data} updateData={updateData} beforeCount={beforeCount} renderItem={(question) => 
      <>
        <div>
          <p className="text-xs font-semibold mb-1.5 capitalize">
            question name <span className="text-red-600">*</span>
            <span className="icon inline-block w-3 h-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z"></path></svg>
            </span>
          </p>
          <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
            <input type="text" value={question.questionName || ''} onChange={(e) => handelUpdate(e.target.value, question.id, "questionName")} className="w-full px-4 py-2" placeholder="What type of mineral were the Dolaucothi mines in Wales built to extract?" required={true} />
          </div>
        </div>
      
        <div className="mt-4">
          <p className="text-xs font-semibold mb-1.5 capitalize">
            answer <span className="text-red-600">*</span>
          </p>
          <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
            <input type="text" value={question.answer?.answerName} onChange={(e) => handelUpdate(e.target.value, question.id, "answer")} className="w-full px-4 py-2" placeholder="gold" required={true} />
          </div>
        </div>
      </>
    } />
  )
}

export default ShortFormField