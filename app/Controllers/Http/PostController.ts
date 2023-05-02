import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Post from 'App/Models/Post';
import Application from '@ioc:Adonis/Core/Application';
import CreatePostValidator from 'App/Validators/PostValidator/CreatePostValidator';


export default class PostController {


    // USER CREATE POST //

    public async createPost({ auth, request, response }: HttpContextContract) {
        try {
            const validate = await request.validate(CreatePostValidator);
            let image = `${Date.now()}-${validate.image?.clientName}`;
            const create = await Post.create({
                user_id: auth.user?.id!,
                image: image,
                description: validate.description
            });
            if (create) {
                await validate.image?.move(Application.tmpPath(`Posts`), {
                    name: image
                });
                return response.status(201).json({ 'status': 'success', 'message': 'Post Uploaded Successfully' })
            } else {
                return response.status(400).json({ 'status': 'failed', 'message': 'An Error Occured' })
            }
        } catch (err) {
            return response.status(500).json({ 'status': 'failed', 'message': 'ERROR' })
        }
    }




    // USER DELETE POST //

    public async deletePost({ auth, request, response }: HttpContextContract) {
        try {
            const { id } = request.qs();
            const deletePost = await Post.query().where('user_id', auth.user?.id!).andWhere('id', id).first();
            if (deletePost) {
                await deletePost?.delete();
                return response.status(200).json({ 'status': 'success', 'message': 'Post Deleted' })
            } else {
                return response.status(400).json({ 'status': 'failed', 'message': 'Error Occured' })
            }
        } catch (err) {
            return response.status(500).json({ 'status': 'failed', 'message': 'ERROR' })
        }
    }




    // ALL POSTS WITH COMMENTS //

    public async getAllPost({ auth, response }: HttpContextContract) {
        try {
            const posts = await Post.query().withScopes((scopes) => scopes.remove()).where('user_id', auth.user?.id!).preload('comments', (query) => {
                query.apply((scopes) => scopes.remove()).preload('user', (query) => {
                    query.apply((scopes) => scopes.remove())
                })
            })
            return response.status(200).json({ 'status': 'success', 'data': posts })
        } catch (err) {
            return response.status(500).json({ 'status': 'failed', 'message': 'ERROR' })
        }
    }




    // SET POST LIVE //

    public async setPostLive({ request, response }: HttpContextContract) {
        try {
            const { img } = request.qs();
            return response.download(`./tmp/Posts/${img}`);
        } catch (err) {
            return response.status(500).json({ 'status': 'failed', 'message': 'ERROR' })
        }
    }



}
