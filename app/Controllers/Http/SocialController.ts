import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import crypto from 'crypto';


export default class SocialController {

  // GOOGLE AUTHENTICATION //

  public async googleAuthentication({ ally, session, response }: HttpContextContract) {
    try {
      const state = crypto.randomBytes(16).toString('hex')
      session.put('oauthState', state);
      const google = ally.use('google');
      const url = await google.redirectUrl();
      return response.status(200).json({ 'status': 'success', 'message': url })
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

      await User.create({
        username: user.name,
        email: user?.email!,
        password: hashedPassword
      });
      return response.status(200).json({ 'status': 'success', 'message': 'Signup Successfull', 'pasword': `Your password for this account is ${userPass} please remeber that passsowrd for Login.` })

    } catch (err) {
      return response.status(500).json({ 'status': 'failed', 'message': 'ERROR' })
    }
  }




  // GITHUB AUTHENTICATION //

  public async githubAuthentication({ ally, session, response }: HttpContextContract) {
    try {
      const state = crypto.randomBytes(16).toString('hex')
      session.put('oauthState', state);
      const github = ally.use('github');
      const url = await github.redirectUrl();
      return response.status(200).json({ 'status': 'success', 'message': url })
    } catch (err) {
      return response.status(500).json({ 'status': 'failed', 'message': err.message })
    }
  }




  // GITHUB REDIRECT //

  public async githubRedirect({ ally, response }: HttpContextContract) {
    try {
      const github = ally.use('github');

      /**
         * User has explicitly denied the login request
         */
      if (github.accessDenied()) {
        return 'Access was denied'
      }

      /**
       * Unable to verify the CSRF state
       */
      if (github.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      /**
       * There was an unknown error during the redirect
       */
      if (github.hasError()) {
        return github.getError()
      }

      /**
       * Finally, access the user
       */
      const user = await github.user();
      const userPass = `${user.name}@123`;
      const hashedPassword = await Hash.make(userPass);

      await User.create({
        username: user.name,
        email: user?.email!,
        password: hashedPassword
      });
      return response.status(200).json({ 'status': 'success', 'message': 'Signup Successfull', 'pasword': `Your password for this account is ${userPass} please remeber that passsowrd for Login.` })

    } catch (err) {
      return response.status(500).json({ 'status': 'failed', 'message': err.message })
    }
  }




  // TWITTER AUTHENTICATION //

  public async twitterAuthentication({ ally, session, response }: HttpContextContract) {
    try {
      const state = crypto.randomBytes(16).toString('hex')
      session.put('oauthState2', state);
      const twitter = ally.use('twitter');
      const url = await twitter.redirectUrl();
      return response.status(200).json({ 'status': 'success', 'message': url })
    } catch (err) {
      return response.status(500).json({ 'status': 'failed', 'message': err.message })
    }
  }




  // TWITTER REDIRECT //

  public async twitterRedirect({ ally, response }: HttpContextContract) {
    try {
      const twitter = ally.use('twitter');

      /**
         * User has explicitly denied the login request
         */
      if (twitter.accessDenied()) {
        return 'Access was denied'
      }

      /**
       * Unable to verify the CSRF state
       */
      if (twitter.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      /**
       * There was an unknown error during the redirect
       */
      if (twitter.hasError()) {
        return twitter.getError()
      }

      /**
       * Finally, access the user
       */
      const user = await twitter.user();
      const userPass = `${user.name}@123`;
      const hashedPassword = await Hash.make(userPass);

      await User.create({
        username: user.name,
        email: user?.email!,
        password: hashedPassword
      });
      return response.status(200).json({ 'status': 'success', 'message': 'Signup Successfull', 'pasword': `Your password for this account is ${userPass} please remeber that passsowrd for Login.` })

    } catch (err) {
      return response.status(500).json({ 'status': 'failed', 'message': err.message })
    }
  }





}
