import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center h-[85vh] items-center'>
      <SignUp />
    </div>
  )
}

