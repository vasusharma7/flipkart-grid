import React, { useState } from "react";
import { ItemTypes } from "./Constants";
import { useDrop } from "react-dnd";
import model from "../assets/modelresized.jpg";

function DroppableModel(props) {
  const [clothes, setClothes] = useState({
    shirt: "",
    trouser: "",
  });

  const addClothes = () => {
    console.log(cloth);
    if (cloth.item.type == "tshirt") {
      setClothes({ ...clothes, shirt: cloth.item.source });
    }
    if(cloth.item.type == 'trouser') {
      setClothes({...clothes, trouser: cloth.item.source });
    }
  };

  const renderClothes = () => {
    let renderedClothes = [];
    for (const clothing in clothes) {
      if (clothing) {
        renderedClothes.push(
          <img src={clothes[clothing]} className={"model-area-" + clothing} />
        );
      }
    }
    return renderedClothes;
  };

  const [cloth, drop] = useDrop({
    accept: [ItemTypes.tshirt, ItemTypes.trouser],
    drop: () => addClothes(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
      }}
      className="model-area"
    >
      {cloth.isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
      {renderClothes()}
      {/*<img src={shirt} className='model-area-shirt'/>*/}
    </div>
  );
}

export default DroppableModel;
