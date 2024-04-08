import { Link } from "react-router-dom";

const PostItem = ({post}) => {
    return ( 
        <div className="post-item">

            <div className="post-item-image-wrapper">
                <img src={post.image.url} alt="" className="post-image-image" />
            </div>
            <div className="post-item-info-wrapper">
                <div className="post-item-info">
                    <div className="post-item-author">
                        <strong>Author:</strong>
                        <span><Link  className="post-item-author-user" to={`/profile/${post.user.id}`}>{post.user.name}</Link></span>
                    </div>
                    <div className="post-item-date">
                        { new Date(post.createdAt).toDateString()}
                    </div>
                   
                    
                    
                </div>
                <div className="post-item-details">
                        <h4 className="post-item-title">
                            {post.title}
                        </h4>
                        <Link className="post-item-category" to={`/post/category/${post.category}`}>{post.category}</Link>
                        </div>
                        <div>
                        <p className="post-item-description">{post.describtion
}
                       </p>
                        <Link  className="post-item-link" to={`/post/details/${post._id}`}>read more..</Link>
                    </div>
            </div>
        </div>
     );
}
 
export default PostItem;