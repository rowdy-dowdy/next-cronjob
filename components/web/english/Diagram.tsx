"use client"

import { QuizState } from "@/app/(web)/practice/[slug]/page";
import { File, GroupQuestion, Question } from "@prisma/client";
import Image from "next/image";
import { GroupQuestionState } from "../content/PracticeContent";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

const Diagram = ({
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
    <div className="rounded-xl px-4 py-3 bg-white">
      <div className="flex -mx-2">
        <div className="flex-none w-96 px-2 mb-4">
          { groupQuestion.image?.url
            ? <Image src={groupQuestion.image.url}
              alt="group question image"
              width={groupQuestion.image.naturalWidth || 500}
              height={groupQuestion.image.naturalHeight || 500}
              className="w-full"
              />
            : null
          }
        </div>
        <div className="flex-grow min-w-0 px-2 mb-4">
          <div className="flex flex-col space-y-10">
            { groupQuestion.questions.map(v => {
              const firstText = v.questionName?.split("__")[0]
              const lastText = v.questionName?.split("__")[1]
              return <div key={v.id} className="flex flex-wrap items-center space-x-3">
                { firstText ? <span>{firstText}</span> : null }
                <div className="question">
                  <span>{v.number}</span>
                  <span className="icon w-4 h-4 !text-lg">arrow_right_alt</span>
                  <div
                    className="input"
                    contentEditable
                    dangerouslySetInnerHTML={{__html : answers.find(v2 => v2.questionId == v.id)?.answer || ''}}
                    onInput={(e) => handelChange(e, v.id)}
                  ></div>
                </div>
                {lastText ? <span>{lastText}</span> : null }
              </div>
            }) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Diagram