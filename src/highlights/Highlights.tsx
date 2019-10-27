import { Component } from "react";
import React from "react";

type Props = {}

type State = { images: string[] }

class Highlights extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            images: [
                "inside.png",
                "outside.png"
            ]
        }
    }

    renderImage(imageUrl: string): React.ReactNode {
        return (
            <img src={imageUrl} className="App-logo" alt="logo" />
        );
    }

    render(): React.ReactNode {
        return (
            <div>
                {this.state.images.map(imageUrl =>  this.renderImage(imageUrl))}
            </div>
        );
    }
}

export default Highlights;
