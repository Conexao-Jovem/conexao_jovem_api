import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { ScalesModule } from './scales/scales.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { MinisterysModule } from './ministerys/ministerys.module';
import { initializeFirebase } from './config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScalesModule,
    EventsModule,
    UsersModule,
    MinisterysModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'FIRESTORE',
      useFactory: (configService: ConfigService) =>
        initializeFirebase(configService),
      inject: [ConfigService],
    },
  ],
  exports: ['FIRESTORE'],
})
export class AppModule {}
