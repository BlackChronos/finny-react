import {FireAndForget} from "../../../api/connection/Connection.ts";
import {Tag} from "../model/Tag.ts";

export default class CreatePostController extends FireAndForget<{
    title: string,
    description: string,
    imageUrl: string,
    tags: Tag[]
}> {
    protected route = "createPost"
}