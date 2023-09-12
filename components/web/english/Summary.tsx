import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { GroupQuestionState } from '../content/PracticeContent';
import { Menu } from '@mui/material';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Summary = ({
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

  return (
    <>
      <div className="rounded-xl px-4 py-3 bg-white">
        <p className="text-xl font-semibold">Suggest</p>
        <div className="flex flex-wrap -mx-2 mt-4">
          { suggestions.map(v =>
            <div key={v.id} className="w-1/3 px-2 mb-4 text-sm">
              <div className="flex items-center space-x-3">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-gray-200 text-sm uppercase font-semibold">{v.label}</span>
                <span className="text-sm">{v.title}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl px-4 py-3 bg-white">
        <p className="text-xl font-semibold">{groupQuestion.options?.summaryTitle}</p>
        <div className="mt-4">
          { listContent?.map((v,i) => {
            const answerItem = answers.find(v2 => v2.questionId == groupQuestion.questions[i]?.id)
            return <span key={i}>
              <span className="whitespace-pre-wrap leading-loose">{v}</span>
              { i < listContent.length - 1
                ? <span 
                    className="choose-answer inline cursor-pointer px-4 relative"
                    onClick={(e) => handleClickShowMenu(e, groupQuestion.questions[i]?.id)}
                  >
                    <div className="question !inline-flex w-max pointer-events-none">
                      <span>{groupQuestion.questions[i].number}</span>
                      <span className="icon !text-sm">arrow_right_alt</span>

                      { answerItem?.answer
                        ? <span className="grid place-items-center w-6 h-6 rounded-full bg-blue-600 !text-white text-sm !mr-2 uppercase">
                          {suggestions.find(v => v.title == answerItem?.answer)?.label}
                        </span>
                        : <span className="block w-6 h-6 rounded-full border border-dashed bg-gray-100 !mr-2"></span>
                      }
                    </div>

                    { answerItem?.answer
                      ? <span className="text-blue-600 font-normal pointer-events-none">{answerItem.answer}</span>
                      : <span className="text-gray-400 font-normal pointer-events-none text-sm">Click here to choose your answer</span>
                    }
                  </span>
                : null
              }
            </span>
          })}
        </div>
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

export default Summary