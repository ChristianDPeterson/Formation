export class CreateUserDto {
	name: string;
	username: string;
	email: string;
	password: string;
	refresh_token?: string;
}
