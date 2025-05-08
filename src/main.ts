import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //////////
  // await app.listen(process.env.PORT ?? 3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);

  const port = process.env.PORT ?? 3000;
  const host = 'localhost'; // explicitly set to localhost

  await app.listen(port, host);
  console.log(`Application is running on: http://${host}:${port}/api/v1`);
}
bootstrap();

/** My nestjs project terminal commands for creating and updating of my files and folders and structuring my project folders and files properly */

// added 3 packages, and audited 861 packages in 9s

// 161 packages are looking for funding
//   run `npm fund` for details

// found 0 vulnerabilities

// added 6 packages, and audited 867 packages in 16s

// 161 packages are looking for funding
//   run `npm fund` for details

// found 0 vulnerabilities

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $
//  *  History restored

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCH

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g module ./common/pagination
// CREATE src/common/pagination/pagination.module.ts (91 bytes)
// UPDATE src/app.module.ts (4833 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g service ./common/pagination
// CREATE src/common/pagination/pagination.service.ts (98 bytes)
// CREATE src/common/pagination/pagination.service.spec.ts (506 bytes)
// UPDATE src/common/pagination/pagination.module.ts (183 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nestrsonal-project-59-nestjs-restful-api (main)
// $ npx nest g controller ./common/pagination
// CREATE src/common/pagination/pagination.controller.ts (113 bytes)
// rsonal-project-59-nestjs-restful-api (main)
// $ npx nest g controller ./common/pagination
// CREATE src/common/pagination/pagination.controller.ts (113 bytes)
// rsonal-project-59-nestjs-restful-api (main)
// $ npx nest g controller ./common/pagination
// CREATE src/common/pagination/pagination.controller.ts (113 bytes)
// CREATE src/common/pagination/pagination.controllrsonal-project-59-nestjs-restful-api (main)
// $ npx nest g controller ./common/pagination
// CREATE src/common/pagination/pagination.controller.ts (113 bytes)
// CREATE src/common/pagination/pagination.controller.spec.ts (538 bytes)
// UPDATE src/common/pagination/pagination.module.ts (286 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g module ./auth/provider/hashing
// CREATE src/auth/provider/hashing/hashing.module.ts (88 bytes)
// UPDATE src/auth/auth.module.ts (728 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g module ./auth/provider/bcrypt
// CREATE src/auth/provider/bcrypt/bcrypt.module.ts (87 bytes)
// UPDATE src/auth/auth.module.ts (810 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g controller ./auth/provider/hashing
// CREATE src/auth/provider/hashing/hashing.controller.ts (107 bytes)
// CREATE src/auth/provider/hashing/hashing.controller.spec.ts (517 bytes)
// UPDATE src/auth/provider/hashing/hashing.module.ts (182 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g controller ./auth/provider/bcrypt
// CREATE src/auth/provider/bcrypt/bcrypt.controller.ts (105 bytes)
// CREATE src/auth/provider/bcrypt/bcrypt.controller.spec.ts (510 bytes)
// UPDATE src/auth/provider/bcrypt/bcrypt.module.ts (178 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g service ./auth/provider/hashing
// CREATE src/auth/provider/hashing/hashing.service.ts (95 bytes)
// CREATE src/auth/provider/hashing/hashing.service.spec.ts (485 bytes)
// UPDATE src/auth/provider/hashing/hashing.module.ts (265 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
// $ npx nest g service ./auth/provider/bcrypt
// CREATE src/auth/provider/bcrypt/bcrypt.service.ts (94 bytes)
// CREATE src/auth/provider/bcrypt/bcrypt.service.spec.ts (478 bytes)
// UPDATE src/auth/provider/bcrypt/bcrypt.module.ts (258 bytes)

// Richard Essuman@Richard-Essuman MINGW64 /f/TECH SCHOOL-updating/AZUBI AFRICA/FRONT-END WEB DEVELOPMENT/REACT/Projects/59-Restful API's with Nest JS/personal-project-59-nestjs-restful-api (main)
