import React from 'react'
import { useState } from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import {subCategoryList} from "../../../redux/actions/categoryAction";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";


const Divider= ({gap})=>{
    return <>
    <div style={{borderTop:"1px solid #ddd", margin:`${gap} 0px`}}></div>
    </>
}



const InnerList = ({display,setSecondaryList})=>{
return <>
<ul className='sidebar_list_inner' style={{display:`${display}`, padding:"0px"}} >
                    <li style={{paddingTop:"15px",cursor:"pointer" }} onClick={()=>{setSecondaryList({open:true, category:"posters"})}}>
                        Posters
                    </li>
                    <li style={{paddingTop:"15px",cursor:"pointer" }} onClick={()=>{setSecondaryList({open:true, category:"signages"})}}>
                        Signages
                    </li>
                    <li style={{paddingTop:"15px",cursor:"pointer" }} onClick={()=>{setSecondaryList({open:true, category:"floor-graphics"})}}>
                        Floor Graphics
                    </li>
                    <li style={{padding:"15px 0px",cursor:"pointer" }} onClick={()=>{setSecondaryList({open:true, category:"asset-markings"})}}>
                    Asset Markings
                    </li>
                    <li style={{paddingTop:"15px 0px",cursor:"pointer" }} onClick={()=>{setSecondaryList({open:true, category:"pictograms"})}}>
                    Pictograms
                    </li>
                </ul>
        </>
}
const SideBarContainer = ({setOpensideBar,setSecondaryList}) =>{
const [innerlistdisplay, setInnerListDisplay]=useState("none");
    return (
    <div className='sidebar_main_container' style={{width:'23vw',top:"0%", left:"0%",backgroundColor: "white",position:"absolute"}}>
       
        <button className="sidebar_closebutton" onClick={()=>setOpensideBar(false)}><CloseIcon/></button>
        <div className='sidebar_container' >
            <ul className='sidebar_list'>
                <li className='listfont' style={{cursor:"pointer"} } onClick={()=>{innerlistdisplay==="none"?setInnerListDisplay("block"):setInnerListDisplay("none")}}> Category</li>
                    <InnerList display={innerlistdisplay} setSecondaryList={setSecondaryList}/> 
                <Divider gap="10px"/>
                <li className='listfont'>
                    <Link onClick={()=>setOpensideBar(false)} style={{color:"black"}} to="/diy">Campaigns</Link>
                </li>
                <Divider gap="10px"/>
                <li className='listfont'>
                    <Link onClick={()=>setOpensideBar(false)} style={{color:"black"}} to="/diy">Create Your Own</Link>
                </li>
                <Divider gap="10px"/>
                <li className='listfont'>
                    <Link  onClick={()=>setOpensideBar(false)} style={{color:"black"}} to="/diy">Resources</Link>
                </li>
                <Divider gap="10px"/>
                <li className='listfont'>
                    <Link  onClick={()=>setOpensideBar(false)} style={{color:"black"}} to="/bulkorder">Bulk Order</Link>
                </li>
                <Divider gap="10px"/>
                
                <li className='listfont'>
                    <Link onClick={()=>setOpensideBar(false)} style={{color:"black"}} to="/about">About</Link>
                </li>
                <Divider gap="10px"/>
                <li className='listfont'>
                    <Link onClick={()=>setOpensideBar(false)} style={{color:"black"}} to="/contact">Contact</Link>
                </li>
                
            </ul>

        </div>
    </div>
)
}
const DisplayCategoryItems = ({category, setSecondaryList,setOpensideBar}) =>{
    const dispatch =useDispatch();
   
   const items= useSelector(state=>{return state.category.subCategoryList});
   console.log(items);
    useEffect(()=>{
        dispatch(subCategoryList(category))
    },[])
    return (
        <>
        <div  className='sidebar_main_container' style={{width:'23vw',top:"0%", left:"0%",backgroundColor: "white",position:"absolute"}}> 
        <button className="sidebar_closebutton" style={{left:"-20px"}} onClick={()=>setSecondaryList(state=>{return{open:false,category:""}})}>Back</button>
           <div style={{paddingTop:"40px",paddingBottom:"40px", overflow:"auto", overflowX:"hidden"}}>
            {items.map(ele=>{
                    return(   
                    <Link 
                        onClick={()=>{setSecondaryList(state=>{return{open:false,category:""}})
                                        setOpensideBar(false);
                                    }}
                        to={`/subcategory/${category}?subCategorySlug=${ele.sub_cat_slug}`}
                        >
                        <h6 style={{paddingLeft:"40px", paddingBottom:"0px",color:"black"}}>{ele.title}</h6>
                        <Divider gap="15px"/>
                    </Link>)
                })}
                </div>
        </div>
            
        </>
    )
}
const SideBar = () => {
    const [openSideBar , setOpensideBar] =useState(false);
    const [secondaryList, setSecondaryList] =useState({open:false, category:""});
    
  return (
    <div>
    <div style={{color:"white"}} onClick={()=>setOpensideBar(state=>state?false:true)}>
    <MenuIcon />
        </div> {console.log("openSideBar",openSideBar,"secondarylist",secondaryList)}
        {(openSideBar===true && secondaryList.open===true) ?
        <DisplayCategoryItems category={secondaryList.category} setSecondaryList={setSecondaryList} setOpensideBar={setOpensideBar} />
        :((secondaryList.open===false &&openSideBar===true  )?
        <SideBarContainer setOpensideBar={setOpensideBar} setSecondaryList={setSecondaryList}/>:<></>)}
        
    </div>
  )
}

export default SideBar
