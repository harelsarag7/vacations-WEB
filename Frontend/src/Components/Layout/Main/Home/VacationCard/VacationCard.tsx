import "./VacationCard.scss";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LikeButton from "./LikeButton/LikeButton";
import { vacationModel } from "../../../../../Models/vacationModel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditButton from "./EditButton/EditButton";
import DeleteButton from "./DeleteButton/DeleteButton";

function VacationCard({vacation, refreshVacations, setRefreshVacation} : {vacation : vacationModel, refreshVacations : boolean, setRefreshVacation : (e: boolean) => void}): JSX.Element {
    const userRedux = useSelector((state: any) => state.auth)

const [startVacation, setStartVacation] = useState<string>();
const [endVacation, setEndVacation] = useState<string>();
const [imageSrc, setImageSrc] = useState<any>()
useEffect(() => {


    let cleanedStartDate = vacation.start.toString().split("T");
    setStartVacation(cleanedStartDate[0]); 

    let cleanedEndDate = vacation.end.toString().split("T");
    setEndVacation(cleanedEndDate[0]); 


    setImageSrc("https://vacations-harel.s3.amazonaws.com/" + vacation.imageName)

})


    return (
        <div className="VacationCard">
			<div className="vacation_destination_container">
                    {userRedux?.role == "ADMIN" ? 
                    // edit Button
                    <div className="vacation_admin_options">
                    <EditButton  refreshVacations={refreshVacations} setRefreshVacation={setRefreshVacation} vacation={vacation}/>
                    <DeleteButton vacation={vacation} refreshVacations={refreshVacations} setRefreshVacation={setRefreshVacation}/>
                    </div>
                    // delete button
                : <LikeButton vacation={vacation}/>}

                <img src={imageSrc} alt="" />
                {/* <img src={"https://vacations-harel.s3.amazonaws.com/" + vacation.imageName} alt="" /> */}
                <p className="vacation_destination">{vacation.destination}</p>
            <div className="vacation_date">
                <CalendarMonthIcon fontSize="small" />
                <span>{startVacation} - {endVacation}</span>
            </div>
            </div>
            <div className="vacation_description">
                <p>{vacation.description.substring(0, 150).concat('...')}
                </p>
                
                <div className="vacation_price">
                    <span>${vacation.price}</span>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
