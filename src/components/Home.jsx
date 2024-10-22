import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux'; // Correct import for dispatch
import { addToPastes,updateToPastes } from '../redux/pasteSlice';
import { useSelector } from 'react-redux';

const Home = () => {

    const[title,setTitle] = useState('');
    const[value,setvalue] = useState('');
    const[searchParams,setsearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId");

    const allpastes = useSelector((state)=>state.paste.pastes);

    const dispatch = useDispatch(); 

    function createPaste(){
     
        const paste = {
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }

        if(pasteId)
        {
            dispatch(updateToPastes(paste))
        }
        else {
            dispatch(addToPastes(paste));
        }
        setTitle('');
        setvalue('')
        setsearchParams({});

    }  
    useEffect (()=>{
      
      if(pasteId)
      {
        const paste = allpastes.find((p)=>p._id===pasteId)
        setTitle(paste.title);
        setvalue(paste.content);
      }
      

    },[pasteId])


  return (
    <>
    <div className='flex flex-row gap-7 place-content-between'>
      <input  
       className='p-2 rounded-2xl mt-2 w-[80%] pl-5'
       type = 'text'
       placeholder = 'enter title here'
       value = {title}
       onChange = {(e) =>setTitle(e.target.value)}
      />

      <button onClick = {createPaste} className='p-1 rounded-2xl mt-4'>
        {
            pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button> 
      </div> 
      <div className='mt-8'>
        <textarea
           
        className='rounded-2xl mt-4 min-w-[500px] p-4'
        value = {value}
        placeholder='enter content here'
        onChange = {(e) =>setvalue(e.target.value)}
        rows = {20} 
        />

      </div>
    

    </>

    
  )
}

export default Home
