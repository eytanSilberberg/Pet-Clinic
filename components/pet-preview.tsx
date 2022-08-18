import React, { useEffect, useState } from 'react'
import { Pet } from '../types/index'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface Props {

    pet: Pet,
    removePet: Function,
    updatePet: Function,
    chosenButtons: String | null,
    setChosenButtons: Function
}

const cellPadding = {
    padding: {
        xs: '10px',
        sm: '15px',
        md: '15px',
        lg: '20px',
        xl: '20px'
    }
}

export const PetPreview = ({ pet, removePet, updatePet, chosenButtons, setChosenButtons }: Props) => {

    const [isMedSize, setSize] = useState(false)

    let checkSize = () => {
        if (window.innerWidth > 650) setSize(true)
        else setSize(false)
    }
    useEffect(() => {
        window.addEventListener('resize', checkSize)
        checkSize()
    }, [])



    return <TableRow

        sx={{
            '&:last-child td, &:last-child th': { border: 0 }, margin: {
                sm: '10px'
            }
        }}
    >
        {!isMedSize && <TableCell sx={{
            padding: {
                xs: '10px',
                md: 0
            },
            margin: {
                sm: '10px'
            }

        }}> <img className=' rounded object-cover  md:w-full md:h-24' src={pet.image} alt="" /></TableCell>}
        <TableCell sx={{ ...cellPadding }}><div className='relative w-full h-full shadow-inner-[0_1px_1px_1px_1px] '>
            <span className='md:shadow-sm rounded-tr-lg md:p-2.5 md:bg-shadowClr/[.5] md:absolute bottom-0 md:text-white xs:text-xl '>{pet.petName}</span>
            {isMedSize && <img className=' rounded object-cover  md:w-full md:h-24' src={pet.image} alt="" />}
        </div>
        </TableCell >
        <TableCell sx={{ ...cellPadding }} component="th" scope="row">{pet.ownerName}</TableCell>

        {isMedSize && <TableCell sx={{ ...cellPadding }}>{pet.phone}</TableCell>}
        {isMedSize && <TableCell sx={{ ...cellPadding }}>{pet.petType}</TableCell>}
        <TableCell sx={{
            width: '190px',
        }}
        >
            <div className="flex gap-1 relative w-full h-full justify-center items-center">
                <button onClick={() => setChosenButtons(pet._id)} className={`bg-priClr hover:bg-secClr font-bold py-2 px-4 rounded-r ${chosenButtons === pet._id ? 'hidden' : 'block'}  md:hidden`}>Show</button>
                <div className={`button-wrapper ${chosenButtons === pet._id ? 'flex relative' : 'xs:hidden'} justify-center h-full w-full   md:flex`}>
                    <button className='bg-textureClr hover:bg-red transition-all duration-[200ms]  md:hidden absolute translate-y-[-120%] rounded h-7 w-7 top-0 right-0 ' onClick={() => setChosenButtons(null)}>X</button>
                    <button onClick={(ev) => {
                        ev.stopPropagation()
                        removePet(pet._id)
                    }} className="bg-priClr hover:bg-secClr font-bold py-2 px-4 rounded-l">
                        Delete
                    </button>
                    <button onClick={(ev) => {
                        ev.stopPropagation()
                        updatePet(pet)
                    }} className="bg-priClr hover:bg-secClr font-bold py-2 px-4 rounded-r">
                        Update
                    </button>
                </div>
            </div>
        </TableCell>
    </TableRow>
}