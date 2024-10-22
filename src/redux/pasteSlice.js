import { createSlice } from '@reduxjs/toolkit'

import toast from 'react-hot-toast';


const initialState = {

  pastes: (() => {

     const savedPastes = localStorage.getItem("pastes");

    try {

      return savedPastes ? JSON.parse(savedPastes) : []; // Parse if valid JSON

    } catch (e) {

      console.error("Failed to parse pastes from localStorage", e);

      return []; // Return an empty array if invalid JSON

    }

  })(),

};


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {

     const paste = action.payload;
     state.pastes.push(paste);
     localStorage.setItem("pastes",JSON.stringify(state.pastes));
     toast("Paste created successfully")
     
    },
    updateToPastes: (state,action) => {

      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>item.id == paste.id);

      if(index>=0)
      {
        state.pastes[index] = paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste updated");
      }


    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },

    removeFromPastes:(state,action) => {

      const pasteId = action.payload;

      const index = state.pastes.findIndex((item)=>item._id === pasteId)
    


      console.log("Found index:", index); // Log the index found

     

        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste deleted");

      


    }


  },
})

// Action creators are generated for each case reducer function
export const { addToPastes,  updateToPastes,  resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer