import { version } from "react";
import Table from "./table";

function App() {
	return (
		<div id="container">
			<h1>ReactHook-useReducer</h1>
			<p>react@{version}</p>
			<Table />
		</div>
	);
}

export default App;
