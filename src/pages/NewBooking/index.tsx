import React, { FC, useEffect, useState } from 'react'
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
    const [numOfSelected, setNumOfSelected] = useState<Array<SeatEntity>>([]);
    const [selected, setSelected] = useState<Array<String | number>>([]);
    const [ready, setReady] = useState(false)
    const [amount, setAmount] = useState(0)


    // Redux

    // Functions
    const onSeatClick = (seat: SeatEntity, rowIndex: number, seatIndex: number) => {
        if (seat.isBooked) return;

        if (numOfSelected.length === 0) {

            const newArr: Array<SeatEntity> = [seat];
            const newIDArr: Array<String | number> = [seat.id];
            for (let i = 1; i < numOfSeats; i++) {

                if (data[rowIndex][seatIndex + i] && !data[rowIndex][seatIndex + i].isBooked) {
                    newArr.push(data[rowIndex][seatIndex + i]);
                    newIDArr.push(data[rowIndex][seatIndex + i].id)
                }

            }

            setNumOfSelected([...newArr]);
            setSelected([...newIDArr])
        }

        else {
            if (numOfSeats === selected.length) {

                const newArr: Array<SeatEntity> = [seat];
                const newIDArr: Array<String | number> = [seat.id];
                for (let i = 1; i < numOfSeats; i++) {

                    if (data[rowIndex][seatIndex + i] && !data[rowIndex][seatIndex + i].isBooked) {
                        newArr.push(data[rowIndex][seatIndex + i]);
                        newIDArr.push(data[rowIndex][seatIndex + i].id)
                    }

                }

                setNumOfSelected([...newArr]);
                setSelected([...newIDArr])

            } else {

                const leftSeats = numOfSeats - selected.length;

                const newArr: Array<SeatEntity> = [...numOfSelected, seat];
                const newIDArr: Array<String | number> = [...selected, seat.id];
                for (let i = 1; i < leftSeats; i++) {

                    if (data[rowIndex][seatIndex + i] && !data[rowIndex][seatIndex + i].isBooked) {
                        newArr.push(data[rowIndex][seatIndex + i]);
                        newIDArr.push(data[rowIndex][seatIndex + i].id)
                    }

                }

                setNumOfSelected([...newArr]);
                setSelected([...newIDArr])
            }

        }
        // Logic



        //

    }

    const syncSeats = () => {
        const newSeats = data.map((row: SeatEntity[]) => {
            return row.map((seatItem: SeatEntity) => {
                if (selected.includes(seatItem.id)) {
                    return {
                        ...seatItem,
                        isSelected: true
                    }
                }
                return seatItem
            })
        });

        setSeats([...newSeats]);
        if (numOfSeats === numOfSelected.length) {
            setReady(true);
            const am = numOfSelected.reduce((a: any, b: SeatEntity) => {
                return a + b.category.price
            }, 0);
            setAmount(am)
        } else {
            setReady(false);
            setAmount(0)
        }


    }

    // Side Effects

    useEffect(() => {

        syncSeats();

    }, [numOfSelected, selected])

    useEffect(() => {
        setSeats([...data]);
        setSelected([]);
        setNumOfSelected([])
    }, [numOfSeats])


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

            {seats.map((rows: SeatDataEntity, rowIndex: number) => {
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
                                        <Seat key={index} seatIndex={index} rowIndex={rowIndex} handleClick={onSeatClick} seatData={seatItem} />
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )
            })}
            {ready ?
                <div>
                    <div className="cursor-pointer flex bg-green-500 text-gray-100 px-4 py-2 rounded-xl hover:bg-green-700 transition-all duration-500">
                        Pay &ensp;
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    &ensp;
                    {amount}
                    </div>
                </div>
                : null}
        </div>
    )
}

export default Booking
