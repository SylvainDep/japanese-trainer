import { useState, useEffect, createRef } from 'react'

import './Trainer.scss';

const Trainer = props => {
    const Vocabulary = props.vocabularyList;

    let buttonRefs = []
    
    const [pickedWord, setPickedWord] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [selectedChapters, setSelectedChapters] = useState({
        from: 1,
        to: 44
    });

    useEffect(() => {
        newWord();
    }, [selectedChapters])

    const checkAnswer = (e, value, givenanswer) => {
        let isCorrect = pickedWord.english.includes(givenanswer);

        if(isAnswered) return;
        setIsAnswered(true)
        setIsAnswerCorrect(isCorrect)
        
        if(isCorrect) {
            buttonRefs[value].current.classList.add('correct')
        } else {
            buttonRefs[value].current.classList.add('wrong')
        }
    }

    const newWord = () => {
        const selectedWords = Vocabulary.filter(word => {
            const isInRange = word.lesson >= selectedChapters.from && word.lesson <= selectedChapters.to
            return isInRange
        });

        const randomElement = selectedWords[Math.floor(Math.random() * selectedWords.length)];

        const sameCategoryWords = Vocabulary.filter(word => {
            const isSameCategory = word.partOfSpeech[0] === randomElement.partOfSpeech[0]
            return isSameCategory
        });

        const randomSuggestions = []

        for(let i=0; i<3; i++) {
            const randomWrongAnswer = sameCategoryWords[Math.floor(Math.random() * sameCategoryWords.length)]
            randomSuggestions.push(randomWrongAnswer)
        }

        randomSuggestions.push(randomElement)

        // SHUFFLE ANSWERS
        for(let i = randomSuggestions.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = randomSuggestions[i]
            randomSuggestions[i] = randomSuggestions[j]
            randomSuggestions[j] = temp
        }

        for (let i=0; i<buttonRefs.length; i++) {
            buttonRefs[i].current.classList.remove('wrong', 'correct')
        }

        setSuggestions(randomSuggestions)
        setPickedWord(randomElement)
        setIsAnswered(false)
    }

    const sortSuggestions = () => {

        let content = []
        for(let i = 0; i<suggestions.length; i++) {
            const newRef = createRef();
            buttonRefs.push(newRef);

            content.push(
                <button
                    value={i}
                    key={i}
                    ref={newRef} 
                    onClick={(e) => checkAnswer(e, i, suggestions[i].english)}
                    disabled={isAnswered}
                >
                    {suggestions[i].english}
                </button>
            );
        }
        return content;
    }

    const sortFormChapters = range => {
        let formChaptersOptions = [];
        
        if (range === 'from') {
            for (let i=0; i<44;i++) {
                if (i+1 <= selectedChapters.to) {
                    formChaptersOptions.push(
                        <option key={i}>{i+1}</option>
                    )
                }
            } 
        }

        if (range === 'to') {
            for (let i=0; i<44;i++) {
                if (i+1 >= selectedChapters.from) {
                    formChaptersOptions.push(
                        <option key={i}>{i+1}</option>
                    )
                }
            } 
        }
        
        return formChaptersOptions;
    }

    const setChapterSelection = event => {
        setSelectedChapters({
            ...selectedChapters,
            [event.target.getAttribute('range')]: parseInt(event.target.value, 10)
        })
    }

    return (
      <div className="apppage">
            <div className="exerciseblock">
                <form className="selection">
                    <span>Lessons from </span>
                    <select dir="rtl" range="from" onChange={setChapterSelection} value={selectedChapters.from}>
                        {sortFormChapters('from')}
                    </select>
                    <span> to </span>
                    <select dir="rtl" range="to" onChange={setChapterSelection} value={selectedChapters.to}>
                        {sortFormChapters('to')}
                    </select>
                </form>
                <div className={`card${isAnswered?' revealed':''}`}>
                        <div className="front">
                            <div className="card__header">
                                <span>Lesson {pickedWord.lesson}</span>
                                <span>{pickedWord.partOfSpeech}</span>
                            </div>
                            <div className="card__main">
                                <span>{pickedWord.japanese}</span>
                                <br/>
                                {pickedWord.japanese !== pickedWord.japanese_all_hiragana &&
                                    <span>{pickedWord.japanese_all_hiragana}</span>
                                }
                            </div>
                        </div>
                        <div className={`back${isAnswerCorrect?' correct': ' wrong'}`}>
                            {isAnswerCorrect ?
                                <span>CORRECT!</span> :
                                <>
                                    <span>WRONG...</span>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Japanese:</td>
                                                <td>{pickedWord.japanese_all_hiragana}</td>
                                            </tr>
                                            <tr>
                                                <td>English:</td>
                                                <td>{pickedWord.english}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            }
                        </div>
                </div>
                {/* <div className="answerform">
                    <input onChange={setTempAnswer} type="text" name="answer"></input>
                    <button onClick={checkAnswer}>Check</button>
                </div> */}
                <div className="answerform suggestions">
                    {sortSuggestions()}
                </div>
                {isAnswered && <button className="nextbutton" onClick={newWord}>Next word</button>}
            </div>
      </div>
    );
}

export default Trainer;