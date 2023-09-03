export interface Meal {
    id: number;
    name: string;
    photoUrl: URL;
    description: string;
    timeLogged: Date;
    notified: boolean;
}
