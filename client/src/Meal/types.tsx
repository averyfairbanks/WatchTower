export interface UserMeal {
  id: number;
  userId: number;
  name: string;
  photoUrl: URL;
  description: string;
  timeLogged: string;
  notified: boolean;
}

export interface CreateMealDto {
  userId: string;
  name: string;
  description: string;
  photoUrl: string;
}