import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import shirt from '../assets/sample_green_shirt.png';

function DraggableTshirt() {
    const [{isDragging}, drag] = useDrag({
          item: { type: ItemTypes.tshirt, 
                  source: shirt
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
                  <img src={shirt} />
                </div>
        )
}
export default DraggableTshirt;
