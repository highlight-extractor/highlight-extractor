import {Component, CSSProperties} from "react";
import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

type Props = {}

type State = { images: string[] }

const defaults: CSSProperties = {
    height: "auto",
    width: "auto",
    maxHeight: 350,
    maxWidth: 350
};

class Highlights extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            images: [
                "inside.png",
                "outside.png"
            ]
        };
    }

    renderImage(imageUrl: string): React.ReactNode {
        console.log(imageUrl);
        return (
            <MDBCol md="4">
                <img src={imageUrl} className="img-fluid hoverable" alt="logo" style={ defaults } />
            </MDBCol>
        );
    }

    render(): React.ReactNode {
        console.log(this.state);
        return (
            <MDBContainer className="mt-5">
                <MDBRow>
                    {this.state.images.map(imageUrl =>  this.renderImage(imageUrl))}
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Highlights;
