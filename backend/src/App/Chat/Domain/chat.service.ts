import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { WsException } from '@nestjs/websockets'
import { AuthenticationService } from '@src/App/Auth/authentication.service'
import { MessageService } from '@src/App/Message/Domain/message.service'
import { User } from '@src/App/User/Application/user.gql'

@Injectable()
export class ChatService {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private messageService: MessageService,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const { token } = socket.handshake.auth

    if (!token) {
      return
    }

    const user =
      await this.authenticationService.getUserFromAuthenticationToken(token)

    if (!user) {
      throw new WsException('Invalid credentials.')
    }

    return user
  }

  async getAllMessages(socket: Socket) {
    await this.getUserFromSocket(socket)

    return this.messageService.findMessages([{ createdAt: 'asc' }])
  }

  async createMessage(userId: User['id'], content: string) {
    return this.messageService.createMessage({ userId, content })
  }
}
