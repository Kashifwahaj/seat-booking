import React, { FC, useState } from 'react'
import { SeatsData } from '../../dummy'
import { SeatEntity, SeatDataEntity } from '../../utils/types';
import { Seat } from './components'

const data: (SeatDataEntity)[] = SeatsData;
const maxNumberOfSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface props {
}

const Booking: FC<props> = () => {

    // Props

    // States
    const [seats, setSeats] = useState([...data.reverse()]);;
    const [numOfSeats, setNumOfSeats] = useState<number>(1);
    const [numOfSelected, setNumOfSelected] = useState(0)

    // Redux

    // Functions
    const onSeatClick = (seat: SeatEntity) => {
        // Logic

        const newSeats = seats.map((row: SeatDataEntity) => {
            const newRows = row?.map((seatItem: SeatEntity, index: number) => {

                if (seat.id === seatItem.id && seat.rowName === seatItem.rowName) {
                    if (!seatItem.isBooked) {
                        if (seatItem.isSelected) {
                            setNumOfSelected(numOfSelected - 1);
                        } else {

                            setNumOfSelected(numOfSelected + 1);
                        }

                        return {
                            ...seatItem,
                            isSelected: true
                        }
                    } else {
                        return seatItem;
                    }
                }
                
                

                
                    if (numOfSelected < numOfSeats) {
                        if (!seatItem.isBooked && seatItem.rowName === seat.rowName) {
                            if (seatItem.isSelected) {
                                setNumOfSelected(numOfSelected - 1);
                            } else {
    
                                setNumOfSelected(numOfSelected + 1);
                            }
    
                            return {
                                ...seatItem,
                                isSelected: true
                            }
                        } else {
                            return seatItem;
                        }

                    } else {
                        setNumOfSelected(1)
                        return {
                            ...seatItem,
                            isSelected: false
                        }
                    }

                


            });

            

            return newRows
        })

        setSeats([...newSeats])
        // setNumOfSelected(0)
        //
    }

    // Side Effects

    // JSX
    return (
        <div className="flex px-20 justify-center flex-col items-center h-screen bg-gray-200">
            <div>
                <label> Select Number of Seat</label>
                <select className="h-10 w-40 ml-5 px-2 py-1 rounded-sm" onChange={(e) => setNumOfSeats(parseInt(e.target.value))}>
                    {
                        maxNumberOfSeats.map(num => {
                            return (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            {seats.map((rows: SeatDataEntity, index: number) => {
                return (
                    <>
                        {rows[0].rowForPrice ?
                            <div className="flex w-full mx-20 my-2 border-b border-gray-500">
                                <div className=" text-gray-500">
                                    {rows[0].category.name} -
                            {rows[0].category.price}
                                </div>
                            </div>
                            : null}
                        <div className="flex relative w-full flex-col justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="mr-10 absolute left-0">{rows[0].rowName}</div>
                                {rows.map((seatItem: SeatEntity, index: number) => {
                                    return (
                                        <Seat key={index} handleClick={onSeatClick} seatData={seatItem} />
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Booking
