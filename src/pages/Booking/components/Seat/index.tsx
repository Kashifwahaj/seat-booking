import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import { SeatEntity } from '../../../../utils/types'


interface props {
    seatData : SeatEntity,
    handleClick:Function
}

const Seat: FC<props> = ({seatData,handleClick}) => {

    const [bgColor, setBgColor] = useState("bg-gray-300")
    const [textColor, setTextColor] = useState("gray-500")
      
    // Props
    
    // States
    
    // Functions
  
    // Side Effects
    useEffect(() => {
        const newBgColor = seatData.isBooked ? "bg-gray-300" : seatData.isSelected ?"bg-green-500" :"bg-gray-100" ;
        const newTextColor = seatData.isBooked ? "text-gray-400" : seatData.isSelected ?"text-gray-100" :"text-gray-900" ;
        setBgColor(newBgColor);
        setTextColor(newTextColor)
    }, [seatData])
    
    // JSX
    return (
        <div>
            <div onClick={() => handleClick(seatData)} className={`flex justify-center items-center w-12 h-12 m-2 border border-white rounded-xl hover:opacity-30 cursor-pointer ${bgColor} ${textColor}`}>
                <span>{seatData.seatNumber}</span>
            </div>
        </div>
    )
}

export default Seat
