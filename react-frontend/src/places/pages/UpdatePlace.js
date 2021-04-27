import React,{useEffect,useState,useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../../shared/util/validators'

import './PlaceForm.css'
import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card'
import { useHttpClient } from '../../shared/hooks/http-hook'
import {AuthContext} from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'


const UpdatePlace = ()=>{
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [ loadedPlace, setLoadedPlace ] = useState()
    const placeId = useParams().placeId
    const history = useHistory()

    const [formState,inputHandler,setFormData]=useForm({
        title:{
        value:'',
        isValid:false
    },
    description:{
        value:'',
        isValid:false
    }
    },false)

    useEffect( () => {
        const fetchPlace = async() => {
            try{
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
                    )
                    setLoadedPlace(responseData.place)
                    setFormData({
                        title:{
                            value:responseData.place.title,
                            isValid:true
                        },
                        description:{
                            value:responseData.place.description,
                            isValid:true
                        }},true)
            } catch (err) {}
            
        }
        fetchPlace()
    }, [sendRequest, placeId, setFormData])
 
    

    const placeUpdateSubmitHandler = async event =>{
        event.preventDefault()
        try{
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                'PATCH', 
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
            }),
            {
                'Content-Type':'application/json',
                Authorization:'Bearer '+ auth.token
            })
            history.push(`/${auth.userId}/places`)
        } catch(err) {}
    }

    if (!loadedPlace && !error && !isLoading ){
        return (
        <div className='center'>
            <Card>
                <h2>Could not find Place!</h2>
            </Card>
        </div>
            
        
        )
    }

    if(isLoading){
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
            )
    }
   return (
     <React.Fragment>
       <ErrorModal  error={error} onClear={clearError} />
       {!isLoading && loadedPlace && (<form className='place-form' onSubmit={placeUpdateSubmitHandler}>
           <Input
           id="title"
           element="input" 
           type='text' 
           label='Title' 
           validators={[VALIDATOR_REQUIRE()]} 
           errorText='Plzz enter a Valid Title.'
           onInput={inputHandler}
           initialValue={loadedPlace.title}    //initial value
           initialValid={true}     //initial validity coz we r updating
           />
           <Input
           id="description"
           element='textarea'
           label='Description'
           validators={[VALIDATOR_MINLENGTH(5)]}
           errorText='Plzz enter a Valid Description'
           onInput={inputHandler}
           initialValue={loadedPlace.description}    //initial value
           initialValid={true}     //initial validity coz we r updating
           />
           <Button type='submit' disabled={!formState.isValid}>
               UPDATE PLACE
           </Button>
       </form>)}
     </React.Fragment>
   )

}

export default UpdatePlace
