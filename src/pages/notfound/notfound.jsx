import { Link } from "react-router-dom";
import './notfound.css'

const NotFound = () => {
      return (  

            <section className="not-found">
                  <div className="not-found-title">
                        404
                  </div>
                  <div className="not-found-text">
                        <h1>page not found</h1>
                  </div>
                  <Link className="linlk-not-found" to={'/'}>to home</Link>
            </section>
      );
}
 
export default NotFound;