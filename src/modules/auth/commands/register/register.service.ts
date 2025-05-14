// import { Err, Ok, Result } from 'oxide.ts';
// import { UserEntity } from '../../../user/domain/user.entity';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { ConflictException, Inject } from '@nestjs/common';
// import { UserRepositoryPort } from '../../../user/database/user.repository.port';
// import { RegisterCommand } from './register.command';
// import { UserAlreadyExistsError } from '../../../user/domain/user.error';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConfig } from 'src/configs/jwt.config';

// export type RegisterServiceResult = Result<{ accessToken; refreshToken }, any>;

// @CommandHandler(RegisterCommand)
// export class RegisterService implements ICommandHandler<RegisterCommand> {
//   constructor(
//     private readonly 
//   ) {}

//   async execute(command: RegisterCommand): Promise<RegisterServiceResult> {
//     const user = UserEntity.create({
//       ...command.getExtendedProps<RegisterCommand>(),
//       isActive: true,
//     });

//     try {
//       const registedUser = await this.userRepo.insert(user);
//       // Generate tokens
//       const payload = {
//         sub: registedUser.id,
//         email: registedUser.getProps().email,
//       };
//       const accessToken = await this.jwtService.signAsync(payload, {
//         expiresIn: jwtConfig.expiresIn,
//       });

//       const refreshToken = await this.jwtService.signAsync(payload, {
//         expiresIn: jwtConfig.expiresIn,
//       });

//       return Ok({ accessToken, refreshToken });
//     } catch (error: any) {
//       if (error instanceof ConflictException) {
//         return Err(new UserAlreadyExistsError(error));
//       }
//       throw error;
//     }
//   }
// }
