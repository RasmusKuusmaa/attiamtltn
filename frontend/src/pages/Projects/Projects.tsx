import { JSX, useContext, useEffect } from "react";
import "./Projects.css";
import { TopBarContext } from "../../context/TopBarcontext";

function Projects(): JSX.Element {
    const {setContent} = useContext(TopBarContext);

    useEffect(() => {
        setContent(
            <div>
                <h1>Projects</h1>
            </div>
        )
    }, [setContent]);

    return (
        <div className="projects-container">
            <h1>Proje</h1>
        </div>
    )
}

export default Projects;