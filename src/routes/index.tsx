import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

import SignIn from "../pages/SignIn";
import Contact from "../pages/Contact/list";
import ContactForm from "../pages/Contact/form";
import Group from "../pages/Group/list";
import GroupForm from "../pages/Group/form";
import isAuth from "../utils/auth";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  component: React.FC<{}>
}

const ProtectedRoute = ({component: Component}: IProtectedRoute) => {
  const authenticated = isAuth()

  return authenticated
    ? <Component />
    : <Navigate to="/" replace />;
};

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" element={<SignIn />} />
    <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/contact" element={<ProtectedRoute component={Contact} />}>
      <Route path="/contact" element={<Contact />} />
    </Route>
    <Route path="/contact/form" element={<ProtectedRoute component={ContactForm} />}>
      <Route path="/contact/form" element={<ContactForm />} />
    </Route>
    <Route path="/contact/form/:id" element={<ProtectedRoute component={ContactForm} />}>
      <Route path="/contact/form/:id" element={<ContactForm />} />
    </Route>
    <Route path="/group" element={<ProtectedRoute component={Group} />}>
      <Route path="/group" element={<Group />} />
    </Route>
    <Route path="/group/form" element={<ProtectedRoute component={GroupForm} />}>
      <Route path="/group/form" element={<GroupForm />} />
    </Route>
    <Route path="/group/form/:id" element={<ProtectedRoute component={GroupForm} />}>
      <Route path="/group/form/:id" element={<GroupForm />} />
    </Route>
  </Switch>
);

export default Routes;
