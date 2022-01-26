import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { List, ListItem, Button, Select } from '@mui/material';
import MuiInput from '@mui/material/Input';

import { Box } from '@mui/system';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';

const Input = styled(MuiInput)`
  width: 50px;
`;

const useStyles = makeStyles((theme) => ({
  Theme: {
    spacing: 0,
    //paddingBottom: 0,
    //paddingTop: 0,
  },
  Titulo: {
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize:15
  },
  Data: {
    color: 'darkgrey',
    fontSize: 15,
  },
  Texto: {
    color: 'grey',
    height: '100%'
  },
  Link: {
    color: 'blue',
    fontSize: 14
  },
  MiniImage: {
    height: 80
  },
  ImageAndText: {
    display: 'flex',
    flexDirection: 'row',
  },
  RegularImage: {
    width:'100%',
  },
  ImageDiv:{
    width:'120%'
  },
  SkipImage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
  },

})

)
  

//{(typeof props.noticia.imgmarcada !== "undefined" && props.noticia.imgmarcada !== "naotem") && <img src={props.noticia.imgmarcada} className={classes.RegularImage}></img>}
export default function SimpleAccordion(props) {
  const classes = useStyles();
  //const [currentImage, setCurrentImage] = useState((typeof props.noticiaimgmarcada !== "undefined" && props.noticia.imgmarcada !== "naotem") ? props.noticia.caminhoimagem : null)
  const [currentImage, setCurrentImage] = useState([])
  const [allImages, setAllImages] = useState([])

  const [currentCount, setCurrentCount] = useState(0)

  // const [ currentPage, setCurrentPage ]  = useState(1);
  // const [ postsPerPage, setPostsPerPage ] = useState(10);

  useEffect(() => {
    if(typeof props.noticiaimgmarcada !== "undefined" && props.noticia.imgmarcada !== "naotem"){
      setCurrentCount(parseInt(props.noticia.caminhoimagem.split('.png')[0].split('page')[1]))
      for (let i = 1; i < 100; i++) {
        allImages.push(<img src={props.noticia.caminhoimagem.split('.png')[0].split('page')[0]+"page"+i.toString()+'.png'} className={classes.RegularImage}></img> )
      }
    }
  }, [])

  useEffect(()=> {
    setCurrentImage(allImages[currentCount-1])
  }, [currentCount])

  const ImageForward = (event) => {
    setCurrentCount(currentCount+1)
    console.log(currentCount)
  }
  const ImageBackward = (event) => {
    if(currentCount > 1) {setCurrentCount(currentCount-1)}
    console.log(currentCount)
  }

  const handleInputChange = (event) => {
    setCurrentCount(event.target.value === '' ? '' : Number(event.target.value));
  };

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice( indexOfirstPost,indexOfLastPost );
  
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.ImageAndText}>
            {(typeof props.noticiaimgmarcada !== "undefined" && props.noticia.imgmarcada !== "naotem") && <img src={props.noticia.imgmarcada} className={classes.MiniImage}></img>}
            <li >
              <ul className={classes.Theme}>
                <h3 className={classes.Titulo}>{props.noticia.titulo}</h3>
              </ul>
              <ul>
                <span className={classes.Data}>{typeof props.noticia.data_completa === 'string' ? props.noticia.data_completa : props.noticia.data}</span>
              </ul>
            </li>
          </div>
          
          
        </AccordionSummary>
        <Divider />

        <AccordionDetails>
          <div className={classes.ImageAndText}>
            {(typeof props.noticia.imgmarcada !== "undefined" && props.noticia.imgmarcada !== "naotem") && (
              <div className={classes.ImageDiv}>
                {currentImage}
                <Box justifyContent='center' display='flex' displayDirection='column'>
                  <Button variant="contained" endIcon={<AiOutlineArrowLeft  onClick={ImageBackward}/>} ></Button>
                  <Input
                    value={currentCount}
                    size="small"
                    onChange={handleInputChange}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                  />
                  <Button variant="contained" endIcon={<AiOutlineArrowRight onClick={ImageForward} />}></Button>
                </Box>
              </div>
            )}
            <li>
              <ul>
                <p className={classes.Texto}>{props.noticia.texto}</p>
              </ul>
              <ul>
                <span className={classes.Texto}>{"Veículo: " + props.noticia.veiculo} - </span>
                <a href={props.noticia.url} className={classes.Link}>{props.noticia.url}</a>
              </ul>
            </li>
          </div>
        </AccordionDetails>

      </Accordion>
      
    </div>
  );
}