import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { UserService } from '../User/Domain/user.service'

import { secret } from './auth.guard'

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UserService) {}

  public async getUserFromAuthenticationToken(token: string) {
    const payload: any = jwt.verify(token, secret)

    if (payload.id) {
      return this.usersService.user({ id: payload.id })
    }
  }
}
