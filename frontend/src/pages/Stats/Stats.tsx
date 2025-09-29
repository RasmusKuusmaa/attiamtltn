
import { JSX, useContext, useEffect } from "react"
import { TopBarContext } from "../../context/TopBarcontext";


function Stats(): JSX.Element {
   const {setContent} = useContext(TopBarContext);

  useEffect(() => {
    setContent(
      <div>
        <h2>
          das stats page
        </h2>
        </div>
    )
  }, [])
    return (
    <>
    
    <h1>Das stats part dos</h1>
    </>        
    )
}

export default Stats;