import React from "react";

const IndexPage = () => {
    return ( 
        <div className="containerlogin">

            <form className="form">
            <p>Login</p>
            <input className= "input"
                name="email"
                type="email"   
            />
            <br></br>
            <input className= "input"
                name="password"
                type="password"
            />
            <br></br>
            <input type="submit" value="Submit" />
            
            </form>
        

            <style jsx>{`
            .containerlogin {
            padding: 5rem 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: auto;
            background-color: #E6E6E6; 
            }
            .form {
            margin: 1rem;
            padding: 1.5rem;
            border: 1px solid #000;
            border-radius: 10px; 
        }
        .input{
            padding: 2px;
            margin: 10px;
        }
            `}</style> 
        </div>
    )

}


export default IndexPage;