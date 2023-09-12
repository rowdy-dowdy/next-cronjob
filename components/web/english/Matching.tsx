"use client"

import { Dispatch, DragEvent, MouseEvent, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { GroupQuestionState } from "../content/PracticeContent";
import { Menu } from "@mui/material";
import { animate, useAnimationFrame, motion } from "framer-motion"
import styles from "./english.module.css";

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Matching = ({
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

  const [suggestions, setSuggestions] = useState(groupQuestion.options?.suggestions.map((v,i) => ({
    id: v.id,
    label: ALPHABET[i],
    title: v.title
  })) || [])

  const [listContent, setListContent] = useState(groupQuestion.options?.summaryContent.split("__")) || []

  const chooseAnswer = (answer: string) => {
    setAnswers(state => state.map(v => ({
      ...v,
      answer: v.questionId == menuId ? answer || '' : v.answer
    })))
    setAnchorElShowMenu(null)
  }

  // show field
  const [menuId, setMenuId] = useState<string | null>(null)
  const [anchorElShowMenu, setAnchorElShowMenu] = useState<null | HTMLElement>(null)
  const openShowMenu = Boolean(anchorElShowMenu)
  const handleClickShowMenu = (event: MouseEvent<HTMLElement>, id: string) => {
    setAnchorElShowMenu(event.currentTarget)
    setMenuId(id)
  }
  const handleCloseShowMenu = () => {
    setAnchorElShowMenu(null)
  }

  // drag drop
  const answerConstraintsEl = useRef<HTMLDivElement>(null)

  const answerDragstart = useRef<{
    id: string,
    label: string,
    title: string
  } | null>(null)

  const dragAnswerItemModal = (e: DragEvent, suggestion: any) => {
    answerDragstart.current = suggestion
  }

  const dropAnswerItemModal = (e: DragEvent, id: string) => {
    console.log(answerDragstart.current)
    if (!answerDragstart.current) return

    setAnswers(state => state.map(v => ({
      ...v,
      answer: v.questionId == id ? answerDragstart.current!.title : v.answer
    })));
    
    (e.target as HTMLElement).classList.remove('is-drag-over')
  }

  const dragenterAnswerItemModal = (e: MouseEvent) => {
    (e.target as HTMLElement).classList.add('is-drag-over')
  }

  const dragleaveAnswerItemModal = (e: MouseEvent) => {
    (e.target as HTMLElement).classList.remove('is-drag-over')
  }

  return (
    <>
      <div ref={answerConstraintsEl} className={`relative rounded-xl px-4 py-3 bg-white ${styles.matching}`}>
        <div className="py-2">
          <div className="flex flex-col space-y-10">
            { groupQuestion.questions.map((v,i) => {
              const answerItem = answers.find(v2 => v2.questionId == v.id)
              return <div key={v.id} className="">
                <div className="question">
                  <span>{v.number}</span>
                  <span className="icon w-4 h-4 !text-lg">arrow_right_alt</span>
                  <span className="font-semibold text-sm">
                    Paragraph <span className="uppercase">{ALPHABET[i]}</span>
                  </span>
                </div>
                <div className="mt-2 flex items-end space-x-1">
                  <span className={`ml-6 ${answerItem?.answer ? 'text-blue-500' : 'text-gray-300'}`}>
                    <svg width="43" height="70" fill="none">
                      <path fill="#fff" stroke="currentColor" strokeWidth="1.5"
                        d="M15.631 8c0 3.988-3.315 7.25-7.44 7.25C4.063 15.25.75 11.988.75 8S4.064.75 8.19.75c4.127 0 7.441 3.262 7.441 7.25z">
                      </path>
                      <ellipse cx="8.19" cy="8" fill="currentColor" data-testid="ellipse" rx="4.095" ry="4"></ellipse>
                      <path stroke="currentColor" strokeDasharray="4 5" strokeWidth="2" d="M8 16v10c0 9.941 8.059 18 18 18h9"></path>
                      <path fill="#fff" stroke="currentColor" strokeWidth="1.5"
                        d="M42.25 44c0 3.988-3.314 7.25-7.44 7.25s-7.44-3.262-7.44-7.25c0-3.987 3.314-7.25 7.44-7.25s7.44 3.263 7.44 7.25z">
                      </path>
                      <ellipse cx="34.81" cy="44" fill="currentColor" data-testid="ellipse" rx="4.095" ry="4"></ellipse>
                    </svg>
                  </span>

                  <div 
                    className="drop-box mb-2 flex items-center space-x-1 cursor-pointer text-sm"
                    onClick={(e) => handleClickShowMenu(e, v.id)}
                    onDrop={(e) => dropAnswerItemModal(e, v.id)}
                    onDragOver={(e) => {e.preventDefault(); e.stopPropagation()}}
                    onDragEnter={(e) => dragenterAnswerItemModal(e)}
                    onDragLeave={(e) => dragleaveAnswerItemModal(e)}
                  >
                    { answerItem?.answer
                      ? <>
                        <span className="flex-none grid place-items-center w-6 h-6 rounded-full bg-blue-500 text-white uppercase font-semibold pointer-events-none">
                          {suggestions.find(v => v.title == answerItem.answer)?.label}
                        </span>
                        <span className="font-normal pointer-events-none">{answerItem.answer}</span>
                      </>
                      : <>
                        <span className="circle flex-none inline-block w-6 h-6 rounded-full border border-dashed bg-gray-100 pointer-events-none"></span>
                        <span className="text text-gray-400 font-normal pointer-events-none">Click here or drop your answer</span>
                      </>
                    }
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>

        <motion.div drag dragConstraints={answerConstraintsEl} className="w-72 max-h-[30rem] overflow-y-auto absolute right-4 top-4 pb-4 shadow rounded bg-white">
          <div className="flex flex-col space-y-2 text-sm">
            <div className="sticky top-0 flex items-center justify-center space-x-2 p-4 cursor-move bg-blue-50">
              <span className="text-base font-semibold">Drag option to the question</span>
            </div>

            { suggestions.map((v,i) =>
              <div key={v.id}
                className="flex items-center space-x-2 rounded cursor-pointer mx-2 px-2 py-2 hover:bg-blue-200 select-none"
                draggable="true"
                onDragStart={(e) => dragAnswerItemModal(e, v)}
              >
                <span className="flex-none grid place-items-center w-6 h-6 rounded-full bg-blue-500 text-white uppercase font-semibold">
                  {v.label}
                </span>
                <span className="font-normal pointer-events-none">{v.title}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <Menu
        anchorEl={anchorElShowMenu}
        open={openShowMenu}
        onClose={handleCloseShowMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            maxHeight: '14rem',
            width: '16.5rem',
          },
        }}
      >
        <div className=" flex flex-col space-y-2 px-2">
          { suggestions.map(v =>
            <div key={v.id}
              className="flex items-center space-x-3 p-2 rounded-full hover:bg-blue-50 cursor-pointer"
              onClick={() => chooseAnswer(v.title)}
            >
              <span className="flex-none grid place-items-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm uppercase font-semibold">{v.label}</span>
              <span className="text-sm">{v.title}</span>
            </div>
          )}
        </div>
      </Menu>
    </>
  )
}

export default Matching