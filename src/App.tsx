import Header from "@/widgets/header/ui/Header/Header.tsx";
import Page from "@/pages/main/ui/Page.tsx";
import './shared/index.css';
import {useTheme} from "./app/providers/ThemeProvider.tsx";


function App() {
    const {isDark} = useTheme();

  return (
        <div className={`app ${isDark ? 'dark' : 'light'}`}>
            <Header/>
            <div className="container">
                <Page/>
            </div>
        </div>
  )
}

export default App
