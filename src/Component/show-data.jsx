import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Loaddata from './load-data'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import defaultimg from '../Images/default.jpg'
export default function Showdata(props) {
    const [sta, setStat] = useState([])
    const [fill, fildt] = useState([])
    const [launchs, setlaunch] = useState([])
    const [land, setland] = useState([])
    const [query, setQuery] = useState()
    const [year, setYear] = useState([])
    const [launch, launchobj] = useState()
    const state = Loaddata()
    useEffect(() => {
        setStat(state.Year)
        setlaunch(state.launch)
        setland(state.land)
        let path = window.location.href
        let path2 = window.location.search
        window.onpopstate = () => {
            let path = window.location.href
            let path4 = path.split("/")[path.split("/").length - 1]
            setQuery(path4)
            $(`#menu-year li`).removeClass("active")
            $(`#menu-launch li`).removeClass("active")
            $(`#menu-lands li`).removeClass("active")
          //  $(`#menu-year li:eq(${index})`).addClass("active")
            //console.log(query)
        }
        let path3 = path2.split("?")[path2.split("?").length - 1]
        launchobj(path3)
        if (launch === "Launchtrue") {
            if (launchs.length === 0) {
                $("#loader").show().css({ "display": "flex" })
                $("#root").addClass("is_blir")
            }
            else {
                $("#loader").hide().css({ "display": "none" })
                $("#root").removeClass("is_blir").addClass("showdata")
                fildt(launchs)
            } 
           
            const dc = sta.map((a) => a.launch_year)
            const new_year = [...new Set(dc)]
            setYear(new_year)
            $(`#menu-launch li:eq(0)`).addClass("active")
        }
        else if (launch === "Launchfalse") {
            const dc = sta.map((a) => a.launch_year)
            const new_year = [...new Set(dc)]
            setYear(new_year)
            const arr = sta.filter((data) => {
                return data.launch_success === false
            })
            if (arr.length === 0) {
                $("#loader").show().css({ "display": "flex" })
                $("#root").addClass("is_blir")
            }
            else {
                $("#loader").hide().css({ "display": "none" })
                $("#root").removeClass("is_blir").addClass("showdata")
                fildt(arr)
            }
            
            $(`#menu-launch li:eq(1)`).addClass("active")
        }
        else if (launch === "landtrue") {
            const dc = sta.map((a) => a.launch_year)
            const new_year = [...new Set(dc)]
            setYear(new_year)
            
            if (land.length === 0) {
                $("#loader").show().css({ "display": "flex" })
                $("#root").addClass("is_blir")
            }
            else {
                $("#loader").hide().css({ "display": "none" })
                $("#root").removeClass("is_blir").addClass("showdata")
                fildt(land)
            }
            $(`#menu-lands li:eq(0)`).addClass("active")
        }
        else if (launch === "landfalse") {
            const dc = sta.map((a) => a.launch_year)
            const new_year = [...new Set(dc)]
            setYear(new_year)         
            const arr = sta.filter((data)=>{
                return data.rocket.first_stage.cores.find((cate)=>{
                    return cate.land_success===false
                })
            })
           
            if (arr.length === 0) {
                $("#loader").show().css({ "display": "flex" })
                $("#root").addClass("is_blir")
            }
            else {
                $("#loader").hide().css({ "display": "none" })
                $("#root").removeClass("is_blir").addClass("showdata")
                fildt(arr)
            }
            $(`#menu-lands li:eq(1)`).addClass("active")
        }
        else {
            let path4 = path.split("/")[path.split("/").length - 1]
           // console.log(path4)
            if (path4 === "Breif-data?Launchfalse" || path4 === "Breif-data?Launchtrue" || path4 === "Breif-data?landtrue" || path4 === "Breif-data?landfalse"){
                setQuery("") 
            }  
            else{
                setQuery(path4) 
            }       
        if(query==="" || path4==="Breif-data"){            
            if (sta.length === 0) {
                $("#loader").show().css({ "display": "flex" })
                $("#root").addClass("is_blir")
            }
            else {
                $("#loader").hide().css({ "display": "none" })
                $("#root").removeClass("is_blir").addClass("showdata")
            }
            const sd = sta.map((a) => {
                return a.launch_year
            })
            //Remove Duplicate Year 
            const new_year = [...new Set(sd)]
            setYear(new_year)
            fildt(sta)            
        }
        else{
            $("#right").show()
            $("#error").hide()
            const arr = sta.filter((data) => {
                return data.launch_year === query
            })
            if (arr.length === 0) {
                $("#loader").show().css({ "display": "flex" })
                $("#root").addClass("is_blir")
            }
            else {
                $("#loader").hide().css({ "display": "none" })
                $("#root").removeClass("is_blir").addClass("showdata")
                fildt(arr)
            }          
            const sd = sta.map((a) => {
                return a.launch_year
            })
            //Remove Duplicate Year 
            const new_year = [...new Set(sd)]
            setYear(new_year)
           let index=new_year.indexOf(path4)
            $(`#menu-year li:eq(${index})`).addClass("active")
        }
        }
    }, [launch, state.Year, query, sta, state.land, state.launch, launchs, land])

    const Setyear = (e) => {
        let aa = e.target.dataset.year
        let bb = e.target.dataset.index
        setQuery(aa)
        $(`#menu-year li`).removeClass("active")
        $(`#menu-year li:eq(${bb})`).addClass("active")
        $(`#menu-launch li`).removeClass("active")
        $(`#menu-lands li`).removeClass("active")   
    }
    const Launch=(e)=>{
  let val=e.target.dataset.value
  let aa = e.target.dataset.index
        $(`#menu-lands li`).removeClass("active")
        $(`#menu-launch li`).removeClass("active")
        $(`#menu-launch li:nth-child(${aa})`).addClass("active")  
  if(query===""){
const arr=sta.filter((data)=>{
    return data.launch_success===JSON.parse(val)
})
fildt(arr)
  }
  else{
     // console.log(query)
      const arr = sta.filter((data) => {
          return data.launch_year === query
      })
      const arr1 = arr.filter((data) => {
          return data.launch_success === JSON.parse(val)
      })
      if (arr1.length === 0){
          let aa = $("#left").innerHeight()
          $("#error").show().height(aa)
          $("#right").hide()
      }
      else {
          $("#right").show()
          fildt(arr1)
          $("#error").hide()
        }
  }
    }
const Lands=(e)=>{
    let val=e.target.dataset.value
    let aa = e.target.dataset.index
    $(`#menu-launch li`).removeClass("active")
    $(`#menu-lands li`).removeClass("active")
    $(`#menu-lands li:nth-child(${aa})`).addClass("active") 
if(query===""){
const arr=sta.filter((data)=>{
    return data.rocket.first_stage.cores.find((dt)=>{
       return dt.land_success===JSON.parse(val)
    })
})
fildt(arr)
}
else{
    const arr = sta.filter((data) => {
        return data.launch_year === query
    })
    const arr1 = arr.filter((data) => {
        return data.rocket.first_stage.cores.find((dt) => {
            return dt.land_success === JSON.parse(val)
        })
    })
    if (arr1.length === 0) {
        let aa = $("#left").innerHeight()
        $("#error").show().height(aa)
        $("#right").hide()
    }
    else {
        $("#right").show()
        $("#error").hide()
        fildt(arr1)
    }
}
}

    return (
        <>          <header>
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
                        <ul className="years" id="menu-year">
                            {year.map((a, b) => {
                                return <li key={b}><Link data-year={a} data-index={b} onClick={Setyear} to={`/Breif-data/${a}`}>{a}</Link></li>
                            })}
                        </ul>
                        <div className="grid-12 year-title">
                            <h3>Successful Launch</h3>

                        </div>
                        <ul className="all" id="menu-launch">
                            <li data-value="true" onClick={Launch} data-index="1">True</li>
                            <li data-value="false" onClick={Launch} data-index="2">False</li>
                        </ul>
                        <div className="grid-12 year-title">
                            <h3>Successful Landing </h3>

                        </div>
                        <ul className="all" id="menu-lands">
                            <li data-value="true" onClick={Lands} data-index="1">True</li>
                            <li data-value="false" onClick={Lands} data-index="2">False</li>
                        </ul>
                    </div>
                    <div className="grid-10" id="error" style={{display:"none"}}>
                       <div className="er">
                            <img src={require("../Images/nodata.png").default} alt=""></img> </div>   
                    </div>
                    <div className="grid-10" id="right">
                        {fill.map((a, b) => {
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
                                        <li>{a.rocket.first_stage.cores.map((a, b) => {
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
