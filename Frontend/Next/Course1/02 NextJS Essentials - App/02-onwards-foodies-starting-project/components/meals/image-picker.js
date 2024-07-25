'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  const handlePickClick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    // 이미지 미리보기를 하려면 Data URL로 변환 필요 => img 태그의 src로 사용하기 위해
    const fileReader = new FileReader();

    // load 속성에 값이 지정되면 실행됨
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    // fileReader 객체에 있는 load 속성에 값을 지정하는 것으로 생성되는 Data URL을 얻음
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
              sizes="100%"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          required
          ref={imageInput}
          id={name}
          name={name}
          className={classes.input}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
