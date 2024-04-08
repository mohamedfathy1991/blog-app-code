const AddCategoryForm = () => {
      return ( 
            <div className="add-category">
                  <h6 className="add-category-title"> add new category </h6>
                        <form action="" className="add-category-form">
                              <div className="add-category-from-group">
                                    <label htmlFor="title">category title</label>
                                    <input type="text" id="title"
                                    placeholder="enter category" />
                              </div>
                              <button className="add-category-btn" type="submit">Add</button>

                        </form>
                
            </div>
       );
}
 
export default AddCategoryForm;