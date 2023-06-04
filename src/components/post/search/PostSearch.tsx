import {FormEvent, PureComponent} from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {Tag} from "../../../module/post/model/Tag.ts";
import {WS} from "../../../api";
import SearchPostsController, {SearchPostsRequest} from "../../../module/post/controller/SearchPostsController.ts";
import TagSelector from "../common/TagSelector.tsx";
import {Cancellable, Requestable} from "rsocket-core";
import {postRepository} from "../../../module/post/repository/PostRepository.ts";
import "./PostSearch.scss"
import EditPost from "../../../module/post/controller/EditPost.ts";
import {Post} from "../../../module/post/model/Post.ts";

@observer
export default class PostSearch extends PureComponent<unknown> {
    @observable private posts: Map<string, Post> = new Map<string, Post>();
    @observable private authorId?: number;
    @observable private tags: Tag[] = []
    private requester?: Requestable & Cancellable

    constructor() {
        super(undefined);
        makeObservable(this)
    }


    private search(event: FormEvent) {
        event.preventDefault()
        const request: SearchPostsRequest = {
            tags: this.tags,
            authorId: this.authorId
        };
        WS.process(SearchPostsController, request, data => {
            if (data.postId != undefined) {
                postRepository.get({postId: data.postId}, post => this.posts.set(post.id, post))
            }
        }).then(request => {
            this.requester?.cancel();
            this.posts.clear();
            (this.requester = request).request(4)
        });
    }


    render() {
        return (
            <div className={"postSearch"}>
                <Link to={"/new-post"}>create post</Link>
                <form onSubmit={this.search.bind(this)}>
                    <input type="number"
                           placeholder="Author Id:"
                           onChange={({target}) => this.authorId = Number(target.value)}
                    />
                    <TagSelector tags={this.tags}/>
                    <input type="submit" value="Search"/>
                </form>
                <div className="posts" onScroll={() => {
                    this.requester?.request(1)
                }}>
                    {Array.from(this.posts.values())
                        .map(post => (<div id={`post_${post.id}`} onMouseUp={() => {
                            WS.process(EditPost, {
                                postId: post.id,
                                imageUrl: post.title,
                                tags: post.tags,
                                title: post.description,
                                description: post.imageUrl
                            })
                        }}>
                            <img alt={post.imageUrl}></img>
                            <h1>{post.title}({post.tags?.join(", ")})</h1>
                            <p>{post.description}</p>
                        </div>))}
                </div>
            </div>
        );
    }
}