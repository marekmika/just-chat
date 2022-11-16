import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { WsException } from '@nestjs/websockets'
import { AuthenticationService } from '@src/App/Auth/authentication.service'
import { MessageService } from '@src/App/Message/Domain/message.service'

@Injectable()
export class ChatService {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private messageService: MessageService,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const { authorization } = socket.handshake.headers

    const user =
      await this.authenticationService.getUserFromAuthenticationToken(
        authorization,
      )

    if (!user) {
      throw new WsException('Invalid credentials.')
    }

    return user
  }

  async getAllMessages(socket: Socket) {
    await this.getUserFromSocket(socket)

    return this.messageService.findMessages([{ createdAt: 'asc' }])
  }

  async createMessage(socket: Socket, content: string) {
    const user = await this.getUserFromSocket(socket)

    return this.messageService.createMessage({ userId: user.id, content })
  }
}
