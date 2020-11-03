import React, { useState, useEffect, useRef, Fragment } from 'react'
import { connect } from "react-redux";
import { setSnackbarMessage } from "../store/actions/snackbarActions";
import { useParams } from "react-router-dom";

import Container from "@material-ui/core/Container";

import ReactQuill from 'react-quill';
import Toolbar from "../components/Editor/Toolbar";
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import EditorFocusfab from "../components/Editor/EditorFocusFab";

import loadingAction from "../store/actions/loadingAction";

function Edit({ loading, setLoading }) {
    const { type, id } = useParams();

    const [item, setItem] = useState({});
    const [content, setContent] = useState("");
    const [display, setDisplay] = useState(true);

    const handleDisplay = () => setDisplay(!display);
    let reactQuillRef = null;
    const quillRef = useRef(null);

    useEffect(() => {
        attachQuillRefs();
        setLoading({ loading: true, component: "edit" });
        window.ipcRenderer.send(`database:get-${type === "chapter" ? "chapter" : "shortStory"}`, { id: id });
        window.ipcRenderer.once(`database:get-${type === "chapter" ? "chapter" : "shortStory"}`, (event, args) => {
            setItem(args[0].dataValues)
            if (args[0].dataValues.content) {
                setContent(args[0].dataValues.content)
                setLoading({ loading: false, component: "" });
            }
            setLoading({ loading: false, component: "" });
        })
        window.scrollTo(0, 0);
    }, [])

    const attachQuillRefs = () => {
        quillRef.current = reactQuillRef.getEditor();
        quillRef.current.root.setAttribute('spellcheck', false);

        //  alignment shortcuts
        quillRef.current.keyboard.addBinding({ key: "A", altKey: true }, (range) => {
            quillRef.current.format('align', '')
        })
        quillRef.current.keyboard.addBinding({ key: "S", altKey: true }, (range) => {
            quillRef.current.format('align', 'center')
        })
        quillRef.current.keyboard.addBinding({ key: "D", altKey: true }, (range) => {
            quillRef.current.format('align', 'right')
        })
        quillRef.current.keyboard.addBinding({ key: "F", altKey: true }, (range) => {
            quillRef.current.format('align', 'justify')
        })
        //  header shortcuts

        for (let i = 0; i <= 6; i++) {
            quillRef.current.keyboard.addBinding({ key: `${i}`, altKey: true }, (range) => {
                quillRef.current.format('header', `${i === 0 ? '' : i}`)
            })
        }
    }

    const saveContent = () => {
        if (document.querySelector(".ql-editor")) {
            window.ipcRenderer.send(`database:update-${type === "chapter" ? "chapter" : "shortStory"}`, { id: item.id, content })
            window.ipcRenderer.once(`database:update-${type === "chapter" ? "chapter" : "shortStory"}`, (event, args) => {
                return;
            })
        }
    }

    const handleFocus = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleQuillChange = (value) => setContent(value)

    return (
        <Fragment>
            {
                loading.loading && loading.component === "edit" &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: "center",
                    height: "80vh"
                }}><CircularProgress color="primary" disableShrink style={{ margin: "2em" }} size={75} /><Typography variant="h6">Loading...</Typography></div>
            }
            < div style={{
                display: loading.loading && loading.component === "edit" ? "none" : "block",
                height: "100%"
            }}>
                <div style={{ position: "relative", width: "100%", marginTop: "-2em", height: "5em" }}>
                    <div style={{ position: "absolute", top: "21%", width: "100%", height: "100%" }}>
                        <div style={{ position: "fixed", right: "2%", zIndex: "100" }} >
                            <EditorFocusfab display={display} onClick={handleDisplay} style={{ top: 0, right: "120%", zIndex: "100", transform: "translate(10%, 10%)" }} />
                        </div>
                    </div>
                    <div style={{ position: "absolute", left: "0%", top: "0", width: "100%", height: "100%", display: display ? "inherit" : "none" }}>
                        <Toolbar
                            display={display}
                            editedTitle={item.title}
                            saveContent={saveContent}
                            style={{ padding: "1.25em", position: "fixed", border: "none", zIndex: "1", width: "100%", margin: 0, backgroundColor: "white" }} />
                    </div>
                </div>
                <Container maxWidth="md" style={{ height: "80vh", marginTop: display ? "" : "-4.9em" }}>
                    <ReactQuill
                        ref={(el) => { reactQuillRef = el }}
                        modules={modules}
                        preserveWhitespace
                        theme='snow'
                        formats={["bold", "italic", "header", "size", "align", "newline", "underline"]}
                        value={content}
                        onKeyUp={() => saveContent()}
                        onChange={handleQuillChange}
                    />
                </Container>
            </div >
        </Fragment>


    )

}

const modules = {
    toolbar: {
        container: "#toolbar"
    }
}

const mapStateToProps = (state) => {
    const { loading } = state;
    return {
        loading,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSnackbarOpen: () => dispatch({ type: "SET_SNACKBAR_OPEN" }),
        setSnackbarMessage: (payload) => dispatch(setSnackbarMessage(payload)),
        setLoading: (payload) => dispatch(loadingAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)