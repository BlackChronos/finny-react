import {Tag} from "./Tag.ts";

export declare type Post = {
    id: string,
    authorId: number,
    title: string,
    description: string
    imageUrl: string,
    tags: Tag[],
}
