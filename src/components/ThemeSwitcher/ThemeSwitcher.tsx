import { useEffect, useState } from 'react';
import { CiSun } from "react-icons/ci";
import { PiMoonLight } from "react-icons/pi";
import './ThemeSwitcher.css'

export const ThemeSwitcher = () => {
	const [isLightTheme, setIsLightTheme] = useState<boolean>(true)
	
	const lightTheme = {
		"--title-color": "#6EC1E4",
		"--text-color": "#121212",
		"--background": "#ffffff",
		"--color-accent": "#4A90E2",
		"--transparency": "#6ec1e4c5"
	} 

	const darkTheme = {
		"--title-color": "#9AD1F0",   
		"--text-color": "#fff",  
		"--background": "#1E1E1E", 
		"--color-accent": "#3A7BD5",
		"--transparency": "#9AD1F0c5"  
	}
	
	useEffect(() => {
		const theme = isLightTheme ? lightTheme : darkTheme
		Object.entries(theme).map(entry => {
		    let key = entry[0]
		    let value = entry[1]
			document.documentElement.style.setProperty(key, value)
		})
	}, [isLightTheme])

	const handleClick = () => {
		setIsLightTheme(!isLightTheme)
	}

	return (
		<div className={`themeSwitcher`} onClick={handleClick}>
			{isLightTheme ? 
				<CiSun size={35} className={`icon ${!isLightTheme ? 'dark' : ''}`} /> : 
				<PiMoonLight size={32} className={`icon ${!isLightTheme ? 'dark' : ''}`} />
			}
		</div>
	)
}
