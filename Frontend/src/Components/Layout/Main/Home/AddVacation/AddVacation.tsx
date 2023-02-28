import "./AddVacation.scss";
import Chip from '@mui/material/Chip';
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button } from "@mui/material";
import {Modal, ModalDialog, Stack, Textarea, Typography} from "@mui/joy"
import { useForm } from "react-hook-form";
import { vacationModel } from "../../../../../Models/vacationModel";
import { vacationsFunctions } from "../../../../../Services/vacations";
import initialUpload from "../AddVacation/initial_upload.png"
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";

function AddVacation({addVacation, setAddVacation} : {addVacation: boolean, setAddVacation : (e: boolean) => void}): JSX.Element {
    const [open, setOpen] = useState(false);
    // const { register, reset, formState: { errors }, handleSubmit} = useForm< vacationModel >();
    const { register,reset, handleSubmit, formState: { errors } } = useForm< vacationModel>();

    const [todayDate, setTodayDate] = useState<string>("")
    const [uploadText, setUploadText] = useState<string>("Select image")
    const [upload, setUpload] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    
    const today = new Date().toISOString().substr(0, 10);
    const [disableDate, setDisableDate] = useState(today)
    
    const AddVacationSuuccessToast = () => toast.success("Added successfully ", {
      position: toast.POSITION.TOP_CENTER
    });


    function AddVacationClicked(vacation: vacationModel){
        console.log(vacation);
        setLoading(true)
        console.log(vacation.image[0]);
        
        vacation.image = vacation.image[0]
        vacationsFunctions.createVacation(vacation).then(() => {
          
          AddVacationSuuccessToast();
          setOpen(false)
          setAddVacation(!addVacation)
          setLoading(false)
          reset()
          
        })

    }



    function uploadedFile(e : React.ChangeEvent<HTMLInputElement>){
                setUploadText("Change image")
                if(e.target.files && e.target.files.length > 0){
                    let img = URL.createObjectURL(e.target.files[0] );
                    setUpload(img)
                }

                
    }

    function CancelFunction() {
      setOpen(false);
      reset()
    }

    useEffect(() => {
        let now = new Date().toISOString()
        console.log(now);

        let cleanedTodayDate = now.toString().split("T");
        setTodayDate(cleanedTodayDate[0]); 
        console.log(upload);
        
    }, [upload])


    const [drag, setDrag] = useState<boolean>(false)
function dragFile() {
  setDrag(true)
}
function ExitDragFile() {
  setDrag(false)
}


    return (
        <div className="AddVacation">
            <Box>
                <Chip
                className="AddVacationButton"
                variant="outlined"
                size="small"
                  onClick={() => {
                    setUploadText("Select image")
                    setUpload(null)
                    setOpen(true)}
                  } 
                  
                icon={<AddIcon />}
                label={"Add Vacation"}
                
                />
             </Box>


             <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          id=""
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            // background:"dark"
          }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Add Vacation
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Fill vacation's details.
          </Typography>

          <form onSubmit={ handleSubmit(AddVacationClicked)}>
            <Stack spacing={2}>
              <TextField  required label="Destination"  autoFocus {...register("destination")}/>
              {/* <div className="errors_div">
                {errors.destination && errors.destination.type === "required" && (<span role="alert">Destination is required</span>)}
              </div> */}

              <Textarea required {...register("description")} placeholder="Description…" minRows={2} maxRows={3}/>
              {/* <TextField  label="Description"  {...register("description")} /> */}
              <TextField  inputProps={{ min: today }} required defaultValue={todayDate} label="Start on"  type={"date"} {...register("start")}  onChange={(e : any) => setDisableDate(e.target.value)} />
              <TextField inputProps={{ min: disableDate }} required defaultValue={todayDate} label="End on"  type={"date"}  {...register("end")} />
              <TextField inputProps={{ min: 0, max: 10000 }} type={"number"}  required label="price" {...register("price")} />
              {/* <div className="image_upload_container"> */}
                <label id="cover_image" htmlFor="">Cover image</label>
              <div className={drag? "image_upload_container_drag" : "image_upload_container" } onDragEnter={dragFile} onDragLeave={ExitDragFile} onDrop={ExitDragFile} >
                <div>
                <input id={"upload_input"} required onInput={(e: React.ChangeEvent<HTMLInputElement>) => {uploadedFile(e)}} 
                type="file"  {...register("image")}  />
                </div>
            <img className="uploaded_image" src={upload ?? initialUpload} alt="" />
                <p id="select_image">{uploadText}</p>
              </div>
              <Button className="submit_button_add" type="submit" variant="contained">Add</Button>
              {loading? 
              <Box sx={{ width: '100%' }}>
                <LinearProgress/>
              </Box>
              : <></>}
              <Button className="cancel_button_add" variant="contained" onClick={CancelFunction}>Cancel</Button>
            </Stack>
          </form>
        </ModalDialog>

      </Modal>
        </div>
    );
}

export default AddVacation;

