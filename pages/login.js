import React from "react";

const IndexPage = () => {
    return ( 
    <div className="formlogin">
        <form >
        <p>Login</p>
        <input
            name="email"
            type="email"
            
        />
        <input
            name="password"
            type="password"
        />
        <input type="submit" value="Submit" />
        
        </form>
    </div>
    )
}
<style jsx>{`
.formlogin {
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: red; 
}
`}</style>

export default IndexPage;