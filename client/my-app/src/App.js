import React, {useState, useEffect} from 'react'
import PersistentDrawerLeft from './components/searchDrawer'
import Pagination from './components/Pagination';
import BasicDateRangePicker from './components/dateRangePicker'
import SimpleAccordion from './components/noticiaAccord'
import MultipleSelectCheckmarks from './components/selectSource'
import InputSlider from './components/resultsSlider'

import Typography from '@mui/material/Typography';
import { Box, Container } from "@material-ui/core";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, TextField } from '@mui/material';
import {BiSearchAlt} from "react-icons/bi";



function App() {
  
  // const [searchParams, setSearchParams] = useState({
  //   tabelas: [],
  //   keywords: "",
  //   searchDates: [null, null],
  //   resultCount: 30
  // })

  


  // useEffect(() => {
  //   fetch("/api/getFromNoticias").then(
  //     res => res.json()
  //   ).then(
  //     json => {
  //       setData(json)
  //       console.log(json)
  //   })
  // }, [])

  //useEffect(() => {console.log(searchParams)},[searchParams])

  

  


  return (
    <div>
      <Box component="span" overflow="hidden">
        <PersistentDrawerLeft />
      </Box>
      
    </div>
  )
}

export default App
