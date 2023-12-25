import { Box, Button, Flex, Input } from '@chakra-ui/react'
import {useState,ChangeEvent,useRef,PointerEvent, useCallback, useMemo} from 'react';
import { getItem, useActions, useAppSelector } from './Store/store';
import { item } from './Store/slice';
import Card from './components/ui/Card';
import Footer from './components/Footer';
import TagBlock from './components/TagBlock';
import Container from './components/Container';

function App():JSX.Element {
 const ref = useRef<HTMLInputElement>(null!);
 const items:item[] = useAppSelector(getItem);
 const memoItems:item[] = useMemo(():item[]=>items,[items])
 const [current,setCurrent] = useState<string>("");
 const [text,setText] = useState<string>("");
 const [method,setMethod] = useState<string>("post");
 const [id,setId] = useState<number>(0);
 const {setNote,chanNote} = useActions();

const change = useCallback((e:ChangeEvent<HTMLInputElement>):void => {
  setText(e.target.value);
 },[]);
 
 const tagHandler = useCallback((e:PointerEvent<HTMLInputElement>):void => {
  const tag:string = e.currentTarget.title;
  setCurrent(tag);
 },[]);

 const clearCurrent = useCallback(():void => {
   setCurrent("");
 },[]);

 const update = useCallback((id:number)=> ():void => {
   setId(id);
   setMethod("put");
   ref.current.focus();
 },[])

 const add = ():void => {
   if (text){
   const tags:string[] = text.split(" ")
   .filter((i:string)=>i.includes("#"))
   .map((i:string)=>i.replace(/\.|,|!/g,""));
   if (method == "post") setNote({text:text,tag:tags});
   else chanNote({id:id,text:text,tag:tags});
   setMethod("post");
   ref.current.value="";
   }
 }

  return (
    <Container>
       <Flex>
         <Input
          ref={ref}
          onChange={change}
          placeholder='write note'
          colorScheme='grey'
           />
         <Button
          onClick={add}
          color="white"
          colorScheme='blue'>
            add
         </Button>
       </Flex>
       <TagBlock
        items={memoItems}
        handler={tagHandler}
        />
       <Box w="100%" h="100%" maxH={280} overflowY="scroll">
         {items.map(({text,id,tag}:item,i:number):JSX.Element=>(
          <Card
           key={i}
           i={i}
           id={id}
           tag={tag}
           text={text}
           current={current}
           clear={clearCurrent}
           update={update}
          />
         ))}
       </Box>
       <Footer
        items={memoItems}
       />
    </Container>
  )
}

export default App
