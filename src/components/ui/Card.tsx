import { Box, Button, Flex } from "@chakra-ui/react";
import { useActions } from "../../Store/store"
import { memo } from "react";

interface props {
    key:number,
    i:number,
    text:string,
    tag:string[],
    id:number,
    current:string,
    clear:()=>void,
    update:(id:number)=>()=>void
};

function Card({i,tag,text,id,current,clear,update}:props):JSX.Element{
 const {delNote} = useActions();
 const del = (id:number)=> ():void => {
     delNote(id);
    };
 const colorShow = (tags:string[]):string => {
  const catched:string|undefined = tags.find((i:string)=>i==current);
  return catched ? "blue" : "black";
    };

    return (
      <Box h={12} w="100%" >
        <Flex
         w="90%" margin="auto"
         justifyContent="space-between"
         alignItems="center">
          <Box textAlign="center">
            {i+1}.
            <Box as="span"
             onClick={clear}
             color={colorShow(tag)}>
              {text}
            </Box>
          </Box>
          <Flex>
            <Button onClick={update(id)}>
              chan
            </Button>
            <Button colorScheme='red'
             onClick={del(id)}>
              del
            </Button>
          </Flex>
        </Flex>
      </Box>
    )
}
export default memo(Card)