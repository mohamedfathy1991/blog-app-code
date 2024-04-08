

const HeaderLeft = ( {togle,settogle}) => {
    return (  
        <div className="header-left">
        <div className="header-logo">
          <strong>BLOG</strong>
          <i className="bi bi-pencil-fill"></i>
        </div>
        <div onClick={()=>{
            settogle(pr=>!pr)
        }} className="header-menu">
            {togle ?<i className="bi bi-x-lg"></i>:<i className="bi bi-list"></i>}
         
        </div>
      </div>




    );
}
 
export default HeaderLeft;