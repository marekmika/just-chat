import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql'
import { NonEmptyStringResolver } from 'graphql-scalars'

@ObjectType()
export class Message {
  @Field(() => NonEmptyStringResolver)
  id: string

  @Field(() => NonEmptyStringResolver)
  userId: string

  @Field()
  content: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@InputType()
export class MessageCreateInput extends OmitType(
  Message,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
