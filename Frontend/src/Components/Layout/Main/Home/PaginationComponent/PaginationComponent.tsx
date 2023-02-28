import "./PaginationComponent.css";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from "@mui/material/Pagination/Pagination";
import { vacationModel } from "../../../../../Models/vacationModel";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationComponent({setPage,vacationsLength, page}: {setPage:(e: number) => void, vacationsLength: vacationModel[] | undefined, page: number}) {
  const classes = useStyles();
  
  const handleChange = (event : any, value: any) => {
    setPage(value);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  return (
    <div className={classes.root}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination count={Math.ceil(Number(vacationsLength?.length) / 10 )}  page={page} onChange={handleChange} />
    </div>
  );
}
