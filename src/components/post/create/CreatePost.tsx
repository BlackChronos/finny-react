import {FormEvent, PureComponent} from "react";
import {makeObservable, observable} from "mobx";
import {Tag} from "../../../module/post/model/Tag.ts";
import CreatePostController from "../../../module/post/controller/CreatePostController.ts";
import {WS} from "../../../api";
import {observer} from "mobx-react";
import TagSelector from "../common/TagSelector.tsx";

@observer
export default class CreatePost extends PureComponent<unknown> {
    @observable private title?: string
    @observable private description?: string
    @observable private imageUrl?: string
    @observable private tags?: Tag[]

    constructor(properties: unknown) {
        super(properties);
        this.clearForm()
        makeObservable(this)
    }

    private clearForm() {
        this.title = ''
        this.description = ''
        this.imageUrl = ''
        this.tags = []
    }

    private create(event: FormEvent) {
        event.preventDefault()
        WS.process(CreatePostController, {
            title: this.title as string,
            description: this.description as string,
            imageUrl: this.imageUrl as string,
            tags: this.tags as Tag[],
        })
        this.clearForm()
    }


    render() {
        return (
            <form className={"new-post"} onSubmit={this.create.bind(this)}>

                <input type="text" placeholder={"Title"}
                       value={this.title}
                       onChange={({target}) => this.title = target.value}/>
                <input type="text"
                       placeholder={"Description"}
                       value={this.description}
                       onChange={({target}) => this.description = target.value}/>
                <input type="text"
                       placeholder={"Image Url"}
                       value={this.imageUrl}
                       onChange={({target}) => this.imageUrl = target.value}/>

                <TagSelector tags={this.tags}/>

                <input type="submit" value={"Create"}/>
            </form>
        );
    }
}