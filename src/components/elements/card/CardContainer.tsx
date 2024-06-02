
import { ReactNode } from 'react'

const CardContainer = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex flex-col items-start p-2 space-x-2 space-y-3 border-2 border-black rounded-md">
      {children}
      
    </div>
  )
}

export default CardContainer
