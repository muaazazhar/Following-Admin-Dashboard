import { Link } from 'react-router-dom';
const LinkButton = ({to="/",children }) => {
    return (
        <Link to={to} style={{textDecoration: "none", cursor: "pointer"}}>
        {children}
        </Link>
    )
    };
                  									
export default LinkButton;
                  									