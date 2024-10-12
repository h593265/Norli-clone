import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import useRefreshToken from '../hooks/userefreshtoken'
export const users = () => {
    const [users, setUsers] = useState();
    const refresh = useRefreshToken()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try{
                const response = await axios.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data)
                isMounted && setUsers(response.data)
            }catch(err){
                console.log(err)
            }
        }
        getUsers();

        return () => {
            isMounted = false
            controller.abort();
        }
    }, [])
  return (
    <div>users</div>
  )
}
