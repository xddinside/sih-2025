import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center h-[85vh] items-center'>
      <SignIn />
    </div>
  )
}


