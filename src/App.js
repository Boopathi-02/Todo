import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from './component/user';
import Group from './component/group';
import Todo from './component/todo';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/group" element={<Group />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
