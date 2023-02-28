import * as React from 'react';
import "./VacationsFilters.scss";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import TimerIcon from '@mui/icons-material/Timer';
import { useSelector } from 'react-redux';

interface VacationsFiltersProps {
  setFilteredSelected: (value: string | undefined) => void;
  setPage: (value: number) => void;
}

export default function VacationsFilters({ setFilteredSelected, setPage }: VacationsFiltersProps): JSX.Element {
  const [filters, setFilters] = useState({
    byLike: false,
    byNow: false,
    byNext: false,
  });
  const userRedux = useSelector((state: any) => state.auth);

  const selectFilter = (filter: string) => {
    setFilters({
      byLike: filter === "ByLike",
      byNow: filter === "ByNow",
      byNext: filter === "ByNext",
    });
    setFilteredSelected(filter);
    setPage(1);
  };

  const deleteFilter = (filter: string) => {
    setFilters({
      byLike: filters.byLike && filter !== "ByLike",
      byNow: filters.byNow && filter !== "ByNow",
      byNext: filters.byNext && filter !== "ByNext",
    });
    setFilteredSelected(
      (filters.byLike && filter === "ByLike") ||
        (filters.byNow && filter === "ByNow") ||
        (filters.byNext && filter === "ByNext")
        ? undefined
        : filter
    );
    setPage(1);
  };

  return (
    <Stack direction="row" spacing={2}>
      {userRedux?.role === "USER" && (
        <>
          {filters.byLike ? (
            <Chip
              color="success"
              label="Liked"
              icon={<FavoriteIcon />}
              onDelete={() => deleteFilter("ByLike")}
              onClick={() => deleteFilter("ByLike")}
            />
          ) : (
            <Chip
              label="Liked"
              icon={<FavoriteIcon />}
              variant="outlined"
              onClick={() => selectFilter("ByLike")}
            />
          )}
        </>
      )}

      {filters.byNow ? (
        <Chip
          label="Active"
          color="success"
          icon={<TimerIcon />}
          onDelete={() => deleteFilter("ByNow")}
          onClick={() => deleteFilter("ByNow")}
        />
      ) : (
        <Chip
          label="Active"
          variant="outlined"
          icon={<TimerIcon />}
          onClick={() => selectFilter("ByNow")}
        />
      )}

      {filters.byNext ? (
        <Chip
          label="Coming"
          color="success"
          icon={<NextPlanIcon />}
          onDelete={() => deleteFilter("ByNext")}
          onClick={() => deleteFilter("ByNext")}
        />
      ) : (
        <Chip
          label="Coming"
          variant="outlined"
          icon={<NextPlanIcon />}
          onClick={() => selectFilter("ByNext")}
        />
      )}
    </Stack>
  );
}



// import * as React from 'react';
// import "./VacationsFilters.scss";
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import { useState } from 'react';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import NextPlanIcon from '@mui/icons-material/NextPlan';
// import TimerIcon from '@mui/icons-material/Timer';
// import { useSelector } from 'react-redux';


// // export default function VacationsFilters( {filterSelected, setFilteredSelected}: {filterSelected : any , setFilterSelected : () => void }): JSX.Element {
// export default function VacationsFilters( {setFilteredSelected, setPage}: {setFilteredSelected : (e: string | undefined) => void,setPage:(e: number) => void }): JSX.Element {
// // export default function VacationsFilters(set : {setFilteredSelected : any}): JSX.Element {
//     // const [filterSelected, setFilteredSelected] = useState<string | undefined>(undefined)
//     const [byLike, setByLike] = useState<boolean>(false)
//     const [byNow, setByNow] = useState<boolean>(false)
//     const [byNext, setByNext] = useState<boolean>(false)
//     const userRedux = useSelector((state: any) => state.auth)

//   function selectByLiked(){
//     setByNow(false);
//     setByNext(false);
//     setByLike(!byLike)
//     setFilteredSelected("ByLike")
//     setPage(1)
//   }
//   function selectByNow(){
//     setByNow(!byNow);
//     setByNext(false);
//     setByLike(false)
//     setFilteredSelected("ByNow")
//     setPage(1)

//   }
//   function selectByNext(){
//     setByNow(false);
//     setByNext(!byNext);
//     setByLike(false)
//     setFilteredSelected("ByNext")
//     setPage(1)
//   }
  
//   function deleteByLiked(){
//     setByLike(false)
//     setFilteredSelected(undefined)
//     setPage(1)
//   }

// function deleteByNow(){
//     setByNow(false)
//     setFilteredSelected(undefined)
//     setPage(1)
//   }

// function deleteByNext(){
//     setByNext(false)
//     setFilteredSelected(undefined)
//     setPage(1)
//   }


//   return (
//     <Stack direction="row" spacing={2}>
//         {byLike && userRedux.role === "USER" ? 
//       <Chip
//       color="success"
//       label="Liked"
//       icon={<FavoriteIcon />}
//       onDelete={deleteByLiked}
//       onClick={deleteByLiked}
//       />
//       : userRedux.role === "USER"  ?  <Chip
//       label="Liked"
//       icon={<FavoriteIcon />}
//       variant="outlined"
//       //   disabled={filterSelected? true : false}
//       onClick={selectByLiked}
//       /> 
//     : <></>
//   }


//     {byNow? 
//       <Chip
//       label="Active"
//       color="success"
//       icon={<TimerIcon />}
//       onDelete={deleteByNow}
//       onClick={deleteByNow}
//       />
//     :
//     <Chip
//     label="Active"
//     variant="outlined"
//     icon={<TimerIcon />}
//     onClick={selectByNow}
//     // disabled={filterSelected? true : false}
//     />}

//     {byNext ?
//       <Chip
//       label="Coming"
//       color="success"
//       icon={<NextPlanIcon />}
//       onDelete={deleteByNext}
//       onClick={deleteByNext}
//       />
//       : 
//       <Chip
//       label="Coming"
//       variant="outlined"
//       icon={<NextPlanIcon />}
//       onClick={selectByNext}
//     //   disabled={filterSelected? true : false}
//       />
//     }
//     </Stack>
//   );
// }