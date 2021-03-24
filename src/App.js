import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegistrationForm from "./components/registration_form";
import Confirmation from "./components/confirmation";
import AdminReport from "./components/admin_report";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={RegistrationForm} />
          <Route path="/confirmation" component={Confirmation} />
          <Route path="/admin-report" component={AdminReport} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
