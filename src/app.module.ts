import { Module } from '@nestjs/common';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import environment from './config/environment';
import { SessionModule } from 'nestjs-session';
import { FlagService } from './services/flag/flag.service';

@Module({
  imports: [
    DashboardModule,
    SessionModule.forRoot({
      session: { secret: 'pokemon-é-melhor-que-digimon' },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      load: [environment],
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [FlagService],
})
export class AppModule {}
