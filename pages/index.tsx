import React, { FormEventHandler, MouseEventHandler, useEffect, useState, useLayoutEffect, useRef, ElementType, useCallback } from "react";

// COMPONENTS
import { TableMui } from '@/components/table-mui'
import { Modal } from '@/components/modal'
import { Controller } from '@/components/controller'

// // SERVICES
import { petApi } from '../functions/pet.api'

// LIBRARIES
import { useQuery, useMutation } from "react-query";
import TextField from '@mui/material/TextField';

// TYPE
import { Pet } from '../types/index'

const PetClinic = () => {

  const getAllPets = async () => {
    const pets = await petApi.getPets()


    setPets(pets)
    return pets
  }
  const [pets, setPets] = useState([] as any[])
  const [isController, setControllers] = useState(false)
  const [isModalOpen, setIsModal] = useState(false)
  const [isShadow, setShadow] = useState(false)
  const [petToUpdate, setPetToUpdate] = useState(null)
  const { status, refetch } = useQuery('pets', getAllPets)
  const filterRef = useRef<HTMLInputElement | null>(null);
  const [petsToDisplay, setPetsToDisplay] = useState([] as any[])

  const { mutate: updatePet } = useMutation(petApi.updatePet, {
    onSuccess: () => {
      refetch()
    }
  })

  const { mutate: addPet } = useMutation(petApi.addPet, {
    onSuccess: async (data) => {
      refetch()
    }
  })

  const { mutate: removePet } = useMutation(petApi.removePet, {
    onSuccess: async () => {
      refetch()
    }
  })

  const setFocusOnSearch = () => {
    filterRef.current?.focus()
  }

  const handleKeyPress = ((ev: any) => {

    if (ev.type === 'keydown') {

      if (!isModalOpen) {
        if (ev.key === 't' && ev.ctrlKey) {
          setControllers(!isController)
        }
      }
      if (ev.ctrlKey && ev.key === 'k') {
        if (!isModalOpen) {
          setIsModal(true)
          setTimeout(() => {
            setShadow(true)
          }, 200)
        }
        else if (isModalOpen) {
          setShadow(false)
          setTimeout(() => {
            setIsModal(false)
          }, 500)
        }
      }
    }
    if (ev.type === 'keyup') {

      if (ev.key === 's') {
        if (!isModalOpen) filterRef.current?.focus()
      }
    }
  })

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress)
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keyup', handleKeyPress)
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  const setModal = (bool: boolean | ((prevState: boolean) => boolean)) => {
    if (bool === false) {
      setShadow(bool)
      setTimeout(() => {
        setIsModal(bool)
      }, 200)
    } else {
      setIsModal(bool)
      setTimeout(() => {
        setShadow(bool)
      }, 200)
    }
  }

  const onSubmitForm = async (pet: any) => {
    setIsModal(false)
    try {
      if (pet._id) {
        updatePet(pet)
      }
      else if (!pet._id) {
        await addPet(pet)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onRemovePet = async (petId: any) => {
    try {

      await removePet(petId)
    } catch {

    }
  }
  const getFilteredPets = (ev: { target: any; }) => {
    var textValue = new RegExp(ev.target.value, "i");

    const relevantPets: Pet[] = pets.filter(pet => {
      if (pet.ownerName.match(textValue) ||
        pet.petName.match(textValue) ||
        pet.petType.match(textValue) ||
        pet.phone.match(textValue)) return pet

    }
    )
    setPetsToDisplay(relevantPets)

  }

  const onUpdatePet: Function = async (pet: any) => {
    setPetToUpdate(pet)
    setModal(true)
  }



  if (status === "loading") {
    return <div>loading</div>
  }
  if (status === "error") {
    return <div>Error</div>
  }

  return <div className="app bg-body">

    <div className="grid grid-cols-main-layout font-sans h-[89vh]">
      <main className="col-start-2">
        {!pets && <React.Fragment></React.Fragment>}
        {pets && <section className="flex flex-col">
          <section className="table-functions py-3 flex gap-10">
            <button className="bg-priClr hover:bg-secClr font-bold py-2 px-4 rounded" onClick={() => setModal(true)}>Add pet</button>
            <TextField id="standard-basic" label="Search a pet" variant="standard" inputRef={filterRef} onChange={getFilteredPets} />
          </section>
          <TableMui pets={petsToDisplay.length === 0 ? pets : petsToDisplay} removePet={onRemovePet} updatePet={onUpdatePet} />
        </section>}
      </main>
      {isModalOpen && <Modal setPetToUpdate={setPetToUpdate} pet={petToUpdate} submitForm={onSubmitForm} isModalOpen={isModalOpen} isShadow={isShadow} setShadow={setShadow} setModal={setModal} />}
      <Controller setFocusOnSearch={setFocusOnSearch} isModalOpen={isModalOpen} setModal={setModal} setControllers={setControllers} isController={isController} />
      <button onClick={() => setControllers(true)} className={`transition-all duration-[200ms] flex flex-col items-center rotate-[270deg] bg-red fixed top-1/2 right-0 ${isController ? 'translate-x-3/4' : 'translate-x-[50%] hover:translate-x-1/3'} w-36 rounded-t-lg`}><span> Press me</span><span> to view controls</span></button>
    </div>
  </div>

};


export default PetClinic