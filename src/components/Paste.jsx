import React, { useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

import { MdOutlineEditNote } from "react-icons/md";

import { GrFormView } from "react-icons/gr";

import { MdOutlineDelete } from "react-icons/md";

import { FaRegCopy } from "react-icons/fa6";

import { FaRegShareSquare } from "react-icons/fa";


const Paste = () => {
    
  const pastes = useSelector((state)=>state.paste.pastes);
  const [searchTerm,setSearchTerm] = useState('');
  const dispatch = useDispatch(); 

  const filteredData = () => {

      return searchTerm

      ? pastes.filter((paste) =>

          paste.title.toLowerCase().includes(searchTerm.toLowerCase())
        )

      : pastes;

  }; 

  const handleDelete = (id) =>{

       dispatch(removeFromPastes(id))

  } 


  const data = filteredData(); // This is crucial


  
    const handleShare = async (tit,con) => {
        
      const content = `${tit}\n\n${con}`; // Combine multiple pie

      if (navigator.share) {
        try {
          await navigator.share({
           
            text:content,
            // url: window.location.href, // or any other URL you want to share
          });
          console.log('Shared successfully');
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        console.log('Web Share API not supported in this browser.');
        navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard');
      }
    }
    




  

  

  return (
    <div className='bg-white'>
      <input 
      className='p-2 rounded-2xl min-w-[600px] mt-5 bg-slate-300 text-black'
      type='search'
      placeholder='search here'
      value = {searchTerm}

      onChange ={(e) =>setSearchTerm(e.target.value)}

      /> 

      <div className='flex flex-col gap-[40px] mt-5  border-blue-1000 rounded-t-lg w-[800px] '>
       {
         data.length>0 &&
         data.map(
          (paste) =>{
            return (
              <div className='border-2 mt-0 min-h-[200px] flex-col shadow-lg rounded-s-lg border-x-slate-300'  key={paste?._id}>
                <div className=' min-h-[80px] flex flex-col justify-center flex-wrap'>
                <div className='mr-[550px] text-black text-2xl mt-[30px]'> 
                {paste.title}
               </div> 

               <div className='text-black flex-wrap mt-[10px] break-words max-w-full text-[20px] p-[20px]'>
  {paste.content}
</div>

             
              
              </div>
          

              <div className='flex flex-col gap-0.5 place-content-evenly mt-[20px]'>

                
              <div className='mt-[10px] text-slate-400 ml-[340px] mr-[100px]'> 
                    {paste.createdAt}
                    </div>

                    <div className=' flex flex-row gap-[80px] mb-[20px] mt-[30px] justify-center'>
  <button>
    <a href={`/?pasteId=${paste?._id}`}>
      <MdOutlineEditNote className='border-2  text-white w-6 h-6 text-1xl' />
    </a>
  </button>
  <button>
    <a href={`/pastes/${paste?._id}`}>
      <GrFormView className="w-4 h-4" />
    </a>
  </button>
  <button onClick={() => handleDelete(paste?._id)}>
  <MdOutlineDelete className="w-4 h-4" /> {/* You can adjust the size as needed */}
  </button>
  <button onClick={() => {
    navigator.clipboard.writeText(paste?.content);
    toast.success('Copied to clipboard');
  }}>
    <FaRegCopy />
  </button>
  <button onClick={() => handleShare(paste.title, paste.content)}>
    <FaRegShareSquare className="w-4 h-4" />
  </button>
</div> 
</div>

              </div>
            )
          }
         )
       }
      </div>

    </div>
  )
}

export default Paste
