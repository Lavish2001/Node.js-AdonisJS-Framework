import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post';
import CreateCommentValidator from 'App/Validators/CommentValidator/CreateCommentValidator'

export default class CommentController {

    // CREATE COMMENT //

    public async createComment({ auth, request, response }: HttpContextContract) {
        try {
            const { id } = request.qs();
            const validate = await request.validate(CreateCommentValidator);
            const post = await Post.find(id);
            if (post) {
                await Comment.create({
                    post_id: id,
                    text: validate.text,
                    user_id: auth.user?.id!
                });
                return response.status(200).json({ 'status': 'success', 'message': 'Comment post successfull' })
            } else {
                return response.status(400).json({ 'status': 'failed', 'message': 'Error Occured' })
            }
        } catch (err) {
            return response.status(500).json({ 'status': 'failed', 'message': 'ERROR' })
        }
    }



}
