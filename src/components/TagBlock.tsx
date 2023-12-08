import { PointerEvent, memo } from "react"
import { item } from "../Store/slice"
import { Box, Flex, Text } from "@chakra-ui/react"

interface props {
    items:item[],
    handler:(e:PointerEvent<HTMLInputElement>)=>void,
};

function TagBlock({items,handler}:props):JSX.Element{
    
 const createList = ():string[] => {
    const list:string[] = items.flatMap((i:item)=>i.tag);
    const uniq:Set<string> = new Set(list);
    return Array.from(uniq);
      };

 const uniqTags:string[] = createList();
    return (
      <Flex
        marginBottom={2}
        marginTop={2}
        justifyContent="space-evenly"
        overflowX="scroll">
        {uniqTags.map((i:string):JSX.Element=>(
         <Box as='span' key={i} height={5}>
           <Text _hover={{color:"blue"}}
            title={`${i}`}
            onClick={handler}>
              {i}
           </Text>
         </Box>
        ))}
       </Flex>
    )
}

export default memo(TagBlock)