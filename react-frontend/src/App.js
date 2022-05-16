import PageRoutes from "./routes/PageRoutes";
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from "./utils/SocketContext";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: '#8BBD24'
    },
    secondary: {
      main: '#fff'
    }
  }
});

const App = () => {

    
    return(
      <MuiThemeProvider theme={theme} >

        <BrowserRouter>
          <main>
          <PageRoutes />

          </main>

        </BrowserRouter>
      </MuiThemeProvider>
       
    );
    
    
}
 
export default App;