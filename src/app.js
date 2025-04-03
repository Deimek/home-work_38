import React, { useState, useEffect } from "react";
// -------------------------------------------------------------------------------------------------------------------------

const App = () => {
    const [votes, setVotes] = useState({});
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const storedVotes = localStorage.getItem('emojiVotes');
        if (storedVotes) {
            setVotes(JSON.parse(storedVotes))
        }
    }, [])

    const emojiVote = (emoji) => {
        const newVotes = { ...votes };
        newVotes[emoji] = (newVotes[emoji] || 0) + 1;
        setVotes(newVotes);
        localStorage.setItem("emojiVotes", JSON.stringify(newVotes));
    }

    const emojiShowResults = () => {

        let maxVotes = 0;
        let winner = null;


        for (let emoji in votes) {
            if (votes[emoji] > maxVotes) {
                maxVotes = votes[emoji];
                winner = emoji;
            }
        }
        setWinner(winner);
    }

    const emojiReset = () => {
        localStorage.removeItem('emojiVotes');
        setVotes({});
        setWinner(null);
    }

    const emojis = ["😀", "😂", "😍", "😎", "🤩"];

    return (
        <div>
            <h2>Vote for the best smiley</h2>
            <div>
                {emojis.map((emoj) => {
                    return (
                        <div key={emoji}>
                            <span>{emoji}</span>
                            <button onClick={() => emojiVote(emoji)}>Vote</button>
                            <span>{votes[emoji] || 0} Votes</span>
                        </div>)
                })}
            </div>
            <button onClick={emojiShowResults}>Show Results</button>
            <button onClick={emojiReset}>reset results</button>

            {winner && (
                <h3>Winner: {winner} ({votes[winner]}votes)</h3>
            )}

        </div >
    );
}


export default App;

