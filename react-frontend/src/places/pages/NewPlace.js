import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './PlaceForm.css'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'




const NewPlace = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const auth = useContext(AuthContext)
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false)




    const history = useHistory()

    const placeSubmitHandler = async event => {
        event.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', formState.inputs.title.value)
            formData.append('description', formState.inputs.description.value)
            formData.append('address', formState.inputs.address.value)
            formData.append('image', formState.inputs.image.value)
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places/', 'POST', formData,{
                Authorization:'Bearer '+ auth.token
            }) 
            history.push('/')
        } catch (err) { }

    }



    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    element="input"
                    type='text'
                    label='Title'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Plzz enter a Valid Title.'
                    onInput={inputHandler}
                />
                <Input
                    id='description'
                    element="textarea"
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Plzz enter a Valid Descrition (atleast 5 characters).'
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    label='Address'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Plzz enter a Valid Address.'
                    onInput={inputHandler}
                />
                <ImageUpload
                    id='image'
                    errorText='Please Provide an Image'
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
            </form>

        </React.Fragment>

    )
}
export default NewPlace