import React from "react";

import { SetForm, SetList } from "@formation/feature-sets";

const App = () => (
	<>
		<h1>My Lego Sets</h1>
		<div className="flex">
			<SetForm />
			<SetList />
		</div>
	</>
);

export default App;
