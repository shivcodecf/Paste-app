
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux'; // Correct import for dispatch
import { addToPastes,updateToPastes } from '../redux/pasteSlice';
import { useSelector } from 'react-redux';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state)=>state.paste.pastes);

  

  const past1 = allPastes.filter((p)=>p._id === id);

  const paste = past1[0];


  console.log("final pastes",past1)

  return ( 
    <>
    <div className='flex flex-row gap-7 place-content-between'>
      <input  
       className='p-2 rounded-2xl mt-2 w-[80%] pl-5'
       disabled
       type = 'text'
       placeholder = 'enter title here'
       value = {paste.title}
       onChange = {(e) =>setTitle(e.target.value)}
      />

      {/* <button onClick = {createPaste} className='p-1 rounded-2xl mt-4'>
        {
            pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>  */}
      </div> 
      <div className='mt-8'>
        <textarea

           
        className='rounded-2xl mt-4 min-w-[500px] p-4'
        disabled
        value = {paste.content}
        placeholder='enter content here'
        onChange = {(e) =>setvalue(e.target.value)}
        rows = {20} 
        />

      </div>
      </>
  )
}

export default ViewPaste
