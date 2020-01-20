import {Component, CSSProperties, Dispatch} from "react";
import React from "react";
import {MDBContainer, MDBRow, MDBCol} from "mdbreact";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {Prediction} from "../store/commons/uploadCommons";

type Props = {
    predictions: Prediction[]
}

type State = {
    predictions: Prediction[]
}

const defaults: CSSProperties = {
    height: "auto",
    width: "auto",
    maxHeight: 350,
    maxWidth: 350
};

class Highlights extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.state = {...props};
    }

    renderImage(prediction: Prediction): React.ReactNode {
        console.log(prediction);
        return (
            <MDBCol md="4">
                <img src={prediction.image_id} className="img-fluid hoverable" alt="logo" style={defaults}/>
            </MDBCol>
        );
    }

    render(): React.ReactNode {
        const {predictions} = this.props;
        console.log(predictions);
        return (
            <MDBContainer className="mt-5">
                <MDBRow>
                    {predictions.map(prediction => this.renderImage(prediction))}
                </MDBRow>
            </MDBContainer>
        );
    }
}

const mapStateToProps = (state: State) => ({
    predictions: state.predictions
});

export default withRouter(connect(mapStateToProps)(Highlights));
