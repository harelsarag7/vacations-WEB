import { UploadedFile } from "express-fileupload";
import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import { VacationModel } from "../4-models/VacationModel";
import { deleteImageFromS3, saveImagesToS3 } from "./aws-lgic";
import uniqid from 'uniqid';


export async function getVacationById(vacationId: number) {
    const query = "SELECT * FROM vacations.vacations WHERE id = ?; "
    const [rows] = await execute<VacationModel[]>(query, [vacationId]);
    return rows;
}

export async function getAllVacations(userId: number, vacationsPerPage: string, offset: string): Promise<VacationModel[]>{
    
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes', (select count(*)  from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes' ,  CONVERT_TZ(start, @@session.time_zone, '+08:00') AS 'start', CONVERT_TZ(end, @@session.time_zone, '+08:00') AS 'end' FROM vacations.vacations v ORDER BY start limit ? offset ? ;";
    const [rows] = await execute<VacationModel[]>(query, [userId, vacationsPerPage, offset]);
    
    return rows
}


export async function getAllVacationsLength(userId: number): Promise<VacationModel[]>{
    
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes', (select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes',  CONVERT_TZ(start, @@session.time_zone, '+08:00') AS 'start', CONVERT_TZ(end, @@session.time_zone, '+08:00') AS 'end' FROM vacations.vacations v ORDER BY start ;";
    const [rows] = await execute<VacationModel[]>(query, [userId]);
    return rows
}

export async function getAllVacationsByLike(userId: number, vacationsPerPage: string, offset: string): Promise<VacationModel[]>{
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes',	(select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes',  CONVERT_TZ(start, @@session.time_zone, '+08:00') AS 'start', CONVERT_TZ(end, @@session.time_zone, '+08:00') AS 'end' FROM vacations.vacations v WHERE (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) IS NOT NULL ORDER BY start  limit ? offset ?;";
    const [rows] = await execute<VacationModel[]>(query, [userId, userId, vacationsPerPage, offset]);
    return rows
}
export async function getAllVacationsByLikeLength(userId: number): Promise<VacationModel[]>{
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes',	(select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes' FROM vacations.vacations v WHERE (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) IS NOT NULL ORDER BY start;";
    const [rows] = await execute<VacationModel[]>(query, [userId, userId]);
    return rows
}

export async function getAllVacationsByNow(userId: number, vacationsPerPage: string, offset: string): Promise<VacationModel[]>{
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes', (select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes',  CONVERT_TZ(start, @@session.time_zone, '+08:00') AS 'start', CONVERT_TZ(end, @@session.time_zone, '+08:00') AS 'end' FROM vacations.vacations v WHERE start <= NOW() AND end >= NOW() ORDER BY start limit ? offset ?;";
    const [rows] = await execute<VacationModel[]>(query, [userId, vacationsPerPage, offset]);
    return rows
}

export async function getAllVacationsByNowLength(userId: number): Promise<VacationModel[]>{
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes', (select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes',  CONVERT_TZ(start, @@session.time_zone, '+08:00') AS 'start', CONVERT_TZ(end, @@session.time_zone, '+08:00') AS 'end' FROM vacations.vacations v WHERE start <= NOW() AND end >= NOW() ORDER BY start;";
    const [rows] = await execute<VacationModel[]>(query, [userId]);
    return rows
}



export async function getAllVacationsByNext(userId: number, vacationsPerPage: string, offset: string): Promise<VacationModel[]>{
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes', (select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes',  CONVERT_TZ(start, @@session.time_zone, '+08:00') AS 'start', CONVERT_TZ(end, @@session.time_zone, '+08:00') AS 'end' FROM vacations.vacations v WHERE start > NOW() ORDER BY start  limit ? offset ?;";
    const [rows] = await execute<VacationModel[]>(query, [userId, vacationsPerPage, offset]);
    return rows
}

export async function getAllVacationsByNextLength(userId: number): Promise<VacationModel[]>{
    const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes', (select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes',  CONVERT_TZ(start, @@session.time_zone, '+08:00') AS 'start', CONVERT_TZ(end, @@session.time_zone, '+08:00') AS 'end' FROM vacations.vacations v WHERE start > NOW() ORDER BY start;";
    const [rows] = await execute<VacationModel[]>(query, [userId]);
    return rows
}

export async function deleteVacation(vacationId: number): Promise<VacationModel[]>{
    
    const vacation: VacationModel[] = await getVacationById(vacationId);
    deleteImageFromS3(vacation[0].imageName) 
   
    const deleteLikesQuery = "DELETE FROM vacations.vacationslikes WHERE vacationId = ?";
    await execute(deleteLikesQuery, [vacationId]);

    const deleteVacationQuery = "DELETE FROM vacations.vacations WHERE id = ?";
    const [rows] = await execute<VacationModel[]>(deleteVacationQuery, [vacationId]);
    return rows
}

export async function addVacation(vacation: VacationModel, file: UploadedFile | UploadedFile[]): Promise<VacationModel[]>{
        const uniq = uniqid();
        const image = await saveImagesToS3(file, uniq)
    // const query = "SELECT *, (select vl.userId from vacationslikes vl where vl.userId = ? and vl.vacationId = v.id) as 'userLikes', (select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes' FROM vacations.vacations v ORDER BY start ;";
    const query = "INSERT INTO vacations.vacations(destination, description, start, end, price, imageName) VALUES(?,?, ?, ?, ?, ?);";
    const [rows] = await execute<VacationModel[]>(query, [vacation.destination, vacation.description, vacation.start, vacation.end, vacation.price, image]);
    vacation.description
    return rows
}


export async function editVacation(vacation : VacationModel, file: undefined | UploadedFile | UploadedFile[] ){
    if(!file){
        console.log(vacation);
        
        const query = "UPDATE vacations.vacations SET destination = ? , description = ?, start = ?, end = ?, price = ? WHERE id = ?"
        const [rows] = await execute<VacationModel[]>(query, [vacation.destination, vacation.description, vacation.start, vacation.end, vacation.price, +vacation.id]);
        return rows
        
    } else {
        console.log(file);
        // delete the last file
        deleteImageFromS3(vacation.imageName)
        const uniq = uniqid();
        const image = await saveImagesToS3(file, uniq)

        const query = "UPDATE vacations.vacations SET destination = ? , description = ?, start = ?, end = ?, price = ?, imageName = ? WHERE id = ?"
        const [rows] = await execute<VacationModel[]>(query, [vacation.destination, vacation.description, vacation.start, vacation.end, vacation.price, image, +vacation.id]);
        return rows   
    }
}

export async function getVacationsLikes(): Promise<VacationModel[]>{
    const query = "SELECT *, (select count(*) from vacationslikes vl where vl.vacationId = v.id) as 'totalLikes' FROM vacations.vacations v ;";
    const [rows] = await execute<VacationModel[]>(query);
    return rows
}


export async function unLike(vacationId: number, userId: number) {
    console.log(vacationId);
    console.log(userId);
    
    const query = `DELETE FROM vacations.vacationslikes WHERE vacationId = ? and userId = ?; `;
    const [results] = await execute<OkPacket>(query,[vacationId, userId ])

}

export async function Like(vacationId: number, userId: number) {
    console.log(vacationId);
    console.log(userId);
    
    const query = `INSERT INTO vacations.vacationslikes(vacationid, userid) VALUES(?,?);`;
    const [results] = await execute<OkPacket>(query,[vacationId, userId ])
    // console.log(results);

}


