import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../prisma.service'
import { Message, MessageCreateInput } from '../Application/message.gql'

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async findMessages(): Promise<Message[]> {
    return this.prisma.message.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })
  }

  async createMessage(messageData: MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({
      data: messageData,
    })
  }
}
