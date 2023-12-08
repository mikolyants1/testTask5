import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface item {
  id:number,
  text:string,
  tag:string[]
}

export interface state {
    items:item[]
}
const initialState:state = {
    items:[]
}

type action<T> = PayloadAction<T>;

const itemSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{
      setNote:(state:state,action:action<Omit<item,"id">>)=>{
        const sorted:item[] = state.items
        .sort((x:item,y:item)=>x.id-y.id);
        const id:number = state.items.length > 0
         ? sorted[sorted.length-1].id : 0 ;
        state.items = [...state.items,{id:id+1,...action.payload}];
      },
      delNote:(state:state,action:action<number>)=>{
        const newItems:item[] = state.items
        .filter((i:item)=>i.id!==action.payload);
        state.items = [...newItems];
      },
      chanNote:(state:state,action:action<item>)=>{
        const {id,tag,text}:item = action.payload;
        const newItem:item = {id:id,tag:tag,text:text};
        const idx:number = state.items.findIndex((i:item)=>i.id == id);
        const left:item[] = state.items.slice(0,idx);
        const right:item[] = state.items.slice(idx+1);
        const newItems:item[] = [...left,newItem,...right];
        state.items = [...newItems];
      },
      clearNote:(state:state,_:action<any>)=>{
        state.items = [];
      }
    }
})
export const actions = itemSlice.actions
export default itemSlice.reducer