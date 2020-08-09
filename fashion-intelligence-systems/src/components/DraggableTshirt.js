import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import shirt from '../assets/sample_green_shirt.png';

const DraggableTshirt = (props) => {
    const [{isDragging}, drag] = useDrag({
          item: { type: ItemTypes.tshirt, 
                  source: props.src 
                },
          collect: monitor => ({
                  isDragging: !!monitor.isDragging(),
                }),
        })

    return (
          <div
                  ref={drag}
                  style={{
                            opacity: isDragging ? 0.5 : 1,
                          }}
                >
                  <img src={props.src} className="model-sample-tshirt-img"/>
                </div>
        )
}
export default DraggableTshirt;
