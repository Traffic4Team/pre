import Router from "../router/Router"
import { Link } from "react-router-dom";

function Main() {
	return (
		<main>
          <div className="py-4">
            <div className="container">
              {/* 게시판 */}
						<li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">게시판</div>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/bbslist">글목록</Link>
                <Link className="dropdown-item" to="/bbswrite">글추가</Link>
              </div>
            </li>
            </div>
          </div>
        </main>
	);
}

export default Main;