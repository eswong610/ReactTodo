// import React, { Component } from 'react'

// export class Api extends Component {

//     componentDidMount(){
//         const appApi= "https://cat-fact.herokuapp.com/facts";
//         fetch(appApi)
//         .then(res => res.json())
//         .then(data => console.log(data.all[1].text))
//     }

//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }

// export default Api


import React, {useState, useEffect} from 'react';


function Api() {
    const [items, setItems] = useState([]);
    const appApi= "https://cat-fact.herokuapp.com/facts";

    useEffect(()=>{
        fetch(appApi)
        .then(res => res.json())
        .then(
            (result) => {
              setItems(result.all.slice(0,3));
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
          )
    }, [])
    return (
        <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.type} : {item.text} 
            from : {item.user.name.first}
          </li>
        ))}
      </ul>
    )
}

export default Api
