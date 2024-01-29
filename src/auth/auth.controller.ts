import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController{

    constructor(
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ){}

    @Post('login')
    async login(@Body() {email, password} : AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body : AuthRegisterDTO){
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email} : AuthForgetDTO){
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() {password, token} : AuthResetDTO){
        return this.authService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('id') user){
        return {user: user}
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('photo'))
    @Post('photo')
    async uploadPhoto(@User('id') user, @UploadedFile(new ParseFilePipe({validators: [ new FileTypeValidator({fileType: 'image/*'}), new MaxFileSizeValidator({maxSize: 62143})]})) photo: Express.Multer.File){
        const path = join(__dirname,'..', '..', 'storage', 'photos', 'teste.png')
        return this.fileService.upload(photo, path)
    }


    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    @Post('files')
    async uploadFiles(@User('id') user, @UploadedFiles() files: Express.Multer.File)
    {
        return files
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    },{
        name:'documents',
        maxCount: 10
    }]))
    @Post('filesFields')
    async uploadFilesFields(@User('id') user, @UploadedFiles() files: { photo:  Express.Multer.File, documents: Express.Multer.File[]})
    {
        return files
    }

}