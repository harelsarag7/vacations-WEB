export interface vacationModel {
    id?: number;
    destination: string;
    description: string;
    // userId?: string;
    totalLikes: number;
    userLikes?: number;
    start: Date;
    end: Date;
    price: number;
    image?: any;
    imageName?: string;
}