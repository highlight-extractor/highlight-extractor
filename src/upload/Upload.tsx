import 'react-dropzone-uploader/dist/styles.css';
import Dropzone, {IDropzoneProps, ILayoutProps, defaultClassNames} from 'react-dropzone-uploader';
import React, {Component, Dispatch} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {uploadVideo} from "../actions";


type Props = {
    postUploadVideo: any
}

type State = { redirectToReferrer: boolean, predictions: any }

// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({input, previews, submitButton, dropzoneProps, files, extra: {maxFiles}}: ILayoutProps) => {
    return (
        <div className="card m-lg-5">
            <div className="card-body">
                <form>
                    {previews}

                    <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

                    {files.length > 0 && submitButton}
                </form>
            </div>
        </div>
    );
};

class Upload extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {redirectToReferrer: false, predictions: []};
    }

    // called every time a file's `status` changes
    handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({meta, file}, status) => {
        console.log(status, meta, file)
    };

    handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
        this.setState({
            redirectToReferrer: true
        });
        allFiles.forEach(f => f.remove());

        this.props.postUploadVideo(allFiles[0].file);
    };

    render(): React.ReactNode {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer) {
            return <Redirect to="/highlights"/>
        }

        return (
            <Dropzone
                multiple={false}
                maxFiles={1}
                // getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangeStatus}
                LayoutComponent={Layout}
                onSubmit={this.handleSubmit}
                classNames={{inputLabelWithFiles: defaultClassNames.inputLabel}}
                inputContent="Drop Files (or Click to Add)"
                accept="video/*"
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    postUploadVideo: (file: File) => dispatch(uploadVideo(file))
});

export default connect(null, mapDispatchToProps)(Upload);
