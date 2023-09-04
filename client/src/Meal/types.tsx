export interface UserMeal {
    id: number;
    userId: number;
    name: string;
    photoUrl: URL;
    description: string;
    timeLogged: Date;
    notified: boolean;
}
