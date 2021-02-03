import React from "react";
import CardBtn from "../../components/Buttons/CardBtn";
import "./style.css";

function Card(props) {
  return (
    <div
      className="card"
      style={{
        backgroundImage: props.image ? `url(${props.image})` : "none",
      }}
    >
      {!props.image && (
        <i className="fa fa-spinner fa-spin" aria-hidden="true" />
      )}
      <CardBtn onClick={props.handleBtnClick} data-value="pass" />
      <CardBtn onClick={props.handleBtnClick} data-value="pick" />
    </div>
  );
}

export default Card;
