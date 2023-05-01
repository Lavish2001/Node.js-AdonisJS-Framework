import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';


export default class SocialController {

  // GOOGLE AUTHENTICATION //

  public async googleAuthentication({ ally, session, response }: HttpContextContract) {
    try {
      const google = ally.use('google');
      const redirectUrl = await google.redirectUrl();
      session.clear()
      return response.status(200).json({ 'status': 'success', 'message': redirectUrl })
    } catch (err) {
      return response.status(500).json({ 'status': 'failed', 'message': err.message })
    }
  }




  // GOOGLE REDIRECT //

  public async googleRedirect({ ally, response }: HttpContextContract) {
    try {
      const google = ally.use('google');

      /**
         * User has explicitly denied the login request
         */
      if (google.accessDenied()) {
        return 'Access was denied'
      }

      /**
       * Unable to verify the CSRF state
       */
      if (google.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      /**
       * There was an unknown error during the redirect
       */
      if (google.hasError()) {
        return google.getError()
      }

      /**
       * Finally, access the user
       */
      const user = await google.user();
      const userPass = `${user.name}@123`;
      const hashedPassword = await Hash.make(userPass);
      const createNewUser = await User.create({
        username: user.name,
        email: user?.email!,
        password: hashedPassword
      });
      return response.status(200).json(createNewUser)

    } catch (err) {
      return response.status(500).json({ 'status': 'failed', 'message': err.message })
    }
  }


}
