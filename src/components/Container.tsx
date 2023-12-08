import { Grid } from "@chakra-ui/react"

interface props {
    children:JSX.Element[]
}

function Container({children}:props):JSX.Element{
    return (
     <Grid
        w={300}
        h={400}
        gridTemplateRows="30px 40px 1fr 40px"
        border="1px solid grey"
        margin="auto"
        backgroundColor="white"
        borderRadius={10}
        overflow="hidden">
        {children}
     </Grid>
    )
}

export default Container