import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import trousers from '../assets/sample_blue_jeans.png';

const DraggableShorts = (props) => {
    const [{isDragging}, drag] = useDrag({
          item: { type: ItemTypes.short, 
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
                  <img src={props.src} className="model-sample-short-img"/>
                </div>
        )
}
export default DraggableShorts;
