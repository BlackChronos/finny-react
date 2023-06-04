import {RequestStream} from "../../../api/connection/Connection.ts";
import {Tag} from "../model/Tag.ts";

export declare type SearchPostsRequest = {
    authorId?: number,
    tags?: Tag[]
}
export default class SearchPostsController extends RequestStream<SearchPostsRequest, { postId: string }> {
    protected route = "searchPosts"
}