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

@observer
export default class PostSearch extends PureComponent<unknown> {
    @observable private posts: string[] = [];
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
                this.posts.push(data.postId)
            }
        }).then(request => {
            this.posts = []
            this.requester?.cancel();
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
                    {this.posts
                        .map(postId => postRepository.get({postId}))
                        .map((promise) => {
                            promise.then(value => {
                                return (<div id={`post_${value.id}`} onMouseUp={event => {
                                    WS.process(EditPost, {
                                        postId: value.id,
                                        imageUrl: value.title,
                                        tags: value.tags,
                                        title: value.description,
                                        description: value.imageUrl
                                    })
                                }}>
                                    <img alt={value.imageUrl}></img>
                                    <h1>{value.title}({value.tags.join(", ")})</h1>
                                    <p>{value.description}</p>
                                </div>)
                            })
                        })}
                </div>
            </div>
        );
    }
}