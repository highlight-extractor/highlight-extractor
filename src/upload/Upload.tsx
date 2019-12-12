import 'react-dropzone-uploader/dist/styles.css';
import Dropzone, { IDropzoneProps, ILayoutProps, defaultClassNames } from 'react-dropzone-uploader';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';


type Props = {}

type State = { redirectToReferrer: boolean }

// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
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

        this.state = {redirectToReferrer: false};
    }

    // add type defs to function props to get TS support inside function bodies,
    // and not just where functions are passed as props into Dropzone
    getUploadParams: IDropzoneProps['getUploadParams'] = () => ({ url: 'http://localhost:3000/generate' });

    // called every time a file's `status` changes
    handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta, file }, status) => {
        console.log(status, meta, file)
    };

    handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
        console.log(files.map(f => f.meta));
        this.setState({
            redirectToReferrer: true
        });
        allFiles.forEach(f => f.remove())
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
                getUploadParams={this.getUploadParams}
                LayoutComponent={Layout}
                onSubmit={this.handleSubmit}
                classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
                inputContent="Drop Files (or Click to Add)"
                accept="video/*"
            />
        );
    }
}

export default Upload;
