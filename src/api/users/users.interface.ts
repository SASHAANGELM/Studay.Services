export interface CreateUserDto {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface UpdateUserDto {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}