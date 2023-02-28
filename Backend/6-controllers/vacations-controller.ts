import express from 'express';
import { UploadedFile } from 'express-fileupload';
import * as path from 'path';
import { verifyUser } from '../3-middleware/verifyUser';
// import { CardModel, productValidation } from '../4-models/VacationModel';
import { ResourceNotFoundError } from '../4-models/ResourceNotFoundError';
import { UserRole } from '../4-models/UserModel';
import { addVacation, deleteVacation, editVacation, getAllVacations, getAllVacationsByLike, getAllVacationsByLikeLength, getAllVacationsByNext, getAllVacationsByNextLength, getAllVacationsByNow, getAllVacationsByNowLength, getAllVacationsLength, getVacationsLikes, Like, unLike } from '../5-logic/vacations-logic';
import fs from 'fs'
import { decode } from 'jsonwebtoken';

export const vacationsRouter = express.Router();

vacationsRouter.get('/vacationsByPage/:pageNumber', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {

    const pageNumber = req.params.pageNumber

    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);
    
    let vacationsPerPage: number = 10;
    // let pageNumber: number = 1
    let offset: number = (Number(pageNumber) - 1) * vacationsPerPage;
    
    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacations(+sub, vacationsPerPage.toString(), offset.toString());
        
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});

vacationsRouter.get('/vacations/length', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {

    // const pageNumber = req.params.pageNumber
    // console.log(pageNumber);

    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);
    
    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacationsLength(+sub);
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});


vacationsRouter.get('/vacationsByPage/bylike/:pageNumber', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {
    const pageNumber = req.params.pageNumber
    
    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);

        
    let vacationsPerPage: number = 10;
    // let pageNumber: number = 1
    let offset: number = (Number(pageNumber) - 1) * vacationsPerPage;

    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacationsByLike(+sub, vacationsPerPage.toString(), offset.toString());
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});


vacationsRouter.get('/vacations/bylike/length', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {
    
    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);

    
    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacationsByLikeLength(+sub);
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});



vacationsRouter.get('/vacationsByPage/bynow/:pageNumber', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {
    const pageNumber = req.params.pageNumber

    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);

            
    let vacationsPerPage: number = 10;
    // let pageNumber: number = 1
    let offset: number = (Number(pageNumber) - 1) * vacationsPerPage;

    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacationsByNow(+sub, vacationsPerPage.toString(), offset.toString());
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});

vacationsRouter.get('/vacations/bynow/length', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {
    
    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);

    
    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacationsByNowLength(+sub);
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});

vacationsRouter.get('/vacationsByPage/bynext/:pageNumber', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {
    const pageNumber = req.params.pageNumber
    
    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);

    let vacationsPerPage: number = 10;
    // let pageNumber: number = 1
    let offset: number = (Number(pageNumber) - 1) * vacationsPerPage;

    
    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacationsByNext(+sub, vacationsPerPage.toString(), offset.toString());

        res.json(vacations);
    } catch (e) {
        next(e);
    }
});
vacationsRouter.get('/vacations/bynext/length', verifyUser([UserRole.Admin, UserRole.User]), async (req, res, next) => {
    
    const authHeader = req.headers.authentication;
    let token = "";
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);

    
    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getAllVacationsByNextLength(+sub);
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});


vacationsRouter.delete('/vacations/unLike/:vacationId', verifyUser([UserRole.Admin, UserRole.User]), async (req, res) => {
    const { vacationId } = req.params;
    console.log(req.params);
    
    const authHeader = req.headers.authentication;
    let token = "";
    
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);
    
    await unLike(Number(vacationId), +sub);
    res.sendStatus(204);
});

vacationsRouter.post('/vacations/like/:vacationId', verifyUser([UserRole.Admin, UserRole.User]), async (req, res) => {
    const { vacationId } = req.params;
    console.log(req.params);
    
    const authHeader = req.headers.authentication;
    let token = "";
    
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);
    
    await Like(Number(vacationId), +sub);
    res.sendStatus(204);
});



vacationsRouter.delete('/vacations/delete/:vacationId', verifyUser([UserRole.Admin]), async (req, res) => {
    const { vacationId } = req.params;
    console.log(req.params);
    
    await deleteVacation(Number(vacationId));
    res.sendStatus(204);
});




vacationsRouter.post('/vacations/add', verifyUser([UserRole.Admin]), async (req, res) => {
    const vacation = req.body;

    if(!vacation.destination || !vacation.description || !vacation.start || !vacation.end || !vacation.price || !req.files['image']){
        res.status(400).json("One of the fields is missing")
    }
    
    if(vacation.price < 0 || vacation.price > 10000){
        res.status(400).json("Price is invalid")
    }

    if(vacation.end < vacation.start){
        res.status(400).json("End date cannot be lower than start date")
    }
    
    const currentDate = new Date();
    if (vacation.start < currentDate.setHours(0, 0, 0, 0) || vacation.end < currentDate.setHours(0, 0, 0, 0)) {
        res.status(400).json("It is not allowed to select past dates");
      }
    
    let file: UploadedFile | UploadedFile[]  = req.files['image']
    
    const authHeader = req.headers.authentication;
    let token = "";
    
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);
    
    await addVacation(vacation, file)
    res.sendStatus(204);
});

vacationsRouter.put('/vacations/edit', verifyUser([UserRole.Admin]), async (req, res) => {
    const vacation = req.body;
    if(!vacation.destination || !vacation.description || !vacation.start || !vacation.end || !vacation.price){
        res.status(400).json("One of the fields is missing")
    }
    if(vacation.price < 0 || vacation.price > 10000){
        res.status(400).json("Price is invalid")
    }
    if(vacation.end < vacation.start){
        res.status(400).json("End date cannot be lower than start date")
    }



    let file: any;
    if(req.files){
        file =  req.files['image']
    } 

    
    const authHeader = req.headers.authentication;
    let token = "";
    
    if (typeof authHeader === "string") {
        token = authHeader.substring(7);
    }
    const { sub } = decode(token);
    
    await editVacation(vacation, file)
    res.sendStatus(204);
});



vacationsRouter.get('/vacations/vacationsAdminLikes', verifyUser([UserRole.Admin]), async (req, res, next) => {
    
    // const authHeader = req.headers.authentication;
    // let token = "";
    // if (typeof authHeader === "string") {
    //     token = authHeader.substring(7);
    // }
    // const { sub } = decode(token);

    
    // getting userId to validate thats only a member can get the vacations
    try {
        const vacations = await getVacationsLikes();
        res.json(vacations);
    } catch (e) {
        next(e);
    }
});






