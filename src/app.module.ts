// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { TasksModule } from './tasks/tasks.module';

// @Module({
//   imports: [
//     TasksModule,
//     MongooseModule.forRoot(
//       'mongodb+srv://alexborlido:4DoLKGkdmix3emyU@cluster-alex.8xpkbyg.mongodb.net/',
//     ),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importez ConfigModule et ConfigService
import config from '../config'; // Importez votre fichier de configuration

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // Injectez ConfigService pour accéder à la configuration
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'), // Accédez à la configuration de la base de données
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Assurez-vous que ConfigModule est global pour l'ensemble de l'application
      load: [config], // Chargez votre fichier de configuration
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
