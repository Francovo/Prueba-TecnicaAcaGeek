import AppRouters from "../routers/AppRouters";
import { CookiesProvider } from 'react-cookie';


function App() {
  return (
    <div>
      <CookiesProvider>
      <AppRouters/>
      </CookiesProvider>
    </div>
  );
}

export default App;
