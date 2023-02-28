import "./DeleteButton.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
// import Box from "@mui/material/Box";
import { useState } from "react";
import { vacationModel } from "../../../../../../Models/vacationModel";
import { vacationsFunctions } from "../../../../../../Services/vacations";

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';


function DeleteButton( {vacation, refreshVacations, setRefreshVacation}: {vacation : vacationModel, refreshVacations : boolean, setRefreshVacation : (e : boolean) => void}): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    function clickOnDelete(){
        setOpen(false);
        vacationsFunctions.deleteVacation(Number(vacation.id))
        setRefreshVacation(!refreshVacations)
        // push toastify

    }


    return (
        <div className="DeleteButton">
            <Box>
                <Chip
                className="DeleteButton"
                variant="outlined"
                size="small"
                  onClick={() => setOpen(true)}
                icon={<DeleteIcon />}
                label={"Delete"}
                
                />
             </Box>
             <React.Fragment>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            Are you sure you want to delete this vacation?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={clickOnDelete}>
              Discard notes
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
        </div>
    );
}

export default DeleteButton;
