import "./pagination.css"
const Pagination = () => {
    return (  
        <div className="pagination">
            <div className="previous">previous</div>
               
               {[1,2,3,4].map(page=>{return(
                <div className="page" key={page}>{page}</div>
               )})}
            <div className="next">next</div>

        </div>
    );
}
 
export default Pagination;