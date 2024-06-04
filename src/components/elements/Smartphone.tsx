import React from 'react'


const Smartphone = ({children,bgColor}:{children:React.ReactNode , bgColor:string}) => {
  return (
    <div data-testid="smartphone"  className={`w-1/3  aspect-[9/16] rounded-md outline outline-gray-700 outline-8 flex items-center justify-center ${bgColor} `}>
    
      {children}
     
    </div>
  )
}

export default Smartphone
