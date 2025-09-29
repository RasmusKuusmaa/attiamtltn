import { JSX, useContext, useEffect } from "react";
import { TopBarContext } from "../../context/TopBarcontext";
import "./Topbar.css";

function TopBar(): JSX.Element {
  const { setContent } = useContext(TopBarContext);
  useEffect(() => {
    setContent(
      <div className="topbar">
        <h2>some placeholder text</h2>
      </div>
    );
  }, [setContent]);

  return <div>bla bla bla</div>
}

export default TopBar;