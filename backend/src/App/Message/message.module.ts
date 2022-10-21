import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { MessageService } from './Domain/message.service'

@Module({
  providers: [PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
