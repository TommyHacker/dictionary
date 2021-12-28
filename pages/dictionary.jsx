const axios = require("axios")
import {useState} from "react";

const Dictionary = () => {
    
    const [definition, setDefinition] = useState(undefined);
  
    const submitHandler = (e) => {
        e.preventDefault();
        setDefinition("")
        const query = e.target.query.value;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
        axios.get(url)
        .then(res => {
            const define = res.data[0].meanings[0].definitions[0].definition;
            setDefinition(define)
        })
        .catch(err => {
            if(err.request.status === 404){
                setDefinition("Word not found in dictionary")
            }
        })
            }
    return (
        <div className="dictionary-container">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
            <form onSubmit={(e) => submitHandler(e)}>
                <input  type="text" name="query" placeholder="search..." />
                <input type="submit" value="Search" />
            </form>
            <div className="resolution-container">
                {definition ? <h2 className="resolution">{definition}</h2> : ""}
            </div>
        </div>
    )
}

export default Dictionary