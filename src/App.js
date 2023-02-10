import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Workbench from "./components/workbench/workbench.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="workbench" element={<Workbench />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
