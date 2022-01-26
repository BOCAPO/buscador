import React, {useState, useEffect} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, TextField } from '@mui/material';
import {BiSearchAlt} from "react-icons/bi";
import BasicDateRangePicker from './dateRangePicker'
import SimpleAccordion from './noticiaAccord'
import MultipleSelectCheckmarks from './selectSource'
import InputSlider from './resultsSlider'
import Pagination from './Pagination'


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const useStyles = makeStyles( ( theme ) => ({

  Progress: {
    textAlign:'center',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize:20
  } 

})
)

export default function PersistentDrawerLeft(props) {
  const theme   = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])

  const [tabelas    , setTabelas    ] = useState(['Impressos', 'Notícias'])
  const [keywords   , setKeywords   ] = useState("")    
  const [searchDates, setSearchDates] = useState([null, null]) 
  const [resultCount, setResultCount] = useState(10000) 

  /*
  |----------------------------------------------------------------------------
  | Pagination
  |----------------------------------------------------------------------------
  */
  const [ loading, setLoading ]         = useState( false );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ newsPerPage ]                 = useState( 10 );

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfirstNews = indexOfLastNews - newsPerPage;
  const currentNews     = data.slice( indexOfirstNews,indexOfLastNews );
  const paginate        = pageNumber => setCurrentPage( pageNumber );
  

  function updateSearchDate(value){
    setSearchDates(value.map(v => {
      try {return v.toJSON()} catch (error) {return null}  }
    ))
  }

  const processSearchTerms = (e) => {
    const { name, value } = e.target
    setKeywords(value)
  }

  const processTabelas = (e) => {
    setTabelas(e)
  }

  const processResultCount = (e) => {
    console.log(e)
    setResultCount(e)
  }

  const DateRangePicker = () => {
    return (<BasicDateRangePicker value={searchDates} setValue={updateSearchDate}/>)
  }

  const buildSideBar = () => {

    return (
      <Box>
        <List>
          <ListItem>
            <DateRangePicker />
          </ListItem>
          <ListItem>
            <TextField
              id="searchTerms"
              label="Buscar por..."
              value={keywords}
              onChange={processSearchTerms}
            />
          </ListItem>
          <ListItem>
            <MultipleSelectCheckmarks tabelas={tabelas} setTabelas={processTabelas}/>
          </ListItem>
          <ListItem>
            <Button variant="contained" endIcon={<BiSearchAlt/>} onClick={fetchDataFromSolr}>
              Pesquisar
            </Button>
          </ListItem>

        </List>
      </Box>
    )
  }

  const Content = () => {   
    return (
      <Box overflow="hidden">          
          {loading ? <div className={classes.Progress}>Carregando Notícias, aguarde...</div> : false}
          <List>
            {(currentNews.map((el,i) => (
              <Box key={i} component="span" overflow="hidden">
                <ListItem>
                  <SimpleAccordion noticia={el} />
                </ListItem>
                <Divider />
              </Box>
            )))
            }
          </List>
          <Pagination newsPerPage={ newsPerPage } totalNews={ data.length } paginate={ paginate }/>
      </Box>
    )
  }

  function buildDateRequestString(){
    var dateString = ""
    if(searchDates[0] != null){
      dateString += "&data_inicio="+searchDates[0]
    }
    if(searchDates[1] != null){
      dateString += "&data_final="+searchDates[1]
    }
    console.log(searchDates)
    return dateString
  }

  const fetchDataFromSolr = () => {
    setLoading( true );
    var localData = []
    if (tabelas.length > 0 && tabelas.includes("Notícias")){
      fetch("/api/getFromNoticias/?keywords="+keywords+buildDateRequestString()).then(
      res => res.json()
    ).then(
      json => {
        localData = localData.concat(json)
        setData(localData)
        setLoading( false );
      })}
    if (tabelas.length > 0 && tabelas.includes("Impressos")){
      console.log('aff')
      fetch("/api/getFromImpressos/?keywords="+keywords+buildDateRequestString()).then(
      res => res.json()
    ).then(
      json => {
        localData = localData.concat(json)
        setData(localData)        
      })}
    }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            iClipping
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
          {buildSideBar()}
        <Divider />
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          {Content()}
      </Main>
    </Box>
  );
}

