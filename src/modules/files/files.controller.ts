import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('files')
@Controller('files')
export class FilesController {

    constructor(
        private readonly filesService: FilesService
    ){}

    @ApiBearerAuth()
    @Post('/uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@Param('id',ParseUUIDPipe) id:string, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp|gif|svg)/,
            }),
                new MaxFileSizeValidator({
                maxSize: 100000,
                message: 'Archivo menor a 100kb',
                })
            ]
        })
    )file: Express.Multer.File){
        return  this.filesService.uploadImage(file,id)
    }

}
