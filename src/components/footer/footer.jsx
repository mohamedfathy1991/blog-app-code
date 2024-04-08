const Footer = () => {
    return ( 
        <footer style={style}>
            copy right 2023 &copy;
            <p style={name}>omar fathy</p>

        </footer>
     );
}


const style={
    color:"var(--white-color)",
    fontSize:"21px",
    backgroundColor:"var(--blue-color)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"50px"
}
const name={
    fontSize:"17px",
    fontWeight:"bold",
    fontFamly:'Roboto'

}
 
export default Footer;