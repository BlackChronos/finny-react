import {RequestStream} from "../../../api/connection/Connection.ts";
import {Post} from "../model/Post.ts";

export default class SubscribePost extends RequestStream<{
    postId: string
}, Post> {
    protected route = "subscribePost"
}