import { createContext, useState } from "react";

export const HttpHeadersContext = createContext();

function HttpHeadersProvider({ children }) {

	const [headers, setHeaders] = useState({
		"Authorization":`Bearer ${localStorage.getItem("bbs_access_token")}`
	});

	const value = {headers, setHeaders};

	return (
		<HttpHeadersContext.Provider value = {value}>
			{children}
		</HttpHeadersContext.Provider>
	);

}

export default HttpHeadersProvider;