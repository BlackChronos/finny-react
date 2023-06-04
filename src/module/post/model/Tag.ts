export enum Tag {
    LOST,
    FOUND,
    CAT,
    DOG,
    BIRD,
    HAMSTER
}

export const tagKeys = (Object.keys(Tag) as Array<keyof typeof Tag>)
    .filter((v) => isNaN(Number(v)));