import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import axiosWithAuth from '../utils/axiosWithAuth'

const WrapperDiv=styled.div`
background-image:url(https://www.valuesbasedmindset.com/wp-content/uploads/2019/09/kettlebell-class-working-out.jpg);
background-size:cover;
background-repeat:no-repeat;
`; 

const FormDiv=styled.div`
background:white;
color:#2F71A1;
width:25vw;
margin-left:37.5vw;
opacity:85%;
padding:1rem;
border-raidus:25%;
`;

const Button=styled.div`
background:#45A4F2;
color:white;
`;


function Form(props){
    const defaultState={
        first_name:"",
        last_name: "",
        Email:"",
        Username:"",
        Password:"",
        role: ""
       
    }

    const [formState,setFormState]=useState(defaultState)

    const [errors,setErrors]=useState({...defaultState,terms:""});

    const [buttonDisabled,setButtonDisabled]=useState(true); 
    
    const [post, setPost] = useState([]);
   

    const formSchema=Yup.object().shape({
        first_name:Yup
        .string()
        .required("Must Provide first Name"),
        last_name: Yup
        .string()
        .required("must provide last name"),
        Email:Yup
        .string()
        .required("Must Provide Email"),
        Username:Yup
        .string()
        .required("Must Create Username"),
        Password:Yup
        .string()
        .required("Must Create Password"),
        role:Yup
        .string()
        
        
    })

   useEffect(()=>{props.clientDataSetup(formState)},[formState])


    useEffect(()=>{
        formSchema.isValid(formState).then(valid=> setButtonDisabled(!valid));},[formState]);
    
        

    const formSubmit=e=>{
        e.preventDefault();
        console.log('submitted')
        ;
        
        
        axiosWithAuth
            .post('/api/register', formState)
            .then((res)=>{ 
                setPost(res.data);
                console.log(`Form submitted successfully!`,res.data)
                
                props.setNewMember([...props.newMember, res.data]);
            })
            .catch(err=>console.log(err))
    };
const validation=e=>{
    e.persist();

     Yup
        .reach(formSchema,e.target.name)
        .validate(e.target.value)
        .then(valid=>{setErrors({...errors,[e.target.name]:''});})
        .catch(err=>{setErrors({...errors,[e.target.name]:err.errors[0]});})

}
const inputChange = e => {

        const value=e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]:value
            });
     validation(e)
       
      };
   
    // maybe multiple languages for choices
    return(
        <WrapperDiv>
        <div>
            <FormDiv>
            <form onSubmit={formSubmit} >
                <h2>Sign up!</h2>
                <label>First Name
                    <input name="first_name" id="firstInput" placeholder='First Name' onChange={inputChange} error={errors} />
                </label><br></br><br></br>
                <label>Last Name
                    <input name="last_name" id="nameInput" placeholder='Last Name' onChange={inputChange} error={errors} />
                </label><br></br><br></br>
                <label>Email
                    <input name="Email" id="emailInput" placeholder='Email' onChange={inputChange} error={errors}/>
                </label><br></br><br></br>        
                <label>Username
                    <input name="Username" id="userNameInput" placeholder='Username' onChange={inputChange} error={errors}/>
                </label><br></br><br></br>
                <label>Password
                    <input name="Password" id="passwordInput" placeholder='abc123' onChange={inputChange} error={errors}/>
                </label><br></br><br></br>
                <label>Role
                    <select name="role" id="roleInput" onChange={inputChange}>
                        <option value="Not specified">Select</option>
                        <option value="instructor">Instructor</option>
                        <option value="client">Client</option>
                       
                    </select>
                </label>
              
               <br></br><br></br>
               
                
               

              
                <Link to='/confirmation'>
                    <Button disabled={buttonDisabled} >Register</Button>
                </Link>
                {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            </form>
            </FormDiv>
        </div>
        </WrapperDiv>
    )
}

export default Form;
