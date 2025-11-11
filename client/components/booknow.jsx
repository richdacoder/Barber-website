import { useNavigate } from 'react-router-dom';

const BookNow = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/calendar');
  };

return(
<button onClick={handleClick} > Book Now </button>
)
}

export default BookNow;
