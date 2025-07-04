import {React, useState, useEffect} from 'react'

import { useAuth } from '../../contexts/AuthenticationContext';


export default function Subscribe({stationId}) {

    const [isSubscribed, setSubscribed] = useState(null);

    const { username } = useAuth();

    //set display for subscrintion button
    useEffect(() => {

        fetch(`http://localhost:5001/subscriptions/checkSubscriptions?username=${username}&stationId=${stationId}`)
        .then(response => response.json())
        .then(data => setSubscribed(data.subscribed === true))
        .catch(err => {
            console.error("Issue checking subscriptions", err);
            setSubscribed(false)
        });
    }, [username, stationId]);

    const addSubscribe = () => {
        console.log('Adding subscirption')
        fetch(`http://localhost:5001/subscriptions/addSubscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, stationId }),
        })
        .then(res => res.json())
        .then(data => setSubscribed(true))
        .catch(err => console.error("Failed to add subscription", err));
    };

    const removeSubscribe = () => {
        console.log("Removing Subscription")
        fetch(`http://localhost:5001/subscriptions/removeSubscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, stationId }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to remove subscription');
            }
            return res.json();
        })
        .then(data => setSubscribed(false))
        .catch(err => console.error(err));
        }   

    return (
        <button onClick={isSubscribed ? removeSubscribe : addSubscribe}>
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
    );
}