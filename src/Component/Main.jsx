import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loaddata from './load-data'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import defaultimg from '../Images/default.jpg'
import $ from 'jquery'
export default function Main(props) {
    const [sta,setStat]=useState([])
    const[year,setYear]=useState([])
    const state=Loaddata()
useEffect(()=>{     
    setStat(state.Year)
      const sd=sta.map((a)=>{
          return a.launch_year
      }) 
      //Remove Duplicate Year 
     const new_year=[...new Set(sd)]
     setYear(new_year)
if(sta.length===0){
$("#loader").show().css({"display":"flex"})
$("#root").addClass("is_blir")
}
else{
    $("#loader").hide().css({ "display": "none" })
    $("#root").removeClass("is_blir").addClass("showdata")   
}
},[state.Year,sta])
 
    return (
        <>
        <header>
                <div className="grid-12 pt-1">
             <h1>SpceX Launch Programs</h1>
             </div>   
        </header>
<section className="main">
                <div className="grid-12 p-1">
                    <div className="grid-2" id="left">
                   <h2>Filters</h2>  
                   <div className="grid-12 year-title">
                       <h3>Launch Year</h3>
                       </div>   
                    <ul className="years">
                      {year.map((a,b)=>{
                          return <li key={b}><Link to={`Breif-data/${a}`}>{a}</Link></li>
                      })}    
                       </ul>   
                        <div className="grid-12 year-title">
                            <h3>Successful Launch</h3>
                          
                        </div>  
                        <ul className="all">
                            <li><Link to='Breif-data?Launchtrue'>True</Link></li>
                            <li><Link to='Breif-data?Launchfalse'>False</Link></li>
                        </ul>
                        <div className="grid-12 year-title">
                            <h3>Successful Landing </h3>

                        </div>
                        <ul className="all">
                            <li><Link to='Breif-data?landtrue'>True</Link></li>
                            <li><Link to='Breif-data?landfalse'>False</Link></li>
                        </ul>
                    </div>
                    <div className="grid-10" id="right">
           {sta.map((a,b)=>{
               return <div className="grid-3" key={b}>
                   <div className="grid-view">
                      <div className="avtar">                                            
                           <LazyLoadImage     
                               placeholderSrc={defaultimg}                         
                               src={a.links.mission_patch_small}
                               alt={a.mission_name} effect="blur"
                                />
                      </div>
                       <h1>{a.mission_name}</h1>
                       <ul className="details">
<li>Mission Ids :</li>
                           <li>{a.mission_id}</li>
                           <li>Launch Year :</li>
                           <li>{a.launch_year}</li>
                           <li>Successful Launch :</li>
                           <li>{String(a.launch_success)}</li>
                           <li>Successful Landing :</li>
                           <li>{a.rocket.first_stage.cores.map((a,b)=>{
                               return <span key={b}>{String(a.land_success)}</span>
           })}</li>
                       </ul>
                        </div>
               </div> 
           })}            
                    </div>
                </div>
    </section> 
        </>
    )
}
