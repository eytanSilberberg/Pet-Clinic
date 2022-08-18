
import React, { FormEventHandler } from 'react'

// TYPES
import { Pet } from '../types/index'

// HOOKS
import { useForm } from '../hooks/useForm'

// LIBRARIES
import { TextField } from "@material-ui/core"


interface Props {
    pet: Pet | undefined | null,
    submitForm: FormEventHandler,
    isModalOpen: boolean,
    isShadow: Boolean,
    setShadow: Function,
    setModal: Function,
    setPetToUpdate: Function
}
export const Modal = ({ pet, submitForm, isModalOpen, isShadow, setShadow, setModal, setPetToUpdate }: Props) => {
    let [form, handleForm] = useForm(pet ? {
        ownerName: pet.ownerName, petName: pet.petName, petType: pet.petType, phone: pet.phone, _id: pet._id
    } :
        { ownerName: '', petName: '', petType: '', phone: '' })

    const onSubmitForm = (ev: React.FormEvent<HTMLFormElement>) => {
        submitForm(form)
    }

    return <section className='fixed w-full h-full flex '>
        <div onClick={() => {

            setModal(false)
            setShadow(false)
            setTimeout(() => {
                setPetToUpdate(null)
            }, 500);
        }} className={`shadow duration-[400ms] inset-0 absolute ${isModalOpen ? 'z-[0]' : 'z-[-1]'} ${isShadow ? 'bg-shadowClr bg-opacity-75' : 'bg-inherit'}`}></div>
        <div className={`form-wrapper px-12 transition-transform duration-[600ms] fixed top border w-1/2 max-w-xl h-fit left-1/4 bg-secClr  ${isShadow ? 'translate-y-0' : ' translate-y-[-150%]'}`}>
            <h1 className='text-xl font-normal leading-normal mt-2 mb-2'>{pet ? `Edit ${pet.petName}` : `Add a new pet to the family`}</h1>
            <form onSubmit={onSubmitForm} className="bg-white p-6 rounded flex flex-col gap-3.5 mb-8">

                <TextField
                    value={form.ownerName}
                    name='ownerName'
                    onChange={handleForm} type="text"
                    required
                    id="outlined-required"
                    label="Owners name"
                    fullWidth
                />
                <TextField
                    value={form.petName}
                    name='petName'
                    onChange={handleForm} type="text"
                    required
                    id="outlined-required"
                    label="Pets name"
                    fullWidth
                />
                <TextField
                    value={form.phone}
                    name='phone'
                    onChange={handleForm} type="tel"
                    required
                    id="outlined-required"
                    label="Owners phone number"
                    fullWidth
                />
                <TextField
                    value={form.petType}
                    name='petType'
                    onChange={handleForm} type="text"
                    required
                    id="outlined-required"
                    label="Pet type"
                    fullWidth
                />
                <TextField
                    value={form.image}
                    name='image'
                    onChange={handleForm} type="text"
                    required
                    id="outlined-required"
                    label="Image link"
                    fullWidth
                />
                <button className="bg-white font-semibold transition-all duration-[200ms] hover:bg-priClr py-2 px-4 border hover:border-transparent rounded">Submit</button>
            </form>
        </div>
    </section>
}