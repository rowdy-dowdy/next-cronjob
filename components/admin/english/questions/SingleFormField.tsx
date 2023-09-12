"use client"

import { MouseEvent, useEffect, useState } from "react"
import AdminFormFieldText from "../../form-field/AdminFormFieldText"
import { QuestionState } from "../PassageFormField"
import QuestionFormField from "../QuestionFormField"
import { v4 } from "uuid"

const SingleFormField = ({
  data, updateData, beforeCount
}: {
  data: QuestionState[]
  updateData: (data: QuestionState[]) => void,
  beforeCount: number
}) => {
  const [chooseValue, setChooseValue] = useState<{
    id: string,
    value: 'a' | 'b' | 'c' | 'd'
  }[]>(data.map(v => ({id: v.id, value: 'a'})))

  useEffect(() => {
    if (data.length != chooseValue.length) {
      setChooseValue(state => data.map(v => ({
        id: v.id, value: state.find(v2 => v2.id == v.id)?.value || 'a'
      })))
    }
  }, [data])
  

  const handelUpdate = (value: string, id: string, type: 'questionName' | 'a' | 'b' | 'c' | 'd') => {
    const newData: QuestionState[] = data.map(v => {
      if (v.id == id) {
        if (type == 'questionName') {
          return {...v, questionName: value}
        }

        return {
          ...v,
          optionA: type == 'a' ? value : v.optionA,
          optionB: type == 'b' ? value : v.optionB,
          optionC: type == 'c' ? value : v.optionC,
          optionD: type == 'd' ? value : v.optionD,
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

  const handelClick = (e: MouseEvent, id: string,  type: 'a' | 'b' | 'c' | 'd') => {
    e.preventDefault()
    setChooseValue(state => state.map(v => {
      if (v.id == id) {
        return {...v, value: type}
      }
      return v
    }))

    const newData: QuestionState[] = data.map(v => {
      if (v.id == id) {
        const value = (type == "a" ? v.optionA : type == "b" ? v.optionB : type == "c" ? v.optionC : v.optionD) || ''
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
    <QuestionFormField 
      data={data} updateData={updateData}
      beforeCount={beforeCount}
      renderItem={(question) => 
        <>
          <AdminFormFieldText 
            label="question name" 
            placeholder="What is the writer's main point in the first paragraph?"
            required
            value={question.questionName || ''} onChange={(v) => handelUpdate(v, question.id, "questionName")}
          />

          <div className="mt-4">
            <p className="text-xs font-semibold mb-1.5 capitalize">
              answer <span className="text-red-600">*</span>
            </p>
            <div className="flex -mx-2 flex-wrap">
              <div className="w-1/2 px-2 mb-4">
                <div 
                  className={`w-full flex items-center space-x-2 rounded border text-gray-200 bg-white py-1 px-2
                    ${chooseValue.find(v => v.id == question.id)?.value == 'a' ? 'border-blue-300 !bg-blue-100 !text-blue-200' : ''}
                  `}
                >
                  <button 
                    className="grid w-7 h-7 place-items-center rounded-full bg-current font-semibold"
                    onClick={(e) => handelClick(e, question.id, "a")}
                  ><span className="text-[#333]">A</span></button>
                  <input type="text" 
                    value={question.optionA || ''} 
                    onChange={(e) => handelUpdate(e.target.value, question.id, "a")} 
                    className="w-full py-1 text-[#333]" 
                    placeholder="Our use of technology is having a hidden effect on us." required 
                  />
                </div>
              </div>

              <div className="w-1/2 px-2 mb-4">
                <div 
                  className={`w-full flex items-center space-x-2 rounded border text-gray-200 bg-white py-1 px-2
                    ${chooseValue.find(v => v.id == question.id)?.value == 'b' ? 'border-blue-300 !bg-blue-100 !text-blue-200' : ''}
                  `}
                >
                  <button 
                    className="grid w-7 h-7 place-items-center rounded-full bg-current font-semibold"
                    onClick={(e) => handelClick(e, question.id, "b")}
                  ><span className="text-[#333]">B</span></button>
                  <input type="text" 
                    value={question.optionB || ''} 
                    onChange={(e) => handelUpdate(e.target.value, question.id, "b")} 
                    className="w-full py-1 text-[#333]" 
                    placeholder="Technology can be used to help youngsters to read." required 
                  />
                </div>
              </div>

              <div className="w-1/2 px-2 mb-4">
                <div 
                  className={`w-full flex items-center space-x-2 rounded border text-gray-200 bg-white py-1 px-2
                    ${chooseValue.find(v => v.id == question.id)?.value == 'c' ? 'border-blue-300 !bg-blue-100 !text-blue-200' : ''}
                  `}
                >
                  <button 
                    className="grid w-7 h-7 place-items-center rounded-full bg-current font-semibold"
                    onClick={(e) => handelClick(e, question.id, "c")}
                  ><span className="text-[#333]">C</span></button>
                  <input type="text" 
                    value={question.optionC || ''} 
                    onChange={(e) => handelUpdate(e.target.value, question.id, "c")} 
                    className="w-full py-1 text-[#333]" 
                    placeholder="Travellers should be encouraged to use technology on planes." required 
                  />
                </div>
              </div>

              <div className="w-1/2 px-2 mb-4">
                <div 
                  className={`w-full flex items-center space-x-2 rounded border text-gray-200 bg-white py-1 px-2
                    ${chooseValue.find(v => v.id == question.id)?.value == 'd' ? 'border-blue-300 !bg-blue-100 !text-blue-200' : ''}
                  `}
                >
                  <button 
                    className="grid w-7 h-7 place-items-center rounded-full bg-current font-semibold"
                    onClick={(e) => handelClick(e, question.id, "d")}
                  ><span className="text-[#333]">D</span></button>
                  <input type="text" 
                    value={question.optionD || ''} 
                    onChange={(e) => handelUpdate(e.target.value, question.id, "d")} 
                    className="w-full py-1 !text-[#111]" 
                    placeholder="Playing games is a more popular use of technology than reading." required 
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      } 
    />
  )
}

export default SingleFormField