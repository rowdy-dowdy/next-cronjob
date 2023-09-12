"use client"
import { File } from "@prisma/client"
import AdminFormFieldFile from "../../form-field/AdminFormFieldFile"
import QuestionFormField from "../QuestionFormField"
import { QuestionState } from "../PassageFormField"
import { v4 } from "uuid"

const DiagramFormField = ({
  data, image, setImage, updateData, beforeCount
}: {
  data: QuestionState[], image: File | null, setImage: (data: File | null) => void,
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
    <div className="flex flex-wrap -mx-2">
      <div className="w-2/5 px-2 mb-4">
        <AdminFormFieldFile label="Ảnh" value={image} onChange={(v) => setImage(v)} details={{tableName: 'quiz'}} />
      </div>
      <div className="w-3/5 px-2 mb-4">
        <QuestionFormField 
          data={data}
          updateData={updateData}
          beforeCount={beforeCount}
          renderItem={(question) => 
            <>
              <div>
                <p className="text-xs font-semibold mb-1.5 capitalize">question name  <span className="text-red-600">*</span>
                </p>
                <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
                  <input type="text" value={question.questionName || ''} onChange={(e) => handelUpdate(e.target.value, question.id, 'questionName')} className="w-full px-4 py-2" placeholder="Water runs into a __ used by local people" required />
                </div>
                <p className="mt-2 text-xs s-9Y9hJpp9NSMc">Use the __ symbol for the answer position.</p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold mb-1.5 capitalize">answer <span className="text-red-600">*</span>
                </p>
                <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
                  <input type="text" value={question.answer?.answerName} onChange={(e) => handelUpdate(e.target.value, question.id, 'answer')} className="w-full px-4 py-2" placeholder="canal" required />
                </div>
              </div>
            </>
          } 
        />
      </div>
    </div>
  )
}

export default DiagramFormField