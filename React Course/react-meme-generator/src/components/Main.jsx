import { useState, useEffect } from 'react'


export default function Main() {

    const [meme, setMeme] = useState(
        {
            imageUrl: "http://i.imgflip.com/1bij.jpg",
            topText: "One does not simply",
            bottomText: "Walk into Mordor"
        }
    )
    const [memeArray, setMemeArray] = useState([])

    useEffect(
        () => {
            fetch("https://api.imgflip.com/get_memes")
                .then(
                    response => response.json()
                )
                .then(
                    data => setMemeArray(
                        data.data.memes
                    )
                )
        }, []
    )

    const handleChange = (e) => {
        const { value, name } = e.currentTarget
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    const getRandomMemeImage = () => {
        memeArray.length > 0 ? setMeme(
            prevMeme => {

                return {
                    ...prevMeme,
                    imageUrl: memeArray[Math.floor(Math.random() * memeArray.length)].url
                }
            }
        ) : null
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getRandomMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}