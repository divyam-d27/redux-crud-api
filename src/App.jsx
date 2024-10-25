import Form from "./components/Form";
import ListGroup from "./components/ListGroup";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container p -5">
        <Form />
        <ListGroup />
      </div>
    </div>
  );
};

export default App;
