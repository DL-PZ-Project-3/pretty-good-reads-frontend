import styles from './css/UserLists.module.css';
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

function UserLists() {
    const { user } = useContext(UserContext);

    const [displayList, setDisplayList] = useState("reading");
    const [displayListBooks, setDisplayListBooks] = useState(null);

    function updateBooks() {
        console.log(`USER: ${JSON.stringify(user)}`);
        fetch(process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/book/user/${user.googleId}`
        : process.env.REACT_APP_BACK_END_DEV + `/book/user/${user.googleId}`)
            .then(res => res.json())
            .then(res => setDisplayListBooks(res))
            .catch(console.error);
    }

    function updateDisplayList(ev) {
        ev.preventDefault();
        setDisplayList(ev.target.id);
    }

    useEffect(() => {
        updateBooks();
    }, []);

    if (!displayListBooks) {
        return <h1>Loading...</h1>
    }
    
    return (
        <div>
            <div className={styles.listOptions}>
                <p className={styles.tabOne} id="reading" onClick={updateDisplayList}>Reading</p>
                <p className={styles.tabTwo} id="wishlist" onClick={updateDisplayList}>TBR</p>
                <p className={styles.tabThree} id="finished" onClick={updateDisplayList}>Past Reads</p>
            </div>
            {/* To add filters, below likely will be a second component */}
            <div className={styles.resultsContainer}>
                {console.log(displayListBooks)}
                {displayListBooks[displayList].map((book, index) => {
                    return (
                        <div key={index} className={styles.resultContainer}>
                            <h3>{book.volumeInfo.title}</h3>
                            <h4>{book.volumeInfo.authors}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserLists;