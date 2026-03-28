import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
    @Get()
    getHello() {
        return "DevVerse API running";
    }
}
