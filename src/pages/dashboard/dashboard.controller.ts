import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { FlagService } from '../../services/flag/flag.service';
import flags from '../../config/flags';

const imageTo = {
  admin: 'https://www.bayerjovens.com.br/html/images/fique-ligado/ana-maria-8.jpg',
  alpha: 'https://media1.tenor.com/images/e70a3e0fdbbb7063b79c762c31ca7977/tenor.gif?itemid=12781958',
  default: null,
}

@Controller('dashboard')
export class DashboardController {
  constructor(public configService: ConfigService, public flagService: FlagService) {}
  
  @Get()
  async Homepage(@Req() req: any, @Res() res: Response) {
    const { user, sessionID } = req;
    user.sessionId = sessionID;

    const showUserImage = await this.flagService.isEnabled(flags.showUserImage, user);
    const showSuperMachineBanner = await this.flagService.isEnabled(flags.showSuperMachineBanner, user);

    const pageData = {
      user,
      image: showUserImage ? imageTo[user.type] : null,
      flags: {
        showUserImage,
        showSuperMachineBanner,
      }
    };


    return res.render(
      'index', 
      {...pageData}
    );
  }
}
