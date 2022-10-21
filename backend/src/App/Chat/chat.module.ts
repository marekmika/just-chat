import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { AuthenticationService } from '../Auth/authentication.service'
import { MessageService } from '../Message/Domain/message.service'
import { UserService } from '../User/Domain/user.service'
import { ChatGateway } from './Application/chat.gateway'
import { ChatService } from './Domain/chat.service'

@Module({
  providers: [
    PrismaService,
    AuthenticationService,
    UserService,
    ChatService,
    ChatGateway,
    MessageService,
  ],
  exports: [],
})
export class ChatModule {}
