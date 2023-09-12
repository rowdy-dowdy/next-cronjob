"use client"

import { v4 } from "uuid"
import AdminFormFieldText from "../../form-field/AdminFormFieldText"
import { QuestionState } from "../PassageFormField"
import QuestionFormField from "../QuestionFormField"

const YesNoFormField = ({
  data, updateData, beforeCount
}: {
  data: QuestionState[]
  updateData: (data: QuestionState[]) => void,
  beforeCount: number
}) => {

  const handelUpdate = (value: 'yes' | 'no' | 'notGive', id: string) => {
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

  const handelUpdateQuestionName = (value: string, id: string) => {
    const newData: QuestionState[] = data.map(v => {
      if (v.id == id) {
        return {...v, questionName: value}
      }
      return v
    })

    updateData(newData)
  }

  return (
    <QuestionFormField data={data} updateData={updateData} defaultAnswerValue="yes" beforeCount={beforeCount} renderItem={(question: QuestionState) =>
      <>
        <AdminFormFieldText 
          label="question name" 
          placeholder="The counter-excavation method completely replaced the qanat method in the 6th century BCE." 
          value={question.questionName || ''} onChange={(e) => handelUpdateQuestionName(e, question.id)}
        />

        <div className="mt-4">
          <p className="text-xs font-semibold mb-1.5 capitalize">
            answer <span className="text-red-600">*</span>
          </p>
          <div className="flex -mx-2 flex-wrap">
            <div className="w-1/3 px-2 mb-4">
              <div 
                className={`w-full flex items-center space-x-2 rounded border bg-white py-1 px-2 text-gray-200 cursor-pointer
                  ${question.answer?.answerName == 'yes' ? 'border-blue-300 !bg-blue-100 !text-blue-200' : ''}
                `}
                onClick={() => handelUpdate('yes', question.id)} 
              >
                <span className="grid w-7 h-7 place-items-center rounded-full font-semibold bg-current">
                  <span className="text-[#333]">A</span>
                </span>
                <span className="!text-[#333]">Yes</span>
              </div>
            </div>

            <div className="w-1/3 px-2 mb-4">
              <div 
                className={`w-full flex items-center space-x-2 rounded border bg-white py-1 px-2 text-gray-200 cursor-pointer
                  ${question.answer?.answerName == 'no' ? 'border-blue-300 !bg-blue-100 !text-blue-200' : ''}
                `}
                onClick={() => handelUpdate('no', question.id)} 
              >
                <span className="grid w-7 h-7 place-items-center rounded-full font-semibold bg-current">
                  <span className="text-[#333]">B</span>
                </span>
                <span className="!text-[#333]">No</span>
              </div>
            </div>

            <div className="w-1/3 px-2 mb-4">
              <div 
                className={`w-full flex items-center space-x-2 rounded border bg-white py-1 px-2 text-gray-200 cursor-pointer
                  ${question.answer?.answerName == 'notGive' ? 'border-blue-300 !bg-blue-100 !text-blue-200' : ''}
                `}
                onClick={() => handelUpdate('notGive', question.id)} 
              >
                <span className="grid w-7 h-7 place-items-center rounded-full font-semibold bg-current">
                  <span className="text-[#333]">C</span>
                </span>
                <span className="!text-[#333]">Not give</span>
              </div>
            </div>
          </div>
        </div>
      </>
    } />
  )
}

export default YesNoFormField