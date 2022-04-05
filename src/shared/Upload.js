import React from "react";
import { actionsCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector} from "react-redux";



const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);
    const reader = new FileReader();
    const file = React.useRef();


    const selectFile = (e) => {
        console.log(e.target.files);
        const _file = file.current.files[0];
        reader.readAsDataURL(_file);
        reader.onloadend = () => {
                dispatch(imageActions.setPreview(reader.result));
            }
    }

        // const uploadFB = () => {
        //     let image = file.current.files[0];
        //     dispatch(imageActions.uploadImageFB(image));
        // }

    return (
        <div>
            <input type="file" onChange={selectFile} ref={file} disabled={is_uploading}/>
            {/* <button onClick={uploadFB}>업로드</button> */}
        </div>
    )
};

export default Upload;