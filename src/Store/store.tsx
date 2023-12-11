import { useSelector,useDispatch,TypedUseSelectorHook } from "react-redux"
import slice,{ actions, state} from "./slice"
import {configureStore,combineReducers, Reducer,bindActionCreators} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, Persistor, WebStorage } from 'redux-persist'

interface Storage{
    key:string,
    storage:WebStorage
}

const config:Storage={
    key:'notes',
    storage
}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
export function useActions(){
   return bindActionCreators(actions,useAppDispatch())
}

const combine:Reducer=combineReducers({
    todos:slice,
})
const persist=persistReducer(config,combine)
 interface Store {
    todos:state
 }
export const getItem = (store:Store) => store.todos.items;

const store=configureStore({
    reducer:persist
})

export const cachedStore:Persistor=persistStore(store)
export default store
