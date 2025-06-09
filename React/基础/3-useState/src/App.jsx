import Table from "./table";
import { version } from "react";

function App() {
	return (
		<div id="container">
			<h1>ReactHook-useState</h1>
			<p>react@{version}</p>
			<Table />
		</div>
	);
}

export default App;
