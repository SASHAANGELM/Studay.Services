import * as admin from 'firebase-admin';
import { UserDocument } from 'src/api/users/users.schema';
import { ResponseStatus } from '../common/enums';
import { CommonResponse } from '../common/interfaces';

import serviceAccount from './studday-firebase-adminsdk-rp14c-3747c34608';

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://studday.firebaseio.com"
});

export async function setCustomClaims(decodedIdToken: admin.auth.DecodedIdToken, user: UserDocument): Promise<CommonResponse> {
  console.log('setCustomClaims', user)
  try {
    const uid = decodedIdToken.uid;

    const claims = {
      customClaims: {
        userId: user._id
      }
    }

    await firebaseAdmin.auth().setCustomUserClaims(uid, claims);
    return {
      status: ResponseStatus.SUCCESS
    };
  } catch (error) {
    return {
      status: ResponseStatus.ERROR,
      error
    };
  }
}

export default firebaseAdmin;
