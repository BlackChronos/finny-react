import {PureComponent} from "react";
import {Tag, tagKeys} from "../../../module/post/model/Tag.ts";

type Properties = {
    tags?: Tag[]
}
export default class TagSelector extends PureComponent<Properties> {

    constructor(properties: Properties) {
        super(properties);
    }

    render() {
        return (
            <div className="tag-select">
                {tagKeys.map((key) => {
                    return <>
                        <input type="checkbox"
                               onChange={(e) => {
                            if (e.target.checked)
                                this.props.tags?.push(key as unknown as Tag);
                            else
                                this.props.tags?.splice(this.props.tags?.indexOf(key as unknown as Tag), 1);

                        }}/>
                        <label>{key}</label>
                    </>
                })}
            </div>
        )
    }
}