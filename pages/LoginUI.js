import '../styles/home.module.css'
import { useForm } from 'react-hook-form'
import { getDatabase, ref, set } from "firebase/database";
import '../Service/firebase'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'


function Login () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject , setSubject] = useState('');
    const [mensaje, setMessage] = useState('');

    //MENSAJE DE SUCESO 
    const Notify = () => {
        toast.success('Message Successfully Sent!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    //generador de ID UNICOS
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    const uid = generateUUID();
    
    // llamando las variables de react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();
    // React Hook Form parametros de validacion
    const registerOptions = {
        name: { required: "Field Name Cannot be Empty" },
        email: { required: "Field email Cannot be Empty",
         pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid Email"
          }},
        subject: { required: "Field Subject Cannot be Empty" },
        mess: { required: "Field Message Cannot be Empty"}

      };

      
      // Funcion que envia los datos despues de validar a la BDD
      const handleRegistration = (data,e) => {
        e.preventDefault();
        const db = getDatabase();
            set(ref(db, 'Message/' + uid), {
              data
        });
        Notify()
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    
       
      }

      


    return ( 
      <>
      <ToastContainer theme='colored'/>
        <div className="flex justify-center translate-y-20">
           <div>
            <h1 className="text-green-400 text-6xl text-center p-4">Contact Form</h1>
                <form  onSubmit={handleSubmit(handleRegistration)}>
                    <div className="p-4">
                        <input 
                        className='pl-4 p-2 w-60 md:w-96 rounded-full border-none outline-none placeholder:text-black  text-lg bg-[#ECECEC] shadow-xl' name='name'
                        type='text'
                        ref={register}
                        placeholder='Write First Name'
                        {...register('name', registerOptions.name)}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                        <span className=' text-red-500 text-lg flex pl-2 absolute'>
                        {errors?.name && errors.name.message}
                        </span>
                    </div>
                    <div className=" p-4 ">
                        <input  
                        className='pl-4 p-2 w-60 md:w-96 rounded-full border-none outline-none placeholder:text-black  text-lg bg-[#ECECEC] shadow-xl' name='email' 
                        type='text' 
                        placeholder="Write your email" 
                        {...register('email', registerOptions.email)}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                        <span className=' text-red-500 text-lg flex pl-2 absolute'>
                        {errors?.email && errors.email.message}
                        {errors?.pattern && errors.value.message}
                        </span>
                    </div>
                    <div className=" p-4 ">
                        <input
                        className='pl-4 p-2 w-60 md:w-96 rounded-full border-none outline-none placeholder:text-black  text-lg bg-[#ECECEC] shadow-xl' name='subject'
                        type='text'
                        placeholder="Subject"
                        {...register('subject', registerOptions.subject)}
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        />
                        <span className=' text-red-500 text-lg flex pl-2 absolute'>
                        {errors?.subject && errors.subject.message}
                        </span>
                    </div>
                    <div className=" p-4">
                        <textarea 
                        className='pl-5 p-5  w-72 md:w-96 h-40 rounded-lg outline-none placeholder:text-black text-lg bg-[#ECECEC] shadow-xl' 
                        name='mensaje' 
                        type='text' 
                        placeholder="Message"  
                        {...register('mess', registerOptions.mess)}
                        value={mensaje}
                        onChange={e => setMessage(e.target.value)}
                        />
                        <span className=' text-red-500 text-lg flex pl-2 absolute'>
                        {errors?.mess && errors.mess.message}
                        </span>
                    </div>
                    <div className="p-4 translate-y-4">
                        <input
                        type="submit"
                        className=" bg-green-400 w-40 p-3 cursor-pointer shadow-xl rounded-full text-xl text-black" 
                        value="Contact"
                        />
                    </div>
                </form>
           </div>
        </div>
      </>
     );
}

export default Login ;