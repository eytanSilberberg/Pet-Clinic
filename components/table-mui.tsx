import React, { useEffect, useState } from 'react';

// TYPES
import { Pet } from 'types';

// LIBRARIES
import { TableRow, Paper, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material'

// COMPONENTS
import { PetPreview } from './pet-preview';

interface Props {
    pets: Pet[],
    removePet: Function,
    updatePet: Function,
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

export function TableMui({ pets, removePet, updatePet }: Props) {
    const [isMedSize, setSize] = useState(false)

    let checkSize = () => {
        if (window.innerWidth > 650) setSize(true)
        else setSize(false)

    }
    useEffect(() => {
        window.addEventListener('resize', checkSize)
        checkSize()
    }, [])


    const [chosenButtons, setChosenButtons] = useState<String | null>(null)

    return (
        <div className={`table-wrapper h-[35rem] w-full overflow-scroll flex justify-start `}>
            <TableContainer component={Paper} sx={{
                ...cellPadding
            }
            }>
                <Table aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#CBE7DE' }}>
                        <TableRow>
                            {!isMedSize && <TableCell sx={{ ...cellPadding }}><span>Image</span></TableCell>}
                            <TableCell sx={{ ...cellPadding }}><span>Pet name</span></TableCell>
                            <TableCell sx={{ ...cellPadding }}><span>Owner's name</span></TableCell>
                            {isMedSize && <TableCell sx={{ ...cellPadding }}><span>Phone number</span></TableCell>}
                            {isMedSize && <TableCell sx={{ ...cellPadding }}><span>Pet type</span></TableCell>}
                            <TableCell align='center'><div className=''>actions</div></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pets.map((pet: Pet, idx) => (
                            <PetPreview key={idx} setChosenButtons={setChosenButtons} chosenButtons={chosenButtons} pet={pet} removePet={removePet} updatePet={updatePet} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}