import {FireAndForget} from "../../../api/connection/Connection.ts";

export default class DeletePost extends FireAndForget<{ id: string }> {
    protected route = "deletePost"
}