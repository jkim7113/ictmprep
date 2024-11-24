import React, { FormEvent, ChangeEvent } from 'react'
import { QuestionData } from './QuestionCard';
import Dropdown from './Dropdown';

type Props = {
    label?: string;
    handleSubmit: (e: FormEvent) => Promise<void>;
    data: QuestionData;
    setData: React.Dispatch<React.SetStateAction<QuestionData>>;
    selectedSubject: number;
    setSelectedSubject: React.Dispatch<React.SetStateAction<number>>;
}

const Form = ({ label="", handleSubmit, data, setData, selectedSubject, setSelectedSubject }: Props) => {
  const subjects = ["Algebra II", "Algebra I", "Geometry", "Precalculus"]
  return (
    <section>
    <h3 className='text-xl font-semibold mb-4 drop-shadow-md'>{label}</h3>
    <form className='text-md' onSubmit={handleSubmit}>
        <div className='flex flex-wrap gap-5 mb-4'>
            <div className='w-2/3'>
                <label htmlFor='question' className='block mb-2'>Question in LaTeX</label>
                <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setData({ ...data, question: String(e.target.value) })
                }} id="question" className='block resize-y w-full h-36 p-3 rounded-md' autoCapitalize="off" 
                autoCorrect='off' spellCheck='false' placeholder='Type in your question in LaTeX'
                defaultValue={ data.question }></textarea>
            </div>
            <div>
                <label htmlFor='image' className='block mb-1'>Image</label>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, image: String(e.target.value) })
                }} id="image" type="text" placeholder='Type in image' 
                className='p-3 rounded-md w-44' defaultValue={ data?.image }></input>
            </div>
            <div>
                <label htmlFor='year' className='block mb-1'>Year</label>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, year: Number(e.target.value) })
                }} id="year" type="number" placeholder='Type in year' 
                className='p-3 rounded-md w-44' defaultValue={ data?.year }></input>
            </div>
            <div>
                <label htmlFor='subject' className='block mb-1'>Subject</label>
                <Dropdown selected={selectedSubject} setSelected={setSelectedSubject} options={subjects} className='bg-white !p-3 rounded-md' />
            </div>
            <div>
                <label htmlFor='number' className='block mb-1'>Number</label>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, number: Number(e.target.value) })
                }} id="number" type="number" placeholder='Type in number' 
                className='p-3 rounded-md w-32' defaultValue={ data?.number }></input>
            </div>
            <div>
                <label htmlFor='tag' className='block mb-1'>Tag</label>
                <input  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, tag: String(e.target.value) })
                }} id="tag" type="text" placeholder='Type in tag' 
                className='p-3 rounded-md w-32' defaultValue={ data?.tag }></input>
            </div>
            <div>
                <label htmlFor='answers' className='block mb-1'>Answers</label>
                <input  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const answers = String(e.target.value).split(",").map(ans => ans.replaceAll(" ", ""))
                    setData({ ...data, answers: answers })
                }} id="answers" type="text" placeholder='Type in answers' 
                className='p-3 rounded-md' defaultValue={ data.answers.join(", ") }></input>
            </div>
        </div>
        <button className='block py-3 px-4 bg-blue-600 text-bright rounded-md' type="submit">Submit</button>
    </form>
</section>
  )
}

export default Form