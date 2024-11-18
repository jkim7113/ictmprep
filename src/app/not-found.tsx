
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  
  return (
    <div className='gradient center'>
      <section className="max-w-screen-lg flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
        <header className='text-6xl font-bold text-shadow text-white'>404 Not Found</header>
        <p className="text-gray-700 text-lg mx-auto">We couldn't find the page you requested.</p>
      </section>
    </div>
  )
}
