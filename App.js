



import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './style.css'

function App() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/images')
      .then(response => {
        setImages(response.data);


      })
      .catch(error => {
        console.log(error);
      });
  }, [images]);






  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', 'My Image');
    formData.append('image', image);

    axios.post("http://localhost:8080/upload",formData).then((res)=>{
      console.log(res);
    });

  }

  const handleImageChange = event => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
       <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Choose an image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Upload</button>
      </form>



      <div className='images'>


        <ul>
      {images.map(image => (
          <li key={image.id}>
            <img src={image} alt={image.name} />
            <p>{image.name}</p>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
