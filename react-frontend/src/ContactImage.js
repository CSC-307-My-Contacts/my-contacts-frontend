import React from "react";

const getImageUrl = (image) => {
  const API_ROOT = "http://localhost:5000/";
  if (image && image.type && image.url) {
    if (image.type === "external") {
      return image.url;
    }
    if (image.type === "hosted") {
      return API_ROOT + image.url;
    }
  }
  return "/contact-no-image.png";
};

const ContactImage = ({ image, className, ...rest }) => {
  return (
    <img
      {...rest}
      className={"rounded-circle " + className}
      src={getImageUrl(image)}
      alt=""
    />
  );
};

export default ContactImage;
