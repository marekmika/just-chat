import { Field, ObjectType } from '@nestjs/graphql'
import { NonEmptyStringResolver } from 'graphql-scalars'

@ObjectType()
export class Comments {
  @Field(() => NonEmptyStringResolver)
  id: string
}
