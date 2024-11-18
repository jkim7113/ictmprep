"use server"

import Link from "next/link";
import QuestionCard, { QuestionData } from "@/components/QuestionCard";
import dayjs from 'dayjs'

export default async function Home() {
  const now = dayjs().format("MMM D, YYYY")
  const res = await fetch(`${process.env.URL}/api/question`)
  const json: QuestionData[] = await res.json()
  return (
    <>
    <div className="gradient center">
      <main className="max-w-screen-lg flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
          <h1 className="font-extrabold text-6xl text-shadow text-indigo-400 w-full">ICTM Made Easy</h1>
          <p className="font-semibold text-2xl text-white drop-shadow-md md:px-32">400+ past questions with personalized practice sets — Your path to ICTM success starts here!</p>
          <Link href="/dashboard" className="mx-auto bg-bright text-gray-700 font-medium text-lg py-2 px-4 rounded-md hover:text-blue-500 transition">Get Started 🚀</Link>
      </main>
    </div>
    <div className="max-w-screen-lg mx-auto mb-24 px-6 sm:px-12 text-center">
      <section className="inline-block text-left">
        <header className="text-3xl font-bold text-gray-700 drop-shadow-md">
          <p>Problem of the Day 🔥</p>
        </header>
        <p className="text-md text-gray-500 mt-2"><span className="font-semibold">{now}</span> · Solve at least one problem per day to keep your streak alive.</p>
        <QuestionCard className="mt-4" data={json[0]} />
      </section>
    </div>
    </>
  );
}
