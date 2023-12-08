import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useActions } from "../Store/store";
import { item } from "../Store/slice";
import { memo } from "react";

interface props {
    items:item[]
}

function Footer({items}:props):JSX.Element{
 const {clearNote} = useActions();
    return (
        <Flex
         justifyContent="space-between"
         borderTop="1px solid rgb(200,200,200)">
         <Box textAlign="center"
          padding=" 6px 10px">
           notes count: {" "}
           <Text as="span"
            color='blue'
            fontSize={20}>
            {items.length} 
           </Text>
         </Box>
         <Button onClick={()=>clearNote("")}
          colorScheme='blue'>
           clear all notes
         </Button>
       </Flex>
    );
};

export default memo(Footer)