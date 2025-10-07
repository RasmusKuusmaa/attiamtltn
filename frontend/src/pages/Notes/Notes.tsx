import { JSX, useContext, useEffect } from "react";
import { TopBarContext } from "../../context/TopBarcontext";
import "./Notes.css";
function Notes(): JSX.Element {
    const {setContent} = useContext(TopBarContext);

    useEffect(() => {
        setContent(
            <div>
                <h1>Notes bitch</h1>
            </div>
        )
    }, [])

    return <>
        <h1>fes</h1>
    </>
}

export default Notes;