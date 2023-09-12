"use client"

import { QuizState } from "@/app/(web)/practice/[slug]/page"
import useSettings from "@/stores/settings"
import Image from "next/image"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styles from "./practice.module.css";
import Diagram from "../english/Diagram"
import TrueFalse from "../english/TrueFalse"
import Short from "../english/Short"
import Single from "../english/Single"
import Summary from "../english/Summary"
import YesNo from "../english/YesNo"
import Matching from "../english/Matching"
import { File, GroupQuestion, Question } from "@prisma/client"
import { GroupQuestionOptionsState } from "@/components/admin/english/PassageFormField"
import Link from "next/link"

const groupQuestionsList: {
  type: string,
  component: FC<{
    groupQuestion: GroupQuestionState,
    answers: {
      questionId: string;
      answer: string;
    }[],
    setAnswers: Dispatch<SetStateAction<{
      questionId: string;
      answer: string;
    }[]>>
  }>
}[] = [
  { type: 'diagram', component: Diagram},
  { type: 'true-false', component: TrueFalse},
  { type: 'short', component: Short},
  { type: 'single', component: Single},
  { type: 'summary', component: Summary},
  { type: 'yes-no', component: YesNo},
  { type: 'matching', component: Matching}
]

export type GroupQuestionState =  Omit<GroupQuestion, "options"> & {
  image: File | null,
  questions: (Question & {
    number: number
  })[],
  options: GroupQuestionOptionsState
}

const PracticeContent = ({
  quiz
}: {
  quiz: QuizState
}) => {
  const { findSettingByName } = useSettings()
  const [allQuestionInfo, setAllQuestionInfo] = useState(true)

  const [passageIndex, setPassageIndex] = useState(0)

  const [passageIndexList, setPassageIndexList] = useState(quiz.passages.map((v,i) => ({
    id: v.id,
    groupQuestionIndex: 0
  })))

  const mapPassages = (passages: QuizState['passages']) => {
    let questionIndex = 0
    return passages.map(v => ({
      ...v,
      questionCount: v.groupQuestions.reduce((a,c) => {
        return a + c.questions.length
      },0),
      groupQuestions: v.groupQuestions.map((v2,i2) => {
        return {
          ...v2,
          questions: v2.questions.map((v3,i3) => {
            return {
              ...v3,
              number : ++questionIndex,
            }
          })
        }
      })
    }))
  }

  const [passages, setPassages] = useState(mapPassages(quiz.passages))
  const [groupQuestionCurrent, setGroupQuestionCurrent] = useState(passages[0]?.groupQuestions[0])
  const [GroupQuestionComponent, setGroupQuestionComponent] = useState<FC<{
    groupQuestion: GroupQuestionState,
    answers: {
      questionId: string;
      answer: string;
    }[],
    setAnswers: Dispatch<SetStateAction<{
      questionId: string;
      answer: string;
    }[]>>
  }> | null>(
    () => groupQuestionsList.find(v => passages[0]?.groupQuestions[0].type)?.component || null
  )

  const [answers, setAnswers] = useState(quiz.passages.reduce<{ questionId: string, answer: string }[]>((pre,cur) => {
    return [...pre, ...cur.groupQuestions.reduce<{ questionId: string, answer: string }[]>((pre2, cur2) => {
      return [...pre2, ...cur2.questions.map(v3 => ({ questionId: v3.id, answer: '' }))]
    }, [])]
  },[]))

  const getAnswerCount = (index: number) => {
    let listQuestionId = passages[index].groupQuestions.reduce<string[]>((pre, cur) => {
      return [...pre, ...cur.questions.map(v => v.id)]
    }, [])

    return answers.filter(v => listQuestionId.includes(v.questionId) && v.answer).length
  }

  const getPercent = (index: number) => {
    const answerCount = getAnswerCount(index)

    let a = answerCount / passages[index].questionCount * 100
    a = a < 0 ? 0 : ((a > 100) ? 100 : a)

    return 292.796 / 100 * a
  }

  const [groupQuestionPrev, setGroupQuestionPrev] = useState<any>(null)
  const [groupQuestionNext, setGroupQuestionNext] = useState<any>(null)
  
  const watchGroupQuestion = () => {
    if (passageIndex == 0 ) {
      if (passageIndexList[passageIndex].groupQuestionIndex != 0)
        setGroupQuestionPrev(passages[passageIndex].groupQuestions[passageIndexList[passageIndex].groupQuestionIndex - 1])
      else 
        setGroupQuestionPrev(null)
    } else {
      if (passageIndexList[passageIndex].groupQuestionIndex != 0) {
        setGroupQuestionPrev(passages[passageIndex].groupQuestions[passageIndexList[passageIndex].groupQuestionIndex - 1])
      }
      else {
        setGroupQuestionPrev(passages[passageIndex - 1].groupQuestions.at(-1))
      }
    }

    if (passageIndex == passages.length - 1 ) {
      if (passageIndexList[passageIndex].groupQuestionIndex != passages[passageIndex].groupQuestions.length - 1)
        setGroupQuestionNext(passages[passageIndex].groupQuestions[passageIndexList[passageIndex].groupQuestionIndex + 1])
      else 
        setGroupQuestionNext(null)
    } else {
      if (passageIndexList[passageIndex].groupQuestionIndex != passages[passageIndex].groupQuestions.length - 1) {
        setGroupQuestionNext(passages[passageIndex].groupQuestions[passageIndexList[passageIndex].groupQuestionIndex + 1])
      }
      else {
        setGroupQuestionNext(passages[passageIndex + 1].groupQuestions[0])
      }
    }
  }

  useEffect(() => {
    watchGroupQuestion()

    let tempGroupQuestion = passages[passageIndex].groupQuestions[passageIndexList[passageIndex].groupQuestionIndex]
    setGroupQuestionCurrent(tempGroupQuestion)
    setGroupQuestionComponent(() => groupQuestionsList.find(v => v.type == tempGroupQuestion.type)?.component || null)
  }, [passageIndex, passageIndexList])

  const changeGroupQuestion = (type: 'next' | 'prev') => {
    if (type == 'prev') {
      if (passageIndexList[passageIndex].groupQuestionIndex > 0) {
        setPassageIndexList(state => state.map((v,i) => ({
          ...v,
          groupQuestionIndex: i == passageIndex ? v.groupQuestionIndex - 1 : v.groupQuestionIndex
        })))
      }
      else {
        setPassageIndex(state => state > 0 ? state - 1 : state)
        setPassageIndexList(state => state.map((v,i) => ({
          ...v,
          groupQuestionIndex: i == passageIndex ? quiz.passages[i].groupQuestions.length - 1 : v.groupQuestionIndex
        })))
      }
    }
    else if (type == "next") {
      if (passageIndexList[passageIndex].groupQuestionIndex != quiz.passages[passageIndex].groupQuestions.length - 1) {
        setPassageIndexList(state => state.map((v,i) => ({
          ...v,
          groupQuestionIndex: i == passageIndex ? v.groupQuestionIndex + 1 : v.groupQuestionIndex
        })))
      }
      else {
        setPassageIndex(state => state < quiz.passages.length - 1 ? state + 1 : state)
        setPassageIndexList(state => state.map((v,i) => ({
          ...v,
          groupQuestionIndex: i == passageIndex ? 0 : v.groupQuestionIndex
        })))
      }
    }
  }

  const [checkSubmit, setCheckSubmit] = useState(false)
  const [unansweredQuestion, setUnansweredQuestion] = useState(0)

  const submit = () => {
    setCheckSubmit(true)
  }

  return (
    <div className={styles.practice}>
      <style global jsx>
        {`body {
          overflow: hidden;
        }`}
      </style>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <div className="flex-none sticky w-full h-16 px-8 shadow-sm shadow-gray-200 bg-white">
          <div className="flex items-center space-x-6">
            <Link href="/" className="icon w-8 h-8 p-1 bg-gray-200 rounded-full cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </Link>
        
            <div className="flex-none flex items-center space-x-1 py-3">
              <Image src={findSettingByName('site logo')?.url || '/logo2.png'} alt="" width={40} height={40} className="w-10 h-10 rounded" />
              <div className="logo-title">
                <h1 className="text-lg font-semibold">Việt Hùng IT</h1>
                <h5 className="text-xs text-gray-500">Developer . Transporter</h5>
              </div>
            </div>
        
            <div className="!ml-auto">
              <div className="flex items-center space-x-1 text-red-600 rounded-lg border px-2 py-1">
                <span className="font-semibold">{quiz.workTime} : 00</span>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m20.145 8.27 1.563-1.563-1.414-1.414L18.586 7c-1.05-.63-2.274-1-3.586-1-3.859 0-7 3.14-7 7s3.141 7 7 7 7-3.14 7-7a6.966 6.966 0 0 0-1.855-4.73zM15 18c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path><path d="M14 10h2v4h-2zm-1-7h4v2h-4zM3 8h4v2H3zm0 8h4v2H3zm-1-4h3.99v2H2z"></path></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <section className="flex-grow min-h-0" style={{background: 'linear-gradient(to right, white 40%, rgb(243 244 246) 0%)'}}>
          <div className="practice-container h-full">
            <div className="flex h-full -mx-4">
              <div className="w-5/12 content py-4 px-4 overflow-y-auto bg-white" dangerouslySetInnerHTML={{ __html: quiz.passages[passageIndex].content}}>
              </div>
              <div className="w-7/12 py-4 px-4 overflow-y-auto">
                { groupQuestionCurrent
                  ? <div>
                    <div className="rounded-xl bg-red-500 text-white px-4 py-3">
                      <span className="text-xl font-semibold">
                        Question {groupQuestionCurrent.questions[0].number} - 
                        {groupQuestionCurrent.questions[groupQuestionCurrent.questions.length - 1].number}
                        </span>
                      <span className="pl-4">{groupQuestionCurrent.title}</span>
                    </div>
                    
                    <div className="mt-4 group-question-wrapper">
                      { GroupQuestionComponent && groupQuestionCurrent
                        ? <GroupQuestionComponent groupQuestion={groupQuestionCurrent} answers={answers} setAnswers={setAnswers} />
                        : null
                      }
                    </div>
                  </div>
                  : null
                }
              </div>
            </div>
          </div>
        </section>
  
        <section className="flex-none border-t border-gray-200 bg-white">
          <div className="practice-container">
            <div className="flex items-stretch space-x-4 py-2">
              <div className="flex space-x-2">
                <div className="w-8 bg-gray-200">
                  <img src="https://suijm9clouobj.vcdn.cloud/PRIVATE/MEDIA/7606d599-4920-4860-8fb1-de3ee721bf85.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-36">
                  <h5 className="font-semibold truncate">{quiz.title}</h5>
                  <p className="text-sm text-gray-500">Roman tunnels</p>
                </div>
              </div>
        
              {passages.map((v,i) => {
                const percent = getPercent(i)

                return <button key={v.id}
                  className={`passage flex items-center space-x-2 ${i == passageIndex ? 'active' : ''}`}
                    onClick={() => setPassageIndex(i)}
                  >
                  <div className="relative w-11 h-11">
                    <span className="icon w-full h-full">
                      <svg viewBox="0 0 100 100">
                        <path
                          fillOpacity="0"
                          stroke="#E9E9EC"
                          strokeDasharray="292.796px, 292.796px"
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          strokeWidth="6.8"
                          d="M50 3.3999999999999986a46.6 46.6 0 110 93.2 46.6 46.6 0 110-93.2"
                          style={{
                            WebkitTransition:
                              "stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s",
                            transition:
                              "stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s",
                          }}
                        ></path>
                        <path
                          fillOpacity="0"
                          stroke="currentColor"
                          strokeDasharray={`${percent}px, 292.796px`}
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          strokeWidth="6.8"
                          d="M50 3.3999999999999986a46.6 46.6 0 110 93.2 46.6 46.6 0 110-93.2"
                          opacity={percent ? '1' : '0'}
                          style={{
                            WebkitTransitionProperty:
                              "stroke-dashoffset, stroke-dasharray, stroke, stroke-width, opacity",
                            transitionProperty:
                              "stroke-dashoffset, stroke-dasharray, stroke, stroke-width, opacity",
                            WebkitTransitionDuration: "0.3s, 0.3s, 0.3s, 0.06s",
                            transitionDuration: "0.3s, 0.3s, 0.3s, 0.06s",
                            WebkitTransitionTimingFunction: "ease, ease, ease, ease, ease",
                            transitionTimingFunction: "ease, ease, ease, ease, ease",
                            WebkitTransitionDelay: "0s, 0s, 0s, 0.3s, 0s",
                            transitionDelay: "0s, 0s, 0s, 0.3s, 0s",
                          }}
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute w-full h-full top-0 left-0 grid place-items-center text-xs">
                      {getAnswerCount(i)}/{v.questionCount}
                    </span>
                  </div>
                  <div className="mb-1">
                    <h5 className="text-sm font-semibold truncate uppercase">passage {i+1}</h5>
                    <p className="text-xs">{v.questionCount} questions</p>
                  </div>
                </button>
              })}

              <div className="!ml-auto flex items-center space-x-4 select-none">
                <span 
                  className="icon w-10 h-10 border-2 border-gray-300 rounded-full hover:bg-gray-300 cursor-pointer"
                  onClick={() => setAllQuestionInfo(state => !state)}
                >{ allQuestionInfo ? 'expand_more' : 'expand_less' }</span>

                { groupQuestionPrev
                  ? <button 
                    className="flex items-center px-4 py-2 rounded-lg border-2 font-semibold hover:border-red-600 hover:text-red-600"
                    onClick={() => changeGroupQuestion("prev")}
                  >
                    <span className="icon">chevron_left</span>
                    <span>Question {groupQuestionPrev.questions[0].number} - {groupQuestionPrev.questions.at(-1).number}</span>
                  </button>
                  : null
                }

                { groupQuestionNext
                  ? <button 
                    className="flex items-center px-4 py-2 rounded-lg border-2 font-semibold hover:border-red-600 hover:text-red-600"
                    onClick={() => changeGroupQuestion("next")}
                  >
                    <span>Question {groupQuestionNext.questions[0].number} - {groupQuestionNext.questions.at(-1).number}</span>
                    <span className="icon">chevron_right</span>
                  </button>
                : <button 
                    className="flex items-center pl-4 pr-2 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-400"
                    onClick={submit}
                  >
                    <span>Submit</span>
                    <span className="icon">chevron_right</span>
                  </button>
                }
              </div>
            </div>
          </div>
        </section>
  
        { allQuestionInfo
          ? <section 
            className="flex-none bg-gray-50"
          >
            <div className="practice-container py-2">
              <div className="flex space-x-8">
                { passages[passageIndex].groupQuestions.map((v,i) => 
                  <div key={v.id} className="text-xs">
                    <p className="text-gray-500">{v.title}</p>
                    <div className="flex space-x-2">
                      { v.questions.map((question) =>
                        <button key={question.id}
                          className={`w-6 h-6 rounded-full border bg-gray-200 grid place-items-center 
                          ${answers.find(v2 => v2.questionId == question.id)?.answer ? 'border-blue-600 !bg-blue-100' : ''}`}
                          onClick={() => setPassageIndexList(state => state.map((v2, i2) => ({...v2, groupQuestionIndex: i2 == passageIndex ? i : v2.groupQuestionIndex}))) }
                        >
                          {question.number}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          : null
        }
      </div>

      { checkSubmit
        ? <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70" onClick={() => setCheckSubmit(false)}>
          <div className="w-full max-w-lg mx-auto rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center space-x-4">
              <span className="icon w-10 h-10 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path></svg>
              </span>
              <span className="font-semibold text-xl">Missing sentence</span>
            </div>

            <div className="mt-6 font-medium">
              You are still missing {unansweredQuestion} unfinished questions
            </div>

            <form action="?/submit" className="mt-6 flex space-x-4 justify-end" method="post">
              <button 
                className="px-4 py-2 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200"
                onClick={() => setCheckSubmit(false)}
              >Review</button>

              <button type="submit" className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-400">Submit regardless</button>
            </form>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default PracticeContent