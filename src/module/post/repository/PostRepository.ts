import RemoteObservable from "../../../api/observable/RemoteObservable.ts";
import {Post} from "../model/Post.ts";
import {WS} from "../../../api";
import SubscribePost from "../controller/SubscribePost.ts";

export const postRepository = new RemoteObservable<{
    postId: string
}, Post>((filter, update) => {
    const fetch = () => {
        WS.process(SubscribePost, filter, data => {
            if (data._error) throw data._error
            else if (data._isComplete) {
                fetch()
            } else update(data)
        }).then(value => value.request(999999))
    }
    fetch();
})
