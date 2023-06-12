import Carousel from 'react-bootstrap/Carousel';
import carroussel1 from '../assets/carrousel1.jpg'
import carroussel2 from '../assets/carroussel2.jpg'
import NavComponent from './NavComponenet';
import NavBarEcommerce from './NavBarEcommerce'

function Carroussel() {
  return (
    <>
   {/* <NavBarEcommerce /> */}
    <Carousel className='carroussel'>
      <Carousel.Item >
        <img
          className="d-block w-100" 
          src={carroussel1}
          alt="First slide"
        />
        <Carousel.Caption>
        <h3>Welcome to E-commerce Website</h3>
          <p>Find the best deals</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" 
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Third slide"
        />
        <Carousel.Caption>
        <h3>Welcome to E-commerce Website</h3>
          <p>Find the best deals</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default Carroussel;

