import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogIn {
  public async handle({auth,request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    if(request.header('Authorization')?.startsWith('Bearer')){
      await auth.use('api').authenticate();
      if(auth.user){
        await next();
      }else{
        return response.status(400).json({'status':'failed','message': 'Invalid Token'});
      }
    }else {
     return response.status(400).json({'status':'failed','message': 'Please Login First'});
}
  }
  
}
