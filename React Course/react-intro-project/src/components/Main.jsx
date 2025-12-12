export default function Main() {
    return (
        <main id="main-content">
            <h1 className="main-title">Fun facts about React</h1>
            <div className="list-container">
                <div className="container front">
                    <ul className="main-facts-list">
                        <li>Was first released in 2013</li>
                        <li>Was originally created by Jordan Walke</li>
                        <li>Has well over 100K stars on GitHub</li>
                        <li>Is maintained by Facebook</li>
                        <li>Powers thousands of enterprise apps, including mobile apps</li>
                    </ul>
                </div>
                <div className="container back">
                    <img className="list-background-image" src="./src/assets/reactjs-icon.png" alt="React Logo Background" />
                </div>
            </div>
        </main>
    )
}