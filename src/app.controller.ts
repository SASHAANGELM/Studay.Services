import { Controller, Post, Headers } from '@nestjs/common';
import * as admin from 'firebase-admin';

import firebaseAdmin, { setCustomClaims } from './firebase/config';

import { ResponseStatus } from './common/enums';

import { AppService } from './app.service';
import { UsersService } from './api/users/users.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService
  ) {}

  @Post('/auth/token')
  async setClaims(@Headers('Authorization') token: string) {
    try {
      console.log('token', token)
      const decodedIdToken: admin.auth.DecodedIdToken = await firebaseAdmin.auth().verifyIdToken(token)
      console.log('decodedIdToken', decodedIdToken);
      const uid = decodedIdToken.uid;

      let user = await this.userService.getOne(uid);
      if (user === null) { // Create User if not exist
        // Get User First and Last name from token.
        const name = decodedIdToken.name.split(' ');
        const firstName = name[0] ? name[0] : '';
        const lastName = name[1] ? name[1] : '';
        
        user = await this.userService.create({
          _id: uid,
          firstName,
          middleName: '',
          lastName
        });
      }

      return await setCustomClaims(decodedIdToken, user);
    } catch (error) {
      return {
        status: ResponseStatus.ERROR,
        error
      };
    }

  }
}
