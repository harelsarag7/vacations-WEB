import "./Home.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VacationCard from "./VacationCard/VacationCard";
import VacationsFilters from "./VacationsFilters/VacationsFilters";
import { vacationsFunctions } from "../../../../Services/vacations";
import { vacationModel } from "../../../../Models/vacationModel";
import { useQuery } from "react-query";
import Header from "../../Header/Header";
import PaginationComponent from "./PaginationComponent/PaginationComponent";
import AddVacation from "./AddVacation/AddVacation";
// import { ToastContainer } from "react-toastify";

// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
// import Stack from '@mui/material/Stack';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import KeyboardArrowRightIcon from '../Home/';
function Home(): JSX.Element {
    const userRedux = useSelector((state: any) => state.auth)
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<vacationModel[]>()
    const [vacationsLength, setVacationsLength] = useState<vacationModel[]>()
    const [filterSelected, setFilterSelected ] = useState<string | undefined>(undefined)
    const [page, setPage] = useState<number>(1)
    const [refreshVacations, setRefreshVacation] = useState<boolean>(false)
    const [addVacation, setAddVacation] = useState<boolean>(false)
    // const { data, isLoading } = useQuery("vacations", () => 
    // vacationsFunctions.getAllVacations())

    useEffect(() => {
        
        if(!userRedux?.firstName){
            navigate(`/login`);
        } else {
            
            if (!filterSelected){
                vacationsFunctions.getAllVacationsLength().then(res => setVacationsLength(res))
                vacationsFunctions.getAllVacationsByPage(page).then(res => setVacations(res))
            } else if (filterSelected === "ByLike"){
                vacationsFunctions.getAllVacationsByLikeLength().then(res => setVacationsLength(res))
                vacationsFunctions.getAllVacationsByLikeByPage(page).then(res => setVacations(res))
                
            } else if (filterSelected === "ByNow"){
                vacationsFunctions.getAllVacationsByNowLength().then(res => setVacationsLength(res))
                vacationsFunctions.getAllVacationsByNow(page).then(res => setVacations(res))
                
            } else if (filterSelected === "ByNext"){
                vacationsFunctions.getAllVacationsByNextLength().then(res => setVacationsLength(res))
                vacationsFunctions.getAllVacationsByNext(page).then(res => setVacations(res))
                
            }
        }
            
    }, [filterSelected, page, refreshVacations, addVacation])

    return (
        <div className="Home">
      {/* <ToastContainer/> */}
        {userRedux ? 
      
                <strong className="Hello_User" >Hello {userRedux.firstName} {userRedux.lastName}</strong >
                : <></>}
            <div className="vacation_filters">
                <p>Filtered by:</p>
                <VacationsFilters setPage={setPage} setFilteredSelected={setFilterSelected} />
            </div>
            {userRedux?.role === "ADMIN" ?
            <div className="add_vacation_admin">
                <AddVacation addVacation={addVacation} setAddVacation={setAddVacation}/>
            </div>
            : <></>}
			<div className="home-vacations-container">
                <div className="vacations_container">
                    { vacations?.map(vacation => 
                    <VacationCard vacation={vacation} refreshVacations={refreshVacations} setRefreshVacation={setRefreshVacation} key={vacation.id} />
                        )}
                    {/* {isLoading? "Loading..." : data?.map(vacation => 
                    <VacationCard vacation={vacation} key={vacation.id} />
                        )} */}
                </div>
                

            {vacations ?
            <PaginationComponent setPage={setPage} page={page} vacationsLength={vacationsLength}/>
            : <></> }
            </div>
        </div>
    );
}

export default Home;
