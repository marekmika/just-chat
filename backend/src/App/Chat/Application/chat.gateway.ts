import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from '../Domain/chat.service'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket)
    const allMessages = await this.chatService.getAllMessages(socket)

    return this.server.sockets.emit('init_messages', {
      content: allMessages,
    })
  }

  @SubscribeMessage('message')
  async listenForMessages(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const {
      email,
      firstName,
      lastName,
      id: userId,
    } = await this.chatService.getUserFromSocket(socket)

    const { id, content, createdAt, updatedAt } =
      await this.chatService.createMessage(userId, message)

    return this.server.sockets.emit('receive_message', {
      message: {
        id,
        createdAt,
        updatedAt,
        userId,
        content,
      },
      user: {
        email,
        firstName,
        lastName,
      },
    })
  }
}
