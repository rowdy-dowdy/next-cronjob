import WebButton from '@/components/web/WebButton'
import WebContainer from '@/components/web/WebContainer'
import db from '@/lib/admin/prismadb'
import React from 'react'

const getData = async () => {
  const quizzes = await db.quiz.findMany()
  return { quizzes }
}

const page = async () => {
  const { quizzes } = await getData()

  return (
    <WebContainer>
      <div className="w-screen max-w-none bg-rose-50 -translate-x-1/2 left-1/2 relative py-20">
        <h3 className="text-5xl text-center text-red-500 font-bold">IELTS Online Test</h3>
        <p className="max-w-md mx-auto mt-6 text-lg text-center text-[--primary]">
          Practice IELTS Practice Tests for free at tuhocielts.dolenglish.vn created by DOL IELTS Dinh Luc. DOL provides IELTS mock tests, answers, detailed explanations, and vocabulary for all IELTS online tests.
        </p>
        <div className="mt-6 text-center">
          <WebButton>Tìm hiểu khóa học</WebButton>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center space-x-2">
          <span className="icon w-8 h-8 text-purple-600">show_chart</span>
          <span className="text-3xl font-bold text-[--primary]">Recent work</span>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex flex-wrap -mx-4">
          { quizzes.map(v => 
            <div key={v.id} className="w-1/2 md:w-1/3 px-4 mb-8">
              <h3 className="text-xl font-bold">{v.title}</h3>
              <p className="mt-2 mb-3 text-gray-500">12K Lượt Làm</p>
              <WebButton href="" color='white' className='py-2 rounded-lg' 
                icon={<span className='icon text-red-600'>play_circle</span>}
              >
                Làm bài
              </WebButton>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8"></div>
    </WebContainer>
  )
}

export default page