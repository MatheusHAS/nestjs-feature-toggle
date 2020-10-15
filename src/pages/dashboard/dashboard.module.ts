import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlagService } from '../../services/flag/flag.service';
import { UserswitchMiddleware } from '../../middlewares/userswitch.middleware';
import { DashboardController } from './dashboard.controller';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [FlagService]
})
export class DashboardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    ExpressSessionMiddleware.configure({secret: 'pamonha fresquinha'});
    consumer.apply(UserswitchMiddleware).forRoutes('dashboard');
  }
}
