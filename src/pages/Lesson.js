import React from "react";

import {
    useParams,
    useHistory
} from "react-router-dom";

import './Lesson.scss'

const Lesson = props => {
    const { lessonId } = useParams()
    const Vocabulary = props.vocabularyList;
    let history = useHistory()

    const filterWords = () => {
        const sameCategoryWords = Vocabulary.filter(word => {
            const isSameCategory = Number(word.lesson) === Number(lessonId)
            return isSameCategory
        });

        return sameCategoryWords
    }

    const renderTable = () => {
        let words = []

        const Vocabulary = filterWords()

        for (let i = 0; i < Vocabulary.length; i++) {
            words.push(
                <tr key={i}>
                    <td>{Vocabulary[i].japanese}</td>
                    <td>{Vocabulary[i].japanese_all_hiragana}</td>
                    <td>{Vocabulary[i].english}</td>
                </tr>
            )
        }

        return words
    }

    const sortFormChapters = () => {
        let formChaptersOptions = [];

        for (let i = 0; i < 50; i++) {
            formChaptersOptions.push(
                <option key={i}>{i + 1}</option>
            )
        }

        return formChaptersOptions;
    }

    const changeLesson = event => {
        history.push(`/lesson/${event.target.value}`)
    }

    return (
        <div className="container">
            <div className="lesson__header">
                <h1>Lesson {lessonId}</h1>
                <div>
                    <i>Go to chapter: </i>
                    <select onChange={changeLesson}>
                        {sortFormChapters()}
                    </select>
                </div>
            </div>
            <div className="voc_table__container">
                <table className="voc_table">
                    <tbody>
                        <tr>
                            <th>Japanese (kanji)</th>
                            <th>Japanese (All hiragana)</th>
                            <th>English</th>
                        </tr>
                        {renderTable()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Lesson;