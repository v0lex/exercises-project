import React, { useState, useEffect } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
    const [search, setSearch] = useState("")
    const [bodyParts, setBodyParts] = useState([])
    useEffect(() => {
      const fetchExercisesData = async () => {
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
        setBodyParts(['all', ...bodyPartsData])
      }

      fetchExercisesData()
    }, [])
    
    const handleSearch = async () => {
        if(search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
            
            const searchedExercises = exercisesData.filter(
                (exersice) => exersice.name.toLowerCase().includes(search) ||
                exersice.target.toLowerCase().includes(search) ||
                exersice.equipment.toLowerCase().includes(search) ||
                exersice.bodyPart.toLowerCase().includes(search)  
            )

            setSearch('')
            setExercises(searchedExercises)
        }
    }
  return (
    <Stack
        alignItems="center"
        mt="40px"
        justifyContent="center"
        p="20px"
    >
        <Typography
            fontWeight="700"
            sx={{
                fontSize: {lg: "44px", xs: "30px"}
            }}
            mb="30px"
            textAlign="center"
        >
            Awesome Exercises You <br/> Should Know
        </Typography>
        <Box
            position="relative" 
            mb="70px"
        >
            <TextField
                sx={{
                    input: {
                        fontWeight: 700,
                        border: 'none',
                        borderRadius: '5px'
                    },
                    width: {lg: '800px', sm: '350px'},
                    backgroundColor: "#fff",
                    borderRadius: '5px -5px -5px 5px'
                }}
                height="76px"
                value={search}
                onChange={(e)=>{setSearch(e.target.value.toLowerCase())}}
                placeholder="Search Exercises"
                type="text"
            />
            <Button 
                className='serch-btn'
                sx={{
                    backgroundColor: "#ff2625",
                    color: "#fff",
                    textTransform: 'none',
                    width: {lg: '175px', xs: '80px'},
                    fontSize: {lg: '20px', xs: '14px'},
                    height: '56px',
                    position: 'absolute',
                    borderRadius: '0 5px 5px 0',
                    right: '0'
                }}
                onClick={handleSearch}
            >
                Search
            </Button>
        </Box>
        <Box
            sx= {{
                position: 'relative',
                width: "100%",
                p: '20px'
            }}
        >
            <HorizontalScrollbar 
                data = {bodyParts}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
                isBodyParts
            />
        </Box>
    </Stack>
  )
}

export default SearchExercises