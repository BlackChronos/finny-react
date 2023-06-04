import {FireAndForget} from "../../../api/connection/Connection.ts";
import {Tag} from "../model/Tag.ts";

export default class EditPost extends FireAndForget<{
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    tags: Tag[]
}> {
    protected route = "editPost"
}