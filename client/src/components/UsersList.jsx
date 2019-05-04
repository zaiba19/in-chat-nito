import React from 'react';

//import styles from './UsersList.css';

const UsersList = props => (
    <div className="Users">
        <div className="UsersOnline">
            {props.users.length } people online
        </div>
        <ul className="UsersList">
            {
                props.users.sort(compareUserName).map((user) => {
                    return (
                        <li key={user.id} className="UserItem">
                            {user.name} {user.name === props.name ? <small>You</small> : ''}
                        </li>
                    );
                })
            }
        </ul>
    </div>
);

export default UsersList;

function compareUserName(a, b) {
    return a.name.localeCompare(b.name);
}