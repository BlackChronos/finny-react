import {RequestStream} from "../../../api/connection/Connection.ts";
import {Tag} from "../model/Tag.ts";

export default class SearchPosts extends RequestStream<{
    authorId?: string,
    tags?: Tag[]
}, string> {
    protected route = "searchPosts"
}