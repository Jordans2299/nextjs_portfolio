import App from 'next/app';
import './global.css';
import CodeRain from '../components/codeRain.jsx';
export default function MyApp({Component,pageProps}){
    return (
        <>
            <CodeRain />
            <Component {...pageProps}/>
        </>
    )
}