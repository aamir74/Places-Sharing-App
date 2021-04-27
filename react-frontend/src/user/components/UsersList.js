import React from 'react'
import './UsersList.css'
import UserItem from './UserItem'
import Card from '../../shared/components/UIElements/Card'


const UserList = props =>{
    if(props.items.length === 0){
        return(
            <div className='center'>
                <Card>
                <h2>Users Not Found.</h2>
                </Card>
            </div>
        )
    }
    return(
        <ul className='users-list'>
            {props.items.map(user => {
                return <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places.length}
                
                />
            })}
        </ul>
    )
}

export default UserList



