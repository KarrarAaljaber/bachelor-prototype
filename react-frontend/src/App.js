import PageRoutes from "./routes/PageRoutes";
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from "./utils/SocketContext";


const App = () => {

    
    return(
        <BrowserRouter>
          
          <PageRoutes />

        </BrowserRouter>
       
    );
    
    
}
 
export default App;