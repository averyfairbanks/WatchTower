export interface Meal {
    id: number;
    name: string;
    photoUri: URL;
    description: string;
    timeLogged: Date;
    notified: boolean;
}
