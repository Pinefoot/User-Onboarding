import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';




//schema shtuff
const formSchema = yup.object().shape({
    name: yup.string().required('Put your name in you scallywag!'),
    email: yup.string().email().required('Include your email you blockhead!'),
    password: yup.string().required('Place your secrets in the box. It is required.'),
    terms: yup.boolean().oneOf([true], 'You scoundrel! You must adhere!'),

})


function Form (){
    //here be the mighty form's state.
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: ''
    })
    //here lies the state for the error of your ways.
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms: ''
    })
    //here you shall find, if you believe, the state of our fair button.
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //I see you are a being of impecable taste! Here you shall find the finest of states for your post!
    const [users, setUsers] = useState([]);

    //the main attraction under the big top! see our freaks! our spectacles! our useEffects!
    useEffect(()=>{
        formSchema.isValid(formState).then(valid =>{
            setButtonDisabled(!valid);
        })
    }, [formState]);

    //form validation by reaching into the schema with .reach to test a specific piece.
    
    const validator = e =>{
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
        .then(() =>{
            setErrors({
                ...errors, [e.target.name]: ''
            }) ;
        }).catch(err =>{
            setErrors({
                ...errors, [e.target.name]: err.errors
            });
        })
    }

    //now begins the time of axios posts and setFormStates of the new info!
    const formSubmit = formEvent => {
        formEvent.preventDefault();
        axios
        .post('https://reqres.in/api/users', formState)
        .then(response =>{
            setUsers(response.data);
            console.log('success', users);

            setFormState({
                name: '',
                email: '',
                password: '',
                terms: '',
            })
        }).catch(err =>{
            console.log(err.response);
        })
    }
//here are the input changes, if something changes this bad boy fires up.
    const inputChange = err =>{
        err.persist();//find out what persist actually does again.
        const newFormData = {
            ...formState,[err.target.name]: err.target.type === 'checkbox' ? err.target.checked : err.target.value
        }
        validator(err);
        setFormState(newFormData);
    }



    //form return statement. below this lives the great form beast. enter if you dare.
    return(
        <form className = 'form-style' onSubmit={formSubmit}>
            <label className="labelName" htmlFor="name">{`Name:  `} 
                <input 
                id = 'name'
                name="name"
                type="text"
                value={formState.name}
                onChange={inputChange}
                >
                </input>
                {errors.name.length > 0 ? (<p className='error'>{errors.name}</p>):null}
            </label><br/>
                
            <label className="labelEmail" htmlFor="email">{`Email:  `}
                <input 
                id='email'
                name='email'
                type='text'
                value= {formState.email}
                onChange={inputChange}
                >
                </input>
                {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>):null}
            </label><br/>
                
            <label className="labelPass" htmlFor="password">{`Password:  `}
                <input
                id='password'
                name='password'
                type='text'
                value={formState.password}
                onChange= {inputChange}>
                </input>
                {errors.password.length > 0 ?( <p className='error'>{errors.password}</p>):null}
            </label><br/>
                
            <label className="labelTerms" htmlFor="terms">
                <input 
                name="terms"
                type="checkbox"
                checked={formState.terms}
                onChange= {inputChange}>
                </input> {`Do Yee Accept These Terms of Services?!  `}
               <p className='error'>{errors.terms}</p>
            </label><br/>
                
                <button className="button" disabled={buttonDisabled}>Submit You Nerd.</button>
                <pre className='Json'>{JSON.stringify(users, null, 2)}</pre>



        </form>
    )


}


export default Form;