import "./EditButton.scss";
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from "react";
import { vacationModel } from "../../../../../../Models/vacationModel";
// import { vacationsFunctions } from "../../../../../../Services/vacations";


import { TextField, Button } from "@mui/material";
import {Modal, ModalDialog, Stack, Textarea, Typography} from "@mui/joy"
import { useForm } from "react-hook-form";
import { vacationsFunctions } from "../../../../../../Services/vacations";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";

function EditButton( {vacation, refreshVacations, setRefreshVacation}: {vacation : vacationModel, refreshVacations : boolean, setRefreshVacation : (e : boolean) => void}): JSX.Element {
    const [open, setOpen] = useState(false);
    const { register,reset , handleSubmit} = useForm< vacationModel >();

    const [startVacation, setStartVacation] = useState<string>();
    const [endVacation, setEndVacation] = useState<string>();
    const [upload, setUpload] = useState<any>()
    const [uploadText, setUploadText] = useState<string>("Select image")
    const [loading, setLoading] = useState<boolean>(false)

    const [disableDate, setDisableDate] = useState(vacation.start.toString().split("T")[0])
        
    const EditVacationSuuccessToast = () => toast.success("Edited successfully ", {
      position: toast.POSITION.TOP_CENTER
    });


    function EditVacationFunction( editedVacation : vacationModel){
      
        editedVacation.id = vacation.id;
        editedVacation.image = editedVacation.image[0]
        console.log(editedVacation.image);

        setLoading(true)
        
        vacationsFunctions.EditVacation(editedVacation).then(() => {
          EditVacationSuuccessToast();
          setOpen(false)
          setRefreshVacation(!refreshVacations)
          setLoading(false)
        });
        

        // push toastify
    }
    
    useEffect(() => {
        let cleanedStartDate = vacation.start.toString().split("T");
        setStartVacation(cleanedStartDate[0]); 
        
        let cleanedEndDate = vacation.end.toString().split("T");
        setEndVacation(cleanedEndDate[0]); 
      
      })


      function CancelFunction() {
        setOpen(false);
        reset()
      }
    
    function uploadedFile(e : React.ChangeEvent<HTMLInputElement>){
      setUploadText("Change image")
      if(e.target.files && e.target.files.length > 0){
          let img = URL.createObjectURL(e.target.files[0] );
          setUpload(img)
      }      
}
const [drag, setDrag] = useState<boolean>(false)
function dragFile() {
  setDrag(true)
}
function ExitDragFile() {
  setDrag(false)
}


    return (
        <div className="EditButton">
            <Box>
                <Chip
                className="EditButton"
                variant="outlined"
                size="small"
                  onClick={() => setOpen(true)}
                icon={<EditIcon />}
                label={"Edit"}
                
                />
             </Box>

        {/* <Button className="EditButton" variant="outlined" size="small" color="primary"  onClick={() => {
      setOpen(true)
       // setWrong("")
       }} > <EditIcon/>  <p> Edit</p></Button> */}

             <Modal open={open} onClose={() => {
                setUpload(null)
               setOpen(false)}
             }>
        <ModalDialog
          
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
            Edit Box
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Edit your card details.
          </Typography>

          <form onSubmit={ handleSubmit(EditVacationFunction)}>
            <Stack spacing={2}>
              <TextField  defaultValue={vacation.destination} label="Destination" autoFocus required {...register("destination")}/>
              <Textarea required defaultValue={vacation.description} {...register("description")} placeholder="Description…" minRows={2} maxRows={3}/>
              {/* <TextField  defaultValue={vacation.description} label="Description" required  {...register("description")} /> */}
              <TextField   defaultValue={startVacation} label="Start on" type={"date"}  required {...register("start")} onChange={(e : any) => setDisableDate(e.target.value)} />
              <TextField inputProps={{ min: disableDate }} defaultValue={endVacation}  label="End on" type={"date"} required {...register("end")} />
              {/* DatePicker */}
              <TextField inputProps={{ min: 0, max: 10000 }}  label="price" type={"number"} defaultValue={vacation.price}  required {...register("price")} />

                <label id="cover_image" htmlFor="">Cover image</label>
              <div className={drag? "image_upload_container_drag" : "image_upload_container" } onDragEnter={dragFile} onDragLeave={ExitDragFile} onDrop={ExitDragFile} >
                <div>
                <input id={"upload_input"} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {uploadedFile(e)}} 
                type="file"  {...register("image")}  />
                </div>
            <img className="uploaded_image" src={upload ?? "https://vacations-harel.s3.amazonaws.com/" + vacation.imageName} alt="" />
                <p id="select_image">{uploadText}</p>
              </div>
                <Button type="submit" variant="contained"> Update </Button>
              
              {loading? 
              <Box sx={{ width: '100%' }}>
                <LinearProgress/>
              </Box>
              : <></>}
              <Button variant="contained" className="cancel_button_edit" onClick={CancelFunction}>Cancel</Button>
            </Stack>
            {/* <Typography
            id="wrong-password-username"
            mt={0.5}
            mb={2}
          >
            {wrong}
          </Typography> */}


          </form>
        </ModalDialog>
      </Modal>
        </div>
    );
}

export default EditButton;

