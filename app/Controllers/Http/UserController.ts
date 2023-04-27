import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import SignupValidator from 'App/Validators/UserValidator/SignupValidator';
import PasswordValidator from 'App/Validators/UserValidator/ChangePasswordValidator';



export default class UsersController {

    // USER SIGNUP //

    public async signup({request, response}: HttpContextContract){
        try{
                const validate = await request.validate(SignupValidator);
                const hashPassword = await Hash.make(validate.password);
                await  User.create({ username : validate.username, email: validate.email, password : hashPassword})
                return response.status(201).json({'status':'success','message': 'new user created'})
        }catch(err){
            return response.status(500).json({'status':'failed','message': err.messages.errors[0].message})
        }
    }




    // USER LOGIN //

    public async login({auth, request, response}: HttpContextContract){
        try{
             if(request.header('Authorization')?.startsWith('Bearer')){
                await auth.use('api').authenticate();
                    return response.status(200).json({'status':'success','message': 'User Login Successfull','Login': auth.isLoggedIn});
        };
         const {email,password} = request.body();
       const {token} =  await auth.use('api').attempt(email,password);
         return response.status(200).json({'status':'success','message': 'User Login Successfull','Token': token,'Login': auth.isLoggedIn});
    }catch(err){
        return response.status(500).json({'status':'failed','message': 'ERROR'})
    }
}




    // USER LOGOUT //

    public async logout({auth, response}: HttpContextContract){
        try{
              await auth.use('api').revoke();
              return response.status(200).json({'status':'success','message': 'User Logout Successfull','LogOut': auth.isLoggedOut});
    }catch(err){
        return response.status(500).json({'status':'failed','message': 'ERROR'})
    }
}




    // USER DEACTIVATE ACCOUNT //

    public async deactivate({auth, response}: HttpContextContract){
        try{
              const userDelete = await User.findOrFail(auth.user?.id);
              await userDelete.delete();
              return response.status(200).json({'status':'success','message': 'User Account deactivated'});
    }catch(err){
             return response.status(500).json({'status':'failed','message': err.message})
    }
}




    // USER CHANGE PASSWORD //

    public async change_password({auth, request, response}: HttpContextContract){
        try{
            const validate = await request.validate(PasswordValidator);
            const {current_password, new_password} = validate;
              const check = await Hash.verify(auth.user!?.password,current_password);
              if(check){
                const hash = await Hash.make(new_password);
                await auth.user?.merge({password: hash}).save();
                return response.status(200).json({'status':'success','message': 'Change Password Successfully'});
              }else{
                return response.status(400).json({'status':'failed','message': 'Incorrect Password'});
              }
    }catch(err){
             return response.status(500).json({'status':'failed','message': err.message})
    }
}


}
