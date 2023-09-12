"use server"

import db from "@/lib/admin/prismadb"

export const customDataEnglishCreate = async (name: string, data: any, editId?: string | number) => {
  if (editId) {
    await db.passage.deleteMany({
      where: {
        quizId: `${editId}`
      }
    })
  }

  let dataCreate = {
    create: data.map((v: any) => ({
      title: v?.title || '',
      content: v?.content || '',
      groupQuestions: {
        create: v.groupQuestions.map((v2: any) => ({
          title: v2?.title || '',
          type: v2?.type || '',
          options: v2?.options ? JSON.stringify(v2.options) : null,
          imageId: v2?.image?.id || null,
          questions: {
            create: v2.questions.map((v3: any) => ({
              questionName: v3?.questionName || '',
              optionA: v3?.optionA || '',
              optionB: v3?.optionB || '',
              optionC: v3?.optionC || '',
              optionD: v3?.optionD || '',
              answer: {
                create: {
                  answerName: v3?.answer?.answerName || ''
                }
              }
            }))
          }
        }))
      }
    }))
  }
  
  return {
    [name]: dataCreate
  }
}

export const customDataEnglishSelect = (name: string) => {
  let dataSelect = {
    select: {
      id: true,
      title: true,
      content: true,
      groupQuestions: {
        select: {
          id: true,
          title: true,
          type: true,
          options: true,
          image: true,
          questions: {
            select: {
              id: true,
              questionName: true,
              optionA: true,
              optionB: true,
              optionC: true,
              optionD: true,
              answer: true
            }
          }
        }
      }
    }
  }
  
  return {
    [name]: dataSelect
  }
}

export const formatDataEnglishSelect = (data: any) => {
  return data.map((v: any) => ({
    ...v, 
    groupQuestions: v.groupQuestions.map((v2: any) => ({
      ...v2,
      options: v2.options ? JSON.parse(v2.options) : null
    }))
  }))
}