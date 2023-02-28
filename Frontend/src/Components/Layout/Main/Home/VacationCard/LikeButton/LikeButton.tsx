import "./LikeButton.scss";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip';
import Box from "@mui/material/Box";
import { useState } from "react";
import { vacationModel } from "../../../../../../Models/vacationModel";
import { vacationsFunctions } from "../../../../../../Services/vacations";

function LikeButton( {vacation}: {vacation : vacationModel}): JSX.Element {
    const [label, setLabel] = useState("Like "  + vacation.totalLikes)
    const [liked, setLiked] = useState(vacation.userLikes == null)

    function clickedOnLike(){
        if(liked){
            // function to remove like to this vacation
            vacationsFunctions.Like(Number(vacation.id))
            // setLabel("Like "  + (vacation.totalLikes + 1))
            if(vacation.userLikes !== null){
                setLabel("Like "  + (vacation.totalLikes ))
            } else {
                setLabel("Like "  + (vacation.totalLikes+ 1 ))
            }
        } else {
            // function to add like to this vacation
            vacationsFunctions.unLike(Number(vacation.id))
            if(vacation.userLikes !== null){
                setLabel("Like "  + (vacation.totalLikes - 1))
            } else {
                setLabel("Like "  + (vacation.totalLikes ))
            }
        }
        setLiked(!liked);
    }


    return (
        <div className="LikeButton">
            <Box>
                {liked?
                <Chip
                className="likeButton"
                variant="outlined"
                size="small"
                  onClick={clickedOnLike}
                icon={<FavoriteIcon />}
                label={label}
                
                />
                : 
                <Chip
                className="liked likeButton"
                variant="outlined"
                size="small"
                onClick={clickedOnLike}
                icon={<FavoriteIcon />}
                label={label}
                
                />
            }
             </Box>
        </div>
    );
}

export default LikeButton;
