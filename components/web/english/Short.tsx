import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import { GroupQuestionState } from '../content/PracticeContent';

const Short = ({
  groupQuestion, answers, setAnswers
}: {
  groupQuestion: GroupQuestionState,
  answers: {
    questionId: string;
    answer: string;
  }[],
  setAnswers: Dispatch<SetStateAction<{
    questionId: string;
    answer: string;
  }[]>>
}) => {

  const handelChange = (e: FormEvent, id: string) => {
    let value = e.currentTarget.textContent || ''
    console.log(value)
    setAnswers(state => state.map(v => ({
      ...v,
      answer: v.questionId == id ? value : v.answer
    })))
  }

  return (
    <div className="rounded-xl px-4 py-3 bg-white flex flex-col space-y-4">
      { groupQuestion.questions.map(v =>
        <div key={v.id} className="question">
          <span>{v.number}</span>
          <span className="icon w-4 h-4 !text-lg">arrow_right_alt</span>
          <span className="text-[#333] font-normal">{v.questionName}</span>
          <div className="input !ml-3" 
            contentEditable 
            dangerouslySetInnerHTML={{__html : answers.find(v2 => v2.questionId == v.id)?.answer || ''}}
            onInput={(e) => handelChange(e, v.id)}
          ></div>
        </div>
      )}
    </div>
  )
}

export default Short