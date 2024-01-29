import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';


@Module({
  imports: [AuthModule, ConfigModule.forRoot(),MailerModule.forRoot({
    transport: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'roslyn.schamberger@ethereal.email',
          pass: 'DVfb5WdpVvspqvcpU5'
      }
    },
    defaults: {
      from: '"Teste" <roslyn.schamberger@ethereal.email>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
