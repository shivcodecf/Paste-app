import React, { useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';


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
    <div>
      <input 
      className='p-2 rounded-2xl min-w-[600px] mt-5'
      type='search'
      placeholder='search here'
      value = {searchTerm}

      onChange ={(e) =>setSearchTerm(e.target.value)}

      /> 

      <div className='flex flex-col gap-5 mt-5'>
       {
         data.length>0 &&
         data.map(
          (paste) =>{
            return (
              <div className='border' key={paste?._id}>
                <div className='border-2 bg-slate-50'>
              {paste.title}
              </div>
              <div> 
                {paste.content}
                </div> 

                <div className='flex flex-row gap-4 place-content-evenly'> 
                    <button> 
                    <a href ={`/?pasteId=${paste?._id}`}>
                    Edit </a>
                    </button> 

                    <button>
                    <a href ={`/pastes/${paste?._id}`}>
                     view </a>
                    </button> 

                  <button onClick={()=>handleDelete(paste?._id)}>delete</button> 
                  <button onClick ={()=>{
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("copied to clipboard")
                  }}
                    >Copy</button> 
                  <button onClick={()=>handleShare(paste.title,paste.content)}>
                Share
              </button>
                  </div> 
                  <div> 
                    {paste.createdAt}
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
