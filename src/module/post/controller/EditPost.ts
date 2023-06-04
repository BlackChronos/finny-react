import {FireAndForget} from "../../../api/connection/Connection.ts";
import {Tag} from "../model/Tag.ts";

export default class EditPost extends FireAndForget<{
    postId: string,
    title: string,
    description: string,
    imageUrl: string,
    tags: Tag[]
}> {
    protected route = "editPost"
}