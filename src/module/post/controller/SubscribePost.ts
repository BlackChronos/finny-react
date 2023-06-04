import {RequestStream} from "../../../api/connection/Connection.ts";
import {Post} from "../model/Post.ts";

export default class SubscribePost extends RequestStream<{
    id: string
}, Post> {
    protected route = "subscribePost"
}