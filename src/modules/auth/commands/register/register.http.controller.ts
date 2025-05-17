// import { CommandBus } from '@nestjs/cqrs';
// import { ReqUser } from 'src/libs/decorators/request-user.decorator';
// import { RequestUser } from '../../domain/value-objects/request-user.value-object';
// import { RegisterResponseDto } from '../../dtos/register.response.dto';
// import { Body, Controller, Post } from '@nestjs/common';
// import { RegisterRequestDto } from './register.request.dto';
// import { RegisterCommand } from './register.command';
// import { RegisterServiceResult } from './register.service';
// import { routesV1 } from 'src/configs/app.route';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { match } from 'oxide.ts';

// @Controller(routesV1.version)
// export class RegisterHttpController {
//   constructor(private readonly commandBus: CommandBus) {}

//   // @ApiTags('Register')
//   @ApiOperation({ summary: 'Register with jwt' })
//   @Post(routesV1.auth.register)
//   async register(
//     @ReqUser() user: RequestUser,
//     @Body() body: RegisterRequestDto,
//   ): Promise<RegisterResponseDto> {
//     const command = new RegisterCommand({
//       ...body,
//       createdBy: 'test',
//     });

//     const result: RegisterServiceResult =
//       await this.commandBus.execute(command);

//     return match(result, {
//       Ok: ({ accessToken, refreshToken }) => {
//         const response = new RegisterResponseDto();
//         response.accessToken = accessToken;
//         response.refreshToken = refreshToken;
//         return response;
//       },
//       Err: (error) => {
//         throw error;
//       },
//     });
//   }
// }
