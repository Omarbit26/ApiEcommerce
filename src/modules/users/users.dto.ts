import { ApiHideProperty, PickType } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches, Validate, isNotEmpty } from "class-validator"
import { MatchPassword } from "../../decorators/marchPassword.decorator"



export class CreateUserDto{

    /**
    *Must be a String of between 3 and 80 characters, Mandatory data
    *@example 'Test User01'
    */
    @IsString()
    @IsNotEmpty()
    @Length(3,80)
    name:string

    /**
    Must be an email valid
    @example 'testUser@gmail.com'
    */
    @IsEmail()
    email:string

    /**
    Must be a valid password of 8 to 15 characters with at least one lower case letter, one upper case letter, one number and one symbol.
    @example '1234aA#abc'
    */
    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
    password:string

    /**
    Must match the password. This field is mandatory
    @example '1234aA#abc'
    */
    @IsNotEmpty()
    @IsString()
    @Validate(MatchPassword,['password'])
    confirmPassword:string

    /**
    Must be a string of 3 and a maximum of 80 characters.
    @example 'Av. Dos de Mayo
    */
    @Length(3,80)
    address:string

    /**
    Must be a number in 9-digit string format.
    @example '987258443'
    */
    @IsNumberString()
    @IsNotEmpty()
    @Length(9, 9)
    phone: string;

    /**
    Must be a string of 4 to 20 characters.
    @example Peru
    */
    @Length(4,20)
    country:string

    /**
    Must be a string of 5 to 20 characters
    @example 'Bogota'
    */
    @Length(5,20)
    city:string


    @ApiHideProperty()
    @IsEmpty()
    isAdmin?:boolean
}

export class LoginUserDto extends PickType(CreateUserDto,[
    'email', 'password'
]){}


export class UpdateUserDto{

    /**
    *Must be a String of between 3 and 80 characters
    *@example 'Test Update'
    */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3,80)
    name?:string

    /**
    Must be an email valid
    @example 'testUpdate@gmail.com'
    */
    @IsOptional()
    @IsEmail()
    email?:string

    /**
    Must be a valid password of 8 to 15 characters with at least one lower case letter, one upper case letter, one number and one symbol.
    @example '1234aA#abc'
    */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
    password:string

    /**
    Must be a string of 3 and a maximum of 80 characters.
    @example 'AvUpdate'
    */
    @IsOptional()
    @Length(3,80)
    address?:string

    /**
    Must be a number in 9-digit string format.
    @example '999999999'
    */
    @IsOptional()
    @IsNumberString()
    @Length(9, 9)
    phone?: string;

    /**
    Must be a string of 4 to 20 characters.
    @example 'Uruguay'
    */
    @IsOptional()
    @IsString()
    @Length(4,20)
    country?:string

    /**
    Must be a string of 5 to 20 characters
    @example 'Arequipa'
    */
    @IsOptional()
    @IsString()
    @Length(3,50)
    city?:string
}