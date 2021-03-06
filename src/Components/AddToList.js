import React, {useState} from 'react'
const axios = require('axios')

const AddToList = ({user, book}) => {
    const [list, setList] = useState(`notRead`)


    function handleChange (element) {
        setList(element.target.value)
    }

    async function handleSubmit (element) {
        console.log(`hit submit`)
        element.preventDefault()

        let routeURI = process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACK_END_PROD + `/user/updateList` 
        : process.env.REACT_APP_BACK_END_DEV + `/user/updateList`;


        await axios.put(routeURI, {list: list, userId: user._id, bookId: book._id})
    }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <select name="bookList" id="bookList" onChange={(e) => handleChange(e)}>
            <option value="notRead">Not Read</option>
            <option value="wishlist">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="finished">Have Read</option>
        </select>
        <input type="submit" value="Update" />
    </form>
  )
}

export default AddToList