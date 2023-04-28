import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User';

export default class SocialController {

    // GOOGLE AUTHENTICATION //

    public async googleAuthentication({ally, response}: HttpContextContract){
        try{
            const google= ally.use('google').redirect();
            return response.status(200).json({'status':'success','message': google})
        }catch(err){
            return response.status(500).json({'status':'failed','message': err.message})
        }
    }




    // GOOGLE REDIRECT //

    public async googleRedirect({ally, response}: HttpContextContract){
            try{
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
  const user = await google.user()
  return user;

            }catch(err){
                return response.status(500).json({'status':'failed','message': err.message})
            }
        }


}
