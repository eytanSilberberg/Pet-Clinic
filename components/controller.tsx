import React, { useRef } from "react";

interface Props {
    isController: Boolean,
    setControllers: Function,
    isModalOpen: Boolean
    setModal: Function,
    setFocusOnSearch: Function
}


export const Controller = ({ isController, setControllers, isModalOpen, setModal, setFocusOnSearch }: Props) => {

    const action1Ref = useRef<HTMLSpanElement>(null)
    const action2Ref = useRef<HTMLSpanElement>(null)
    const action3Ref = useRef<HTMLSpanElement>(null)

    return <div className="fixed right-0 h-[100vh] ">
        <div className={`shadow-[0_px_3px_1px_rgba(0,0,0,0.3)] bg-white fixed right-0 transition-transform duration-[300ms] absolute top-[200px] w-60 text-center border-y border-l rounded   ${isController ? 'translate-x-0' : 'translate-x-full'}`}>

            <h1 className="text-xl font-normal leading-normal mt-0 p-4 mx-4 border-b border-shadowClr">Controller</h1>
            <p className="flex flex-col">
                <span ref={action1Ref} onClick={() => setControllers(!isController)} className="cursor-pointer transition-all duration-[200ms] p-4 hover:bg-priClr">Ctrl+T=Toggle Controller</span>
                <span ref={action2Ref} onClick={() => {
                    setModal(!isModalOpen)
                    setControllers(!isController)
                }
                }
                    className="cursor-pointer transition-all duration-[200ms] p-4 hover:bg-priClr">Ctrl+k=Add new Pet</span>

                <span onClick={() => {
                    setFocusOnSearch()
                    setControllers(!isController)
                }} ref={action3Ref} className="cursor-pointer transition-all duration-[200ms] p-4 hover:bg-priClr">S=Search for a pet </span>

            </p>
        </div>
    </div>
}